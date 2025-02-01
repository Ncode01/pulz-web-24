# Student Tracking System

Modern web application for managing student information, activities, and achievements.

## Quick Start

### 1. Clone Repository and Install Dependencies

```bash
git clone https://github.com/yourusername/student-tracking.git
cd student-tracking/backend
npm install
cd ../frontend
npm install
```

### 2. Configure Environment

In **backend**, copy and edit the environment file:

```bash
cd backend
cp .env.example .env

```

### 3. Running the Application

Open two terminal windows/tabs:

- **Backend:**  
  ```bash
  cd student-tracking/backend
  npm run dev
  ```

- **Frontend:**  
  ```bash
  cd student-tracking/frontend
  npm start
  ```

### 4. Running Tests

- **Frontend tests:**  
  ```bash
  cd student-tracking/frontend
  npm test
  ```
  
- **Backend tests:**  
  ```bash
  cd student-tracking/backend
  npm test
  ```

### 5. Build for Production

For the frontend production build:

```bash
cd student-tracking/frontend
npm run build
```

## Development Guide

### Prerequisites
- Node.js 16+
- MongoDB 5+
- npm or yarn

### Available Scripts

- **Backend (in /backend):**
  - `npm run dev` - Start development server with nodemon
  - `npm test` - Run test suite
  - `npm run lint` - Check code style
  - `npm run format` - Format code

- **Frontend (in /frontend):**
  - `npm start` - Start development server
  - `npm test` - Run test suite
  - `npm run build` - Create production build
  - `npm run e2e` - Run end-to-end tests
  - `npm run lint` - Check code style
  - `npm run format` - Format code

### Testing Strategy
- Unit tests: Jest + React Testing Library
- E2E tests: Cypress
- API tests: Supertest

### Project Architecture

```
student-tracking/
├── backend/         # Express backend and API tests
├── frontend/        # React frontend and UI tests
└── README.md        # Documentation
```

### Environment Variables (Backend)

```
MONGODB_URI=mongodb://localhost:27017/student-db
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
```
