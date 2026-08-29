// Portfolio Data - Single Source of Truth
// Preserving all authentic data, credentials, links, and real project details.

export const PERSONAL_INFO = {
  name: 'MD. RAFI HOQUE',
  shortName: 'Rafi Hoque',
  role: 'Full-Stack Developer & Web Designer',
  focus: 'Software & AI Systems',
  headline: 'Building scalable software solutions, AI-powered systems, and modern web experiences.',
  bioStatement: 'I BUILD DIGITAL EXPERIENCES THAT SOLVE REAL PROBLEMS.',
  bioDescription:
    'Computer Science graduate with a strong foundation in algorithmic problem-solving, full-stack systems, and clean architectural design. Experienced in developing modern web applications, AI-integrated workflows, and responsive cloud interfaces.',
  location: 'Dhaka, Bangladesh',
  email: 'hrafi0445@gmail.com',
  github: 'https://github.com/RafisGit',
  linkedin: 'https://www.linkedin.com/in/rafihoque/',
  cvUrl: '/cv.pdf',
  status: 'Available for Software Engineering Opportunities',
  stats: [
    { value: '150+', label: 'DSA Solved' },
    { value: '4+', label: 'Flagship Systems' },
    { value: 'Graduated', label: 'BSc in CSE' },
  ],
  exploring: [
    'AI Engineering & LLM Apps',
    'Agentic AI Workflows',
    'Full-Stack Architecture',
    'High-Performance UI/UX',
    'Scalable System Design',
  ],
};

/**
 * RAW_PROJECTS_DATA
 * Centralized registry of all engineering projects.
 * Each project contains explicit metadata (`createdAt`, `featured`, `order`).
 * To add a new project in the future, simply append or prepend it here with a valid `createdAt`.
 */
