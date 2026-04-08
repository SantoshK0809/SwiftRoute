# User API Documentation

## Register User

Creates a new user account and returns an authentication token along with the user details.

**URL**: `/api/auth/register`  
**Method**: `POST`  
**Auth Required**: No

### Request Body

The request body must be a JSON object containing the following fields:

| Field | Type | Required | Description | Validation |
| :--- | :--- | :--- | :--- | :--- |
| `fullname.firstname` | String | Yes | User's first name | Cannot be empty, minimum 3 characters. |
| `fullname.lastname` | String | Yes | User's last name | |
| `email` | String | Yes | User's email address | Must be a valid email format. Must be unique. |
| `password` | String | Yes | User's password | Minimum 6 characters. |

**Example Request:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

### Response Status Codes & Responses

#### `201 Created`
Successfully created the user. A JWT token is set in the cookies. Returns a success message and user details (excluding password).

**Example Response:**
```json
{
  "message": "User created successfully.",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### `400 Bad Request`
Validation failed for the request body (e.g., missing required fields, invalid email format, short password).

**Example Response:**
```json
{
  "message": "Invalid input",
  "erros": [
    {
      "type": "field",
      "value": "asd",
      "msg": "Invalid email address",
      "path": "email",
      "location": "body"
    }
  ]
}
```

#### `409 Conflict`
A user with the provided email already exists.

**Example Response:**
```json
{
  "message": "User already exists."
}
```

#### `500 Internal Server Error`
An unexpected server error occurred during the registration process.

**Example Response:**
```json
{
  "message": "Internal server error."
}
```

---

## Login User

Authenticates an existing user and returns an authentication token along with the user details.

**URL**: `/api/auth/login`  
**Method**: `POST`  
**Auth Required**: No

### Request Body

The request body must be a JSON object containing the following fields:

| Field | Type | Required | Description | Validation |
| :--- | :--- | :--- | :--- | :--- |
| `email` | String | Yes | User's email address | Must be a valid email format. |
| `password` | String | Yes | User's password | Minimum 6 characters. |

**Example Request:**
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

### Response Status Codes & Responses

#### `200 OK`
Successfully authenticated the user. A JWT token is set in the cookies. Returns a success message and user details.

**Example Response:**
```json
{
  "message": "User logged in successfully.",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### `400 Bad Request`
Validation failed for the request body (e.g., missing required fields, invalid email format, short password).

**Example Response:**
```json
{
  "message": "Invalid input",
  "erros": [
    {
      "type": "field",
      "value": "asd",
      "msg": "Invalid email address",
      "path": "email",
      "location": "body"
    }
  ]
}
```

#### `401 Unauthorized`
Invalid credentials (email not found or incorrect password).

**Example Response:**
```json
{
  "message": "Invalid credentials."
}
```

#### `500 Internal Server Error`
An unexpected server error occurred during the login process.

**Example Response:**
```json
{
  "message": "Internal server error."
}
```
