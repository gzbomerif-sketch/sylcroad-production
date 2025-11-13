# 🔐 OAuth Setup Guide for Sylcroad

## ⚠️ YOU NEED TO DO THIS TO ENABLE LOGIN!

The authentication system is built, but it needs OAuth credentials to work. Here's exactly what to do:

---

## 📋 What You Need

1. **Google OAuth Client ID** (for "Sign in with Google")
2. **GitHub OAuth Client ID** (for "Sign in with GitHub")
3. **Database credentials** (for storing user data)

---

## 🔧 Step 1: Setup Google OAuth

### A. Create Google OAuth Credentials

1. Go to: **https://console.cloud.google.com/**

2. **Create a new project** (or select existing):
   - Click project dropdown → "New Project"
   - Name: "Sylcroad"
   - Click "Create"

3. **Enable Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth Consent Screen**:
   - Go to "APIs & Services" → "OAuth consent screen"
   - User Type: **External**
   - App name: `Sylcroad`
   - User support email: [your email]
   - Developer contact: [your email]
   - Click "Save and Continue"
   - Skip "Scopes" → Save and Continue
   - Add test users (your email) → Save and Continue

5. **Create OAuth Client ID**:
   - Go to "APIs & Services" → "Credentials"
   - Click "**+ CREATE CREDENTIALS**" → "OAuth client ID"
   - Application type: **Web application**
   - Name: `Sylcroad Web Client`
   - **Authorized JavaScript origins:**
     ```
     https://sylcroad.com
     http://localhost:3000
     ```
   - **Authorized redirect URIs:**
     ```
     https://sylcroad.com
     http://localhost:3000
     ```
   - Click "**CREATE**"

6. **Copy the Client ID**:
   - You'll see a popup with:
     - Client ID: `something.apps.googleusercontent.com`
     - Client secret: `GOCSPX-something`
   - **SAVE BOTH!**

---

## 🔧 Step 2: Setup GitHub OAuth

### B. Create GitHub OAuth App

1. Go to: **https://github.com/settings/developers**

2. Click "**New OAuth App**"

3. Fill in the form:
   - **Application name:** `Sylcroad`
   - **Homepage URL:** `https://sylcroad.com`
   - **Application description:** Music promotion platform
   - **Authorization callback URL:** `https://sylcroad.com`

4. Click "**Register application**"

5. **Copy the Client ID**:
   - You'll see the Client ID immediately
   - Click "**Generate a new client secret**"
   - **SAVE BOTH Client ID and Client Secret!**

---

## 📝 Step 3: Update Configuration Files

### A. Update `.env` file (Frontend)

Create `/Users/obre/sylcroad-production/.env`:

```bash
REACT_APP_API_URL=https://sylcroad.com/api
REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com
REACT_APP_GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID_HERE
```

**Replace the placeholders with your actual values!**

### B. Update `config.php` (Backend)

Edit `/Users/obre/sylcroad-production/public_html/api/config.php`:

```php
// OAuth Configuration
define('GOOGLE_CLIENT_ID', 'YOUR_GOOGLE_CLIENT_ID_HERE');
define('GOOGLE_CLIENT_SECRET', 'YOUR_GOOGLE_CLIENT_SECRET_HERE');
define('GITHUB_CLIENT_ID', 'YOUR_GITHUB_CLIENT_ID_HERE');
define('GITHUB_CLIENT_SECRET', 'YOUR_GITHUB_CLIENT_SECRET_HERE');
```

---

## 🗄️ Step 4: Setup Database

### A. Find Your Database Credentials

1. Log into cPanel: **https://server370.web-hosting.com:2083**

2. Go to "**MySQL® Databases**"

3. You should see:
   - **Database name:** `sylcdvaa_something` (note this down)
   - **Database user:** `sylcdvaa_something` (note this down)

