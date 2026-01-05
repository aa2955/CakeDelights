# Cake Delights - Setup & Deployment Guide

## Quick Start

### 1. Install Dependencies
```bash
cd CakeDelights.WebApp
npm install
```

### 2. Configure Firebase
- Get Firebase credentials from [Firebase Console](https://console.firebase.google.com)
- Copy `.env.example` to `.env.local`
- Update `.env.local` with your Firebase config values
- Follow [FIREBASE_SETUP.md](../FIREBASE_SETUP.md) for detailed Firebase setup

### 3. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:5173`

## File Structure

```
CakeDelights.WebApp/
├── src/
│   ├── components/          # React components
│   │   ├── admin/          # Admin panel components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Navigation.jsx
│   │   ├── MenuCard.jsx
│   │   ├── MenuSection.jsx
│   │   └── CakeLogo.jsx
│   ├── contexts/           # React Context for state
│   │   └── DataContext.jsx
│   ├── config/
│   │   └── firebase.js     # Firebase configuration
│   ├── utils/
│   │   └── helpers.js      # Utility functions
│   ├── app.jsx             # Main App component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles (Tailwind)
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
├── package.json            # Dependencies
├── .env.example            # Example env variables
├── .env.local              # (Not committed) Your actual credentials
├── .gitignore              # Git ignore rules
└── netlify.toml            # Netlify deployment config
```

## Available Scripts

**Development**
```bash
npm run dev          # Start dev server on port 5173
npm run preview      # Preview production build locally
```

**Production**
```bash
npm run build        # Create optimized production build
```

## Deployment to Netlify

### Option 1: GitHub Integration (Recommended)
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect GitHub repository
5. Set build command: `npm run build`
6. Set publish directory: `dist`
7. Add environment variables from `.env.local`
8. Deploy!

### Option 2: Manual Deploy
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

## Environment Variables

Create `.env.local` in `CakeDelights.WebApp/`:

```env
# Admin password (change in production!)
VITE_ADMIN_PASSWORD=my_password

# Firebase credentials (from Firebase Console)
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Note:** Never commit `.env.local` to git (it's in `.gitignore`)

## How Data Storage Works

**Menu Items & Social Links:**
- Stored in Firebase Firestore (cloud database)
- Real-time sync across all visitors
- localStorage as fallback/cache

**Admin Login:**
- Password-based authentication
- Stored in browser session + localStorage

## Admin Features

**Access Admin Panel:**
1. Click "Admin" button in header (top-right)
2. Enter password: 
3. Manage bakery/catering menu items
4. Edit social media links
5. Upload item images

**Add/Edit Menu Items:**
- Item name, category, description
- Flavors (free text)
- Multiple sizes with prices (in USD)
- Optional product image upload

## Design System

**Colors:**
- Primary Pink: `#FF69B4`, `#FF1493`
- Light Pink: `#FFB6C1`, `#fdf2f8`
- Accent Red: For tagline

**Typography:**
- Display Font: Georgia (serif)
- Body Font: Segoe UI (sans-serif)

**Responsive Breakpoints:**
- Mobile: < 640px (1 column)
- Tablet: 640px-1024px (2 columns)
- Desktop: > 1024px (3 columns)

## Production Checklist

- [ ] Firebase project created & configured
- [ ] `.env.local` filled with real credentials
- [ ] Admin password changed
- [ ] Tested on all devices (mobile, tablet, desktop)
- [ ] All menu items added to Firestore
- [ ] Social media links configured
- [ ] Website tested before deployment
- [ ] Deployed to Netlify with custom domain
- [ ] CDN cache configured (Netlify default)
- [ ] Analytics enabled (optional)

## Troubleshooting

**Port already in use:**
```bash
npm run dev -- --port 5174
```

**Firebase connection failed:**
- Check `.env.local` credentials
- Verify Firestore database exists
- Check network connection

**Build fails:**
```bash
rm -rf node_modules dist
npm install
npm run build
```

**Styles not loading:**
- Verify Tailwind config is correct
- Clear browser cache
- Restart dev server

## Performance Tips

- Images are optimized by Vite
- No external CDN dependencies (self-hosted)
- Minified builds (size < 200KB)
- Lazy loading of admin components
- Real-time data updates via Firestore listeners

## Security Notes

1. **Admin Password:** Change the default password immediately
2. **Firebase Rules:** Only allow authenticated admins in production
3. **Environment Variables:** Never commit `.env.local` to git
4. **HTTPS:** Netlify provides free SSL certificates


