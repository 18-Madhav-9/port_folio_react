<div align="center">

# ✨ Open Portfolio
### Dynamic • Modular • Developer Portfolio Platform

<p align="center">
  <strong>A premium open-source developer portfolio template built for modern developers.</strong>
</p>

<p align="center">
  Create a stunning personal portfolio with dynamic coding stats, backend-driven content, interactive visualizations, markdown blogging, and effortless customization.
</p>

<br/>

<img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Framework-Express-black?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/Bundler-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Style-TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />

<br/>
<br/>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-customization">Customization</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-contributing">Contributing</a>
</p>

</div>

---

# 🚀 Overview

**DevPortfolio Pro** is a highly customizable, modular, and reusable developer portfolio platform designed for developers who want a professional online presence without rebuilding everything from scratch.

The project follows a **frontend + backend architecture**:

- `frontend/` → complete UI and interactive experience
- `backend/` → APIs, stats integrations, content handling, email services, and configuration

The entire system is designed around one principle:

> **Customization should be simple.**

A new developer can personalize the portfolio by only:

✅ Updating configuration/data files  
✅ Editing `.env` variables  
✅ Replacing personal links/info  
✅ Adding projects, certificates, and articles  

No database setup required.  
No rewriting core components.  
No complicated architecture to learn first.

---

# 🌟 Features

## 🧩 Modular Architecture
Clean separation between frontend and backend for scalability and maintainability.

---

## 📊 Dynamic Developer Stats
Automatically fetch and display stats from:

- GitHub
- LeetCode
- Codeforces
- CodeChef

Includes:
- contribution heatmaps
- language usage
- profile stats
- activity tracking

---

## 🎨 Premium Modern UI
Built with:
- Tailwind CSS
- responsive layouts
- smooth animations
- light/dark mode
- glassmorphism-inspired design

---

## 🌌 Interactive Skills Galaxy
Beautiful HTML5 Canvas-powered interactive skill visualization system.

Control:
- skill size
- glow intensity
- grouping
- proficiency levels

through simple data files.

---

## 📝 Markdown Blog System
Built-in markdown article rendering with:
- GitHub Flavored Markdown
- syntax highlighting
- code block support
- clean typography

---

## 📧 Fully Functional Contact Form
Integrated Nodemailer email system with:
- SMTP support
- Gmail fallback
- backend validation

---

## 📁 Backend-Driven Content
Projects, articles, certificates, and skills are powered through JSON/JS configuration files.

No CMS needed.

---

## ⚡ Easy Deployment
Frontend and backend can be deployed independently using:

- Vercel
- Netlify
- Render
- Railway
- VPS / Docker

---

# 🏗️ Architecture

```bash
├── frontend/                          # React UI application
│   ├── src/
│   │   ├── components/                # Reusable UI components
│   │   ├── pages/                     # Page-level screens
│   │   ├── context/                   # Theme/state management
│   │   ├── services/                  # API integration layer
│   │   ├── data/                      # Frontend config/data
│   │   └── assets/                    # Static resources
│   │
│   └── index.html
│
└── backend/                           # Express API server
    ├── controllers/                   # Request handlers
    ├── routes/                        # API routes
    ├── services/                      # External integrations
    ├── data/                          # Projects/articles/certs
    ├── utils/                         # Helper functions
    └── server.js
```

---

# 🖥️ Portfolio Sections

| Section | Description |
|---|---|
| Home | Intro, social links, CTA buttons |
| Stats Dashboard | Coding profiles and contribution tracking |
| Projects | Dynamic project showcase |
| Certificates | Certifications and achievements |
| Tech Stack | Skills and technologies display |
| Skills Galaxy | Interactive Canvas-based skill visualization |
| Blog System | Markdown-powered articles |
| Contact | Working email contact form |

---

# ⚙️ Tech Stack

## Frontend

| Technology | Usage |
|---|---|
| React.js | UI Framework |
| Vite | Bundler |
| Tailwind CSS | Styling |
| React Router | Routing |
| Lucide React | Icons |
| React Markdown | Markdown rendering |

---

## Backend

