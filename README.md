
# Quiz Creation and Participation System

This project implements a **Quiz Creation and Participation System** that allows admins to create and manage quizzes with multiple questions and correct answers. It also enables students to view available quizzes, attempt them, and view their results.

---

## Objective

To build a system where:
- **Admins** can create, manage, and monitor quizzes.
- **Students** can view, attempt, and receive scores for quizzes.

---

# Frontend

The frontend enables users to interact with the quiz system, displaying quiz options and managing user roles. It uses HTML, JavaScript, and Tailwind CSS to create a responsive, interactive interface for admins and students.

## Key Requirements (Frontend)

### 1. User Authentication

- **Login and Logout**:
  - Provides secure login and logout functionality.
- **Role-Based Access**:
  - **Admins** have permissions to create and manage quizzes.
  - **Students** can view and attempt quizzes.

### 2. CRUD Screens

- **Quiz Creation Screen (Admin)**:
  - Interface for admins to create quizzes, add questions, and set answers.
- **Quiz List (Student)**:
  - Students can view available quizzes.
- **Quiz Attempt Screen (Student)**:
  - Students can take quizzes by selecting answers and submitting responses.
- **Quiz Results Screen (Student)**:
  - Displays scores after quiz completion.

---

## Functional Requirements (Frontend)

### 1. Quiz List View (Student)

- Displays a list of available quizzes, showing:
  - **Title**
  - **Description**
  - **Duration**
- **Start Quiz**:
  - Allows students to begin a quiz, redirecting them to the quiz attempt screen.

### 2. Quiz Attempt Screen (Student)

- Allows students to answer each question.
- **Submit Button**: 
  - Submits answers and completes the quiz.
- **Optional Timer**: 
  - Counts down if the quiz has a set duration.

### 3. Quiz Results Screen (Student)

- Displays the student’s score and optionally allows them to review answers.

---

## Technology Stack (Frontend)

- **HTML**: Structure of web pages.
- **JavaScript**: Logic for handling user interactions.
- **Tailwind CSS**: Styling for responsive layouts.

---

## Setup Instructions (Frontend)

1. **Install Dependencies**:
   - No additional installations are needed; simply link `index.html` with Tailwind and JavaScript files.
2. **Run**:
   - Open `index.html` in a browser to access the interface.

## Folder Structure (Frontend)

```plaintext
frontend/
├── index.html         # Main HTML file
├── css/               # Stylesheets
├── js/                # JavaScript files
└── assets/            # Images, icons, etc.
```

## Additional Features

- **Loader**: Displays a loading spinner during fetch requests.
- **Error Handling**: Error messages for failed requests.
- **Responsive Design**: Optimized for both desktop and mobile views.

---

### Note

The system can be expanded with additional features such as automated grading and a leaderboard.