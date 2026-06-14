const fs = require("fs");
const csv = require("csv-parser");
const prisma = require("../config/prisma");

const importCsv = async (req, res) => {
  try {
    const rows = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", async () => {

        const issues = [];
        const seenExpenses = new Map();

        const users = await prisma.user.findMany({
          select: {
            name: true,
          },
        });

        const validMembers = users.map(
          (user) => user.name.toLowerCase().trim()
        );

        rows.forEach((row, index) => {

          const rowNumber = index + 2;

          // Missing payer
          if (!row.paid_by) {
            issues.push({
              rowNumber,
              issueType: "MISSING_PAYER",
              severity: "HIGH",
              description: "Paid by is missing",
            });
          }

          // Unknown member
          const normalizedPaidBy =
            row.paid_by
              ?.toLowerCase()
              .trim()
              .split(" ")[0];

          if (
            row.paid_by &&
            !validMembers.includes(normalizedPaidBy)
          ) {
            issues.push({
              rowNumber,
              issueType: "UNKNOWN_MEMBER",
              severity: "HIGH",
              description: `Unknown member ${row.paid_by}`,
            });
          }

          // Zero amount
          if (Number(row.amount) === 0) {
            issues.push({
              rowNumber,
              issueType: "ZERO_AMOUNT",
              severity: "MEDIUM",
              description: "Amount is zero",
            });
          }

          // Refund
          if (Number(row.amount) < 0) {
            issues.push({
              rowNumber,
              issueType: "REFUND_TRANSACTION",
              severity: "MEDIUM",
              description: "Negative amount treated as refund",
            });
          }

          // Missing currency
          if (!row.currency) {
            issues.push({
              rowNumber,
              issueType: "MISSING_CURRENCY",
              severity: "LOW",
              description: "Currency is missing",
            });
          }

          // USD conversion
          if (
            row.currency &&
            row.currency.toUpperCase() === "USD"
          ) {
            issues.push({
              rowNumber,
              issueType: "USD_CONVERSION_REQUIRED",
              severity: "LOW",
              description: "Needs currency conversion",
            });
          }

          // Settlement disguised as expense
          const description =
            (row.description || "").toLowerCase();

          if (
            description.includes("paid back") ||
            description.includes("settled") ||
            description.includes("reimbursement")
          ) {
            issues.push({
              rowNumber,
              issueType: "SETTLEMENT_AS_EXPENSE",
              severity: "HIGH",
              description: "Settlement recorded as expense",
            });
          }

          // Invalid split type
          const validSplitTypes = [
            "equal",
            "percentage",
            "shares",
          ];

          if (
            row.split_type &&
            !validSplitTypes.includes(
              row.split_type.toLowerCase()
            )
          ) {
            issues.push({
              rowNumber,
              issueType: "INVALID_SPLIT_TYPE",
              severity: "HIGH",
              description: `Unknown split type ${row.split_type}`,
            });
          }

          // Duplicate detection
          const normalizedDescription =
            (row.description || "")
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "")
              .trim();

          const key =
            `${row.date}_${normalizedDescription}_${row.amount}_${row.paid_by}`
              .toLowerCase()
              .trim();

          if (seenExpenses.has(key)) {
            issues.push({
              rowNumber,
              issueType: "DUPLICATE_EXPENSE",
              severity: "HIGH",
              description: `Possible duplicate of row ${seenExpenses.get(
                key
              )}`,
            });
          } else {
            seenExpenses.set(key, rowNumber);
          }
        });

        // Save Import Issues
        await prisma.importIssue.deleteMany();

        if (issues.length > 0) {
          await prisma.importIssue.createMany({
            data: issues,
          });
        }

        // Save Imported Rows
        await prisma.importedRow.deleteMany();

        for (let i = 0; i < rows.length; i++) {

  const row = rows[i];

  console.log("Saving row:", row);

  const amount = parseFloat(row.amount);

  await prisma.importedRow.create({
    data: {
      rowNumber: i + 2,
      date: row.date || "",
      description: row.description || "",
      paidBy: row.paid_by || null,
      amount: isNaN(amount) ? 0 : amount,
      currency: row.currency || null,
      splitType: row.split_type || null,
      splitWith: row.split_with || null,
      splitDetails: row.split_details || null,
      notes: row.notes || null,
    },
  });

}
        res.status(200).json({
          success: true,
          totalRows: rows.length,
          totalIssues: issues.length,
          issues,
        });
      })
      .on("error", (error) => {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  importCsv,
};