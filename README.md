
# Internship Assignment - Build a School Management System

## Objective:
Develop a backend API to manage a school system with features for managing students,teachers, and classes, along with Cloudinary for storing student and teacher profile pictures.

## Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or a cloud instance)

## Setup Instructions
1. Clone the repository: `git clone https://github.com/tejaslakade99/repository-name.git`
2. Navigate to the project directory: `cd virtual-classroom/backend/`
3. Install dependencies: `npm install`
4. Copy the `.env.example` file and rename it to `.env` and add connections,cloudinary,passport secrets.
5. Start the server: `nodemon server.js`

## API Endpoints

### User Routes
- **POST** `/api/user/create-session` - Create the session.
  - Request Body:
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
  - Response: 
    ```json
    {
    "message": "Logged In.Token is Generated.",
    "data": {
        "token": "{generatedtoken}"
            }
    }
    ```
  - **NOTE:** To create the first user, please follow the instructions provided in the User.js file.

- **POST** `/api/user/create-user` - Create the first user
  - Authorization: Bearer token (JWT) is required in the      Authorization header for the request and expires in 2min.
  - Request Body:
    ```json
    {
      "email": "john@example.com",
      "name": "John Doe",
      "password": "password123"
    }
    ```
  - Response: 
    ```json
    {
    "message": "User is created.",
    "user": 
        {
        "email": "john@example.com",
        "name": "John Doe",
        "password": "password123",
        "_id": "673e0a8227f6a54e024f1eb3",
        "createdAt": "2024-11-20T16:12:50.543Z",
        "updatedAt": "2024-11-20T16:12:50.543Z",
        "__v": 0
        }
    }
    ```
  - **NOTE:** To create the first user, please follow the instructions provided in the User.js file.

### Students Routes
- **POST** `/api/students/create-student` - Create the student
  - Request Body:
    ```json
    {
      "email": "john@example.com",
      "name": "John Doe",
      "classId": "673dd6f5d0f5e9e2d2de6635", 
      "profileImgUrl": "http://dummyimage.com/201x100.png/5fa2dd/ffffff"
    }
    ```
  - Response: 
    ```json
    {
    "student": {
        "email": "john@example.com",
        "name": "John Doe",
        "classId": "673dd6f5d0f5e9e2d2de6635",
        "profileImgUrl": "https://res.cloudinary.com/dxqytk9fo/image/upload/v1732120020/John-Doe.jpg",
        "_id": "673e0dd427f6a54e024f1eb7",
        "createdAt": "2024-11-20T16:27:00.919Z",
        "updatedAt": "2024-11-20T16:27:00.919Z",
        "__v": 0
        }
    } 
    ```
- **POST** `/api/students/mark-attendance/:id` - Mark the attendance. Class: Grade 10A
  - Request Body:
    ```json
    {
      "name": "Grade 10A",
    }
    ```
- **GET** `/api/students/:id` - Get the details of student.
  - Response: 
    ```json
    {
    "student": {
        "email": "john@example.com",
        "name": "John Doe",
        "classId": "673dd6f5d0f5e9e2d2de6635",
        "profileImgUrl": "https://res.cloudinary.com/dxqytk9fo/image/upload/v1732120020/John-Doe.jpg",
        "_id": "673e0dd427f6a54e024f1eb7",
        "createdAt": "2024-11-20T16:27:00.919Z",
        "updatedAt": "2024-11-20T16:27:00.919Z",
        "__v": 0
        }
    } 
    ```
- **GET** `/api/students/all-students` - Get the details of all students.
- **PUT** `/api/students/:id` - Update the student.
- **DELETE** `/api/students/:id` - Delete the student.



### Teacher Routes
  
