# Imagger - AI Image Generation Platform

Imagger is a full-stack AI-powered image generation platform that allows users to generate high-quality images using text prompts. Users can create images, manage their generation history, authenticate securely, and download generated content through a clean and responsive interface.

---

# 🚀 Features

* 🔐 User Authentication (JWT Based)
* 🎨 AI Image Generation using Prompt Inputs
* 📜 Image History Tracking
* 📥 Download Generated Images
* ⚡ Responsive Modern UI
* ☁️ Cloud Image Storage Support
* 🔄 Real-Time Loading States
* 🧠 Prompt-Based Image Creation
* 🛡️ Protected Routes & Secure APIs
* 🌐 Full Stack MERN Architecture

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Tailwind CSS / CSS

## Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* bcrypt.js
* Mongoose

## AI & APIs

* Stability AI

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

# 📸 Screenshots

> Add your screenshots here after deployment.


<img width="1918" height="888" alt="Home" src="https://github.com/user-attachments/assets/4c3d2f21-9630-4c53-b4ca-7067f93b9e29" />
<br />
<img width="1918" height="888" alt="Chat" src="https://github.com/user-attachments/assets/cb8e32d0-88a1-4653-8d21-559ff75bb1e9" />
<br />
<img width="1918" height="888" alt="History" src="https://github.com/user-attachments/assets/0beeef21-8e89-4471-82c4-bb9cf9fd05e2" />


---

# 📂 Folder Structure

```bash
imagger/
│
├── client/                 # Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                 # Backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── README.md
└── package.json
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the server folder and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
HF_API_KEY=your_huggingface_api_key
```

Create a `.env` file inside the client folder:

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 🧑‍💻 Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/imagger.git
cd imagger
```

---

## 2️⃣ Install Dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd server
npm install
```

---

## 3️⃣ Start the Development Server

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

---

# 🔐 Authentication Flow

* User registers with email and password
* Password gets hashed using bcrypt
* JWT token is generated after login/register
* Token is stored in frontend state/localStorage
* Protected routes are accessible only to authenticated users

---

# 🎨 Image Generation Workflow

1. User enters a prompt
2. Frontend sends request to backend API
3. Backend calls AI image generation API
4. Generated image URL is returned
5. Image is displayed and stored in history
6. User can download the generated image

---

# 📡 API Endpoints

## Auth Routes

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

## Image Routes

```http
POST /api/image/generate
GET  /api/image/history
DELETE /api/image/:id
```

---

# 🌍 Deployment

## Frontend Deployment

Deploy the frontend on:

* Vercel
* Netlify

Add environment variable:

```env
VITE_API_URL=your_backend_url/api
```

---

## Backend Deployment

Deploy backend on:

* Render
* Railway

Add environment variables:

```env
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
HF_API_KEY=your_api_key
```

---

# 🧪 Future Improvements

* 🖼️ Multiple AI Models Support
* 🧠 AI Prompt Enhancer
* ❤️ Favorite Images Feature
* 📁 Collections & Albums
* 👥 Community Gallery
* 💳 Subscription System
* ⚡ Image Upscaling
* 📱 Progressive Web App Support

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

# 👨‍💻 Author

**Aditya Patil**

* GitHub: https://github.com/21Aditya-patil
* LinkedIn: www.linkedin.com/in/aditya-patil-dev

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub and share it with others.