export const RAW_PROJECTS_DATA = [
  {
    id: 'bottlebrand',
    createdAt: '2026-02-01',
    featured: true,
    order: 1,
    name: 'BOTTLEBRAND',
    tagline: 'Architectural E-Commerce Platform & Hydration Objects',
    category: 'Full-Stack E-Commerce',
    year: '2026',
    role: 'Lead Full-Stack Engineer & Designer',
    status: 'LIVE DEMO',
    shortDescription:
      'High-end editorial e-commerce platform for architectural Japanese steel bottles, featuring real-time bag state, Supabase RLS, and Stripe checkout.',
    fullDescription:
      'BottleBrand (SANTAI Objects) is an editorial e-commerce platform built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS 4. It features a monolithic 2D product deconstruction engine with Framer Motion 12, synchronized Zustand 5 bag persistence, secure Supabase authentication with PostgreSQL Row Level Security, Cloudinary image pipeline, and integrated Stripe payment processing.',
    overview:
      'BottleBrand was engineered as a high-end architectural e-commerce platform combining visceral product storytelling, kinetic 2D deconstruction animations, and production-grade full-stack commerce with Supabase and Stripe.',
    problem:
      'Luxury product storefronts frequently suffer from disconnected brand narratives, sluggish cart state synchronization, and complex checkout friction that degrades conversion rates.',
    solution:
      'Engineered a full-stack Next.js 15 commerce architecture featuring optimistic Zustand 5 bag caching, cryptographic Supabase Row Level Security for multi-tenant isolation, Cloudinary-optimized media pipelines, and seamless Stripe checkout integrations.',
    heroImage: '/images/projects/bottlebrand-hero.png',
    images: {
      webp: '/images/projects/bottlebrand-hero.webp',
      png: '/images/projects/bottlebrand-hero.png',
      jpg: '/images/projects/bottlebrand-hero.jpg',
      fallback: '/images/projects/bottlebrand-hero.png',
      alt: 'BottleBrand SANTAI Objects Architectural Hydration Platform',
      width: 1200,
      height: 750,
      aspectRatio: '16/10',
    },
    cardIcon: '🏺',
    technologies: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'Supabase',
      'Stripe',
      'Zustand 5',
      'Framer Motion 12',
      'Cloudinary',
      'Lenis',
      'Vercel',
    ],
    techStackSummary: ['Next.js 15', 'React 19', 'Supabase', 'Stripe', 'Tailwind CSS 4'],
    engineeringHighlights: [
      'Next.js 15 App Router with React 19 Server/Client boundaries & Lenis smooth scroll',
      'Supabase PostgreSQL multi-tenant database with Row Level Security & SSR Auth',
      'Secure Stripe checkout integration with server-side webhook signature verification',
      'Cinematic 2D product deconstruction & layout transforms powered by Framer Motion 12',
    ],
    technicalAnnotations: [
      { id: 'next', label: 'NEXT.JS 15', sub: 'React 19 App Router', position: 'top-left' },
      { id: 'motion', label: 'MOTION 12', sub: '2D Deconstruction', position: 'top-right' },
      { id: 'db', label: 'SUPABASE RLS', sub: 'PostgreSQL Multi-tenant', position: 'bottom-left' },
      { id: 'stripe', label: 'STRIPE ENGINE', sub: 'Secure Webhooks', position: 'bottom-right' },
    ],
    engineeringDomains: [
      {
        number: '01',
        domain: 'FRONTEND ARCHITECTURE',
        stack: 'Next.js 15 • React 19 • Tailwind CSS 4 • Lenis',
        description:
          'Engineered an editorial e-commerce layout utilizing React 19 Server Components for instant initial page delivery and client-side Lenis inertia scrolling.',
      },
      {
        number: '02',
        domain: 'COMMERCE & PAYMENTS',
        stack: 'Stripe API • Webhook Handlers • Zustand 5',
        description:
          'Implemented an end-to-end checkout pipeline with Zustand persistent shopping bag state, currency conversions, and Stripe webhook signature validation.',
      },
      {
        number: '03',
        domain: 'DATABASE & AUTH',
        stack: 'Supabase • PostgreSQL RLS • Cloudinary',
        description:
          'Configured Supabase Row Level Security policies for user sessions, inventory management, and Cloudinary dynamic responsive image delivery.',
      },
    ],
    architecture: {
      description:
        'Next.js 15 hybrid server/client commerce architecture with persistent Zustand shopping bag state, Supabase PostgreSQL data persistence with RLS, Cloudinary media pipeline, and Stripe payment processing.',
      nodes: [
        {
          id: 'client',
          label: 'Editorial Storefront UI',
          role: 'Next.js 15 / React 19 App Router',
          details: 'Product showcase, stage-by-stage 2D deconstruction, and quick-add bag drawer.',
          type: 'client',
          protocol: 'React Server Actions / Hydration',
        },
        {
          id: 'state',
          label: 'Zustand 5 Bag Store',
          role: 'Client Shopping Bag & Currency',
          details: 'Optimistic cart mutations, subtotal calculation, and cross-tab storage sync.',
          type: 'service',
          protocol: 'In-Memory / LocalStorage',
        },
        {
          id: 'auth',
          label: 'Supabase SSR & DB',
          role: 'PostgreSQL Relational DB & RLS',
          details: 'Multi-tenant product inventory, user authentication, and admin CMS access.',
          type: 'backend',
          protocol: 'PostgREST / HTTPS',
        },
        {
          id: 'payments',
          label: 'Stripe Checkout Gateway',
          role: 'Stripe API & Webhook Verification',
          details: 'Hosted checkout sessions, automated tax calculations, and signed order fulfillment.',
          type: 'service',
          protocol: 'HTTPS / Webhooks',
        },
        {
          id: 'media',
          label: 'Cloudinary CDN',
          role: 'Asset Optimization Pipeline',
          details: 'Dynamic WebP transformations and responsive asset delivery.',
          type: 'storage',
          protocol: 'HTTP/2 Edge',
        },
      ],
      connections: [
        { from: 'client', to: 'state', label: 'Cart Dispatch' },
        { from: 'client', to: 'auth', label: 'SSR Auth' },
        { from: 'client', to: 'media', label: 'Asset Stream' },
        { from: 'state', to: 'payments', label: 'Checkout Session' },
        { from: 'payments', to: 'auth', label: 'Signed Webhook' },
      ],
    },
    engineeringDecisions: [
      {
        title: 'Next.js 15 App Router with React 19 Server Components',
        decision:
          'Leveraged Next.js 15 App Router to statically pre-render product landing pages while keeping interactive micro-animations and cart state in isolated client boundaries.',
        why: 'Eliminates client-side bundle bloat on static editorial sections while guaranteeing instant first contentful paint and high SEO discoverability.',
        alternative: 'Single Page Client-only React SPA',
        outcome: 'Sub-second initial page hydration with zero layout reflows.',
      },
      {
        title: 'Cryptographic Stripe Webhook Verification',
        decision:
          'Enforced cryptographic webhook signature validation on all order completion events rather than trusting client-side callbacks.',
        why: 'Guarantees tamper-proof payment confirmation and accurate database inventory synchronization.',
        alternative: 'Client-side confirmation redirect handlers',
        outcome: '100% reliable order reconciliation without race conditions.',
      },
      {
        title: 'Zustand 5 with Synchronized Storage',
        decision:
          'Utilized Zustand 5 with local storage middleware and cross-tab storage event listeners for client-side shopping bag state.',
        why: 'Instantaneous zero-latency cart updates without blocking server roundtrips while keeping cart state in sync across multiple browser tabs.',
        alternative: 'Server-side session cart database roundtrips',
        outcome: 'Zero-latency cart interactions with persistent offline recovery.',
      },
    ],
    tradeOffs: [
      {
        area: 'Rendering Architecture',
        chosen: 'Next.js 15 Server & Client Hybrid',
        alternative: 'Pure Client SPA',
        reason: 'Optimal SEO indexing for product catalog combined with instant client-side cart interactions.',
        compromise: 'Requires disciplined separation of server-only utilities and client hooks.',
      },
      {
        area: 'Checkout Strategy',
        chosen: 'Stripe Hosted Checkout Sessions',
        alternative: 'Custom In-Page Payment Elements',
        reason: 'Zero PCI compliance liability and built-in support for global payment methods (Apple Pay, Google Pay, Cards).',
        compromise: 'Redirect step during final checkout transaction.',
      },
    ],
    challenges: [
      {
        challenge:
          'Synchronizing smooth inertia scrolling (Lenis) with pinned 2D product deconstruction stages without layout jitter.',
        solution:
          'Connected Lenis scroll delta listeners directly with hardware-accelerated Framer Motion scroll-driven layout transforms.',
        impact: 'Smooth 60fps cinematic product storytelling across all viewports.',
      },
      {
        challenge:
          'Ensuring responsive multi-currency calculations and cart state remained synchronized across open browser windows.',
        solution:
          'Subscribed Zustand store directly to window storage events with custom serialization.',
        impact: 'Instantaneous real-time cart state synchronization across tabs.',
      },
    ],
    approach:
      'I engineered BottleBrand (SANTAI Objects) as an editorial digital flagbearer for sustainable Japanese steel hydration objects. Built with Next.js 15 and React 19, the application unifies editorial typography, kinetic product deconstruction, and robust full-stack e-commerce. To guarantee high performance, I leveraged React 19 Server Components for static product descriptions, Zustand for instant client-side cart updates, Supabase PostgreSQL RLS for multi-tenant data safety, and Stripe for secure checkout workflows.',
    designDecisions:
      'Created an architectural, brutalist-inspired luxury aesthetic using warm canvas tones, matte obsidian contrasts, editorial serifs, and interactive 2D component deconstruction that elevates physical hydration vessels into collectible design objects.',
    results:
      'Delivered a fully deployed full-stack e-commerce platform on Vercel featuring sub-second page transitions, automated inventory management with Supabase, integrated Stripe checkout, and 60fps kinetic animations.',
    whatILearned:
      'Deepened mastery of Next.js 15 App Router architecture, managing complex scroll-driven 2D layout choreography with Framer Motion 12, and building resilient, secure e-commerce pipelines with Stripe webhooks and PostgreSQL Row Level Security.',
    features: [
      'Architectural editorial product showcase with multi-product catalog',
      'Interactive 2D product deconstruction & stage-by-stage metallurgy tour',
      'Optimistic shopping bag drawer with live subtotal calculation',
      'Multi-currency support and real-time product search (⌘K shortcut)',
      'Supabase PostgreSQL backend with Row Level Security policies',
      'Secure Stripe payment checkout & webhook order synchronization',
      'Admin CMS portal with Cloudinary image management',
    ],
    links: {
      demo: 'https://bottlebrand-web.vercel.app/',
      github: 'https://github.com/RafisGit/MyBrand',
    },
    accentColor: '#10b981',
  },
  {
    id: 'valtorn-web',
    createdAt: '2024-10-01',
    featured: true,
    order: 2,
    name: 'VALTORN',
    tagline: 'Modern Web Platform & Digital Interface',
    category: 'Full-Stack Web',
    year: '2024',
    role: 'Full-Stack Engineer',
    status: 'LIVE DEMO',
    shortDescription:
      'A sleek, high-performance web platform engineered for optimal engagement, lightning-fast rendering, and modular component architecture.',
    fullDescription:
      'Valtorn Web is an engineered digital platform delivering fluid micro-interactions, responsive design systems, and optimized asset delivery. Built with React, TypeScript, Node.js, and modern CSS architecture, it showcases high-performance frontend state and modern design aesthetics.',
    overview:
      'Valtorn Web was engineered as a high-performance digital showcase designed to demonstrate modular component design, smooth 60fps micro-interactions, and instant edge asset delivery without the weight of monolithic UI libraries.',
    problem:
      'Modern web applications often suffer from excessive bundle bloat, sluggish layout rendering on mobile devices, and rigid component structures that hinder agile feature iteration.',
    solution:
      'Architected a modular component system powered by native CSS custom properties, hardware-accelerated Framer Motion transforms, and route-level code splitting deployed to Vercel global edge nodes.',
    heroImage: '/images/projects/valtorn-web-hero.png',
    images: {
      webp: '/images/projects/valtorn-web-hero.webp',
      png: '/images/projects/valtorn-web-hero.png',
      jpg: '/images/projects/valtorn-web-hero.jpg',
      fallback: '/images/projects/valtorn-web-hero.png',
      alt: 'VALTORN Web Platform Showcase',
      width: 1200,
      height: 750,
      aspectRatio: '16/10',
    },
    cardIcon: '⚡',
    technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Framer Motion', 'REST API', 'Vercel'],
    techStackSummary: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    engineeringHighlights: [
      'Modular React & TypeScript component design system',
      'Sub-100ms asset delivery via Vercel edge caching',
      'Hardware-accelerated 60fps Framer Motion pipeline',
      'Near-zero style overhead using custom token architecture',
    ],
    technicalAnnotations: [
      { id: 'ui', label: 'MODULAR UI', sub: 'React / TypeScript', position: 'top-left' },
      { id: 'motion', label: 'GPU MOTION', sub: 'Framer 60fps', position: 'top-right' },
      { id: 'api', label: 'REST SERVICES', sub: 'Node.js / Express', position: 'bottom-left' },
      { id: 'edge', label: 'EDGE CACHE', sub: 'Vercel Global CDN', position: 'bottom-right' },
    ],
    engineeringDomains: [
      {
        number: '01',
        domain: 'FRONTEND ARCHITECTURE',
        stack: 'React • TypeScript • Tailwind CSS',
        description: 'Engineered a modular design system using native CSS custom properties and typed props for flexible UI scaling with zero layout shift.',
      },
      {
        number: '02',
        domain: 'EDGE & ASSET PIPELINE',
        stack: 'Vercel Edge • Brotli Compression',
        description: 'Optimized static build delivery across global CDN edge nodes, achieving sub-100ms first contentful paint and instant asset hydration.',
      },
      {
        number: '03',
        domain: 'INTERACTION ENGINE',
        stack: 'Framer Motion • GPU Compositing',
        description: 'Configured hardware-accelerated transforms and physics-based spring curves for responsive micro-interactions at constant 60fps.',
      },
    ],
    architecture: {
      description:
        'Client-side Single Page Application (SPA) communicating with lightweight REST services and deployed across global edge nodes for sub-100ms asset delivery.',
      nodes: [
        {
          id: 'client',
          label: 'Client UI Layer',
          role: 'React SPA / TypeScript',
          details: 'Modular design system, component hierarchy, and responsive layouts.',
          type: 'client',
          protocol: 'Virtual DOM',
        },
        {
          id: 'motion',
          label: 'Animation Engine',
          role: 'Framer Motion / CSS Tokens',
          details: 'Hardware-accelerated transforms and layout transition pipelines.',
          type: 'service',
          protocol: 'GPU Compositor',
        },
        {
          id: 'api',
          label: 'Backend Services',
          role: 'Node.js / Express REST API',
          details: 'Endpoint routing, payload validation, and request throttling.',
          type: 'backend',
          protocol: 'HTTPS / JSON',
        },
        {
          id: 'edge',
          label: 'Edge Delivery & CDN',
          role: 'Vercel Edge Network',
          details: 'Global caching, asset compression (Brotli/Gzip), and DNS routing.',
          type: 'storage',
          protocol: 'HTTP/2 Edge',
        },
      ],
      connections: [
        { from: 'client', to: 'motion', label: 'State Triggers' },
        { from: 'client', to: 'api', label: 'REST Fetch' },
        { from: 'api', to: 'edge', label: 'Edge Cache' },
      ],
    },
    engineeringDecisions: [
      {
        title: 'Custom Tokenized Design System',
        decision:
          'Engineered a lightweight CSS variable token system alongside Tailwind CSS rather than importing bulky component libraries (e.g., MUI or Chakra UI).',
        why: 'Eliminates >65KB of runtime style parsing and enables instantaneous theme switching with zero runtime JS style recalculation.',
        alternative: 'Material UI / Chakra UI',
        outcome: 'Near-zero style overhead and complete control over design tokens and animations.',
      },
      {
        title: 'Hardware-Accelerated Animation Pipeline',
        decision:
          'Restricted all interactive animations strictly to transform (translate3d/scale) and opacity with will-change hints.',
        why: 'Prevents CPU-bound browser repaints and layout reflows, ensuring smooth 60fps frame rates on lower-end mobile hardware.',
        alternative: 'CSS margin/top animation or canvas loops',
        outcome: 'Zero frame drop during complex layout and page transitions.',
      },
      {
        title: 'Route-Level Code Splitting',
        decision: 'Implemented dynamic route chunking and lazy-loaded media assets.',
        why: 'Ensures the critical rendering path receives the minimal initial JS bundle.',
        alternative: 'Single monolithic bundle',
        outcome: 'Fast First Contentful Paint (FCP) and high responsiveness on mobile.',
      },
    ],
    tradeOffs: [
      {
        area: 'Rendering Architecture',
        chosen: 'Client-Side SPA on Edge CDN',
        alternative: 'Full SSR / Next.js',
        reason: 'High client-side interactivity with instantaneous state transitions and zero server execution cold starts.',
        compromise: 'Initial HTML lacks pre-rendered content before hydration.',
      },
      {
        area: 'Styling Layer',
        chosen: 'Utility CSS + CSS Variables',
        alternative: 'Runtime CSS-in-JS (Emotion/Styled Components)',
        reason: 'Zero runtime style injection overhead and superior CSS caching.',
        compromise: 'Requires strict class naming discipline and token structure.',
      },
    ],
    challenges: [
      {
        challenge: 'Eliminating layout shifts during dynamic asset loading and theme toggling.',
        solution: 'Enforced explicit aspect-ratio properties and CSS custom variable scoping on root element before render.',
        impact: 'Reduced Cumulative Layout Shift (CLS) to near zero.',
      },
      {
        challenge: 'Ensuring fluid responsiveness across ultra-narrow (320px) to ultra-wide (2560px) viewports.',
        solution: 'Implemented fluid typography using clamp() scales and CSS Grid auto-fit templates.',
        impact: 'Seamless visual hierarchy across all device form factors without breakpoint jitter.',
      },
    ],
    approach:
      'I architected Valtorn Web around a strict separation of concerns: presentation primitives powered by typed props and CSS variables, layout coordination handled by responsive CSS Grid/Flexbox, and motion effects orchestrated by GPU-accelerated Framer Motion transforms. By deploying static assets to Vercel global edge nodes with Brotli compression, the application achieves instantaneous hydration and smooth 60fps interaction.',
    designDecisions:
      'Adopted a cinematic dark aesthetic with precision typography scales (Space Grotesk + Manrope), architectural corner accents, and subtle fluid hover micro-interactions that draw attention to digital products without cluttering usability.',
    results:
      'Delivered a fully deployed, high-performance web platform featuring modular component reusability, sub-100ms edge cache hits, and zero cumulative layout shifts during dynamic theme switching.',
    whatILearned:
      'Deepened my understanding of browser rendering layers, compositor-only GPU animations, and how lightweight CSS variable token architectures can outperform bulky third-party UI component libraries.',
    features: [
      'Modular & reusable component design system',
      'Dynamic routing and fluid responsive layout structures',
      'Subtle interactive micro-animations and page transitions',
      'Optimized asset loading for high Lighthouse performance metrics',
      'Mobile-first responsive architecture',
    ],
    links: {
      demo: 'https://valtornweb.vercel.app/',
      github: 'https://github.com/RafisGit/valtornweb',
    },
    accentColor: '#3b82f6',
  },
  {
    id: 'cv-maker',
    createdAt: '2024-06-01',
    featured: true,
    order: 3,
    name: 'CV Maker',
    tagline: 'Professional Resume Engineering Platform',
    category: 'Full-Stack & Cloud',
    year: '2024',
    role: 'Full-Stack Engineer & Cloud Architect',
    status: 'LIVE DEMO',
    shortDescription:
      'Production-grade resume builder featuring live real-time split preview, Zustand auto-save state, multi-template rendering, and high-fidelity PDF export.',
    fullDescription:
      'A comprehensive resume engineering suite built with Next.js (App Router), TypeScript, Tailwind CSS, and Supabase. Features real-time responsive split preview, Zustand state persistence, structured JSON schema export/import, multi-template styling (Modern, Minimal, Professional), and pixel-accurate PDF generation using jsPDF & html2canvas.',
    overview:
      'CV Maker is a full-stack resume engineering application that streamlines professional CV authoring with real-time synchronized previewing, persistent cloud and offline caching, and high-fidelity ATS-friendly document export.',
    problem:
      'Job seekers frequently encounter clunky form-based resume editors that suffer from data loss during unexpected crashes, inflexible formatting across devices, and poor PDF export fidelity.',
    solution:
      'Engineered an instant split-pane workspace with Zustand optimistic state caching, Supabase PostgreSQL persistence with Row Level Security, and a dedicated in-browser vector PDF rendering pipeline.',
    heroImage: '/images/projects/cv-maker-hero.png',
    images: {
      webp: '/images/projects/cv-maker-hero.webp',
      png: '/images/projects/cv-maker-hero.png',
      jpg: '/images/projects/cv-maker-hero.jpg',
      fallback: '/images/projects/cv-maker-hero.png',
      alt: 'CV Maker Resume Platform Showcase',
      width: 1200,
      height: 750,
      aspectRatio: '16/10',
    },
    cardIcon: '📄',
    technologies: [
      'Next.js (App Router)',
      'TypeScript',
      'Tailwind CSS',
      'Supabase Auth',
      'Supabase DB (PostgreSQL)',
      'Zustand',
      'jsPDF',
      'html2canvas',
    ],
    techStackSummary: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    engineeringHighlights: [
      'Client-side vector PDF rendering via jsPDF & html2canvas',
      'Zustand optimistic state cache with zero keystroke lag',
      'Supabase PostgreSQL multi-tenant isolation via Row Level Security',
      'React 18 useDeferredValue for fluid split-preview typing',
    ],
    technicalAnnotations: [
      { id: 'next', label: 'APP ROUTER', sub: 'Next.js 14 / React 18', position: 'top-left' },
      { id: 'state', label: 'ZUSTAND CACHE', sub: 'Optimistic State', position: 'top-right' },
      { id: 'auth', label: 'SUPABASE RLS', sub: 'PostgreSQL Multi-tenant', position: 'bottom-left' },
      { id: 'pdf', label: 'VECTOR PDF', sub: 'Client jsPDF Engine', position: 'bottom-right' },
    ],
    engineeringDomains: [
      {
        number: '01',
        domain: 'FRONTEND ARCHITECTURE',
        stack: 'Next.js 14 • React 18 • TypeScript',
        description: 'Engineered split-view live editor utilizing React 18 useDeferredValue to isolate expensive document rerendering from typing keystrokes.',
      },
      {
        number: '02',
        domain: 'DATA & MULTI-TENANCY',
        stack: 'Supabase • PostgreSQL • Row Level Security',
        description: 'Implemented strict database Row Level Security policies ensuring cryptographically isolated user workspaces and document privacy.',
      },
      {
        number: '03',
        domain: 'CLIENT VECTOR RENDERING',
        stack: 'jsPDF • html2canvas • Canvas API',
        description: 'Architected browser-side vector document rendering pipeline, converting dynamic DOM nodes to print-ready A4 PDFs without server compute overhead.',
      },
    ],
    architecture: {
      description:
        'Next.js App Router hybrid client/server architecture with persistent state synchronization, secure multi-tenant Supabase database, and client-side PDF vectorization engine.',
      nodes: [
        {
          id: 'client',
          label: 'Next.js App Router',
          role: 'React 18 / Server & Client Components',
          details: 'Split-view editor, dynamic form validation, and live template previewer.',
          type: 'client',
          protocol: 'React Server Actions / Hydration',
        },
        {
          id: 'state',
          label: 'Zustand State Cache',
          role: 'Client Store & LocalStorage Sync',
          details: 'Zero-latency UI updates with optimistic local draft auto-saving.',
          type: 'service',
          protocol: 'In-Memory / LocalStorage',
        },
        {
          id: 'auth',
          label: 'Supabase Auth & RLS',
          role: 'JWT Session & Identity Provider',
          details: 'User session verification and Row Level Security tenant isolation.',
          type: 'service',
          protocol: 'OAuth 2.0 / JWT',
        },
        {
          id: 'db',
          label: 'PostgreSQL Database',
          role: 'Supabase Cloud Relational DB',
          details: 'Structured resume JSON schema storage and user profile records.',
          type: 'backend',
          protocol: 'PostgREST / HTTPS',
        },
        {
          id: 'pdf',
          label: 'PDF Generation Pipeline',
          role: 'jsPDF + html2canvas Engine',
          details: 'DOM node vectorization, print media stylesheet calculation, and PDF buffer generation.',
          type: 'storage',
          protocol: 'Client Canvas API',
        },
      ],
      connections: [
        { from: 'client', to: 'state', label: 'Live Dispatch' },
        { from: 'client', to: 'auth', label: 'JWT Handshake' },
        { from: 'auth', to: 'db', label: 'RLS Query' },
        { from: 'state', to: 'pdf', label: 'Render Tree' },
      ],
    },
    engineeringDecisions: [
      {
        title: 'Zustand with Local Storage Persistence',
        decision: 'Selected Zustand over Redux Toolkit for resume draft state management.',
        why: 'Zustand provides a minimal ~1KB bundle footprint, removes boilerplate actions/reducers, and allows effortless persistence middleware for instant offline recovery.',
        alternative: 'Redux Toolkit / React Context API',
        outcome: 'Zero input lag during fast keystrokes with instant auto-save recovery.',
      },
      {
        title: 'Client-Side PDF Generation Pipeline',
        decision:
          'Implemented DOM-to-Canvas rasterization using html2canvas & jsPDF directly in the client browser rather than running a headless Chromium (Puppeteer) cluster.',
        why: 'Eliminates expensive cloud compute costs, avoids container cold-start delays, and ensures private user resume data remains in-browser.',
        alternative: 'Puppeteer / Playwright microservice',
        outcome: 'Sub-second PDF generation with zero server hosting overhead.',
      },
      {
        title: 'Supabase Row Level Security (RLS)',
        decision: 'Secured database queries with granular PostgreSQL RLS policies keyed to auth.uid().',
        why: 'Guarantees strict multi-tenant data isolation at the database layer rather than relying exclusively on application-layer checks.',
        alternative: 'Custom Node.js ORM middleware validation',
        outcome: 'Rock-solid user data isolation and simplified backend architecture.',
      },
    ],
    tradeOffs: [
      {
        area: 'PDF Export Engine',
        chosen: 'Client-Side Canvas/PDF Vectorization',
        alternative: 'Server-side Headless Chrome (Puppeteer)',
        reason: 'Zero server compute overhead, private client-side processing, and instant document downloads.',
        compromise: 'Requires careful CSS pagination management to avoid page break clipping across multiple pages.',
      },
      {
        area: 'State Architecture',
        chosen: 'Zustand Optimistic Updates',
        alternative: 'Direct DB Roundtrip on Keystroke',
        reason: 'Instantaneous UI responsiveness without network throttling or database write contention.',
        compromise: 'Requires debounced background sync to resolve potential conflict states.',
      },
    ],
    challenges: [
      {
        challenge: 'Preventing text clipping and broken sections during multi-page PDF generation.',
        solution: 'Calculated exact page height thresholds in print CSS and dynamically injected page-break-inside: avoid rules across section blocks.',
        impact: 'Clean, professional multi-page PDF document exports.',
      },
      {
        challenge: 'Maintaining synchronized split preview rendering while typing large resume sections.',
        solution: 'Separated editor input fields with React 18 useDeferredValue to prioritize cursor responsiveness over heavy preview re-renders.',
        impact: 'Smooth 60fps typing experience even with lengthy resumes.',
      },
    ],
    approach:
      'I engineered CV Maker with an ergonomic split-pane workspace where state changes are immediately reflected in the live preview. To eliminate input latency, I integrated Zustand with localStorage auto-saving, separated heavy preview rerenders using React 18 useDeferredValue, and implemented a client-side vector rendering pipeline with jsPDF & html2canvas for instant, private document generation without server costs.',
    designDecisions:
      'Designed a clean, distraction-free dual-pane interface on desktop with a seamless tabbed toggle on mobile, providing multiple professionally styled templates (Modern, Minimal, Professional) with print-accurate typography and spacing controls.',
    results:
      'Delivered a production-ready resume builder deployed on Vercel with authenticated Supabase persistence, sub-second vector PDF generation, and complete client-side data privacy.',
    whatILearned:
      'Mastered the nuances of client-side vector document rendering (handling page breaks, fonts, and DOM-to-canvas pixel scaling) and implementing cryptographic multi-tenant data isolation with PostgreSQL Row Level Security.',
    features: [
      'Persistent draft save & load with Supabase cloud DB and local Zustand cache',
      'Pixel-accurate template rendering with fine typography and spacing control',
      'Live synchronized split preview with instant formatting updates',
      'High-fidelity PDF document generation engine (jsPDF + html2canvas)',
      'Multi-step builder covering Experience, Education, Skills, Projects, and Certifications',
      'Secure authentication and session management powered by Supabase',
    ],
    links: {
      demo: 'https://cvmakerweb.vercel.app/',
      github: 'https://github.com/RafisGit/CV-Maker',
    },
    accentColor: '#60a5fa',
  },
  {
    id: 'ai-c-vmaker',
    createdAt: '2024-03-01',
    featured: true,
    order: 4,
    name: 'Agentic AI Job Assistant',
    tagline: 'Intelligent Career & Content Generation Suite',
    category: 'Agentic AI & Web',
    year: '2024',
    role: 'AI Systems & Frontend Engineer',
    status: 'LIVE DEMO',
    shortDescription:
      'Intelligent career suite powered by OpenAI APIs for automated resume enhancement, smart bullet-point generation, and instant ATS analysis.',
    fullDescription:
      'An AI-driven career suite designed to empower engineers and job seekers. Utilizing OpenAI NLP models, it parses role requirements to craft impactful bullet points, provides automated ATS formatting recommendations, and allows instant high-quality PDF downloads.',
    overview:
      'AI Resume Suite accelerates professional resume drafting by combining structured LLM generation with real-time ATS optimization heuristics to help candidates pass screening filters.',
    problem:
      'Software engineers and job applicants often struggle to articulate their technical accomplishments into quantifiable, action-verb-driven bullet points that align with job descriptions and ATS parsers.',
    solution:
      'Engineered an AI content pipeline with structured JSON schema prompting, client-side ATS heuristic scoring, and instant one-click optimization workflows to generate recruiter-focused bullet points.',
    heroImage: '/images/projects/ai-c-vmaker-hero.png',
    images: {
      webp: '/images/projects/ai-c-vmaker-hero.webp',
      png: '/images/projects/ai-c-vmaker-hero.png',
      jpg: '/images/projects/ai-c-vmaker-hero.jpg',
      fallback: '/images/projects/ai-c-vmaker-hero.png',
      alt: 'AI Resume Suite Showcase',
      width: 1200,
      height: 750,
      aspectRatio: '16/10',
    },
    cardIcon: '✨',
    technologies: ['React', 'Next.js', 'OpenAI API', 'TypeScript', 'Tailwind CSS', 'NLP Pipelines'],
    techStackSummary: ['React', 'Next.js', 'OpenAI API', 'Tailwind CSS'],
    engineeringHighlights: [
      'Edge API proxy architecture for secure OpenAI key isolation',
      'Deterministic client-side ATS scoring heuristics & keyword analyzer',
      'Strict JSON schema prompt engineering with few-shot constraints',
      'Optimistic UI state & asynchronous response stream handling',
    ],
    technicalAnnotations: [
      { id: 'react', label: 'REACT 18', sub: 'TypeScript Client', position: 'top-left' },
      { id: 'proxy', label: 'EDGE PROXY', sub: 'Key Isolation Layer', position: 'top-right' },
      { id: 'llm', label: 'OPENAI LLM', sub: 'Few-Shot Structured JSON', position: 'bottom-left' },
      { id: 'ats', label: 'ATS ENGINE', sub: 'Client Heuristic Scorer', position: 'bottom-right' },
    ],
    engineeringDomains: [
      {
        number: '01',
        domain: 'FRONTEND ARCHITECTURE',
        stack: 'React • TypeScript • Tailwind CSS',
        description: 'Engineered an interactive applicant resume analyzer with client-side keyword density mapping, section completeness scoring, and instant diff previews.',
      },
      {
        number: '02',
        domain: 'EDGE API PROXY & SECURITY',
        stack: 'Vercel Edge Functions • API Gateway',
        description: 'Architected edge proxy route layer isolating OpenAI private API keys, validating incoming JSON payloads, and preventing unauthorized endpoint abuse.',
      },
      {
        number: '03',
        domain: 'AGENTIC PROMPT SYSTEM',
        stack: 'OpenAI API • JSON Schema • NLP Heuristics',
        description: 'Formulated strict JSON schema system prompts with few-shot industry benchmarks to produce deterministic, recruiter-optimized engineering bullet points.',
      },
    ],
    architecture: {
      description:
        'Client application communicating with Vercel Edge API routes that proxy structured prompts to OpenAI LLM endpoints with response validation and client-side scoring heuristics.',
      nodes: [
        {
          id: 'client',
          label: 'Interactive UI Studio',
          role: 'React / Next.js / TypeScript',
          details: 'Role selector, prompt configuration panel, and real-time content diff viewer.',
          type: 'client',
          protocol: 'Client Component Tree',
        },
        {
          id: 'edge',
          label: 'Edge API Gateway',
          role: 'Vercel Edge Functions',
          details: 'Request validation, rate limiting, and API key protection.',
          type: 'service',
          protocol: 'Edge Runtime / HTTPS',
        },
        {
          id: 'ai',
          label: 'OpenAI LLM Engine',
          role: 'OpenAI GPT Models / JSON Mode',
          details: 'Natural language parsing, context enrichment, and metric-driven bullet point generation.',
          type: 'ai',
          protocol: 'Streaming SSE / JSON',
        },
        {
          id: 'ats',
          label: 'ATS Analysis Module',
          role: 'Client-Side NLP Heuristics',
          details: 'Keyword density calculation, action verb scoring, and readability index validation.',
          type: 'service',
          protocol: 'In-Memory Analysis',
        },
        {
          id: 'export',
          label: 'Document Export Pipeline',
          role: 'PDF / TXT Formatting Engine',
          details: 'ATS-compatible plain text formatting and structured PDF document generation.',
          type: 'storage',
          protocol: 'DOM Canvas / Blob',
        },
      ],
      connections: [
        { from: 'client', to: 'edge', label: 'Prompt Request' },
        { from: 'edge', to: 'ai', label: 'Structured Completion' },
        { from: 'ai', to: 'client', label: 'Parsed Response' },
        { from: 'client', to: 'ats', label: 'Score Analysis' },
        { from: 'client', to: 'export', label: 'Document Build' },
      ],
    },
    engineeringDecisions: [
      {
        title: 'Structured JSON Prompt Engineering',
        decision: 'Configured LLM prompts with strict JSON schemas and system role constraints.',
        why: 'Eliminates conversational filler and hallucinatory preambles, guaranteeing clean, machine-parseable data ready for immediate UI rendering.',
        alternative: 'Freeform text prompting with regex parsing',
        outcome: 'Zero parsing errors on model responses.',
      },
      {
        title: 'Edge Function Proxy Architecture',
        decision: 'Routed OpenAI requests through server-side Edge API routes with environment variable secrets.',
        why: 'Prevents client-side exposure of OpenAI API keys while keeping request latency under 50ms at the edge.',
        alternative: 'Direct client-side API calls',
        outcome: 'Secure credential isolation without requiring a heavy standalone backend server.',
      },
      {
        title: 'Deterministic Fallback Heuristics',
        decision: 'Created localized algorithmic scoring rules for keyword density and readability alongside AI generations.',
        why: 'Allows the user to receive immediate ATS optimization feedback even when offline or awaiting LLM responses.',
        alternative: 'Calling LLM for every minor scoring check',
        outcome: 'Instantaneous UI feedback and reduced token usage costs.',
      },
    ],
    tradeOffs: [
      {
        area: 'Backend Architecture',
        chosen: 'Edge Serverless Functions',
        alternative: 'Dedicated Python FastAPI Backend',
        reason: 'Zero infrastructure maintenance, global low-latency execution, and instant scaling.',
        compromise: 'Limited to standard Node/V8 edge runtimes (no heavy local Python ML libraries).',
      },
      {
        area: 'Response Processing',
        chosen: 'Structured Single-Call Generation',
        alternative: 'Multi-Agent Iterative Critique Loops',
        reason: 'Provides rapid 1-2s turnarounds for optimal user interaction flow.',
        compromise: 'Requires well-tuned single-shot prompt instructions with clear few-shot examples.',
      },
    ],
    challenges: [
      {
        challenge: 'Preventing LLM latency from causing a frozen or unresponsive UI state.',
        solution: 'Implemented optimistic loading skeletons and asynchronous stream handling with error boundaries.',
        impact: 'Responsive, fluid user experience during AI generation cycles.',
      },
      {
        challenge: 'Ensuring generated bullet points adhere to strict XYZ formula (Accomplished [X] as measured by [Y], by doing [Z]).',
        solution: 'Embedded few-shot engineering examples directly in system prompt instructions.',
        impact: 'High-quality, quantifiable bullet points that resonate with technical recruiters.',
      },
    ],
    approach:
      'I architected an intelligent career engineering pipeline combining Next.js, OpenAI APIs, and client-side NLP heuristics. To ensure reliable, structured outputs, I enforced strict JSON schemas with few-shot engineering benchmarks on model prompts. To protect API credentials and maintain low latency, I routed completions through Vercel Edge API proxies with optimistic UI loading states.',
    designDecisions:
      'Created a focused, high-contrast studio layout featuring real-time diff comparison between original user drafts and AI-enhanced bullet points, accompanied by instantaneous keyword density and ATS readiness indicators.',
    results:
      'Delivered a live, functional AI career assistant enabling software engineers to transform raw project notes into quantifiable, ATS-optimized bullet points in seconds with secure key isolation.',
    whatILearned:
      'Gained deep practical expertise in prompt engineering with deterministic JSON schemas, isolating secrets behind edge serverless proxies, and building resilient UIs that handle variable LLM generation latencies gracefully.',
    features: [
      'AI-powered bullet-point generation tailored to specific engineering roles',
      'Real-time content scoring and ATS formatting feedback',
      'Custom section customization and dynamic layout engine',
      'One-click PDF generation and seamless export pipeline',
      'Distraction-free, minimal user interface designed for productivity',
    ],
    links: {
      demo: 'https://ai-c-vmaker.vercel.app/',
      github: 'https://github.com/RafisGit/ai-c-vmaker',
    },
    accentColor: '#38bdf8',
  },
];

