# Articles and Kids Articles API Documentation

This API provides Full CRUD for Articles and Kids Articles. These APIs are NOT multilingual.

---

## 1. Articles API

**Base URL:** `/api/articles` or `/api/{locale}/articles`

### List All Articles
**GET** `/api/articles`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Article Title",
      "thumbnail": "articles/thumbnails/uuid.jpg",
      "thumbnail_url": "http://.../storage/articles/thumbnails/uuid.jpg",
      "tags": "tag1, tag2",
      "description": "Article long description...",
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

### Get Single Article
**GET** `/api/articles/{id}`

### Create Article
**POST** `/api/articles`

**Request Body (multipart/form-data):**
| Field | Type | Description |
|---|---|---|
| `title` | string | **Required**. Title of the article |
| `thumbnail` | file | Image file for thumbnail |
| `tags` | string | Tags as a text field |
| `description` | string | Long text for description |

### Update Article
**POST** `/api/articles/{id}?_method=PUT`
*(Note: Use `POST` with `_method=PUT` for multipart/form-data updates in Laravel)*

**Request Body (multipart/form-data):**
Same as Create (fields are optional for update).

### Delete Article
**DELETE** `/api/articles/{id}`

---

## 2. Kids Articles API

**Base URL:** `/api/kids-articles` or `/api/{locale}/kids-articles`

### List All Kids Articles
**GET** `/api/kids-articles`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Kids Article Title",
      "thumbnail": "kids/thumbnails/uuid.jpg",
      "thumbnail_url": "http://.../storage/kids/thumbnails/uuid.jpg",
      "tags": "tag1, tag2",
      "description": "Kids article long description...",
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

### Get Single Kids Article
**GET** `/api/kids-articles/{id}`

### Create Kids Article
**POST** `/api/kids-articles`

**Request Body (multipart/form-data):**
| Field | Type | Description |
|---|---|---|
| `title` | string | **Required**. Title of the kids article |
| `thumbnail` | file | Image file for thumbnail |
| `tags` | string | Tags as a text field |
| `description` | string | Long text for description |

### Update Kids Article
**POST** `/api/kids-articles/{id}?_method=PUT`

**Request Body (multipart/form-data):**
Same as Create.

### Delete Kids Article
**DELETE** `/api/kids-articles/{id}`
