const prisma = require("../config/prisma");

const getDashboard = async (req, res) => {
  try {

    const totalExpenses = await prisma.expense.count();

    const totalGroups = await prisma.group.count();

    const totalUsers = await prisma.user.count();

    const pendingIssues = await prisma.importIssue.count({
      where: {
        status: "PENDING",
      },
    });

    const expenseAggregation =
      await prisma.expense.aggregate({
        _sum: {
          amount: true,
        },
      });

    const recentExpenses =
      await prisma.expense.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          paidBy: {
            select: {
              name: true,
            },
          },
        },
      });

    res.status(200).json({
      success: true,
      data: {
        totalExpenses,
        totalGroups,
        totalUsers,
        pendingIssues,
        totalAmount:
          expenseAggregation._sum.amount || 0,
        recentExpenses,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDashboard,
};