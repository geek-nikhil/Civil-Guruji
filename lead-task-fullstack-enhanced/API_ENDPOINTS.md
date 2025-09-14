# Backend API Endpoints

This document outlines the expected backend API endpoints for the Lead CRM system.

## Base URL
```
http://localhost:3001/api
```

## Lead Endpoints

### 1. Get All Leads
```
GET /leads
```

**Response:**
```json
[
  {
    "id": "1",
    "name": "Kari Legros",
    "contact": "857.256.0540",
    "altPhone": "",
    "email": "kari@example.com",
    "altEmail": "",
    "status": "Follow-Up",
    "qualification": "Masters",
    "interest": "Mobile Development",
    "jobInterest": "",
    "source": "Email Campaign",
    "assignedTo": "John Doe",
    "city": "",
    "state": "",
    "heardFrom": "",
    "passoutYear": "",
    "updatedAt": "May 22, 2025 11:02 PM"
  }
]
```

### 2. Create New Lead
```
POST /leads
```

**Request Body:**
```json
{
  "name": "John Smith",
  "contact": "123-456-7890",
  "altPhone": "098-765-4321",
  "email": "john@example.com",
  "altEmail": "john.alt@example.com",
  "status": "New",
  "qualification": "Bachelors",
  "interest": "Web Development",
  "jobInterest": "Frontend Development",
  "source": "Website",
  "assignedTo": "Jane Smith",
  "city": "New York",
  "state": "NY",
  "heardFrom": "Google Search",
  "passoutYear": "2020"
}
```

**Response:**
```json
{
  "id": "10",
  "name": "John Smith",
  "contact": "123-456-7890",
  "altPhone": "098-765-4321",
  "email": "john@example.com",
  "altEmail": "john.alt@example.com",
  "status": "New",
  "qualification": "Bachelors",
  "interest": "Web Development",
  "jobInterest": "Frontend Development",
  "source": "Website",
  "assignedTo": "Jane Smith",
  "city": "New York",
  "state": "NY",
  "heardFrom": "Google Search",
  "passoutYear": "2020",
  "updatedAt": "May 23, 2025 10:30 AM"
}
```

### 3. Get Lead by ID
```
GET /leads/:id
```

**Response:**
```json
{
  "id": "1",
  "name": "Kari Legros",
  "contact": "857.256.0540",
  "altPhone": "",
  "email": "kari@example.com",
  "altEmail": "",
  "status": "Follow-Up",
  "qualification": "Masters",
  "interest": "Mobile Development",
  "jobInterest": "",
  "source": "Email Campaign",
  "assignedTo": "John Doe",
  "city": "",
  "state": "",
  "heardFrom": "",
  "passoutYear": "",
  "updatedAt": "May 22, 2025 11:02 PM"
}
```

### 4. Update Lead
```
PUT /leads/:id
```

**Request Body:** (Partial update)
```json
{
  "status": "Qualified",
  "assignedTo": "Emily Davis"
}
```

**Response:**
```json
{
  "id": "1",
  "name": "Kari Legros",
  "contact": "857.256.0540",
  "altPhone": "",
  "email": "kari@example.com",
  "altEmail": "",
  "status": "Qualified",
  "qualification": "Masters",
  "interest": "Mobile Development",
  "jobInterest": "",
  "source": "Email Campaign",
  "assignedTo": "Emily Davis",
  "city": "",
  "state": "",
  "heardFrom": "",
  "passoutYear": "",
  "updatedAt": "May 23, 2025 10:30 AM"
}
```

### 5. Delete Lead
```
DELETE /leads/:id
```

**Response:**
```json
{
  "message": "Lead deleted successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": {
    "name": "Name is required",
    "email": "Email is invalid"
  }
}
```

### 404 Not Found
```json
{
  "error": "Lead not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Environment Variables

Set the following environment variable in your `.env` file:

```
VITE_API_URL=http://localhost:3001/api
```

If not set, it defaults to `http://localhost:3001/api`.
