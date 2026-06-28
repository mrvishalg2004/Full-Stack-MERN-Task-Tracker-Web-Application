<div align="center">
  <h1>TaskTracker 🚀</h1>
  <p>A production-ready Full Stack Task Tracker Web Application built with the MERN stack.</p>
</div>

---

## 📖 Overview

TaskTracker is a modern, responsive Single Page Application (SPA) designed to help you organize your daily work efficiently. Built entirely within a **Single Repository**, the project seamlessly integrates a React frontend with a Node.js & Express backend. 

The codebase is highly optimized, featuring dynamic updates without page refreshes, and is completely ready for **Vercel** serverless deployment.

---

## ✨ Features

- **✅ Full CRUD Functionality**: Create, read, update, and delete tasks instantly.
- **⚡ Dynamic SPA Updates**: Leveraging React state for instant UI feedback without reloading.
- **🎨 Premium UI/UX**: Designed with a distinctive "Dark Chrome" glassmorphism aesthetic using Tailwind CSS v4.
- **🔒 Form Validation**: Robust frontend validation via `react-hook-form` and backend schema validation via Mongoose.
- **🔔 Toast Notifications**: Context-driven non-blocking alerts for user actions (success/errors).
- **📱 Responsive Layout**: Fully optimized for Mobile, Tablet, and Desktop displays.

---

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite)**
- **Tailwind CSS v4** (for rapid styling and custom UI)
- **React Router v7** (for client-side routing)
- **Lucide React** (for modern vector icons)
- **React Hook Form** (for efficient form state and validation)
- **Axios** (for HTTP API calls)

### Backend
- **Node.js & Express.js** (Server & REST APIs)
- **MongoDB Atlas** (Cloud Database)
- **Mongoose** (Object Data Modeling)
- **CORS & Dotenv** (Security and configuration)

---

## 📂 Project Structure

```text
/
├── api/
│   ├── config/              # Configuration logic
│   ├── controllers/         # API request handlers
│   ├── middleware/          # Express middlewares
│   ├── models/              # Mongoose data schemas
│   ├── routes/              # Express API endpoints mapping
│   └── index.js             # Backend entry point (Serverless Ready)
├── src/
│   ├── components/          # Reusable UI components (TaskCard, Modal, etc.)
│   ├── context/             # React Context Providers (ToastContext)
│   ├── pages/               # Main application views (Dashboard)
│   ├── services/            # Axios API interface
│   ├── App.jsx              # Main React Application
│   └── main.jsx             # React DOM injection
├── public/                  # Static assets
├── .env                     # Local Environment variables
├── vercel.json              # Vercel Deployment Configuration
├── package.json             # Combined Backend & Frontend dependencies
└── vite.config.js           # Frontend Build Configuration
```

---

## 🚀 Local Development

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance.

### 2. Installation
Clone the repository (or extract the project folder) and install the dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory (you can use `.env.example` as a reference) and configure your database:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/task-tracker?retryWrites=true&w=majority
NODE_ENV=development
```

### 4. Run the Application
The project is configured to run both the Vite frontend server and the Express backend server concurrently:
```bash
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

---

## 🌍 Deployment (Vercel)

This repository is tailored for 1-click deployment on [Vercel](https://vercel.com).

1. Push this repository to GitHub.
2. Log in to Vercel and click **Add New... > Project**.
3. Import your GitHub repository.
4. **Important**: Add your `MONGODB_URI` inside the **Environment Variables** section in the Vercel dashboard.
5. Click **Deploy**.

Vercel will use `vercel.json` to automatically configure:
- The `/api` directory as Serverless Functions (`@vercel/node`).
- The `src` and public files as a Static Site (`@vercel/static-build`).

---

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Fetch all tasks (supports querying & sorting) |
| `GET` | `/api/tasks/:id` | Fetch a single task by ID |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update an existing task |
| `DELETE`| `/api/tasks/:id` | Delete a task |

---

*Designed and Developed for seamless task management.*