4. If no database exists:
   - Create new database: `sylcdvaa_sylcroad`
   - Create new user: `sylcdvaa_sylcroad`
   - Set a password (save it!)
   - Add user to database with ALL PRIVILEGES

### B. Update `config.php` with Database Credentials

Edit `/Users/obre/sylcroad-production/public_html/api/config.php`:

```php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'sylcdvaa_sylcroad');  // ← Your database name
define('DB_USER', 'sylcdvaa_sylcroad');  // ← Your database user
define('DB_PASS', 'your_password_here'); // ← Your database password
```

### C. Import Database Schema

1. In cPanel, go to "**phpMyAdmin**"

2. Click on your database (`sylcdvaa_sylcroad`) in the left sidebar

3. Click the "**Import**" tab at the top

4. Click "**Choose File**"

5. Select the file: `/Users/obre/sylcroad-production/database/schema.sql`

6. Click "**Go**" at the bottom

7. You should see: **"Import has been successfully finished"**

8. Verify: Click on your database name → you should see 5 tables:
   - `users`
   - `campaigns`
   - `creators`
   - `campaign_creators`
   - `sessions`

---

## 🔒 Step 5: Generate JWT Secret

You need a strong random secret for JWT tokens.

**In terminal:**

```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

Or online: https://www.random.org/strings/

Copy the generated string and update `config.php`:

```php
define('JWT_SECRET', 'your_generated_secret_here_very_long_random_string');
```

---

## ✅ Step 6: Rebuild and Deploy

After updating the `.env` file:

```bash
cd /Users/obre/sylcroad-production
npm run build
git add -A
git commit -m "Add OAuth configuration"
git push origin main
```

The site will auto-deploy to cPanel!

---

## 🧪 Step 7: Test OAuth Login

1. Go to: **https://sylcroad.com/login**

2. Try "Sign in with Google":
   - Should show Google's OAuth consent screen
   - After approval, should redirect back and log you in

3. Try "Sign in with GitHub":
   - Should show GitHub's authorization screen
   - After approval, should redirect back and log you in

4. Check if you're logged in:
   - You should be redirected to `/admin`
   - Your name and avatar should appear in the header

---

## 🐛 Troubleshooting

### Error: "Invalid OAuth token" or "Unauthorized"

**Check:**
- Client IDs match in `.env` AND `config.php`
- Client Secrets are correct in `config.php`
- Authorized redirect URIs include `https://sylcroad.com`

### Error: "Database connection failed"

**Check:**
- Database name, user, and password in `config.php`
- Database user has ALL PRIVILEGES
- Database tables were imported successfully

### Error: "Invalid token" or "Token expired"

**Check:**
- JWT_SECRET is set in `config.php`
- It's a long random string (at least 32 characters)

### Login button does nothing

**Check browser console (F12):**
- Look for JavaScript errors
- Check if API URL is correct in `.env`
- Verify OAuth client IDs are set

---

## 📦 Quick Reference

### Files to Edit:

1. **`.env`** (Frontend config):
   - `REACT_APP_GOOGLE_CLIENT_ID`
   - `REACT_APP_GITHUB_CLIENT_ID`

2. **`public_html/api/config.php`** (Backend config):
   - `DB_NAME`, `DB_USER`, `DB_PASS`
   - `JWT_SECRET`
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
   - `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`

### Where to Get Credentials:

| Credential | Where to Get |
|------------|-------------|
| Google Client ID & Secret | https://console.cloud.google.com/ |
| GitHub Client ID & Secret | https://github.com/settings/developers |
| Database Name & User | cPanel → MySQL® Databases |
| JWT Secret | Generate random string (32+ chars) |

---

## ✨ After Setup is Complete

Once everything is configured, users will be able to:
- ✅ Sign in with Google
- ✅ Sign in with GitHub
- ✅ Create campaigns
- ✅ Add creators from Instagram/TikTok
- ✅ View analytics and metrics

---

**Need help?** Check the browser console (F12) for errors, or check PHP error logs in cPanel.

