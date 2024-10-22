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

- **Rule Creation**: Create complex rules using conditions and logical operators.
- **Rule Combination**: Combine multiple rules using AND/OR operators.
- **Rule Evaluation**: Evaluate rules against user data.
- **Rule Management**: Update and delete existing rules.
- **Visual Interface**: User-friendly web interface for rule management.
- **RESTful API**: Complete API for integration with other systems.

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
    ```

2. Build and run with Docker Compose:
    ```bash
    docker-compose up --build
    ```

3. Access the application:

    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend API: [http://localhost:5000](http://localhost:5000)

### Option 2: Local Development Setup

#### Backend Setup:

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Set up environment variables:
    ```bash
    cp .env.example .env
    ```

5. Run the application:
    ```bash
    python run.py
    ```

#### Frontend Setup:

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the application:
    ```bash
    npm start
    ```

## Project Structure

```bash
rule-engine/
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
```
## Usage Guide

### Creating Rules

Rules can be created using a simple syntax with supported attributes:

- `age`: numeric value
- `department`: string value
- `salary`: numeric value
- `experience`: numeric value

#### Example Rules:

- **Simple Rule**:
    ```python
    age > 30 AND department == 'Sales'
    ```

- **Complex Rule**:
    ```python
    (age > 30 AND department == 'Sales') OR (experience >= 5 AND salary > 50000)
    ```

### Combining Rules

1. Select multiple existing rules.
2. Choose an operator (`AND`/`OR`).
3. Create a new combined rule.

### Evaluating Rules

Provide user data in the following format:

```json
{
    "age": 35,
    "department": "Sales",
    "salary": 60000,
    "experience": 7
}
```
## API Documentation

### Endpoints

1. **Create Rule**
    ```http
    POST /api/rules
    Content-Type: application/json
    ```

    Request body:
    ```json
    {
        "name": "Senior Sales Rule",
        "rule_string": "age > 30 AND department == 'Sales'"
    }
    ```

2. **Get All Rules**
    ```http
    GET /api/rules
    ```

3. **Update Rule**
    ```http
    PUT /api/rules/{rule_id}
    Content-Type: application/json
    ```

    Request body:
    ```json
    {
        "name": "Updated Rule Name",
        "rule_string": "age > 25"
    }
    ```

4. **Delete Rule**
    ```http
    DELETE /api/rules/{rule_id}
    ```

5. **Evaluate Rule**
    ```http
    POST /api/rules/evaluate
    Content-Type: application/json
    ```

    Request body:
    ```json
    {
        "rule_id": 1,
        "user_data": {
            "age": 35,
            "department": "Sales",
            "salary": 60000,
            "experience": 7
        }
    }
    ```

## Testing

### Backend Tests

```bash
# In backend directory
pytest
```
## Frontend Tests

```bash
# In frontend directory
npm test
```

## Contributing

1. Fork the repository.
2. Create a feature branch:
    ```bash
    git checkout -b feature/AmazingFeature
    ```
3. Commit your changes:
    ```bash
    git commit -m 'Add AmazingFeature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature/AmazingFeature
    ```
5. Open a Pull Request.

---

## Troubleshooting

### Common Issues

1. **Port Conflicts**

    Check if ports are in use:

    ```bash
    # For Windows
    netstat -ano | findstr :5000

    # For Unix
    lsof -i :5000
    ```

2. **Database Issues**

    - Ensure the SQLite database file has proper permissions.
    - Check the database path in your configuration.

3. **API Connection Issues**

    - Verify the backend is running and accessible.
    - Check the CORS configuration.
    - Verify the API URL in the frontend configuration.

---

## Environment Variables

### Backend (`.env`)

```env
FLASK_APP=run.py
FLASK_ENV=development
DATABASE_URL=sqlite:///rules.db
SECRET_KEY=your-secret-key
```
### Frontend (`.env`)

```env
REACT_APP_API_URL=http://localhost:5000/api
```
## License
Distributed under the MIT License. See LICENSE for more information.
