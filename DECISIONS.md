# DECISIONS.md

## Decision 1: PostgreSQL

Options:

* MongoDB
* PostgreSQL

Chosen:

* PostgreSQL

Reason:
Assignment explicitly required a relational database.

---

## Decision 2: Membership Timeline

Options:

* Current members only
* Historical membership tracking

Chosen:

* Historical membership tracking

Reason:
Members join and leave at different times.

---

## Decision 3: Import Workflow

Options:

* Auto-fix all issues
* Manual review

Chosen:

* Manual review

Reason:
Assignment requires user visibility and approval of changes.

---

## Decision 4: Duplicate Handling

Options:

* Automatically remove
* User approval

Chosen:

* User approval

Reason:
Meera requested approval before modifications.

---

## Decision 5: Settlement Calculation

Options:

* Raw balances
* Minimized transactions

Chosen:

* Minimized transactions

Reason:
Produces simple payment instructions.
