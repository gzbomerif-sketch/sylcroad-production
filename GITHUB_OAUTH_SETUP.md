# 🔐 GitHub OAuth Setup for Sylcroad (SIMPLIFIED)

## ⚡ Quick Setup - GitHub Only

Total time: **~20 minutes**

---

## Step 1: Create GitHub OAuth App (5 minutes)

1. **Go to GitHub Developer Settings:**
   https://github.com/settings/developers

2. **Click "New OAuth App"** (top right button)

3. **Fill in the form:**
   ```
   Application name: Sylcroad
   Homepage URL: https://sylcroad.com
   Application description: Music promotion platform
   Authorization callback URL: https://sylcroad.com
   ```

4. **Click "Register application"**

5. **Copy Your Credentials:**
   - You'll see **Client ID** immediately (looks like: `Iv1.a1b2c3d4e5f6g7h8`)
   - Click **"Generate a new client secret"**
   - Copy the **Client Secret** (looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
   
   ⚠️ **SAVE BOTH NOW!** The secret won't be shown again.

---

## Step 2: Update `.env` File (2 minutes)

**File location:** `/Users/obre/sylcroad-production/.env`

Edit the file and replace:

```bash
REACT_APP_API_URL=https://sylcroad.com/api
REACT_APP_GOOGLE_CLIENT_ID=
REACT_APP_GITHUB_CLIENT_ID=Iv1.a1b2c3d4e5f6g7h8
```

Replace `Iv1.a1b2c3d4e5f6g7h8` with your actual GitHub Client ID.

---

## Step 3: Setup Database (5 minutes)

### A. Create Database in cPanel

1. **Log into cPanel:** https://server370.web-hosting.com:2083

2. **Go to "MySQL® Databases"**

3. **Create New Database:**
   - Database name: `sylcroad` (will become `sylcdvaa_sylcroad`)
   - Click "Create Database"

4. **Create Database User:**
   - Username: `sylcroad` (will become `sylcdvaa_sylcroad`)
   - Password: Create a strong password (SAVE IT!)
   - Click "Create User"

5. **Add User to Database:**
   - Select user: `sylcdvaa_sylcroad`
   - Select database: `sylcdvaa_sylcroad`
   - Check "ALL PRIVILEGES"
   - Click "Make Changes"

### B. Import Database Schema

1. **In cPanel, go to "phpMyAdmin"**

2. **Click your database** (`sylcdvaa_sylcroad`) in the left sidebar

3. **Click "Import" tab** at the top

4. **Click "Choose File"**

5. **Select:** `/Users/obre/sylcroad-production/database/schema.sql`

6. **Scroll down and click "Go"**

7. **Verify:** You should see 5 tables:
   - ✅ users
   - ✅ campaigns
   - ✅ creators
   - ✅ campaign_creators
   - ✅ sessions

---

## Step 4: Update `config.php` on Server (5 minutes)

### A. Generate JWT Secret

Run this in your terminal:

```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

Copy the output (it's a long random string like `a1b2c3d4e5f6...`).

### B. Edit config.php in cPanel

1. **In cPanel, go to "File Manager"**

2. **Navigate to:** `public_html/api/`

3. **Right-click `config.php`** → **Edit**

4. **Update these lines:**

```php
// Lines 3-6: Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'sylcdvaa_sylcroad');           // Your database name
define('DB_USER', 'sylcdvaa_sylcroad');           // Your database user
define('DB_PASS', 'YOUR_DATABASE_PASSWORD');      // The password you created

// Line 9: JWT Secret
define('JWT_SECRET', 'PASTE_YOUR_GENERATED_SECRET_HERE');

// Lines 13-16: OAuth Configuration (GITHUB ONLY)
define('GOOGLE_CLIENT_ID', '');                   // Leave empty
define('GOOGLE_CLIENT_SECRET', '');               // Leave empty
define('GITHUB_CLIENT_ID', 'Iv1.a1b2c3d4e5f6g7h8');          // Your GitHub Client ID
define('GITHUB_CLIENT_SECRET', 'ghp_xxxxxxxxxxxxxxxxxxxx');   // Your GitHub Client Secret

// Line 23: Update CORS (Important!)
header('Access-Control-Allow-Origin: https://sylcroad.com');
```

5. **Click "Save Changes"** (top right)

---

## Step 5: Rebuild and Deploy (3 minutes)

```bash
cd /Users/obre/sylcroad-production
npm run build
git add build/
git commit -m "Configure GitHub OAuth"
git push origin main
```

Wait 60 seconds for cPanel auto-deployment.

---

## 🧪 Step 6: Test It!

1. **Visit:** https://sylcroad.com/login

2. **You should see:** "Sign in with GitHub" button

3. **Click it** → GitHub authorization screen appears

4. **Click "Authorize"** → Redirects back to your site

5. **You should be logged in!** → Redirected to `/admin`

6. **Check header** → Your GitHub name and avatar should appear

---

## 📋 Quick Reference Card

Copy these values for easy access:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GITHUB OAUTH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Client ID: Iv1.___________________
Client Secret: ghp_________________________
Authorization URL: https://sylcroad.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATABASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Database: sylcdvaa_sylcroad
User: sylcdvaa_sylcroad
Password: _________________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JWT SECRET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Secret: _________________________
```

---

## 🐛 Troubleshooting

### Login button does nothing
- **Check:** Browser console (F12) for errors
- **Fix:** Make sure Client ID is in `.env` and you rebuilt

### "Invalid OAuth token" error
- **Check:** GitHub Client ID and Secret in `config.php`
- **Fix:** Make sure they match exactly from GitHub settings

### "Database connection failed"
- **Check:** Database credentials in `config.php`
- **Fix:** Verify database name, user, and password

### Can't see tables in phpMyAdmin
- **Check:** You selected the right database
- **Fix:** Re-import `schema.sql` into correct database

### After login, redirects to blank page
- **Check:** JWT_SECRET is set in `config.php`
- **Fix:** Generate a new secret and update config.php

---

## ✅ Checklist

Use this to track your progress:

- [ ] Created GitHub OAuth App
- [ ] Copied Client ID and Client Secret
- [ ] Updated `.env` file with Client ID
- [ ] Created database in cPanel
- [ ] Imported `schema.sql` in phpMyAdmin
- [ ] Generated JWT secret
- [ ] Updated `config.php` with:
  - [ ] Database credentials
  - [ ] JWT secret
  - [ ] GitHub Client ID
  - [ ] GitHub Client Secret
  - [ ] CORS header
- [ ] Ran `npm run build`
- [ ] Pushed to GitHub
- [ ] Tested login at sylcroad.com/login
- [ ] Successfully logged in!

---

## 🎉 After Setup

Once working, you'll have:
- ✅ GitHub OAuth login
- ✅ Campaign management
- ✅ Creator integration (Instagram/TikTok via Ensemble API)
- ✅ Professional dashboard
- ✅ Analytics and charts
- ✅ Zero emojis! 🎨

---

## 📞 Need Help?

**GitHub OAuth not working?**
1. Check GitHub settings: https://github.com/settings/developers
2. Verify callback URL is exactly: `https://sylcroad.com`
3. Make sure you copied the FULL client secret (starts with `ghp_`)

**Database errors?**
1. Go to phpMyAdmin
2. Select database `sylcdvaa_sylcroad`
3. Check if all 5 tables exist

**Still stuck?**
- Check browser console (F12) → Console tab
- Check error messages
- Verify all credentials are copied correctly

---

**Ready to start? Follow Step 1!** 🚀

