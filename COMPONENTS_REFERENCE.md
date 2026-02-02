# Component Documentation

## Overview
Complete reference for all components and their features.

---

## 🎨 Components

### Navbar
**File**: `src/components/Navbar.js`
**Styling**: `Navbar.module.css`

**Features**:
- Sticky navigation with blur on scroll
- Theme toggle (☀️/🌙)
- Mobile hamburger menu
- Active link indicator
- Animated hover effects
- Responsive design

**Props**: None (uses ThemeContext, useLocation)

**Key Elements**:
- Logo badge with letter "R"
- Navigation links (Home, Projects, GitHub, Contact)
- Theme toggle button
- Mobile menu with animations

---

### Hero
**File**: `src/components/Hero.js`
**Styling**: `Hero.module.css`

**Features**:
- Animated cosmic background with floating orbs
- Staggered text animations
- CTA buttons with hover effects
- Scroll indicator animation
- Responsive typography (uses clamp)
- Mouse tracking (setup ready)

**Props**: None

**Key Elements**:
- Intro text: "Hello, I'm"
- Name: "MD. RAFI HOQUE" (split styling)
- Title: "Computer Science Student | Aspiring Full-Stack Developer"
- Tagline: "Building scalable and efficient software solutions"
- Two CTA buttons (View My Work, GitHub Profile)
- Scroll indicator

---

### Story
**File**: `src/components/Story.js`
**Styling**: `Story.module.css`

**Features**:
- 4-step journey timeline
- Scroll-triggered animations
- Step cards with connectors
- Hover card effects
- Responsive layout

**Props**: None

**Steps**:
1. Passion for Problem-Solving
2. Full-Stack Development
3. Scalable Systems
4. Real-World Impact

**Key Elements**:
- Step number (01-04) in gradient
- Title and description
- Connecting lines between steps

---

### About
**File**: `src/components/About.js`
**Styling**: `About.module.css`

**Features**:
- Glassmorphic card design
- Statistics display (150+ DSA, 6+ Projects, 2026 Graduation)
- Hover card animations
- Responsive grid stats

**Props**: None

**Content**:
- Two-paragraph biography (exactly as specified)
- Statistics with dividers
- Interactive hover state

---

### Skills
**File**: `src/components/Skills.js`
**Styling**: `Skills.module.css`

**Features**:
- 4 skill categories with interactive cards
- Hover reveals full skill list
- Default preview (first 3 skills)
- Staggered skill badge animations
- Color-coded categories
- Glowing border effects

**Props**: None

**Categories**:
1. Programming Languages (C++, Python, Java, JavaScript, HTML, CSS)
2. Frameworks & Libraries (React, Node.js, Express.js)
3. Tools & Technologies (Git, GitHub, Docker, MongoDB)
4. CS Fundamentals (DSA, OOP, System Design)

**Key Elements**:
- Category icon with border
- Skill badges with hover effects
- Gradient text for category titles
- Animated count indicator

---

### Education
**File**: `src/components/Education.js`
**Styling**: `Education.module.css`

**Features**:
- Animated timeline with marker
- Line draw animation on scroll
- Card hover effects
- Highlights section
- Responsive layout

**Props**: None

**Content**:
- BSc in Computer Science & Engineering
- North South University
- 2021 – Expected 2026
- Highlights (development focus, strong fundamentals)

---

### CTA (Call-to-Action)
**File**: `src/components/CTA.js`
**Styling**: `CTA.module.css`

**Features**:
- Full-width section with background animation
- Two action buttons (email, projects)
- Contact information display
- Staggered animations on view
- Responsive layout

**Props**: None

**Content**:
- Title: "Ready to Collaborate?"
- Text: Internship seeking message
- Email button (primary)
- Projects button (secondary)
- Contact info with links

---

### Footer
**File**: `src/components/Footer.js`
**Styling**: `Footer.module.css`

**Features**:
- Multi-column layout
- Animated divider on scroll
- Contact and social links
- Tech stack display
- Copyright year (auto-updated)
- Responsive grid

**Props**: None

**Sections**:
- Contact (email)
- Links (GitHub)
- Location (Dhaka, Bangladesh)
- Bottom: Copyright + Tech stack

---

### Theme Context
**File**: `src/context/ThemeContext.js`

