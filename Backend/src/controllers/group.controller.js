const prisma = require("../config/prisma");

const createGroup = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Group name is required",
      });
    }

    const group = await prisma.group.create({
      data: {
        name,
        createdById: req.user.userId,
      },
    });

    res.status(201).json({
      success: true,
      data: group,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyGroups = async (req, res) => {
  try {
    const groups = await prisma.group.findMany({
      where: {
        createdById: req.user.userId,
      },
    });

    res.status(200).json({
      success: true,
      data: groups,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addMember = async (req, res) => {
  try {
    const { groupId } = req.params;

    const {
      email,
      joinedAt,
      leftAt,
    } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const member =
      await prisma.groupMember.create({
        data: {
          groupId,
          userId: user.id,

          joinedAt: joinedAt
            ? new Date(joinedAt)
            : new Date(),

          leftAt: leftAt
            ? new Date(leftAt)
            : null,
        },
      });

    res.status(201).json({
      success: true,
      data: member,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const getGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;

    const members = await prisma.groupMember.findMany({
      where: {
        groupId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getBalances = async (req, res) => {
  try {
    const { groupId } = req.params;

    const expenses = await prisma.expense.findMany({
      where: { groupId },
      include: {
        participants: true,
        paidBy: true,
      },
    });

    const balances = {};

    for (const expense of expenses) {

      if (!balances[expense.paidById]) {
        balances[expense.paidById] = 0;
      }

      balances[expense.paidById] += expense.amount;

      for (const participant of expense.participants) {

        if (!balances[participant.userId]) {
          balances[participant.userId] = 0;
        }

        balances[participant.userId] -= participant.shareAmount;
      }
    }

    const users = await prisma.user.findMany();

    const result = users
      .filter((user) => balances[user.id] !== undefined)
     .map((user) => ({
  user: user.name,
  balance: Number(
    balances[user.id].toFixed(2)
  ),
}));

    res.json({
      success: true,
      data: result,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const getSettlements = async (req, res) => {
  try {
    const { groupId } = req.params;

    const expenses = await prisma.expense.findMany({
      where: { groupId },
      include: {
        participants: true,
      },
    });

    const balances = {};

    for (const expense of expenses) {

      if (!balances[expense.paidById]) {
        balances[expense.paidById] = 0;
      }

      balances[expense.paidById] += expense.amount;

      for (const participant of expense.participants) {

        if (!balances[participant.userId]) {
          balances[participant.userId] = 0;
        }

        balances[participant.userId] -= participant.shareAmount;
      }
    }

    const users = await prisma.user.findMany();

    const creditors = [];
    const debtors = [];

    for (const user of users) {

      const balance = balances[user.id] || 0;

      if (balance > 0) {
        creditors.push({
          userId: user.id,
          name: user.name,
          amount: balance,
        });
      }

      if (balance < 0) {
        debtors.push({
          userId: user.id,
          name: user.name,
          amount: Math.abs(balance),
        });
      }
    }

    const settlements = [];

    let i = 0;
    let j = 0;

    while (
      i < debtors.length &&
      j < creditors.length
    ) {
      const debtor = debtors[i];
      const creditor = creditors[j];

      const amount = Math.min(
        debtor.amount,
        creditor.amount
      );

     settlements.push({
  from: debtor.name,
  to: creditor.name,
  amount: Number(
    amount.toFixed(2)
  ),
});

      debtor.amount -= amount;
      creditor.amount -= amount;

      if (debtor.amount === 0) i++;
      if (creditor.amount === 0) j++;
    }

    res.status(200).json({
      success: true,
      data: settlements,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const updateMemberTimeline = async (req, res) => {
  try {

    const { memberId } = req.params;

    const {
      joinedAt,
      leftAt,
    } = req.body;

    const member =
      await prisma.groupMember.update({
        where: {
          id: memberId,
        },
        data: {
          joinedAt: joinedAt
            ? new Date(joinedAt)
            : undefined,

          leftAt: leftAt
            ? new Date(leftAt)
            : null,
        },
      });

    res.status(200).json({
      success: true,
      data: member,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createGroup,
  getMyGroups,
  addMember,
  getGroupMembers,
  getBalances,
  getSettlements,
  updateMemberTimeline,

};