# -Peer-Code-Review-Platform-for-Students
– Peer Code Review Platform for Students
# Peer Code Review Platform for Students

A full-stack web application that allows students to submit their source code, assign peer reviewers, provide review comments, give ratings, and maintain a complete review history.

## Problem Statement

Students often need feedback on their programming projects but may not have an easy platform to exchange code and review each other's work.

The **Peer Code Review Platform** provides a simple environment where students can:

* Create an account and log in
* Submit programming projects
* Assign another student as a peer reviewer
* Review submitted code
* Add comments and ratings
* View previous review history

---

# Feature Set A

### 1. Student Login

* Student registration
* Student login
* JWT-based authentication
* Protected pages for logged-in users

### 2. Submit Code

Students can submit:

* Project title
* Programming language
* Project description
* Source code

### 3. Assign Peer Reviewer

The student who submitted the code can:

* View available students
* Select a peer reviewer
* Assign the reviewer to the submission

### 4. Add Review Comment

Assigned reviewers can:

* View submitted source code
* Give a rating from 1 to 5
* Write review comments
* Submit feedback

### 5. Review History

Students can view:

* Previous reviews
* Review comments
* Ratings
* Reviewer name
* Student name
* Review date

---

# Technologies Used

## Frontend

* React.js
* React Router
* JavaScript
* HTML
* CSS

## Backend

* Node.js
* Express.js
* REST API
* JWT Authentication
* bcryptjs
* CORS

## Database

* SQLite

---

# Project Structure

```text
peer-code-review-platform/
│
├── client/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── SubmissionCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── SubmitCode.jsx
│   │   │   ├── Submissions.jsx
│   │   │   ├── Review.jsx
│   │   │   └── History.jsx
│   │   │
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   │
│   ├── src/
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── submissions.js
│   │   │   └── reviews.js
│   │   │
│   │   ├── db.js
│   │   └── index.js
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# Frontend Folder

The `client` folder contains the React frontend.

## Components

### Navbar.jsx

Provides the main navigation menu.

Includes links to:

* Dashboard
* Submit Code
* Submissions
* Review History
* Logout

### ProtectedRoute.jsx

Prevents users from accessing protected pages without logging in.

### SubmissionCard.jsx

Displays information about a submitted project such as:

* Project title
* Programming language
* Student
* Reviewer
* Submission status
* Date

---

# Pages

## Login.jsx

Allows registered students to log into the application.

## Register.jsx

Allows new students to create an account.

## Dashboard.jsx

Displays:

* Total submissions
* Assigned reviews
* Reviewed projects
* Recent submissions

## SubmitCode.jsx

Provides a form for submitting source code.

Students can enter:

* Project title
* Programming language
* Description
* Source code

## Submissions.jsx

Displays all submitted projects.

Students can assign another student as a reviewer.

## Review.jsx

Allows the assigned reviewer to:

* View project details
* View source code
* Select rating
* Write comments
* Submit review

## History.jsx

Displays previous review records.

---

# Backend Folder

The `server` folder contains the Node.js and Express backend.

## db.js

Creates and manages the SQLite database.

The database contains three main tables:

### users

Stores student information.

```text
id
name
email
password
created_at
```

### submissions

Stores submitted projects.

```text
id
title
language
code
description
student_id
reviewer_id
status
created_at
```

### reviews

Stores peer review information.

```text
id
submission_id
reviewer_id
rating
comment
created_at
```

---

# Authentication

Authentication is implemented using:

* JWT
* bcryptjs
* Protected API routes

Passwords are encrypted using bcrypt before being stored.

After successful login, the server generates a JWT token.

The token is stored on the frontend and used when making protected API requests.

---

# API Endpoints

## Authentication APIs

### Register

```http
POST /api/auth/register
```

Creates a new student account.

### Login

```http
POST /api/auth/login
```

Authenticates a student.

### Get Students

```http
GET /api/auth/students
```

Returns available students who can be assigned as reviewers.

---

# Submission APIs

### Create Submission

```http
POST /api/submissions
```

Creates a new code submission.

### Get Submissions

```http
GET /api/submissions
```

Returns all submissions.

### Get Single Submission

```http
GET /api/submissions/:id
```

Returns details of a particular submission.

### Assign Reviewer

```http
PUT /api/submissions/:id/assign
```

Assigns a student as a peer reviewer.

---

# Review APIs

### Add Review

```http
POST /api/reviews
```

Adds a rating and review comment.

### Review History

```http
GET /api/reviews/history
```

Returns review history for the logged-in student.

---

# Installation

## Step 1: Download the Project

Download or clone the project repository.

```bash
git clone <your-github-repository-url>
```

Move into the project:

```bash
cd peer-code-review-platform
```

---

# Step 2: Install Backend Dependencies

Open a terminal and run:

```bash
cd server
npm install
```

---

# Step 3: Start Backend Server

Run:

```bash
npm run dev
```

The backend server will start on:

```text
http://localhost:5000
```

You should see:

```text
Server running on http://localhost:5000
```

---

# Step 4: Install Frontend Dependencies

Open another terminal.

Go to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

---

# Step 5: Start Frontend

Run:

```bash
npm run dev
```

Vite will provide a URL similar to:

```text
http://localhost:5173
```

Open this URL in your browser.

---

# How to Use the Application

## Step 1: Register

Create two student accounts.

For example:

```text
Student 1
Name: Rutuja
Email: rutuja@example.com

