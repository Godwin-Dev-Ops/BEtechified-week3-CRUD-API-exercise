# Todo API

A simple **Todo API** built with **Node.js** and **Express**, featuring CRUD operations and filtering for active/completed tasks. This API uses an in-memory array as a "database."

# Features

- GET /todos- Retrieve all todos
- GET /todos/active - Retrieve only active (not completed) todos
- GET /todos/completed - Retrieve only completed todos
- GET /todos/:id - Retrieve a todo by its ID
- POST /todos - Create a new todo
- PATCH /todos/:id - Update a todo (partial update)
- DELETE /todos/:id - Delete a todo

## Installation

1. Clone the repository:

```bash
git clone <https://github.com/Godwin-Dev-Ops/BEtechified-week3-CRUD-API-exercise.git>
cd <repo-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (optional):

```
PORT=3000
```

4. Start the server:

```bash
node app.js
```

Server will run on `http://localhost:3000` by default (or your specified `PORT`).

---

# Example Requests

# Get all todos

```bash
GET http://localhost:3000/todos
```

# Get active todos

```bash
GET http://localhost:3000/todos/active
```

# Get completed todos

```bash
GET http://localhost:3000/todos/completed
```

# Get a todo by ID

```bash
GET http://localhost:3000/todos/1
```

# Create a new todo

```bash
POST http://localhost:3000/todos
Content-Type: application/json

{
  "task": "Learn Docker",
  "completed": false
}
```

# Update a todo

```bash
PATCH http://localhost:3000/todos/1
Content-Type: application/json

{
  "completed": true
}
```

# Delete a todo

```bash
DELETE http://localhost:3000/todos/1
```

---

# Testing with Postman

1. Open Postman
2. Create a new Request
3. Set the request type (GET, POST, PATCH, DELETE)
4. Use the appropriate URL, e.g.:

```
GET http://localhost:3000/todos
POST http://localhost:3000/todos
PATCH http://localhost:3000/todos/2
DELETE http://localhost:3000/todos/3
```

5. For POST and PATCH, set **Body → raw → JSON** and add your payload:

```json
{
  "task": "New task example",
  "completed": false
}
```

6. Hit Send to see the response.

---

# Notes

- This API uses an in-memory array, so all data is lost when the server restarts.
- Ensure route order for `/todos/active` and `/todos/completed` comes before `/todos/:id` to avoid routing conflicts.
- Input validation is recommended for production use (e.g., check if `task` exists).
