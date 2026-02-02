# 📋 Quick Reference Card

## 🚀 Start Here

### Install & Run
```bash
cd "d:\Downloads\MyWork\2026\Portfolio"
npm install
npm start
```

### Open Browser
- http://localhost:3000
- Theme toggle: ☀️/🌙
- Navigate: Home → Projects

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `src/App.js` | Routing setup |
| `src/index.css` | Global styles & colors |
| `src/components/` | All UI components |
| `src/pages/` | Home & Projects pages |
| `src/context/ThemeContext.js` | Dark/light mode |
| `src/utils/animations.js` | Animation variants |
| `package.json` | Dependencies |

---

## 🎨 Main Sections (Home Page)

| Section | Component | Purpose |
|---------|-----------|---------|
| 1 | Hero | Intro & name |
| 2 | Story | Journey narrative |
| 3 | About | Introduction |
| 4 | Skills | Tech & abilities |
| 5 | Education | Degree info |
| 6 | CTA | Call-to-action |
| 7 | Footer | Contact info |

---

## 🛠️ Customization

### Change Colors
Edit `src/index.css`:
```css
:root {
  --primary: #1a1a2e;
  --highlight: #e94560;
  --accent: #0099ff;
}
```

### Update Text
Directly in component JSX files.

### Add Projects
Edit `src/pages/Projects.js` projects array.

---

## 🎬 Animation Patterns

```javascript
// Scroll reveal
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
/>

// Hover effect
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>

// Stagger children
<motion.div variants={containerVariants}
  initial="hidden" animate="visible"
>
```

---

## 📱 Responsive Breakpoints

- **Mobile**: <768px (default styles)
- **Tablet**: 768px-1199px (grid adjust)
- **Desktop**: 1200px+ (full layout)

---

## 🌓 Theme Implementation

```javascript
const { isDark, toggleTheme } = useTheme();

// Apply theme class
className={isDark ? '' : styles.lightMode}

// Toggle
<button onClick={toggleTheme}>
  {isDark ? '☀️' : '🌙'}
</button>
```

---

## 🚀 Deploy

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag build/ to netlify.com
```

### GitHub Pages
Update `package.json` homepage, then:
```bash
npm install --save-dev gh-pages
npm run build
```

---

## 🔧 Troubleshooting

| Issue | Fix |
|-------|-----|
| Port 3000 in use | `npm start -- --port 3001` |
| Styles not updating | Hard refresh (Ctrl+Shift+R) |
| Animations lag | Check DevTools Performance |
| Theme not persisting | Clear localStorage |

---

## 📚 Documentation Files

- `README.md` - Full documentation
- `QUICKSTART.md` - Getting started
- `IMPLEMENTATION_GUIDE.md` - Technical details
- `COMPONENTS_REFERENCE.md` - Component breakdown
- `BUILD_SUMMARY.md` - What was built

---

## ✨ Key Features

✅ Scroll-storytelling  
✅ Dark/light mode  
✅ Fully responsive  
✅ Smooth animations  
✅ React Router  
✅ Mobile-first design  
✅ Clean code  
✅ Production ready  

---

## 🎯 Folder Structure

```
src/
├── components/     # 9 UI components
├── pages/          # 2 main pages
├── context/        # Theme context
├── utils/          # Animation variants
├── App.js          # Routing
├── index.js        # Entry point
└── *.css           # Styles
```

---

## 📊 Page Routes

| Route | Page | Components |
|-------|------|-----------|
| `/` | Home | Hero, Story, About, Skills, Education, CTA |
| `/projects` | Projects | Project showcase, Roadmap |

---

## 💡 Tips

1. Test theme toggle frequently
2. Resize browser to test mobile
3. Check DevTools for animations
4. Update skills/projects as you learn
5. Deploy early and often

---

## 🎓 Learning Goals

After building this:
- ✅ React hooks & context
- ✅ Framer Motion animations
- ✅ Responsive CSS
- ✅ React Router
- ✅ Component composition
- ✅ Professional UI/UX

---

## 🚀 Next Milestones

1. ✅ Run project (npm start)
2. ✅ Explore all pages
3. ✅ Test theme toggle
4. ✅ Check mobile view
5. ⬜ Customize colors
6. ⬜ Add personal projects
7. ⬜ Deploy online

---

**MD. Rafi Hoque Portfolio**
**Computer Science Student | Full-Stack Developer**

Ready to impress! 🎉

---

For detailed info, see:
- **Getting started**: QUICKSTART.md
- **Technical details**: IMPLEMENTATION_GUIDE.md
- **Component info**: COMPONENTS_REFERENCE.md
- **Full docs**: README.md
