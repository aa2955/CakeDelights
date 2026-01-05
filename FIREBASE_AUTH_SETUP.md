# Firebase Authentication Setup for Cake Delights

Your admin login now uses **Firebase Authentication** - a secure, professional authentication system. This replaces the simple password login.

## 🔐 How It Works

- Admin creates an account with email + password in Firebase
- Credentials are stored securely in Firebase
- Admin logs in with email/password in the app
- No hardcoded passwords in your code

## ✅ Setup Steps

### Step 1: Enable Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your **Cake Delights** project
3. Click **Authentication** (left sidebar)
4. Click **Get started**
5. Select **Email/Password**
6. Toggle on **Enable**
7. Click **Save**

### Step 2: Create Admin Account

1. In Firebase Console, go to **Authentication** → **Users** tab
2. Click **Add user**
3. Enter your admin email (e.g., `admin@cakedelights.com`)
4. Enter a strong password
5. Click **Add user**

### Step 3: Test Login

1. Start your dev server: `npm run dev`
2. Visit `http://localhost:5173`
3. Click **Admin** button
4. Enter the email and password you created
5. Click **Login**

## 🎯 Usage

**First time:**
- Click "Admin" in header
- Enter your email & password
- You're logged in!

**After login:**
- You can manage menu items
- Edit social media links
- Changes are saved to Firebase
- Click "Logout" when done

## 🔄 Changing Password

If you need to change the admin password:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project → **Authentication** → **Users**
3. Click the admin user
4. Click the three dots menu
5. Select **Change password**
6. Enter new password

## 👤 Creating Additional Admins

You can create multiple admin accounts:

1. Go to Firebase Console
2. Authentication → Users
3. Click **Add user**
4. Enter email & password for new admin
5. Click **Add user**

Each person can then log in with their own credentials.

## 🚨 Security Notes

✅ **Secure:**
- Passwords are NOT in your code
- Firebase handles encryption
- No passwords in `.env.local`
- Each user has individual account

✅ **Best Practices:**
- Use strong passwords (mix letters, numbers, special chars)
- Don't share passwords
- Change password periodically
- Use unique emails for each admin

## ⚙️ Production Deployment

When deploying to Netlify:
- ✅ No changes needed
- ✅ Firebase Auth works automatically
- ✅ Credentials already in `.env.local`
- ✅ Just deploy as usual

## 🆘 Troubleshooting

**"Email not found"**
- The email doesn't exist in Firebase
- Create it first in Firebase Console

**"Incorrect password"**
- Double-check your password
- Remember passwords are case-sensitive
- Reset password in Firebase Console if needed

**"Sign-in disabled"**
- Make sure Email/Password is enabled in Firebase Authentication

**Can't see Users tab?**
- Make sure you're in the **Authentication** section (not Firestore)
- Click the **Users** tab (not Rules or Settings)

## 📝 Admin Account Info

**Default test account** (you created in Step 2):
- Email: `admin@cakedelights.com` (or what you created)
- Password: `***` (what you set)

## 🔑 Environment Variables

Nothing needs to be updated in `.env.local` - Firebase Auth uses the same credentials as Firestore.

Your existing variables already include everything needed:
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
etc.
```

## ✨ What Changed

**Before:** 
- Simple password login (less secure)
- Password stored in `.env.local`

**After:**
- Firebase email/password authentication (secure)
- Accounts managed in Firebase Console
- Passwords encrypted and secure
- Professional authentication system

## 🎉 You're All Set!

Your admin login is now secure and professional. Any admin with a Firebase account can log in independently.

### Next Steps:
1. ✅ Enable Firebase Auth (completed above)
2. ✅ Create admin account
3. ✅ Test login with email/password
4. ✅ Start managing your menu!
