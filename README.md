# GhureBerai

A modern, user-friendly travel and tour booking web application built with React, Tailwind CSS, and Firebase. Explore curated tour packages, book your next adventure, and manage your trips with ease.

🌐 **Live Demo:** [https://wrath-ghureberai.web.app/](https://wrath-ghureberai.web.app/)

---

## ✨ Features

- 🌍 **Browse All Packages:** Discover all available tour packages with powerful search and filter options.
- 🧳 **Book Tours:** Instantly book your favorite packages and manage your bookings.
- 📝 **Add & Manage Packages:** Guides can add, update, and delete their own tour packages.
- 👤 **Authentication:** Secure login, registration, and Google sign-in powered by Firebase.
- 🌗 **Dark/Light Mode:** Effortlessly switch between light and dark themes.
- 📱 **Responsive Design:** Optimized for mobile, tablet, and desktop devices.
- 🔔 **Notifications:** Friendly toast notifications for actions and errors.

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, DaisyUI, Lottie
- **Backend:** Node.js/Express (API endpoints, not included in this repo)
- **Authentication:** Firebase Auth
- **Database:** MongoDB (via backend API)
- **Other:** React Router, Axios, SweetAlert2, React Toastify

---

## 🖥️ Backend Server

The backend API for this project is available here:  
🔗 [https://github.com/WRATHexe/GhureBerai-Website-Server](https://github.com/WRATHexe/GhureBerai-Website-Server)

---

## 📁 Folder Structure

```
src/
  assets/         # Images, Lottie animations
  components/     # Reusable UI components (cards, modals, etc.)
  layouts/        # Layout components (RootLayout)
  pages/          # Main pages (Home, About, Login, Register, etc.)
  provider/       # Auth context and provider
  router/         # React Router configuration
  shared/         # Shared UI (NavBar, Footer)
  firebase/       # Firebase config
  App.jsx
  main.jsx
  index.css
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fardinruhian/ghureberai-client.git
   cd ghureberai-client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Firebase:**

   - Create a Firebase project.
   - Enable Email/Password and Google authentication.
   - Copy your Firebase config to `src/firebase/firebase.init.js`.

4. **Configure Backend API:**

   - Update API URLs in the code (e.g., `https://wrath-ghureberai-server.vercel.app/`) if needed.

5. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open in browser:**
   ```
   http://localhost:5173
   ```

---

## 📝 Usage

- **Register/Login:** Create an account or log in with Google.
- **Browse Packages:** Explore all packages on the homepage or "All Packages" page.
- **Book a Tour:** Click "Book Now" on any package to book.
- **My Bookings:** View and manage your bookings.
- **Add/Manage Packages:** If you are a guide, add new packages and manage your own.
- **Theme Toggle:** Switch between light and dark mode from the navbar.

---

## 🎨 Customization

- **Branding:** Replace logo and brand colors in `assets/` and Tailwind config.
- **API Endpoints:** Change API URLs in the code to match your backend.
- **Animations:** Update or add Lottie animations in `assets/LottieAnimations/`.

---

## 📄 License

This project is for educational/demo purposes. Please contact the author for production/commercial use.

---

**Made by fardinruhian001@gmail.com**
