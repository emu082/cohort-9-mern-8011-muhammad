# Notes App

A full-stack notes app I built during the 10Pearls Shine Program. You can sign up, log in, and write your own private notes — with a proper rich text editor, not just plain textboxes.

## What it's built with

**Backend:** Node.js, Express, Sequelize, SQL Server, JWT for auth, bcrypt for password hashing, Pino for logging, Socket.IO for live updates

**Frontend:** React (set up with Vite), React Router, Axios, React Quill for the text editor, Socket.IO client

**Tests:** Mocha + Chai on the backend, Jest on the frontend

**Code quality:** SonarQube

## How it's organized

cohort-9-mern-8011-muhammad/
backend/ -> the API, database models, auth logic, tests
frontend/ -> the React app


## What it can do

- Sign up, log in, log out (JWT-based)
- Create, edit, delete, and search your own notes — nobody else can see them
- Rich text editing, not just plain text
- Notes update live if you have it open in two tabs (Socket.IO)
- Export all your notes to a JSON file, and import them back later
- Proper logging so it's easier to debug what's going on
- One central place that catches errors instead of the app just crashing
- Tests on both the backend and frontend
- SonarQube checks for code quality

## Running it locally

### Backend

```bash
cd backend
npm install
```

You'll need a `.env` file in `backend/` so here's what goes in it:

PORT=5000
DB_SERVER=localhost\SQLEXPRESS
DB_PORT=1433
DB_NAME=notes_app
DB_USER=sa
DB_PASSWORD=YourStrong!Passw0rd
JWT_SECRET=some_long_random_secret_key_here


Make sure SQL Server is actually running and you've created a `notes_app` database in SSMS, then:

```bash
npm run dev
```

It'll start on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
```

`.env` for the frontend:
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000


Then:

```bash
npm run dev
```

Runs on `http://localhost:5173`.

## Running the tests

Backend:
```bash
cd backend
npm test
```

Frontend:
```bash
cd frontend
npm test
```

## How the branching works

- `main` is production-ready code
- `develop` is where everything gets merged first
- Everything else is a feature branch — `feature/frontend/<name>` or `feature/backend/<name>` — each one becomes its own PR into `develop`

## Who made this

Muhammad Emaad Haroon — 10Pearls Shine Program, Cohort 9