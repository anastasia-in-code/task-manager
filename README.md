# Northspyre Take-Home Project for React & Flask Web Application

## Welcome!

Thank you for participating in our engineering hiring process! This take-home test is designed to assess your practical skills in developing web applications using React and Flask. You are encouraged to use all of your preferred coding tools including and especially ChatGPT or any other AI-based coding assistants you like.

## Objective
Your task is to create a simple web application that features a React frontend and a Flask backend. The application will be a "Task Manager" where users can add, delete, and mark tasks as completed. You are free to modify any code already provided and add any dependencies you need. Creativity is encouraged. The only requirements are that the application should have a React frontend and a Flask backend using the REST architecture, and it should be able to perform the basic CRUD operations for tasks. Please be sure to include instructions for running your application in your submission.

## Requirements

Please extend the provided code to meet the following requirements:
* Display a list of tasks.
* Add a new task.
* Delete a task.
* Mark a task as completed.

You are free to modify the code in any way you like, but ensure your final result is a functional web application that meets the above requirements.

#### Frontend

* Framework: React
* Styling: Feel free to use plain CSS for stlying, ideally we recommend using Bootstrap which is already in the dependencies.

#### Backend

* Framework: Flask
* Database: Use SQLite for simplicity. The database should have at least one table named tasks with columns for id, title, description, and completed.

## Instructions

### Installation
Task Manager is a simple web application for managing tasks. It is built using Flask for the backend and React for the frontend.

Features
* Create, read, update, and delete tasks
* Mark tasks as completed
* Filter tasks by status

Backend (Flask)
* Navigate to the backend directory: cd task-manager/backend
* Install dependencies: pip install -r requirements.txt
* Start the development server: flask run
The backend server should now be running at http://localhost:5000.


Frontend (React)
* Navigate to the frontend directory: cd task-manager/frontend
* Install dependencies: npm install
* Start the development server: npm start
The frontend development server should now be running at http://localhost:3000.

### Usage
Open your browser and navigate to http://localhost:3000 to access the Task Manager application.
Use the interface to create, update, and delete tasks.


#### Development
Implement the required features as described above.

#### Documentation
Update this README to include instructions on how to set up and run your application.
Briefly describe your application's architecture and the decisions you made during development.

#### Submission
Please submit your completed test through coderbytes

#### Evaluation Criteria

* Functionality: The application works as described.
* Code Quality: Clean, modular, and well-organized code.
* Design: A user-friendly interface and a sensible API design.
* Documentation: Clear instructions on setting up and running your application, along with a concise explanation of your architecture and choices.

*Bonus Points*

* Implement authentication for users to manage their tasks.
* Deploy the application to a cloud service (Heroku, AWS, etc.).
* Write unit tests for both frontend and backend.
* Implement additional features that you think would be useful to have in a task manager application.


## Good luck, and we're looking forward to your submission!
