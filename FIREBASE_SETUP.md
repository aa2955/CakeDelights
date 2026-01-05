# Firebase Setup Guide for Cake Delights

This guide will help you set up Firebase Firestore for data persistence across all users and devices.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"**
3. Enter project name: `CakeDelights`
4. Follow the setup wizard (accept default settings)
5. Wait for project creation to complete

## Step 2: Create a Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll add security rules)
4. Select region: **us-central1** (or closest to your location)
5. Click **"Create"**

## Step 3: Set Firestore Security Rules

1. In Firestore, go to **Rules** tab
2. Replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read
    match /{document=**} {
      allow read: if true;
    }
    
    // Only authenticated admin can write/delete
    // For now, we use password protection in the app
    match /menuItems/{document=**} {
      allow write: if true;
      allow delete: if true;
    }
    
    match /config/{document=**} {
      allow write: if true;
    }
  }
}
```

3. Click **"Publish"**

## Step 4: Get Firebase Config

1. In Firebase Console, click the gear icon ⚙️ → **Project Settings**
2. Scroll to **"Your apps"** section
3. Under **"Firebase SDK snippet"**, select **"Config"**
4. Copy the config object

## Step 5: Add Environment Variables

1. In `CakeDelights.WebApp` folder, create `.env.local` file
2. Add your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_ADMIN_PASSWORD=cakedelights$25
```

Replace values with actual Firebase config from Step 4.

## Step 6: Install Firebase SDK

```powershell
cd CakeDelights.WebApp
npm install firebase
```

## Step 7: Test the Connection

1. Start the dev server:
```powershell
npm run dev
```

2. Open `http://localhost:5173`
3. You should see the app loading sample bakery items
4. Check browser console (F12) for any Firebase errors
5. Admin can log in and add/edit items
6. Changes save to Firestore and appear in real-time

## How Data Works Now

**Before (localStorage only):**
- Each browser/device had separate data
- Data didn't sync between visitors

**After (Firebase + localStorage):**
- All visitors see the **same menu items**
- Admin changes appear **instantly** for everyone
- localStorage acts as offline cache/fallback
- Real-time updates via Firestore listeners

## Database Structure

Your Firestore database will have this structure:

```
Firestore
├── menuItems (collection)
│   ├── [doc1]
│   │   ├── name: "Classic Vanilla Cake"
│   │   ├── section: "bakery"
│   │   ├── sizes: [{size: "1kg", price: 45}, ...]
│   │   └── ... (other fields)
│   └── [doc2] ...
└── config (collection)
    └── socialLinks (document)
        ├── instagram: "https://..."
        └── facebook: "https://..."
```

## Troubleshooting

**"Cannot find module 'firebase'"**
- Run `npm install firebase`

**"Firebase initialization failed"**
- Check `.env.local` has correct values
- Verify Firebase project exists
- Check network connection

**Data not persisting**
- Check Firestore Database is created
- Verify security rules are published
- Check browser console for errors

**Offline functionality**
- App will use localStorage cache if Firestore unavailable
- Changes will sync when connection restored

## Next Steps

1. Update admin password in `.env.local`
2. Enable user authentication (optional, for multi-admin)
3. Set up Firestore backups (Firebase Console → Settings)
4. Test on production domain after deployment

## Security Note

Currently, anyone can write to Firestore. For production:
- Implement admin authentication (Firebase Auth)
- Update security rules to restrict write access
- Use environment-specific configs
