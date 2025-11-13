# 🎵 Sylcroad Analytics Dashboard

**Cobrand-style analytics platform** for tracking creator performance across social media platforms.

---

## ✨ Features

### **Single-Page Analytics Dashboard**
- ✅ **Metrics Cards** - 6 key performance indicators
- ✅ **Performance Chart** - Multi-line time-series visualization
- ✅ **Creator Filtering** - Filter by specific creators (replaces "All Campaigns")
- ✅ **Platform Filtering** - Instagram, Twitter, TikTok, YouTube
- ✅ **Time Range** - Last 7/30/90 days or All Time
- ✅ **Posts Grid** - Instagram-style grid with search & sort
- ✅ **Dark Theme** - Professional Cobrand-inspired design

### **Removed Features (Per Request)**
- ❌ Country filter (removed)
- ❌ Multiple tabs (consolidated into single view)
- ❌ Separate Dashboard/Admin/Creators pages

---

## 🎨 Design

Based on the Cobrand music analytics platform extraction:
- **Color Scheme:** Dark theme (#0a0a0a background)
- **Typography:** Inter font family
- **Status Dots:** Color-coded metrics (green, blue, purple, orange)
- **Layout:** Max-width 1400px, responsive grid
- **Components:** Modular React components with scoped CSS

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

---

## 📦 Deployment

### **Automated cPanel Deployment**

The `.cpanel.yml` file automates deployment when you push to GitHub:

```yaml
deployment:
  tasks:
    - npm ci (install dependencies)
    - npm run build (build React app)
    - Copy build files to /home/sylcdvaa/public_html/
    - Set correct permissions
```

### **Push to Deploy**

```bash
git add .
git commit -m "Your changes"
git push origin main
```

**GitHub webhook automatically triggers deployment to sylcroad.com** 🎉

---

## 🏗️ Project Structure

```
sylcroad-source/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard.js        # Main dashboard container
│   │   ├── Header.js           # Top navigation with logos
│   │   ├── MetricsCards.js     # 6 performance metrics
│   │   ├── PerformanceChart.js # Time-series line chart
│   │   ├── FilterBar.js        # Time/Platform/Creator filters
│   │   └── PostsGrid.js        # Instagram-style post grid
│   ├── App.js
│   └── index.js
├── .cpanel.yml                  # Auto-deployment config
└── package.json
```

---

## 📊 Metrics Tracked

1. **Total Views** (👁️ Green)
2. **Total Likes** (❤️ Blue)
3. **Total Comments** (💬 Purple)
4. **Total Shares** (🔄 Blue-Light)
5. **Engagement Rate** (📊 Orange)
6. **Live Posts** (📝 Gray)

---

## 🎯 Filters

### **Time Range**
- Last 7 Days
- Last 30 Days
- Last 90 Days
- All Time

### **Platform**
- All Platforms
- Instagram
- Twitter
- TikTok
- YouTube

### **Creator** (New - Replaces "All Campaigns")
- All Creators
- Creator 1
- Creator 2
- Creator 3
- Creator 4

---

## 🛠️ Technologies

- **React** 18.x
- **Create React App** 5.x
- **Pure CSS** (no UI libraries)
- **SVG** for charts
- **GitHub Actions** (auto-deployment)
- **cPanel API** (deployment target)

---

## 📝 Notes

- Mock data is currently used - replace with real API calls
- Chart uses SVG paths - can be upgraded to Chart.js if needed
- All components are functional components with hooks
- Fully responsive design
- Dark theme optimized for readability

---

## 🎨 Design Credits

Interface design inspired by **Cobrand Music Analytics Platform** with customizations for creator-focused tracking.

---

**Built with ❤️ for Sylcroad**

