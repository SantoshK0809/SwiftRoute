# User API Documentation

## Register User

Creates a new user account and returns an authentication token along with the user details.

**URL**: `/api/user/register`  
**Method**: `POST`  
**Auth Required**: No

### Request Body

The request body must be a JSON object containing the following fields:

| Field | Type | Required | Description | Validation |
| :--- | :--- | :--- | :--- | :--- |
| `fullname.firstname` | String | Yes | User's first name | Cannot be empty, minimum 3 characters. |
| `fullname.lastname` | String | No | User's last name | |
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

**URL**: `/api/user/login`  
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

---

## Get User Profile

Retrieves the profile information of the currently authenticated user.

**URL**: `/api/user/profile`  
**Method**: `GET`  
**Auth Required**: Yes

### Request Headers

| Header | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `Authorization` | String | Yes (or cookie) | Bearer token (`Bearer <token>`) |

### Response Status Codes & Responses

#### `200 OK`
Successfully retrieved the user profile.

**Example Response:**
```json
{
  "message": "User profile retrieved successfully.",
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

#### `401 Unauthorized`
User is not authenticated (token is missing, invalid, or blacklisted).

**Example Response:**
```json
{
  "message": "Unauthorized access"
}
```

#### `500 Internal Server Error`
An unexpected server error occurred.

**Example Response:**
```json
{
  "message": "Internal server error."
}
```

---

## Logout User

Logs out the currently authenticated user by blacklisting their token and clearing the authentication cookie.

**URL**: `/api/auth/logout`  
**Method**: `POST`  
**Auth Required**: Yes

### Request Headers

| Header | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `Authorization` | String | Yes (or cookie) | Bearer token (`Bearer <token>`) |

### Response Status Codes & Responses

#### `200 OK`
Successfully logged out the user. The JWT token is blacklisted and the cookie is cleared.

**Example Response:**
```json
{
  "message": "User logged out successfully."
}
```

#### `401 Unauthorized`
User is not authenticated (token is missing, invalid, or already blacklisted).

**Example Response:**
```json
{
  "message": "Unauthorized access"
}
```

#### `500 Internal Server Error`
An unexpected server error occurred during the logout process.

**Example Response:**
```json
{
  "message": "Internal server error."
}
```

---

# Captain API Documentation

## Register Captain

Creates a new captain account and returns the captain details.

**URL**: `/api/captain/register`  
**Method**: `POST`  
**Auth Required**: No

### Request Body

The request body must be a JSON object containing the following fields:

| Field | Type | Required | Description | Validation |
| :--- | :--- | :--- | :--- | :--- |
| `fullname.firstname` | String | Yes | Captain's first name | Cannot be empty, minimum 3 characters. |
| `fullname.lastname` | String | No | Captain's last name | |
| `email` | String | Yes | Captain's email address | Must be a valid email format. Must be unique. |
| `password` | String | Yes | Captain's password | Minimum 6 characters. |
| `vehicle.color` | String | No | Vehicle color | |
| `vehicle.plate` | String | Yes | Vehicle number plate | Minimum 6 characters. Must be unique. |
| `vehicle.capacity` | Number/String | Yes | Vehicle capacity | Minimum 1. |
| `vehicle.vehicleType` | String | Yes | Vehicle type | Must be one of `car`, `auto`, `motorcycle`. |

**Example Request:**
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "securepassword123",
  "vehicle": {
    "color": "white",
    "plate": "MH01AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Response Status Codes & Responses

#### `201 Created`
Successfully created the captain. Returns a success message and captain details.

**Example Response:**
```json
{
  "message": "Captain registered successfully.",
  "newCaptain": {
    "_id": "60d0fe4f5311236168a109cb",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "white",
      "plate": "MH01AB1234",
      "capacity": "4",
      "vehicleType": "car"
    }
  }
}
```

#### `400 Bad Request`
Validation failed for the request body.

#### `409 Conflict`
A captain with the provided email already exists.

**Example Response:**
```json
{
  "message": "Captain already exists."
}
```

#### `500 Internal Server Error`
An unexpected server error occurred.

---

## Login Captain

Authenticates an existing captain and returns a success message.

**URL**: `/api/captain/login`  
**Method**: `POST`  
**Auth Required**: No

### Request Body

| Field | Type | Required | Description | Validation |
| :--- | :--- | :--- | :--- | :--- |
| `email` | String | Yes | Captain's email address | Must be a valid email format. |
| `password` | String | Yes | Captain's password | Minimum 6 characters. |

**Example Request:**
```json
{
  "email": "jane.smith@example.com",
  "password": "securepassword123"
}
```

### Response Status Codes & Responses

#### `200 OK`
Successfully authenticated the captain. A JWT token is set in the cookies. Returns a success message.

**Example Response:**
```json
{
  "message": "Captain loggedIn successfully"
}
```

#### `400 Bad Request`
Validation failed for the request body.

#### `401 Unauthorized`
Invalid credentials.

**Example Response:**
```json
{
  "message": "Invalid credentials"
}
```

#### `500 Internal Server Error`
An unexpected server error occurred.

---

## Get Captain Profile

Retrieves the profile information of the currently authenticated captain.

**URL**: `/api/captain/profile`  
**Method**: `GET`  
**Auth Required**: Yes

### Request Headers

| Header | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `Authorization` | String | Yes (or cookie) | Bearer token (`Bearer <token>`) |

### Response Status Codes & Responses

#### `200 OK`
Successfully retrieved the captain profile.

**Example Response:**
```json
{
  "message": "Captain profile retrieved successfully.",
  "captain": {
    "_id": "60d0fe4f5311236168a109cb",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "white",
      "plate": "MH01AB1234",
      "capacity": "4",
      "vehicleType": "car"
    }
  }
}
```

#### `401 Unauthorized`
Captain is not authenticated.

#### `500 Internal Server Error`
An unexpected server error occurred.

---

## Logout Captain

Logs out the currently authenticated captain by blacklisting their token and clearing the cookie.

**URL**: `/api/captain/logout`  
**Method**: `POST`  
**Auth Required**: Yes

### Request Headers

| Header | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `Authorization` | String | Yes (or cookie) | Bearer token (`Bearer <token>`) |

### Response Status Codes & Responses

#### `200 OK`
Successfully logged out the captain.

**Example Response:**
```json
{
  "message": "Captain logged out successfully.",
  "blacklisted": {
    "token": "ey...",
    "_id": "..."
  }
}
```

#### `401 Unauthorized`
Captain is not authenticated.

#### `500 Internal Server Error`
An unexpected server error occurred.