/**
 * Deterministic Newest-First Project Sorter & Dynamic Number Generator:
 * 1. Automatically sorts projects by `createdAt` (descending: newest first).
 * 2. Injects dynamic `number` ('01', '02', '03', ...) based on sorted position,
 *    guaranteeing that ANY project added in the future automatically assumes
 *    the top position (01/N) without manual edits across components.
 */
export const getSortedProjects = (projects) => {
  return [...projects]
    .sort((a, b) => {
      const timeB = new Date(b.createdAt || '2024-01-01').getTime();
      const timeA = new Date(a.createdAt || '2024-01-01').getTime();
      return timeB - timeA;
    })
    .map((project, idx) => ({
      ...project,
      number: String(idx + 1).padStart(2, '0'),
    }));
};

export const PROJECTS_DATA = getSortedProjects(RAW_PROJECTS_DATA);

export const SKILLS_DATA = [
  {
    category: 'FRONTEND',
    description: 'Creating responsive, accessible, and cinematic web interfaces.',
    skills: [
      { name: 'React', projectIds: ['bottlebrand', 'valtorn-web', 'cv-maker', 'ai-c-vmaker'] },
      { name: 'Next.js', projectIds: ['bottlebrand', 'cv-maker', 'ai-c-vmaker'] },
      { name: 'TypeScript', projectIds: ['bottlebrand', 'valtorn-web', 'cv-maker', 'ai-c-vmaker'] },
      { name: 'JavaScript (ES6+)', projectIds: ['bottlebrand', 'valtorn-web', 'cv-maker', 'ai-c-vmaker'] },
      { name: 'Tailwind CSS', projectIds: ['bottlebrand', 'valtorn-web', 'cv-maker', 'ai-c-vmaker'] },
      { name: 'HTML5 & CSS3', projectIds: ['bottlebrand', 'valtorn-web', 'cv-maker', 'ai-c-vmaker'] },
      { name: 'Framer Motion', projectIds: ['bottlebrand', 'valtorn-web'] },
      { name: 'GSAP', projectIds: ['valtorn-web'] },
    ],
  },
  {
    category: 'BACKEND',
    description: 'Architecting scalable server-side systems and APIs.',
    skills: [
      { name: 'Node.js', projectIds: ['valtorn-web'] },
      { name: 'Express.js', projectIds: ['valtorn-web'] },
      { name: 'Python', projectIds: [] },
      { name: 'Supabase', projectIds: ['bottlebrand', 'cv-maker'] },
      { name: 'REST APIs', projectIds: ['bottlebrand', 'valtorn-web', 'cv-maker', 'ai-c-vmaker'] },
      { name: 'SQL & Databases', projectIds: ['bottlebrand', 'cv-maker'] },
      { name: 'Stripe API', projectIds: ['bottlebrand'] },
      { name: 'MongoDB', projectIds: [] },
    ],
  },
  {
    category: 'AI & INTELLIGENCE',
    description: 'Integrating LLMs, prompt engineering, and intelligent agents.',
    skills: [
      { name: 'OpenAI APIs', projectIds: ['ai-c-vmaker'] },
      { name: 'LLM Integration', projectIds: ['ai-c-vmaker'] },
      { name: 'Prompt Engineering', projectIds: ['ai-c-vmaker'] },
      { name: 'RAG Concepts', projectIds: ['ai-c-vmaker'] },
      { name: 'Agentic Workflows', projectIds: [] },
    ],
  },
  {
    category: 'TOOLS & DEVOPS',
    description: 'Version control, developer tooling, and modern deployment.',
    skills: [
      { name: 'Git & GitHub', projectIds: ['bottlebrand', 'valtorn-web', 'cv-maker', 'ai-c-vmaker'] },
      { name: 'Docker', projectIds: [] },
      { name: 'Vercel', projectIds: ['bottlebrand', 'valtorn-web', 'cv-maker', 'ai-c-vmaker'] },
      { name: 'Postman', projectIds: ['bottlebrand', 'valtorn-web', 'cv-maker'] },
      { name: 'VS Code', projectIds: ['bottlebrand', 'valtorn-web', 'cv-maker', 'ai-c-vmaker'] },
      { name: 'CI/CD Basics', projectIds: ['valtorn-web'] },
      { name: 'npm / yarn', projectIds: ['bottlebrand', 'valtorn-web', 'cv-maker', 'ai-c-vmaker'] },
    ],
  },
  {
    category: 'CORE CS FUNDAMENTALS',
    description: 'Algorithmic efficiency and solid engineering principles.',
    skills: [
      { name: 'Data Structures & Algorithms', projectIds: [] },
      { name: 'Object-Oriented Programming (OOP)', projectIds: ['bottlebrand', 'cv-maker'] },
      { name: 'System Design Basics', projectIds: ['bottlebrand', 'cv-maker', 'ai-c-vmaker'] },
      { name: 'C++', projectIds: [] },
      { name: 'Java', projectIds: [] },
    ],
  },
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'DISCOVER',
    subtitle: 'Understanding the problem',
    description:
      'Analyze the domain requirements, user objectives, and technical constraints to establish a clear architectural roadmap.',
  },
  {
    number: '02',
    title: 'DESIGN',
    subtitle: 'Defining the experience',
    description:
      'Map out modular component hierarchies, user interaction flows, typography scales, and data models before coding.',
  },
  {
    number: '03',
    title: 'BUILD',
    subtitle: 'Engineering the solution',
    description:
      'Write clean, typed, modular code with robust state management, efficient rendering patterns, and resilient error handling.',
  },
  {
    number: '04',
    title: 'OPTIMIZE',
    subtitle: 'Tuning performance & accessibility',
    description:
      'Audit bundle sizes, eliminate layout shifts, refine 60fps animations, test responsive breakpoints, and guarantee full keyboard accessibility.',
  },
  {
    number: '05',
    title: 'DEPLOY',
    subtitle: 'Shipping & continuous iteration',
    description:
      'Deploy to modern edge networks (Vercel), configure automated CI/CD pipelines, and monitor telemetry for continuous improvement.',
  },
];

