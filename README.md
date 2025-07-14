# 📱 Streamify - Modern Chat Application

Streamify is a full-stack chat application built with the MERN stack. It features a clean and responsive UI using **ShadCN UI** and **Lucide React**, providing a modern messaging experience.

---

## 🚀 Project Overview

- User-friendly real-time chat interface (using polling, not Socket.IO)
- Built with React, Node.js, Express, and MongoDB
- Secure JWT-based authentication
- Fully responsive UI with light/dark theme support

---

## 🛠 Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, ShadCN UI, Lucide React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT
- **Design System:** Tailwind CSS + ShadCN (Radix UI)

---

## ✨ Features

- 🔐 Secure Sign Up & Login
- 💬 One-to-one chatting interface
- 📩 Send & fetch messages via REST APIs
- 🧾 Message history stored in MongoDB
- 💡 Elegant UI with ShadCN components
- 🎯 Modern icons via Lucide React
- 🌗 Light/Dark mode toggle

---

## 📋 API Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| POST   | /api/auth/signup    | Register a new user      |
| POST   | /api/auth/login     | Login and get JWT token  |
| GET    | /api/users          | Get list of users        |
| POST   | /api/messages       | Send a message           |
| GET    | /api/messages/:id   | Get messages by user ID  |

---


## 📸 Screenshots

### 🖥️ Login Page
![Login](https://github.com/user-attachments/assets/0bde0515-93a7-47a8-88a7-e71b65bad2d2)

### 📝 Signup Page
![Signup](https://github.com/user-attachments/assets/8bac50e3-1bf2-4aa2-b5f0-59830952b587)

### 💬 Onboarding Page
![Chat Empty](https://github.com/user-attachments/assets/63454ed8-8096-44f6-8e33-a1cf15b8655b)

### 💬 Chat Interface - Active
![Chat Active](https://github.com/user-attachments/assets/9c7c6f6b-d9ef-493f-a390-c67bcd3a2484)

### Home Page
![Dark Mode](https://github.com/user-attachments/assets/0afcf86c-4b61-4a1f-8b00-0a098e5ebdb9)

### 👤 Sidebar + Users List
![Users Sidebar](https://github.com/user-attachments/assets/12e78368-7b1c-4686-af02-22889248ae2d)

### 🌗 Dark Mode
![Message Send](https://github.com/user-attachments/assets/493c26f4-4d30-4aa6-9258-d23229d75f52)

### 📄 Friends Page
![Message History](https://github.com/user-attachments/assets/0c54c5a7-f9ba-4ceb-948a-05caa0a0d972)

### ⚙️ Notification Page
![Settings](https://github.com/user-attachments/assets/4559d244-e438-418e-b404-3df9ee7bd74b)

### 📱Chat Page
![Mobile](https://github.com/user-attachments/assets/47fda23d-5ea1-4e47-8d57-776c284b6550)

### 🎯 Call Page
![Lucide](https://github.com/user-attachments/assets/e984018b-1093-4985-9a6a-b1381402a136)



## 🔧 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/streamify.git


# 📦 Clone the Repository
git clone https://github.com/yourusername/streamify.git
cd streamify

# ---------------------------------
# ⚙️ Backend Setup
# ---------------------------------
cd server
npm install

# 👉 Create a .env file in server directory with the following:
# MONGO_URI=your_mongo_uri
# JWT_SECRET=your_jwt_secret
# PORT=5000

npm run dev   # Starts the backend server

# ---------------------------------
# 💻 Frontend Setup
# ---------------------------------
cd ../client
npm install

# Tailwind Setup
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# UI Libraries
npm install @shadcn/ui lucide-react class-variance-authority tailwind-variants @radix-ui/react-icons

npm run dev   # Starts the frontend dev server at http://localhost:5173
