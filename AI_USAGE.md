# AI_USAGE.md

## AI Tools Used

* ChatGPT (Primary Development Assistant)

## Development Approach

This project was developed using ChatGPT as the primary development collaborator.

AI assistance was used for:

* Database schema design
* Express route generation
* Prisma model creation
* Authentication implementation
* CSV import workflow
* Settlement calculation logic
* Group membership history support
* API design
* Error handling patterns
* Documentation drafting

The generated code was integrated, tested, debugged, and modified throughout development.

---

## Representative Prompts

### Prompt 1

Design a PostgreSQL schema for a shared expenses application supporting:

* Users
* Groups
* Membership history
* Expenses
* Expense participants
* CSV import tracking
* Import issue tracking

### Prompt 2

Implement CSV anomaly detection for:

* Missing payer
* Duplicate expenses
* Invalid split types
* Unknown members
* Refund transactions
* Currency issues

### Prompt 3

Implement a settlement algorithm that converts balances into minimal payment instructions.

### Prompt 4

Modify import processing to support membership timelines where members can join and leave groups.

---

## Examples Of AI Errors And Corrections

### Example 1

Initial implementation treated all expenses as equal splits.

Issue:

The CSV contained percentage and share-based splits.

Correction:

Added separate logic for percentage and share split calculations.

---

### Example 2

Initial implementation ignored member join and leave dates.

Issue:

This violated the requirement that members can join and leave over time.

Correction:

Added GroupMember timeline filtering during import processing.

---

### Example 3

Initial implementation assumed imported expenses should always be accepted.

Issue:

Assignment required anomaly review and user approval.

Correction:

Added ImportIssue review workflow with approval/rejection status handling.

---

## Responsibility Statement

Although AI generated a significant portion of the implementation, all code was reviewed, tested, debugged, and integrated by the project author. The author is responsible for all submitted code and design decisions.
