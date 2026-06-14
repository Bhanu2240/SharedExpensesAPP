# Shared Expenses App

## Overview

A full-stack Shared Expenses application built to manage group expenses, balances, settlements, and CSV imports with anomaly detection.

The application supports changing group memberships over time, multiple expense split types, and a robust CSV import workflow.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication

### Group Management

* Create Groups
* Add Members
* View Group Members
* Membership history (join and leave dates)

### Expense Management

* Create Expenses
* View Expenses
* Equal Split
* Percentage Split
* Share-Based Split

### Balance Management

* Group-wise balances
* Settlement recommendations

### CSV Import

* Upload CSV file
* Detect anomalies
* Review issues
* Approve/Reject issues
* Import validated expenses

## Tech Stack

### Backend

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* JWT Authentication

### Frontend

* React
* Axios

## Installation

### Backend

```bash
npm install
npm run dev
```

### Database

```bash
npx prisma migrate dev
npx prisma generate
```

## Environment Variables

```env
DATABASE_URL=
JWT_SECRET=
PORT=
```

## API Endpoints

### Authentication

* POST /api/auth/register
* POST /api/auth/login

### Groups

* POST /api/groups
* GET /api/groups
* POST /api/groups/:groupId/members
* GET /api/groups/:groupId/members

### Expenses

* POST /api/expenses
* GET /api/expenses
* GET /api/expenses/:id

### Import

* POST /api/import/upload
* POST /api/import/process
* GET /api/import/issues

## AI Usage

Development was assisted using ChatGPT. All generated code was reviewed, modified, tested, and integrated manually.