**Features**:
- Global theme state management
- Dark/Light mode toggle
- LocalStorage persistence
- System preference detection
- Document class management

**Exports**:
- `ThemeProvider`: Wrapper component
- `useTheme`: Hook for accessing isDark + toggleTheme

**API**:
```javascript
const { isDark, toggleTheme } = useTheme();
```

---

## 📄 Pages

### Home Page
**File**: `src/pages/Home.js`

**Structure**:
1. Hero
2. Story
3. About
4. Skills
5. Education
6. CTA
7. Footer (separate component)

**Features**:
- Page transition animation
- Scroll sections with animations
- Semantic section organization

---

### Projects Page
**File**: `src/pages/Projects.js`
**Styling**: `Projects.module.css`

**Sections**:
1. **Hero**: Title + subtitle
2. **Projects Grid**: 3 learning-based projects
   - DSA Practice (In Progress)
   - React Learning (In Progress)
   - Backend Practice (In Progress)
3. **Roadmap**: 3 future learning paths
   - Advanced React
   - Backend APIs
   - System Fundamentals
4. **Back Link**: Navigate to home

**Features**:
- Status indicators (In Progress)
- Skill badges per project
- Highlights per project
- Interactive roadmap cards
- Hover animations

---

## 🎨 Global Styles

### index.css
**File**: `src/index.css`

**Includes**:
- CSS Variables (--primary, --secondary, etc.)
- Global resets
- Light/dark mode styles
- Scrollbar styling
- Glassmorphism utilities
- Gradient text utilities
- Animations keyframes

**Key Classes**:
- `.cosmic-bg`: Gradient background
- `.glass`: Glassmorphism effect
- `.gradient-text`: Gradient text effect

---

### App.css
**File**: `src/App.css`

**Features**:
- App layout wrapper
- Theme-aware background
- Flex column structure

---

## 🎬 Animations

### Animation Utilities
**File**: `src/utils/animations.js`

**Exported Variants**:
- `containerVariants`: Stagger children with delay
- `itemVariants`: Fade and slide up
- `staggerTextVariants`: Sequential word/char animations
- `slideInVariants`: Horizontal slide in
- `fadeInUpVariants`: Vertical fade with motion
- `scaleInVariants`: Scale from 0.9 to 1
- `pageTransitionVariants`: Page enter/exit animations
- `hoverScaleVariants`: Hover scale effect
- `scrollRevealVariants`: Scroll-triggered reveal

**Usage Pattern**:
```javascript
initial="hidden"
whileInView="visible"
viewport={{ once: true, amount: 0.3 }}
variants={itemVariants}
```

---

## 🔧 Customization Points

### Easy to Modify
1. **Colors**: `src/index.css` `:root` variables
2. **Text Content**: Each component directly in JSX
3. **Animations**: `src/utils/animations.js` and component props
4. **Layout**: CSS module files (spacings, sizes)
5. **Skills/Projects**: Component arrays

### Harder to Modify (But Possible)
1. **Component Structure**: Requires understanding React/Framer Motion
2. **Routing**: Modify `src/App.js`
3. **Theme Logic**: Modify `src/context/ThemeContext.js`

---

## 📊 Performance Notes

- **Module CSS**: Scoped styles prevent conflicts
- **Lazy Animations**: Use `whileInView` to reduce initial render
- **CSS Variables**: Dynamic theming without recalculation
- **Transform + Opacity**: GPU-accelerated animations only

---

## ♿ Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Color contrast meets WCAG
- Focus states on interactive elements
- ARIA labels where needed
- Keyboard navigation support

---

## 📱 Responsive Design

All components follow mobile-first approach:
- Base styles for mobile
- Tablet breakpoint: 768px
- Small mobile: 480px
- Desktop: 1200px+

Use `clamp()` for fluid typography:
```css
font-size: clamp(1rem, 2vw, 2rem);
```

---

## 🎯 Component Usage Pattern

```javascript
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import styles from './Component.module.css';

const Component = () => {
  const { isDark } = useTheme();

  return (
    <section className={`${styles.section} ${isDark ? '' : styles.lightMode}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Content here
      </motion.div>
    </section>
  );
};

export default Component;
```

---

**Created**: January 26, 2026
**Portfolio For**: MD. Rafi Hoque
**Status**: ✅ Complete & Ready to Use