Student 2
Name: Priya
Email: priya@example.com
```

---

## Step 2: Login

Login using the first student account.

---

## Step 3: Submit Code

Go to:

```text
Submit Code
```

Enter:

```text
Project Title
Programming Language
Description
Source Code
```

Click:

```text
Submit for Review
```

---

## Step 4: Assign Reviewer

Go to:

```text
Submissions
```

Find your submitted project.

Click:

```text
Assign Reviewer
```

Select another student.

Click:

```text
Assign Reviewer
```

---

## Step 5: Login as Reviewer

Logout from the first account.

Login using the second student account.

The assigned submission will be available for review.

---

## Step 6: Review Code

Open the assigned project.

The reviewer can:

* Read the submitted source code
* Select a rating from 1 to 5
* Write feedback

Example:

```text
Rating: 4/5

Comment:
The code is well structured and easy to understand.
Consider improving error handling and adding more comments.
```

Click:

```text
Submit Review
```

---

## Step 7: View Review History

Open:

```text
Review History
```

The application displays:

* Project name
* Programming language
* Review comment
* Rating
* Reviewer
* Student
* Review date

---

# Application Flow

```text
Register
   ↓
Login
   ↓
Dashboard
   ↓
Submit Code
   ↓
View Submission
   ↓
Assign Peer Reviewer
   ↓
Reviewer Login
   ↓
Open Submission
   ↓
Add Rating + Comment
   ↓
Submit Review
   ↓
Review History
```

---

# Environment Variables

For production use, create a `.env` file inside the `server` folder.

Example:

```env
PORT=5000
JWT_SECRET=your_secure_secret_key
```

Do not upload `.env` to GitHub.

The `.gitignore` file already contains:

```text
.env
node_modules/
*.db
dist/
```

---

# Database

The application uses SQLite.

The database file is automatically created when the backend starts.

Database file:

```text
server/peer-review.db
```

The database contains:

```text
users
submissions
reviews
```

---

# Main Features

| Feature              | Status      |
| -------------------- | ----------- |
| Student Registration | Implemented |
| Student Login        | Implemented |
| JWT Authentication   | Implemented |
| Dashboard            | Implemented |
| Submit Code          | Implemented |
| View Submissions     | Implemented |
| Assign Reviewer      | Implemented |
| Review Code          | Implemented |
| Rating System        | Implemented |
| Review Comments      | Implemented |
| Review History       | Implemented |
| SQLite Database      | Implemented |
| Responsive UI        | Implemented |

---

# Future Enhancements

The following features can be added later:

* Admin dashboard
* Search submissions
* Filter by programming language
* Email notifications
* GitHub repository integration
* Code syntax highlighting
* Multiple reviewers
* Review approval/rejection
* Student profile
* Reviewer performance statistics
* AI-powered code suggestions
* Code quality analysis
* Dark/light theme
* Deployment using Render, Vercel, or similar platforms

---

# Learning Outcomes

This project demonstrates practical knowledge of:

* React.js
* Component-based development
* React Router
* REST APIs
* Node.js
* Express.js
* SQLite
* CRUD operations
* JWT authentication
* Password hashing
* Database relationships
* API integration
* Frontend/backend communication
* Responsive web design

---

# Project Objective

The main objective of this project is to create a collaborative environment where students can exchange programming projects and provide meaningful peer feedback.

It helps students improve:

* Programming skills
* Code quality
* Problem-solving
* Collaboration
* Communication
* Software development practices

---

# Author

**prachi pratap**

Final Year BCA Student

---

# License

This project is created for educational and academic purposes.