export const EDUCATION_DATA = [
  {
    degree: 'BSc in Computer Science & Engineering',
    institution: 'North South University',
    location: 'Dhaka, Bangladesh',
    status: 'GRADUATED',
    period: '2021 – 2026',
    highlights: [
      'Strong academic foundation in Algorithms, Data Structures, OOP, Database Systems, and Software Engineering.',
      'Active competitive programming practice with 150+ DSA problems solved across platforms.',
      'Full-stack software engineering integrating modern React, Next.js, TypeScript, and cloud backends.',
    ],
  },
];

// Helper utilities for Skills <-> Projects bidirectional relationship
export const getProjectsForSkill = (skillName) => {
  for (const cat of SKILLS_DATA) {
    const found = cat.skills.find((s) => (typeof s === 'string' ? s === skillName : s.name === skillName));
    if (found && typeof found !== 'string' && found.projectIds) {
      return PROJECTS_DATA.filter((p) => found.projectIds.includes(p.id));
    }
  }
  return [];
};

export const getSkillsForProject = (projectId) => {
  const result = [];
  for (const cat of SKILLS_DATA) {
    for (const skill of cat.skills) {
      const skillName = typeof skill === 'string' ? skill : skill.name;
      const projectIds = typeof skill === 'string' ? [] : skill.projectIds || [];
      if (projectIds.includes(projectId)) {
        result.push(skillName);
      }
    }
  }
  return result;
};

