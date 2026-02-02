# MD. Rafi Hoque - Portfolio

A modern, scroll-storytelling portfolio website built with React, Framer Motion, and CSS. This portfolio showcases my journey as a Computer Science student and aspiring full-stack developer with a focus on clean design, smooth animations, and responsive user experience.

## 🚀 Features

- **Scroll-Driven Storytelling**: Immersive animations and transitions that respond to scroll position
- **Dark/Light Mode**: Seamless theme toggle with persistent preference storage
- **Responsive Design**: Mobile-first approach supporting all device sizes
- **Glassmorphism Design**: Modern UI with backdrop blur effects and gradients
- **Framer Motion Animations**: Smooth, professional motion throughout the site
- **Performance Optimized**: Fast load times and smooth 60fps animations
- **SEO Friendly**: Semantic HTML and proper meta tags

## 📑 Pages

### Home Page (/)
- **Hero Section**: Animated introduction with cosmic background
- **Story Section**: Scroll-based journey through my development path
- **About Section**: Personal introduction with statistics
- **Skills Section**: Interactive skill categories with hover effects
- **Education Timeline**: Animated timeline with education details
- **CTA Section**: Call-to-action for internship opportunities
- **Footer**: Contact information and social links

### Projects Page (/projects)
- **Projects Showcase**: Learning-based projects with status indicators
- **Skills Display**: Technologies used in each project
- **Future Roadmap**: What I'm actively preparing for next
- **Back Navigation**: Quick return to home page

## 🛠️ Tech Stack

- **React 18**: Component-based UI library
- **React Router v6**: Client-side routing and page transitions
- **Framer Motion 10**: Advanced animations and motion controls
- **CSS3**: Custom styling with modern features (Grid, Flexbox, CSS Variables)
- **JavaScript (ES6+)**: Modern JavaScript features

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.js              # Navigation component
│   │   ├── Hero.js                # Hero section
│   │   ├── Story.js               # Journey storytelling section
│   │   ├── About.js               # About me section
│   │   ├── Skills.js              # Interactive skills cards
│   │   ├── Education.js           # Education timeline
│   │   ├── CTA.js                 # Call-to-action section
│   │   ├── Footer.js              # Footer component
│   │   └── *.module.css           # Component-specific styles
│   ├── pages/
│   │   ├── Home.js                # Home page
│   │   ├── Projects.js            # Projects page
│   │   └── *.module.css           # Page-specific styles
│   ├── context/
│   │   └── ThemeContext.js        # Dark/light mode context
│   ├── utils/
│   │   └── animations.js          # Reusable animation variants
│   ├── App.js                     # Main app component with routing
│   ├── App.css                    # Global app styles
│   ├── index.js                   # React entry point
│   └── index.css                  # Global styles
├── public/
│   └── index.html                 # HTML template
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## 🎨 Design System

### Color Palette (Dark Mode)
- Primary: `#1a1a2e` (Dark Blue)
- Secondary: `#16213e` (Darker Blue)
- Accent: `#0f3460` (Medium Blue)
- Highlight: `#e94560` (Pink/Red)
- Text Light: `#eaeaea` (Light Gray)
- Gradient: Cyan → Blue → Purple

### Typography
- Font Family: Inter (body), Space Mono (monospace)
- Headlines: Bold (700-800)
- Body: Regular (400-500)
- Sizes: Responsive with clamp()

## 🎬 Animation Patterns

### Scroll-Driven Animations
- Fade in on scroll with `whileInView`
- Staggered children animations
- Parallax-style motion
- Progressive text reveals

### Interactive Animations
- Hover scale effects on cards
- Button press animations
- Smooth transitions between pages
- Floating background orbs

### Reusable Variants
Check `src/utils/animations.js` for:
- `containerVariants`: Stagger children
- `itemVariants`: Fade and slide in
- `fadeInUpVariants`: Vertical reveal
- `pageTransitionVariants`: Page transitions
- `hoverScaleVariants`: Hover effects
- `scrollRevealVariants`: Scroll reveals

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (full features)
- **Tablet**: 768px - 1199px (optimized layout)
- **Mobile**: Below 768px (touch-friendly, stacked layout)
- **Small Mobile**: Below 480px (maximized simplicity)

## 🔄 Theme System

The portfolio includes a sophisticated theme system:
- **Context API**: `ThemeContext` manages global theme state
- **LocalStorage**: Theme preference persists across sessions
- **CSS Variables**: Dynamic theming with `:root` variables
- **Instant Toggle**: Smooth transition between dark and light modes

## 🚀 Performance Optimizations

- Code splitting with React Router
- CSS modules for scoped styling
- Optimized animations with GPU acceleration
- Lazy component loading
- Minimal re-renders with React best practices

## 📞 Personal Information

- **Name**: MD. Rafi Hoque
- **Email**: hrafi0445@gmail.com
- **GitHub**: https://github.com/RafisGit
- **Location**: Dhaka, Bangladesh
- **Status**: Computer Science Student | Internship Seeker

## 🎯 Project Goals

✓ Demonstrate modern frontend development skills
✓ Showcase understanding of UX/UI principles
✓ Display animation and motion design expertise
✓ Create an engaging, memorable experience
✓ Maintain clean, professional code structure
✓ Provide easy portfolio updates for future projects

## 📝 Future Enhancements

- [ ] Blog section for technical articles
- [ ] Project detail pages with case studies
- [ ] Contact form with backend integration
- [ ] Search functionality
- [ ] Accessibility audit and improvements
- [ ] Performance monitoring and analytics

## 📄 License

This portfolio is open source and available for viewing and reference. Feel free to use this as inspiration for your own portfolio!

---

**Built with ❤️ by MD. Rafi Hoque**

Last Updated: January 2026