| Technology | Usage |
|---|---|
| Node.js | Runtime |
| Express.js | API Server |
| Axios | API Fetching |
| Nodemailer | Email Service |
| REST APIs | External integrations |
| GraphQL | GitHub integrations |

---

# 🚀 Installation

## Prerequisites

- Node.js v16+
- npm or yarn
- Git

---

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/devportfolio-pro.git
cd devportfolio-pro
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` inside `backend/`

Start backend:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔐 Environment Variables

Create:

```bash
backend/.env
```

Example:

```env
# Server
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173

# GitHub
GITHUB_USERNAME=your_github_username
GITHUB_TOKEN=your_github_token
GITHUB_LANGUAGE_REPO_LIMIT=20

# Coding Profiles
LEETCODE_USERNAME=your_leetcode_username
CODEFORCES_USERNAME=your_codeforces_username
CODECHEF_USERNAME=your_codechef_username

# Email Configuration
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_password

# Gmail Fallback
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASS=your_gmail_app_password

# Destination Email
MY_EMAIL=your_personal_email
```

---

# 🛠️ Customization

One of the biggest goals of this project is:

> **Users should personalize the portfolio without modifying core logic.**

---

## 👤 Update Personal Information

Edit:

```bash
frontend/src/pages/Home.jsx
```

Update:
- name
- bio
- intro
- CTA buttons
- hero text

---

## 🖼️ Update Profile Image & Socials

Edit:

```bash
frontend/src/components/layout/
```

Update:
- GitHub links
- LinkedIn links
- profile image
- social handles

---

## 📂 Update Projects

Edit:

```bash
backend/data/project.data.js
```

Example:

```js
export const projects = [
  {
    title: "DevPortfolio Pro",
    description: "Dynamic developer portfolio platform",
    tech: ["React", "Node.js"],
    github: "https://github.com/username/project",
    live: "https://project-demo.vercel.app"
  }
];
```

---

## 📜 Add Certificates

Edit:

```bash
backend/data/certificates.data.js
```

---

## 📝 Add Blog Articles

Edit:

```bash
backend/data/article.data.js
```

Markdown rendering is supported automatically.

---

## 🌌 Update Skills Galaxy

Edit:

```bash
frontend/src/data/skills.js
```

Example:

```js
export const SKILLS_DATA = [
  { name: "React", prof: 90 },
  { name: "Node.js", prof: 85 },
  { name: "Tailwind CSS", prof: 88 }
];
```

The `prof` value controls:
- size
- brightness
- prominence

inside the galaxy visualization.

---

# 🌍 Deployment

# 🚀 Backend Deployment

Recommended:
- Render
- Railway
- VPS
- Docker

## Steps

1. Push repository to GitHub
2. Connect backend folder to hosting platform
3. Set build command:

```bash
npm install
```

4. Set start command:

```bash
npm start
```

5. Add all `.env` variables

---

# 🚀 Frontend Deployment

Recommended:
- Vercel
- Netlify

Before deployment:

Update:

```bash
frontend/src/services/api.js
```

Example:

```js
export const API_BASE_URL =
  "https://your-backend.onrender.com/api";
```

Deploy frontend folder.

---

# 🔥 Personalization Checklist

A new developer only needs to:

- [ ] Update `.env`
- [ ] Change personal info
- [ ] Add projects
- [ ] Add certificates
- [ ] Add articles
- [ ] Replace social links
- [ ] Update skills data
- [ ] Deploy frontend + backend

That's it.

---

# 🤝 Contributing

Contributions are welcome and appreciated.

You can contribute by:
- improving UI/UX
- adding animations
- improving integrations
- fixing bugs
- optimizing APIs
- adding themes/features

## Contribution Flow

```bash
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push branch
5. Open Pull Request
```

---

# 📄 License

This project is licensed under the **MIT License**.

Feel free to:
- use
- modify
- distribute
- extend

for personal or commercial projects.

---

# 💡 Future Improvements

- CMS integration
- Admin dashboard
- Portfolio analytics
- Theme marketplace
- Docker support
- Multi-language support
- Resume builder

---

# 👨‍💻 Author

### Madhav

Built with passion for developers and open-source.

---

<div align="center">

## ⭐ If you found this project useful, consider starring the repository.

### Built for developers. Designed for customization. Ready for deployment.

</div>