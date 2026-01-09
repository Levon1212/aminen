# Lessons Page Documentation

This document describes the `/lessons` route and the functionality of the Lessons management page in the client-side application.

## Route Information
- **Path:** `/lessons`
- **Component:** `LessonsPage` (`src/pages/LessonsPage/LessonsPage.tsx`)
- **Layout:** Wrapped in `Layout` component.

## Page Overview
The Lessons page is the main dashboard for managing online lessons. It displays a grid of all available lessons and provides actions to create, edit, or delete them.

---

## Key Functionalities

### 1. List Lessons
- Fetches all lessons from the backend using the `useLessons` hook.
- Displays each lesson in a `NewsCard` component.
- Shows a loading spinner (`Loader`) while data is being fetched.

### 2. Create Lesson
- A "Create" button is located at the top right of the page.
- **Action:** Navigates the user to `/create-lesson`.

### 3. Edit Lesson
- Each lesson card has an "Edit" icon button.
- **Action:** Navigates the user to `/edit-lesson/{id}`.

### 4. Delete Lesson
- Each lesson card has a "Delete" icon button.
- **Action:** 
    - Prompts the user for confirmation ("Are you sure you want to delete this lesson?").
    - If confirmed, executes the `useDeleteLesson` mutation to remove the lesson from the database.

---

## Data Structure & Components

### Main Component: `LessonsPage`
- **Data Hook:** `useLessons()` - Returns an array of `LessonDto` objects.
- **Mutation Hook:** `useDeleteLesson()` - Handles the deletion logic.

### Display Component: `NewsCard`
Each lesson is rendered using the `NewsCard` component with the following mapping:

| Field | Source | Description |
|---|---|---|
| `title` | `lesson.title` or `lesson.title_en` | The title of the lesson. |
| `description` | `lesson.description`, `lesson.price`, `lesson.tags`, `lesson.videos` | A complex JSX block showing detailed info. |
| `thumbnail` | `lesson.thumbnail` | The lesson's cover image. |
| `onEdit` | `handleEdit` function | Callback for the edit action. |
| `onDelete` | `handleDelete` function | Callback for the delete action. |

---

## Related Routes
- **Create Lesson:** `/create-lesson` (Uses `LessonFormPage`)
- **Edit Lesson:** `/edit-lesson/:id` (Uses `LessonFormPage`)

## Styling
- The page uses a blurred background effect (`backdropFilter: 'blur(100px)'`) and a semi-transparent background color.
- Responsive grid layout: `repeat(auto-fill, minmax(300px, 1fr))`.