// Map URL slug/alias to canonical project
export const getProjectById = (slug) => {
  if (!slug) return null;
  const normalized = slug.toLowerCase().trim();

  // Direct match by ID
  const directMatch = PROJECTS_DATA.find((p) => p.id.toLowerCase() === normalized);
  if (directMatch) return directMatch;

  // Alias mapping
  const aliasMap = {
    'bottlebrand': 'bottlebrand',
    'bottlebrand-web': 'bottlebrand',
    'bottlebrandweb': 'bottlebrand',
    'santai': 'bottlebrand',
    'santai-objects': 'bottlebrand',
    'santai-atelier': 'bottlebrand',
    'mybrand': 'bottlebrand',
    'bottle': 'bottlebrand',
    'valtorn': 'valtorn-web',
    'valtornweb': 'valtorn-web',
    'valtorn-web': 'valtorn-web',
    'cvmaker': 'cv-maker',
    'cv-builder': 'cv-maker',
    'cv-maker': 'cv-maker',
    'cv': 'cv-maker',
    'ai-resume-suite': 'ai-c-vmaker',
    'agentic-ai-job-assistant': 'ai-c-vmaker',
    'agentic-job-assistant': 'ai-c-vmaker',
    'agentic-ai': 'ai-c-vmaker',
    'ai-c-vmaker': 'ai-c-vmaker',
    'ai-resume': 'ai-c-vmaker',
    'ai-job-assistant': 'ai-c-vmaker',
    'job-assistant': 'ai-c-vmaker',
  };

  const canonicalId = aliasMap[normalized];
  if (canonicalId) {
    return PROJECTS_DATA.find((p) => p.id === canonicalId) || null;
  }

  return null;
};