- **POST** `/api/teacher/create-teacher` - Create teacher.
    - Authorization: Bearer token (JWT) is required in the      Authorization header for the request and expires in 2min.
    -  Request Body:
    ```json
    {
      "email": "john@example.com",
      "name": "John Doe",
      "subject": "Mathematics", 
      "profileImgUrl": "http://dummyimage.com/201x100.png/5fa2dd/ffffff"
    }
    ```
    - Response Body:
    ```json
    {
    "status": "Teacher Created.",
    "teacher": {
        "email": "john@example.com",
        "name": "Joe Doe",
        "subject": "Mathematics",
        "profileImgUrl": "https://res.cloudinary.com/dxqytk9fo/image/upload/v1732122890/Joe-Doe.jpg",
        "_id": "673e190a9822d29c176f5819",
        "createdAt": "2024-11-20T17:14:50.797Z",
        "updatedAt": "2024-11-20T17:14:50.797Z",
        "__v": 0
               }
    }
    ```
- **GET** `/api/teacher/all-teachers` - Get all teachers.
- **GET** `/api/teacher/:id` - Get Specific teacher with Id.
- **PUT** `/api/teacher/:id` - Update Specific teacher with Id.
- **DELETE** `/api/teacher/:id` - Delete Specific teacher with Id.

### Class Routes
  
- **POST** `/api/class/create-class` - Create class.
    - Authorization: Bearer token (JWT) is required in the      Authorization header for the request and expires in 2min.
    -  Request Body:
    ```json
    {
      "name": "John Doe",
      "teacherId": "673cb8f83df8bd536b056bc8", 
    }
    ```
    - Response Body:
    ```json
    {
    "message": "Classroom is created.",
    "classroom": {
        "name": "Grade 10B",
        "teacherId": "673e190a9822d29c176f5819",
        "studentCount": 0,
        "_id": "673e1b9d6d1c8e8ed9a8753e",
        "attendees": [],
        "__v": 0
                 }
    }   
    ```
- **PATCH** `/api/class/assign-teacher` - Create class.
    - Authorization: Bearer token (JWT) is required in the      Authorization header for the request and expires in 2min.
    -  Request Body:
    ```json
    {
      "teacherId": "673e190a9822d29c176f5819",
      "classId": "673e1b9d6d1c8e8ed9a8753e", 
    }
    ```
    - Response Body:
    ```json
    {
    "message": "Teacher is Assigned.",
    "classroom": {
        "name": "Grade 10B",
        "teacherId": "673e190a9822d29c176f5819",
        "studentCount": 0,
        "_id": "673e1b9d6d1c8e8ed9a8753e",
        "attendees": [],
        "__v": 0
                 }
    }   
    ```

- **GET** `/api/class/report/:id` - Get report of Specific class.
- **PUT** `/api/class/:id` - Update Specific class.
 - **DELETE** `/api/class/report/:id` - Delete Specific class.
 
 ### Exam Routes
  
- **POST** `/api/exam/create-exam` - Create exam.
    -  Request Body:
    ```json
    {
      "name": "Science Exam",
      "subject": "Science", 
      "totalMarks":"100"
    }
    ```
- **PUT** `/api/exam/:id` - Update exam.
    -  Request Body:
    ```json
    {
      "name": "Science Exam",
      "subject": "Science", 
      "totalMarks":"100"
    }
    ```
 ### Result Routes
  
- **POST** `/api/result/add-result` - Create result.
    -  Request Body:
    ```json
    {
      "name": "Science Exam",
      "subject": "Science", 
      "totalMarks":"100"
    }
    ```
- **GET** `/api/exam/exam-result/:id` - Get results of specific exam.
- **GET** `/api/exam/student-result/:id` - Get results of specific student.

## Additional Features:
- JWT-based authentication for admin access.
- Protect routes to ensure only authorized users can perform operations.
- Allow uploading and updating profile images for students and teachers using Cloudinary.
- Handle common errors like duplicate entries, invalid data, etc.

## Bonus Features (Optional):
- Implement attendance tracking for students in each class.
- Add a feature for managing exams and results for students.
- Generate a report for a class with a list of students and the assigned teacher.
