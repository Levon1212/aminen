# Private Lesson Schedules API Documentation

This API provides Full CRUD for Private Lesson Schedules.

## Base URL
`/api/private-lesson-schedules`

---

## 1. List All Schedules
**GET** `/api/private-lesson-schedules`

### Response
```json
{
  "data": [
    {
      "id": 1,
      "full_name": "John Doe",
      "email": "john@example.com",
      "phone_number": "+123456789",
      "message": "I would like to schedule a lesson.",
      "date": "2026-01-15",
      "country": "USA",
      "created_at": "2026-01-08T12:00:00Z",
      "updated_at": "2026-01-08T12:00:00Z"
    }
  ]
}
```

---

## 2. Get Single Schedule
**GET** `/api/private-lesson-schedules/{id}`

### Response
```json
{
  "data": {
    "id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone_number": "+123456789",
    "message": "I would like to schedule a lesson.",
    "date": "2026-01-15",
    "country": "USA",
    "created_at": "2026-01-08T12:00:00Z",
    "updated_at": "2026-01-08T12:00:00Z"
  }
}
```

---

## 3. Create Schedule
**POST** `/api/private-lesson-schedules`

### Request Body (JSON)
| Field | Type | Description |
|---|---|---|
| `full_name` | string | Full name of the applicant |
| `email` | string | Email address |
| `phone_number` | string | Phone number |
| `message` | string | Message or request details |
| `date` | string | Preferred date for the lesson |
| `country` | string | Country of the applicant |

### Example Request
```json
{
  "full_name": "Jane Smith",
  "email": "jane@example.com",
  "phone_number": "+987654321",
  "message": "Inquiry about piano lessons",
  "date": "2026-02-20",
  "country": "UK"
}
```

---

## 4. Update Schedule
**PUT** `/api/private-lesson-schedules/{id}`

### Request Body (JSON)
Same as Create. All fields are typically required for a PUT request unless the backend supports partial updates via PATCH.

### Example Request
```json
{
  "full_name": "Jane Smith Updated",
  "email": "jane.updated@example.com",
  "phone_number": "+987654321",
  "message": "Updated message",
  "date": "2026-02-21",
  "country": "UK"
}
```

---

## 5. Delete Schedule
**DELETE** `/api/private-lesson-schedules/{id}`

### Response
Returns the ID of the deleted schedule or a success message.
