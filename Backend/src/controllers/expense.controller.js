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

module.exports = {
  createExpense,
  getGroupExpenses,
};