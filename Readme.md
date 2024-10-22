# Rule Engine Application

A dynamic rule engine application that allows users to create, combine, and evaluate business rules using a simple syntax. Built with Flask (Backend) and React (Frontend), this application provides a flexible way to manage and evaluate complex business rules.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features

- **Rule Creation**: Create complex rules using conditions and logical operators
- **Rule Combination**: Combine multiple rules using AND/OR operators
- **Rule Evaluation**: Evaluate rules against user data
- **Rule Management**: Update and delete existing rules
- **Visual Interface**: User-friendly web interface for rule management
- **RESTful API**: Complete API for integration with other systems

## Technology Stack

### Backend
- Python 3.8+
- Flask Framework
- SQLAlchemy ORM
- SQLite Database

### Frontend
- React.js
- Tailwind CSS
- Axios for API communication

## Prerequisites

- Docker and Docker Compose (for containerized setup)
- Python 3.8+ (for local development)
- Node.js 14+ (for local development)
- Git

## Installation and Setup

### Option 1: Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/Ekansh1131/rule-engine.git
cd rule-engine

Build and run with Docker Compose:

bashCopydocker-compose up --build

Access the application:


Frontend: http://localhost:3000
Backend API: http://localhost:5000

Option 2: Local Development Setup

Backend Setup:

bashCopy# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env

# Run the application
python run.py

Frontend Setup:

bashCopy# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the application
npm start
Project Structure
Copyrule-engine/
├── backend/
│   ├── app/
│   │   ├── models/          # Database models
│   │   ├── routes/          # API endpoints
│   │   └── utils/           # Utility functions
│   ├── tests/               # Backend tests
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   └── utils/           # Frontend utilities
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
Usage Guide
Creating Rules
Rules can be created using a simple syntax with supported attributes:

age: numeric value
department: string value
salary: numeric value
experience: numeric value

Example Rules:
pythonCopy# Simple rule
age > 30 AND department == 'Sales'

# Complex rule
(age > 30 AND department == 'Sales') OR (experience >= 5 AND salary > 50000)
Combining Rules

Select multiple existing rules
Choose an operator (AND/OR)
Create a new combined rule

Evaluating Rules
Provide user data in the following format:
jsonCopy{
    "age": 35,
    "department": "Sales",
    "salary": 60000,
    "experience": 7
}
API Documentation
Endpoints
1. Create Rule
httpCopyPOST /api/rules
Content-Type: application/json

{
    "name": "Senior Sales Rule",
    "rule_string": "age > 30 AND department == 'Sales'"
}
2. Get All Rules
httpCopyGET /api/rules
3. Update Rule
httpCopyPUT /api/rules/{rule_id}
Content-Type: application/json

{
    "name": "Updated Rule Name",
    "rule_string": "age > 25"
}
4. Delete Rule
httpCopyDELETE /api/rules/{rule_id}
5. Evaluate Rule
httpCopyPOST /api/rules/evaluate
Content-Type: application/json

{
    "rule_id": 1,
    "user_data": {
        "age": 35,
        "department": "Sales",
        "salary": 60000,
        "experience": 7
    }
}
Testing
Backend Tests
bashCopy# In backend directory
pytest
Frontend Tests
bashCopy# In frontend directory
npm test
Contributing

Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit changes (git commit -m 'Add AmazingFeature')
Push to branch (git push origin feature/AmazingFeature)
Open a Pull Request

Troubleshooting
Common Issues
1. Port Conflicts
bashCopy# Check if ports are in use
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Unix
2. Database Issues

Ensure SQLite database file has proper permissions
Check database path in configuration

3. API Connection Issues

Verify backend is running and accessible
Check CORS configuration
Verify API URL in frontend configuration

Environment Variables
Backend (.env)
CopyFLASK_APP=run.py
FLASK_ENV=development
DATABASE_URL=sqlite:///rules.db
SECRET_KEY=your-secret-key
Frontend (.env)
CopyREACT_APP_API_URL=http://localhost:5000/api
License
Distributed under the MIT License. See LICENSE for more information.
