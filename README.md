#  MERN Blog Application

A **Full-Stack Blog Platform** built using the **MERN stack (MongoDB, Express.js, React, and Node.js)**.  
It allows users to register, log in, create, edit, delete, and view blog posts.  
Authentication is handled using **JWT (JSON Web Tokens)**, and protected routes ensure that only logged-in users can perform certain actions.

---

##  Project Overview

This project demonstrates how to build a complete end-to-end web application using modern technologies.  
It consists of:

- **Frontend (client):** Built with React and Vite for fast development, routing (React Router), and API calls using Axios.
- **Backend (server):** Powered by Express.js and MongoDB with Mongoose for data storage.
- **Authentication:** Implemented using JWT, with user credentials securely stored and verified on the backend.
- **Posts Management:** CRUD operations (Create, Read, Update, Delete) for blog posts.
- **Responsive UI:** The interface is fully responsive and works across devices.

The goal of this project is to demonstrate integration between client and server, proper routing, authentication, and secure data handling in a production-like environment.

---

##  Setup Instructions

###  Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/mern-blog.git
cd mern-blog

Step 2: Backend Setup
cd server
npm install


Create a .env file inside the server directory using the example below:

cp .env.example .env


Example server/.env content:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=yourStrongSecretKey


Run the backend:

npm start


Your backend will now run on:
👉 http://localhost:5000/api

🧩 Step 3: Frontend Setup
cd ../client
npm install


Create a .env file inside the client directory using the example below:

cp .env.example .env


Example client/.env content:

VITE_API_URL=http://localhost:5000/api


Run the frontend:

npm run dev


