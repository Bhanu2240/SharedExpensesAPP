# SCOPE.md

## Database Schema

### User

Stores application users.

### Group

Stores expense groups.

### GroupMember

Tracks group membership history.

Fields:

* joinedAt
* leftAt

This allows support for members joining and leaving groups over time.

### Expense

Stores expense records.

### ExpenseParticipant

Stores participant share information.

### ImportedRow

Stores uploaded CSV rows before processing.

### ImportIssue

Stores detected CSV anomalies.

---

## Detected Anomalies

### Missing Payer

Policy:
Import blocked until reviewed.

### Unknown Member

Policy:
Import blocked until reviewed.

### Invalid Split Type

Policy:
Flagged as HIGH severity.

### Duplicate Expense

Policy:
Flagged for manual review.

### Settlement Recorded As Expense

Policy:
Flagged for manual review.

### Negative Amount

Policy:
Treated as refund transaction.

### Missing Currency

Policy:
Default currency applied during import.

### USD Currency

Policy:
Flagged for conversion review.

### Zero Amount

Policy:
Flagged as medium severity.

---

## Membership Handling

Meera left on March 31.

Sam joined on April 15.

Import processing only includes members active on the expense date.
