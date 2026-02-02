# Quick Start Guide

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

This will install:
- React 18
- React Router v6
- Framer Motion 10
- All other required dependencies

### 2. Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000` with hot reload enabled.

## Project Structure

```
src/
├── components/           # Reusable components
├── pages/               # Page components (Home, Projects)
├── context/             # Theme context for dark/light mode
├── utils/               # Animation variants and utilities
├── App.js               # Main app with routing
├── index.js             # Entry point
└── *.css                # Global and module styles
```

## Key Features to Explore

### 1. Scroll Animations
- Open home page and scroll to see animations trigger
- Each section reveals with smooth transitions
- Staggered text animations in story section

### 2. Theme Toggle
- Click the theme button (☀️/🌙) in navbar
- Preference saves to localStorage
- All styles adapt instantly

### 3. Interactive Components
- Hover over skill cards to see full list
- Projects page shows learning-based projects
- Smooth page transitions using React Router

### 4. Responsive Design
- Resize browser to see mobile optimizations
- Test on various device sizes
- Touch-friendly mobile menu

## Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload on code changes.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm test`
Launches the test runner in interactive watch mode.

## Customization

### Adding New Projects
Edit `src/pages/Projects.js` and add to the `projects` array:

```javascript
{
  title: 'Your Project',
  category: 'Category',
  description: 'Description...',
  status: 'in-progress',
  skills: ['Tech1', 'Tech2'],
  highlights: ['Feature 1', 'Feature 2'],
}
```

### Changing Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary: #1a1a2e;
  --accent: #0f3460;
  --highlight: #e94560;
  /* ... more colors */
}
```

### Modifying Animations
Edit variants in `src/utils/animations.js` or component-specific animation props.

## Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag & drop the build folder to netlify.com
```

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages
# Update package.json with "homepage": "https://yourusername.github.io/portfolio"
npm run build
npm run deploy
```

## Troubleshooting

**Port 3000 already in use?**
```bash
npm start -- --port 3001
```

**Style not updating?**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)

**Animations not smooth?**
- Check browser developer tools Performance tab
- Ensure GPU acceleration is enabled
- Consider reducing animation complexity on low-end devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

1. **Lazy Load Images**: Add lazy loading if you add images
2. **Code Splitting**: Routes are automatically code-split
3. **Optimize Animations**: Use `transform` and `opacity` for best performance
4. **Minify Assets**: Production build automatically minifies

## Learning Resources

- [React Documentation](https://react.dev)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [React Router Documentation](https://reactrouter.com)
- [MDN CSS Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Next Steps

1. ✅ Install and run the project
2. ✅ Explore the different sections
3. ✅ Try the theme toggle
4. ✅ Add your own projects to the Projects page
5. ✅ Customize colors and animations
6. ✅ Deploy to your hosting platform

Happy coding! 🚀
