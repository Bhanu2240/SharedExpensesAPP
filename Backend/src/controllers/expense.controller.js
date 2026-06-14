const prisma = require("../config/prisma");

const createExpense = async (req, res) => {
  try {
    const {
      title,
      amount,
      groupId,
      paidById,
      expenseDate,
      participants,
    } = req.body;
    if (!participants || participants.length === 0) {
  return res.status(400).json({
    success: false,
    message: "Participants are required",
  });
}

    const shareAmount =
      Number(amount) / participants.length;

    const expense = await prisma.expense.create({
      data: {
        title,
        amount: Number(amount),
        groupId,
        paidById,
        expenseDate: new Date(expenseDate),

        participants: {
          create: participants.map((userId) => ({
            userId,
            shareAmount,
          })),
        },
      },
      include: {
        participants: true,
      },
    });

    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getGroupExpenses = async (req, res) => {
  try {
    const { groupId } = req.params;

    const expenses = await prisma.expense.findMany({
      where: {
        groupId,
      },
      include: {
        paidBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      include: {
        paidBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const expense = await prisma.expense.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        paidBy: true,
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  try {

    await prisma.expenseParticipant.deleteMany({
      where: {
        expenseId: req.params.id,
      },
    });

    await prisma.expense.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const updateExpense = async (req, res) => {
  try {
    const {
      title,
      amount,
      expenseDate,
    } = req.body;

    const expense = await prisma.expense.update({
      where: {
        id: req.params.id,
      },
      data: {
        title,
        amount: Number(amount),
        expenseDate: new Date(expenseDate),
      },
    });

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createExpense,
  getGroupExpenses,
   getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};