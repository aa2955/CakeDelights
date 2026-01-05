# Cake Delights - Website

A professional React-based website for "Cake Delights" - a vegetarian bakery and catering business specializing in eggless baked goods with no onion and no garlic.

## 🎂 Features

✅ **Two Menu Sections** - Bakery and Catering with responsive grid layouts
✅ **Admin Panel** - Add/edit/delete menu items with image uploads
✅ **Real-time Database** - Firebase Firestore for live menu updates
✅ **Social Media Integration** - Instagram and Facebook links
✅ **Mobile-Responsive** - Works on all devices
✅ **Modern Design** - Pink-themed, professional appearance
✅ **Production-Ready** - Optimized and deployable

## 🚀 Quick Start

1. Navigate to the webapp folder:
```bash
cd CakeDelights.WebApp
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))

4. Create `.env.local` with your credentials

5. Start development server:
```bash
npm run dev
```

6. Visit `http://localhost:5173`

## 📖 Documentation

- **[CakeDelights.WebApp/README.md](./CakeDelights.WebApp/README.md)** - Setup & deployment guide
- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Firebase configuration guide

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite 5** - Build tool (blazing fast)
- **Tailwind CSS** - Styling
- **Firebase Firestore** - Real-time database
- **Context API** - State management

## 📁 Project Structure

```
CakeDelights/
├── CakeDelights.WebApp/    # Main React application
│   ├── src/               # Source code
│   └── package.json       # Dependencies
├── FIREBASE_SETUP.md      # Firebase configuration guide
└── README.md              # This file
```

## 🌐 Deployment

Deploy to Netlify:
```bash
cd CakeDelights.WebApp
npm run build
netlify deploy --prod --dir=dist
```

## 🔐 Admin Access

- Default Password:
- Click "Admin" button in top-right of header

## 📱 Responsive Design

Mobile-first design with 1, 2, and 3 column layouts.

## 💾 Data Storage

- Menu Items & Social Links: Firebase Firestore
- Admin Status: Browser localStorage

## ⚙️ Commands

```bash
npm run dev       # Start dev server (localhost:5173)
npm run build     # Create production build
npm run preview   # Preview production build
```
