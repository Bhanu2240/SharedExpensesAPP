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

module.exports = {
  createGroup,
  getMyGroups,
};