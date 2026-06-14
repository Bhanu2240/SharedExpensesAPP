const prisma = require("../config/prisma");

const getImportIssues = async (req, res) => {
  try {
    const issues = await prisma.importIssue.findMany({
      orderBy: {
        rowNumber: "asc",
      },
    });

    res.status(200).json({
      success: true,
      data: issues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (
      !["APPROVED", "REJECTED"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const issue = await prisma.importIssue.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    res.status(200).json({
      success: true,
      data: issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getImportIssues,
  updateIssueStatus,
};