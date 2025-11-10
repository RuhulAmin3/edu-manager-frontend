# Edu Manager

Edu Manager is a comprehensive, coaching center management system designed to streamline administrative tasks and enhance communication between students, teachers, and guardians. This project is built with a modern tech stack and offers a user-friendly interface for managing various aspects of a school's operations.

**Live URL:** [https://edu-manager.netlify.app/](https://edu-manager.netlify.app/)

## Features

- **Dashboard:** A central hub for viewing key metrics and analytics.
- **Student Management:** Add, edit, and view student information, including personal details, guardian information, and academic records.
- **Teacher Management:** Manage teacher profiles, including personal, educational, and professional information.
- **Guardian Management:** Keep track of guardian details and their associated students.
- **Class and Subject Management:** Organize classes and subjects, and assign teachers to subjects.
- **Exam and Result Management:** Create exams, record results, and generate reports.
- **Attendance Tracking:** Monitor student attendance.
- **Financial Management:** Track fees and expenses.
- **Notice Board:** Post and view important announcements.
- **User Authentication:** Secure login for different user roles (Admin, Teacher, Student, Guardian).

## Tech Stack

- **Frontend:**
  - **Framework:** React
  - **Language:** TypeScript
  - **UI Library:** Ant Design
  - **Styling:** Styled Components
  - **State Management:** Redux Toolkit
  - **Routing:** React Router
  - **Linting:** ESLint
  - **Charts:** Ant Design Charts

## Project Structure

The project follows a feature-based structure, where each feature has its own folder containing the related components, API calls, types, and constants.

```
    src
    ├── assets
    ├── common
    ├── components
    ├── features
    │   ├── admin
    │   ├── auth
    │   ├── class
    │   ├── exam
    │   ├── guardian
    │   ├── student
    │   ├── subject
    │   └── teacher
    ├── layouts
    ├── pages
    ├── redux
    ├── routes
    └── styles
```
## Getting Started
To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/edu-manager-frontend.git
    ```
2.  **Install NPM packages**
    ```sh
    npm install
    ```
3.  **Start the development server**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production build, run:

```sh
npm run build
```

This will create a `dist` folder with the optimized and minified files.
