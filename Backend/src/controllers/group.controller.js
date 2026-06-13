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
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const member = await prisma.groupMember.create({
      data: {
        groupId,
        userId: user.id,
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
        balance: balances[user.id],
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

module.exports = {
  createGroup,
  getMyGroups,
  addMember,
  getGroupMembers,
    getBalances,

};