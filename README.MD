
### Personal-Notes Hub - Backend

### Project Overview


This project is a Node.js and Express-based backend server for a secure notes management application. It includes user authentication, category management, and notes handling, utilizing JWT authentication for security. The server interacts with a MySQL database via Knex.js.

### Features

1. User Authentication: Sign up and login functionality secured with bcryptjs for password hashing and JWT for     token-based authentication.

2. Category Management: Allows users to create, update, delete, and retrieve categories.

3. Notes Management: Enables users to create, edit, delete, and fetch notes.

### Security:

- Passwords are hashed using bcryptjs.

- Authentication is handled using JWT tokens.

- CORS is enabled for secure cross-origin requests.

### Technologies Used

- Node.js

- Express.js

- MySQL with Knex.js for query building

- JWT (jsonwebtoken) for authentication

- bcryptjs for password hashing

- dotenv for environment variable management

- CORS for cross-origin resource sharing

### Installation & Setup

Prerequisites

Ensure you have the following installed:

- Node.js (v16+ recommended)

- MySQL database

### Steps to Run the Project

1. Clone the repository:

2. git clone <repository-url>
3. cd mrunali-zalavadiya-capstone-server

### Install dependencies:

1. npm install

2. Set up the environment variables:

3. Create a .env file in the root directory and configure the following:

```ini
PORT=your-server-port
CLIENT_URL=your-client-url
JWT_SECRET=your-secret-key
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_DATABASE=your-database-name
```

4. Run database migrations (if applicable):

5. npx knex migrate:latest

6. Start the server:

7. npm start

- The server will run on http://localhost:5000 (or the specified port in .env).

### API Endpoints

Authentication

- POST /api/auth/signup → Register a new user

- POST /api/auth/login → Authenticate user & receive JWT token

### Category Management

- GET /api/categories → Get all categories

- POST /api/categories → Create a new category

- GET /api/categories/:id → Get a single category

- PUT /api/categories/:id → Update a category

- DELETE /api/categories/:id → Delete a category

### Notes Management

- GET /api/notes → Get all notes

- POST /api/notes → Create a new note

- GET /api/notes/:id → Get a single note

- PUT /api/notes/:id → Update a note

- DELETE /api/notes/:id → Delete a note

- GET /api/notes/category/:id → Get notes by category ID

- GET /api/notes/search/:keyword → Search notes by keyword

### Database Schema

1. User Table (users)

2. Category Table (categories)

3. Notes Table (notes)

- JWT Authentication ensures secure access to protected routes.

- Password Hashing using bcryptjs prevents plaintext password storage.

- CORS Configuration allows only authorized clients to interact with the API.

### Future Enhancements

- Implement role-based access control (RBAC)

- Add file upload support for note attachments

- Improve logging and monitoring

- Deploy to a cloud provider (e.g., AWS, Heroku, Vercel)

### Author

Mrunali Zalavadiya