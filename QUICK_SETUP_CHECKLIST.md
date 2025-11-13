# ⚡ Quick Setup Checklist for Sylcroad

## ✅ What I Can Do for You:

✅ **Code** - DONE! All code is written and deployed  
✅ **Design** - DONE! Professional UI with no emojis  
✅ **Build** - DONE! Production build ready  
✅ **Database Schema** - DONE! SQL file is ready at `database/schema.sql`  
✅ **Config Templates** - DONE! Files are ready with placeholders

---

## ⚠️ What YOU Need to Do (I can't access these):

### 1. Get OAuth Credentials (15 minutes)

**Google OAuth:**
1. Visit: https://console.cloud.google.com/
2. Create project → Enable Google+ API → Create OAuth Client
3. Copy Client ID and Client Secret

**GitHub OAuth:**
1. Visit: https://github.com/settings/developers
2. New OAuth App → Fill in details
3. Copy Client ID and Client Secret

📖 **Full instructions:** See `OAUTH_SETUP_GUIDE.md`

---

### 2. Setup Database (5 minutes)

1. **In cPanel** (https://server370.web-hosting.com:2083):
   - Go to "MySQL® Databases"
   - Create database: `sylcdvaa_sylcroad` (or note existing one)
   - Create user: `sylcdvaa_sylcroad` with password
   - Add user to database with ALL PRIVILEGES

2. **Import Schema**:
   - Go to phpMyAdmin
   - Select your database
   - Click "Import" tab
   - Upload file: `/Users/obre/sylcroad-production/database/schema.sql`
   - Click "Go"
   - ✅ Should see 5 tables created

---

### 3. Update Configuration Files (10 minutes)

**File 1: `.env`** (Already created at `/Users/obre/sylcroad-production/.env`)

Edit and replace the placeholders:
```
REACT_APP_API_URL=https://sylcroad.com/api
REACT_APP_GOOGLE_CLIENT_ID=YOUR_ACTUAL_GOOGLE_CLIENT_ID
REACT_APP_GITHUB_CLIENT_ID=YOUR_ACTUAL_GITHUB_CLIENT_ID
```

**File 2: `public_html/api/config.php`** (On cPanel server)

You'll need to edit this file via cPanel File Manager or FTP.

Find these lines and update:

```php
// Database configuration (Line 2-5)
define('DB_NAME', 'sylcdvaa_sylcroad');     // Your database name
define('DB_USER', 'sylcdvaa_sylcroad');     // Your database user
define('DB_PASS', 'YOUR_DATABASE_PASSWORD'); // Your database password

// JWT Secret Key (Line 7)
define('JWT_SECRET', 'GENERATE_RANDOM_STRING_HERE');

// OAuth Configuration (Line 11-14)
define('GOOGLE_CLIENT_ID', 'YOUR_GOOGLE_CLIENT_ID');
define('GOOGLE_CLIENT_SECRET', 'YOUR_GOOGLE_CLIENT_SECRET');
define('GITHUB_CLIENT_ID', 'YOUR_GITHUB_CLIENT_ID');
define('GITHUB_CLIENT_SECRET', 'YOUR_GITHUB_CLIENT_SECRET');
```

**Generate JWT Secret:**
```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

---

### 4. Rebuild and Deploy (2 minutes)

After updating `.env`:

```bash
cd /Users/obre/sylcroad-production
npm run build
git add build/
git commit -m "Add OAuth credentials and rebuild"
git push origin main
```

cPanel will auto-deploy in ~60 seconds.

---

## 🧪 Test Everything

1. Go to: **https://sylcroad.com/login**
2. Click "Sign in with Google" → Should work!
3. Click "Sign in with GitHub" → Should work!
4. After login → Should redirect to `/admin`
5. Try creating a campaign
6. Try adding a creator

---

## 📊 Summary

| Task | Status | Time |
|------|--------|------|
| Write all code | ✅ DONE | - |
| Build production files | ✅ DONE | - |
| Create database schema | ✅ DONE | - |
| Get Google OAuth credentials | ⏳ YOU | 5 min |
| Get GitHub OAuth credentials | ⏳ YOU | 5 min |
| Create database in cPanel | ⏳ YOU | 2 min |
| Import schema.sql | ⏳ YOU | 2 min |
| Update .env file | ⏳ YOU | 2 min |
| Update config.php on server | ⏳ YOU | 5 min |
| Generate JWT secret | ⏳ YOU | 1 min |
| Rebuild and deploy | ⏳ YOU | 2 min |

**Total your time: ~25 minutes**

---

## 🆘 Need Help?

- **OAuth Setup:** See `OAUTH_SETUP_GUIDE.md` (detailed step-by-step)
- **Database Issues:** Check cPanel → phpMyAdmin for table list
- **Login Not Working:** Check browser console (F12) for errors
- **API Errors:** Check `public_html/api/config.php` credentials

---

## ✨ What Happens After Setup

Once configured, your site will have:
- ✅ Beautiful professional design (no emojis!)
- ✅ Google OAuth login
- ✅ GitHub OAuth login
- ✅ Campaign management (create/edit/delete)
- ✅ Creator integration (add from Instagram/TikTok)
- ✅ Analytics dashboard
- ✅ Modern charts and metrics
- ✅ Responsive mobile design

---

**I've done everything I can from my end!** The rest requires access to:
- Google Cloud Console (for OAuth)
- GitHub Settings (for OAuth)
- cPanel (for database and config files)

Let me know when you've completed these steps and I can help test!

