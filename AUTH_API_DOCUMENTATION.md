# Authentication & User Profile API Documentation

This documentation covers Registration, Login, Google OAuth, Profile Management, Email Verification, and Password Recovery.

## Base URL
`/api`

---

## 1. Authentication

### Register
**POST** `/api/register`

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | Username / Display name |
| `full_name` | string | No | Full legal name |
| `email` | string | Yes | Unique email address |
| `password` | string | Yes | Min 8 chars |
| `password_confirmation` | string | Yes | Must match password |

### Login
**POST** `/api/login`

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | string | Yes | User email |
| `password` | string | Yes | User password |

**Response:** Returns `access_token` and `user` object. Use this token in the `Authorization` header as `Bearer {token}` for authenticated requests.

### Logout
**POST** `/api/logout`
*Requires Authentication*

---

## 2. Google OAuth

### Google Redirect
**GET** `/api/auth/google`
Redirects the user to Google's consent screen.

### Google Callback
**GET** `/api/auth/google/callback`
Handled by the backend to exchange the code for a token and user info. Returns the same payload as the Login endpoint.

---

## 3. User Profile
*All routes require Authentication*

### Get Profile
**GET** `/api/profile`
Returns the current authenticated user's data including `avatar_url`.

### Update Profile
**POST** `/api/profile`
*Use POST even for updates to support multipart/form-data (avatar upload).*

| Field | Type | Description |
|---|---|---|
| `name` | string | Display name |
| `full_name` | string | Full name |
| `gender` | string | e.g., "Male", "Female", "Other" |
| `country` | string | Country name |
| `city` | string | City name |
| `phone` | string | Phone number |
| `avatar` | file | Image file (jpg, png, etc.) |

---

## 4. Email Verification

### Resend Verification Email
**POST** `/api/email/resend`
*Requires Authentication*

---

## 5. Password Recovery

### Send Reset Link
**POST** `/api/password/email`
| Field | Type | Description |
|---|---|---|
| `email` | string | Registered email address |

### Reset Password
**POST** `/api/password/reset`
| Field | Type | Description |
|---|---|---|
| `token` | string | Token from the email link |
| `email` | string | Registered email address |
| `password` | string | New password |
| `password_confirmation` | string | Confirm new password |

---

## Error Handling

The API returns standard HTTP status codes:
- `200 OK`: Success
- `201 Created`: Resource created successfully
- `401 Unauthorized`: Missing or invalid token
- `422 Unprocessable Entity`: Validation errors. Returns a JSON object with `errors` key.

### Example Validation Error Response
```json
{
    "message": "The email has already been taken.",
    "errors": {
        "email": ["The email has already been taken."]
    }
}
```

---

## Client-Side Implementation Prompt

If you are building the client-side (React/Vue/Mobile), you can use this prompt to generate your API service layer:

> "Create a robust API client using axios for a Laravel backend. Implement a class-based service that handles: 
> 1. Token persistence in localStorage/SecureStore. 
> 2. Automatic inclusion of the Bearer token in the 'Authorization' header.
> 3. Response interceptors to handle 401 errors (redirect to login) and 422 errors (display field-specific validation messages).
> 4. Methods for registration, login, social auth, profile retrieval, profile update (with multipart for avatar), and password recovery."

---

## Credentials & User Page
The user page should display and allow editing of:
- **Full Name**
- **Email** (read-only or with re-verification)
- **Phone Number**
- **Avatar** (with preview and upload)
- **Gender**
- **Location** (Country, City)
