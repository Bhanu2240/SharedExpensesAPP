const prisma = require("../config/prisma");

const processImport = async (req, res) => {
  try {

    const pendingHighIssues =
      await prisma.importIssue.findMany({
        where: {
          severity: "HIGH",
          status: "PENDING",
        },
      });

    if (pendingHighIssues.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Resolve all HIGH severity issues before import",
      });
    }

    const rows =
      await prisma.importedRow.findMany({
        where: {
          processed: false,
        },
      });

    let importedCount = 0;

    const group = await prisma.group.findFirst();

    if (!group) {
      return res.status(400).json({
        success: false,
        message: "No group found",
      });
    }

    for (const row of rows) {

      if (!row.paidBy) continue;

      const payer =
        await prisma.user.findFirst({
          where: {
            name: {
              equals: row.paidBy,
              mode: "insensitive",
            },
          },
        });

      if (!payer) continue;

      const participants =
        row.splitWith
          ?.split(";")
          .map((name) => name.trim()) || [];

      // CSV Date Format DD-MM-YYYY
      let expenseDate = new Date();

if (
  row.date &&
  row.date.includes("-")
) {

  const parts =
    row.date.split("-");

  if (parts.length === 3) {

    const [day, month, year] =
      parts;

    const parsedDate =
      new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
      );

    if (!isNaN(parsedDate.getTime())) {
      expenseDate = parsedDate;
    }
  }
}
console.log(
  "Row:",
  row.rowNumber,
  "Date:",
  row.date,
  "Parsed:",
  expenseDate
);

      // Active members only
      const activeMembers =
        await prisma.groupMember.findMany({
          where: {
            groupId: group.id,

            joinedAt: {
              lte: expenseDate,
            },

            OR: [
              {
                leftAt: null,
              },
              {
                leftAt: {
                  gte: expenseDate,
                },
              },
            ],
          },
          include: {
            user: true,
          },
        });

      const participantUsers = [];

      for (const name of participants) {

        const activeMember =
          activeMembers.find(
            (member) =>
              member.user.name
                .toLowerCase()
                .startsWith(
                  name.toLowerCase()
                )
          );

        if (activeMember) {
          participantUsers.push(
            activeMember.user
          );
        }
      }

      if (participantUsers.length === 0)
        continue;

      const expense =
        await prisma.expense.create({
          data: {
            title: row.description,
            amount: row.amount,
            currency: row.currency || "INR",
            expenseDate,
            groupId: group.id,
            paidById: payer.id,
          },
        });

      // EQUAL SPLIT
      if (
        !row.splitType ||
        row.splitType.toLowerCase() ===
          "equal"
      ) {

        const shareAmount =
          row.amount /
          participantUsers.length;

        for (const user of participantUsers) {

          await prisma.expenseParticipant.create({
            data: {
              expenseId: expense.id,
              userId: user.id,
              shareAmount,
            },
          });

        }

      }

      // PERCENTAGE SPLIT
      else if (
        row.splitType.toLowerCase() ===
        "percentage"
      ) {

        const details =
          row.splitDetails?.split(";") ||
          [];

        for (const user of participantUsers) {

          const detail =
            details.find((d) =>
              d
                .toLowerCase()
                .includes(
                  user.name.toLowerCase()
                )
            );

          if (!detail) continue;

          const percent =
            parseFloat(
              detail.match(/\d+/)?.[0] || 0
            );

          const shareAmount =
            (row.amount * percent) /
            100;

          await prisma.expenseParticipant.create({
            data: {
              expenseId: expense.id,
              userId: user.id,
              shareAmount,
            },
          });

        }

      }

      // SHARE SPLIT
      else if (
        row.splitType.toLowerCase() ===
        "share"
      ) {

        const details =
          row.splitDetails?.split(";") ||
          [];

        const sharesMap = {};

        let totalShares = 0;

        for (const item of details) {

          const match =
            item.trim().match(
              /^([A-Za-z]+)\s+(\d+)$/
            );

          if (!match) continue;

          const name = match[1];
          const shares =
            Number(match[2]);

          sharesMap[name] = shares;

          totalShares += shares;
        }

        for (const user of participantUsers) {

          const shares =
            sharesMap[user.name] || 0;

          const shareAmount =
            (row.amount * shares) /
            totalShares;

          await prisma.expenseParticipant.create({
            data: {
              expenseId: expense.id,
              userId: user.id,
              shareAmount,
            },
          });

        }

      }

      await prisma.importedRow.update({
        where: {
          id: row.id,
        },
        data: {
          processed: true,
        },
      });

      importedCount++;
    }

    res.status(200).json({
      success: true,
      importedCount,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const resetImportData = async (req, res) => {
  try {

    await prisma.expenseParticipant.deleteMany();

    await prisma.expense.deleteMany();

    await prisma.importedRow.updateMany({
      data: {
        processed: false,
      },
    });

    res.json({
      success: true,
      message: "Reset completed",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  processImport,
  resetImportData,
};