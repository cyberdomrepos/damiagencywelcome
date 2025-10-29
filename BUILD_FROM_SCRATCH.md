# 🚀 Building DamiAgency Website from Scratch - Complete Guide

## 📚 Technologies You Need to Learn

### 1. **Core Technologies (Essential)**
```bash
# Frontend Framework
Next.js 16          # React-based framework for production
React 19            # Component-based UI library
TypeScript          # JavaScript with type safety

# Styling & UI
Tailwind CSS 4      # Utility-first CSS framework
CSS3                # Advanced styling and animations

# Development Tools
Node.js 18+         # JavaScript runtime
npm/yarn            # Package managers
Git                 # Version control
```

### 2. **Learning Path (Recommended Order)**
1. **HTML5 & CSS3** (1-2 weeks)
2. **JavaScript ES6+** (2-3 weeks)  
3. **TypeScript Basics** (1 week)
4. **React Fundamentals** (2-3 weeks)
5. **Next.js Framework** (1-2 weeks)
6. **Tailwind CSS** (1 week)
7. **Advanced React Patterns** (1-2 weeks)

---

## 🏗️ Project Setup from Scratch

### Step 1: Initialize Next.js Project
```bash
# Create new Next.js project with TypeScript
npx create-next-app@latest dami-agency --typescript --tailwind --eslint --app

# Navigate to project
cd dami-agency

# Install additional dependencies
npm install

# Start development server
npm run dev
```

### Step 2: Project Structure Setup
```bash
# Create folder structure
mkdir -p app/components
mkdir -p app/hooks
mkdir -p public/images

# Create component files
touch app/components/NavBar.tsx
touch app/components/CreativeTrinity.tsx
touch app/components/AboutUs.tsx
touch app/components/QuoteBuilder.tsx
touch app/components/Footer.tsx
touch app/components/ServiceCard.tsx
touch app/components/Section.tsx
touch app/components/GradientUnderline.tsx
touch app/components/BrandMark.tsx
touch app/components/InteractiveBackground.tsx
touch app/components/AuroraLayer.tsx

# Create hooks
touch app/hooks/useScrollAnimation.ts

# Create additional files
touch app/ThreeAurora.tsx
touch app/manifest.ts
```

---

## 🎨 Code Implementation Guide

### 1. **Root Layout Setup** (`app/layout.tsx`)

```tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import NavBar from "./components/NavBar";
import AuroraLayer from "./components/AuroraLayer";

// Load Google Fonts
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const sora = Sora({ 
  subsets: ["latin"],
  variable: "--font-sora"
});

// SEO Metadata
export const metadata: Metadata = {
  title: "DamiAgency - Creative Trinity of Design, Music & Code",
  description: "Where creativity meets technology. Professional design, original music, and cutting-edge web development services.",
  keywords: ["design", "music", "web development", "creative agency"],
};

// Viewport Configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="bg-gray-900 text-white antialiased">
        {/* Background Aurora Effect */}
        <AuroraLayer />
        
        {/* Main Navigation */}
        <NavBar />
        
        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}
```

**Code Explanation:**
- **Fonts**: Load Google Fonts with CSS variables for usage
- **Metadata**: SEO optimization with title, description, keywords
- **Viewport**: Mobile-responsive viewport settings
- **Layout Structure**: Aurora background + Navigation + Content

---

### 2. **Global Styles** (`app/globals.css`)

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components'; 
@import 'tailwindcss/utilities';

/* Import Iosevka Font for monospace code aesthetic */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

/* CSS Variables for consistent theming */
:root {
  --font-mono: 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', monospace;
  --color-cyan-glow: #22d3ee;
  --glass-bg: rgba(0, 0, 0, 0.4);
  --glass-border: rgba(6, 182, 212, 0.2);
}

/* Global Base Styles */
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-inter, system-ui);
  background: #111827;
  overflow-x: hidden;
}

/* Custom Utility Classes */
@layer utilities {
  /* Glow Effects */
  .glow-cyan {
    text-shadow: 0 0 20px rgba(34, 211, 238, 0.6),
                 0 0 40px rgba(34, 211, 238, 0.4),
                 0 0 60px rgba(34, 211, 238, 0.2);
  }
  
  /* Glass Morphism */
  .glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
  }
  
  .glass-card-hover {
    transition: all 0.3s ease;
  }
  
  .glass-card-hover:hover {
    background: rgba(0, 0, 0, 0.6);
    border-color: rgba(6, 182, 212, 0.4);
    box-shadow: 0 8px 32px rgba(34, 211, 238, 0.1);
  }
  
  /* Animation Classes */
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(2deg); }
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}
```

**Code Explanation:**
- **CSS Layers**: Organize styles using Tailwind's layer system
- **Custom Properties**: CSS variables for consistent theming
- **Utility Classes**: Reusable classes for glow, glass effects
- **Animations**: Custom keyframe animations
- **Responsive Design**: Mobile-first approach

---

### 3. **Main Page Component** (`app/page.tsx`)

```tsx
"use client";

import { useEffect, useState } from "react";
import Section from "./components/Section";
import QuoteBuilder from "./components/QuoteBuilder";
import Footer from "./components/Footer";
import CreativeTrinity from "./components/CreativeTrinity";
import AboutUs from "./components/AboutUs";
import InteractiveBackground from "./components/InteractiveBackground";

export default function HomePage() {
  // State for loading and motion preferences
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user's motion preference for accessibility
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => 
      setPrefersReducedMotion(mediaQuery.matches);
    
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    // Set loaded state after brief delay for smooth entrance
    const timer = setTimeout(() => setIsLoaded(true), 100);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Interactive Background Effects */}
      <InteractiveBackground prefersReducedMotion={prefersReducedMotion} />

      {/* Main Content Container */}
      <main
        className={`relative min-h-screen px-4 sm:px-6 pt-20 pb-16 
                   transition-opacity duration-1000 ${
                     isLoaded ? "opacity-100" : "opacity-0"
                   }`}
        data-prefers-reduced-motion={prefersReducedMotion}
      >
        <div className="relative z-10 mx-auto max-w-7xl">
          
          {/* Hero Section */}
          <CreativeTrinity prefersReducedMotion={prefersReducedMotion} />

          {/* About Section with Consistent Spacing */}
          <div className="mt-32 sm:mt-40 md:mt-48 lg:mt-56">
            <AboutUs prefersReducedMotion={prefersReducedMotion} />
          </div>

          {/* Quote Section */}
          <Section
            id="quote"
            title="Get a Quote"
            className="mt-32 sm:mt-40 md:mt-48 lg:mt-56"
          >
            <QuoteBuilder prefersReducedMotion={prefersReducedMotion} />
          </Section>

          {/* Footer Section */}
          <div className="mt-32 sm:mt-40 md:mt-48 lg:mt-56">
            <Footer prefersReducedMotion={prefersReducedMotion} />
          </div>
        </div>
      </main>
    </>
  );
}
```

**Code Explanation:**
- **Client Component**: Uses "use client" for browser-only features
- **State Management**: Loading states and accessibility preferences
- **Effect Hooks**: Media query listener for reduced motion
- **Responsive Layout**: Progressive spacing system
- **Accessibility**: Honors user's motion preferences

---

### 4. **Custom Hook for Animations** (`app/hooks/useScrollAnimation.ts`)

```typescript
"use client";

import { useEffect, useRef, useState } from 'react';

// Interface for animation options
interface UseScrollAnimationOptions {
  threshold?: number;        // When to trigger (0-1)
  rootMargin?: string;      // Margin around root
  delay?: number;           // Delay before animation
}

/**
 * Hook for single element scroll animations
 * Triggers when element enters viewport
 */
export function useScrollAnimation({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  delay = 0
}: UseScrollAnimationOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay if specified
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, [threshold, rootMargin, delay]);

  return { elementRef, isVisible };
}

/**
 * Hook for staggered animations (multiple elements)
 * Creates cascading effect for lists/grids
 */
export function useStaggeredScrollAnimation(
  count: number, 
  baseDelay = 0, 
  staggerDelay = 100
) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(count).fill(false)
  );
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger staggered animations
          for (let i = 0; i < count; i++) {
            setTimeout(() => {
              setVisibleItems(prev => {
                const newItems = [...prev];
                newItems[i] = true;
                return newItems;
              });
            }, baseDelay + (i * staggerDelay));
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [count, baseDelay, staggerDelay]);

  return { elementRef, visibleItems };
}
```

**Code Explanation:**
- **Intersection Observer API**: Detects when elements enter viewport
- **TypeScript Interfaces**: Type safety for options
- **Custom Hooks**: Reusable animation logic
- **Staggered Animations**: Creates cascading effects
- **Memory Management**: Proper cleanup to prevent memory leaks

---

### 5. **Hero Section Component** (`app/components/CreativeTrinity.tsx`)

```tsx
"use client";

import { useEffect, useState } from "react";
import GradientUnderline from "./GradientUnderline";
import ServiceCard from "./ServiceCard";
import { useStaggeredScrollAnimation } from "../hooks/useScrollAnimation";

// Service data interface
interface Service {
  id: string;
  title: string;
  description: string;
  details: string;
}

// Services configuration
const services: Service[] = [
  {
    id: "design",
    title: "Design",
    description: "Visual identity and interface design",
    details: "Brand systems, digital interfaces, and visual communications that connect with your audience",
  },
  {
    id: "music",
    title: "Music", 
    description: "Original compositions and sound design",
    details: "Custom soundtracks, audio branding, and sonic experiences tailored to your project",
  },
  {
    id: "code",
    title: "Code",
    description: "Web development and digital solutions", 
    details: "Modern web applications, performance optimization, and scalable digital architecture",
  },
];

interface CreativeTrinityProps {
  prefersReducedMotion?: boolean;
}

export default function CreativeTrinity({
  prefersReducedMotion = false,
}: CreativeTrinityProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  // Staggered animation for service cards
  const { elementRef: cardsRef, visibleItems: cardVisibility } =
    useStaggeredScrollAnimation(3, 200, 150);

  useEffect(() => {
    // Delay initial animation based on motion preference
    const delay = prefersReducedMotion ? 0 : 100;
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 z-20">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/20 rounded-full blur-sm animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-300/30 rounded-full blur-sm animate-pulse" />
        <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-cyan-500/15 rounded-full blur-sm animate-pulse" />
        
        {/* Tech grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Corner decorative elements */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-cyan-400/10" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-cyan-400/10" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-cyan-400/10" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-cyan-400/10" />

      {/* Main Content */}
      <div className="text-center max-w-6xl mx-auto relative z-10">
        
        {/* Main Heading */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 
                     font-black tracking-tight text-white mb-8 leading-tight
                     ${prefersReducedMotion ? 'opacity-100' : 
                       isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{
            fontFamily: 'var(--font-mono)',
            textShadow: '0 0 30px rgba(34, 211, 238, 0.3)',
            transition: prefersReducedMotion ? 'none' : 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          <span className="block sm:inline">Welcome to </span>
          <span className="text-cyan-400 font-extrabold glow-cyan">Dami</span>
          <span className="text-white font-normal">Agency</span>
        </h1>

        {/* Decorative underline */}
        <div className={prefersReducedMotion ? 'opacity-100' : 
                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}>
          <GradientUnderline className="mb-8" />
        </div>

        {/* Subtitle */}
        <p
          className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                     font-light text-gray-300 mb-8 leading-relaxed
                     ${prefersReducedMotion ? 'opacity-100' : 
                       isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            fontFamily: 'var(--font-mono)',
            transition: prefersReducedMotion ? 'none' : 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 200ms'
          }}
        >
          Where creativity meets technology in perfect harmony
        </p>

        {/* Service Cards Grid */}
        <div className="relative mb-16 px-4 sm:px-0">
          <p className="text-base md:text-lg text-gray-400 font-light text-center max-w-2xl mx-auto leading-relaxed mb-12">
            We are the <span className="text-cyan-400 font-medium">Creative Trinity</span> —
            three disciplines united to create extraordinary digital experiences
          </p>

          {/* Cards Container */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 max-w-5xl mx-auto"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isVisible={cardVisibility[index]}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`${prefersReducedMotion ? 'opacity-100' : 
                         isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gray-400 mb-8 text-lg">Ready to create something extraordinary together?</p>
          <a
            href="#quote"
            className="inline-flex items-center px-8 py-4 bg-cyan-400/10 border border-cyan-400/30 
                     rounded-lg text-cyan-400 font-medium hover:bg-cyan-400/20 
                     transition-all duration-300 group"
          >
            Start Your Project
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
```

**Code Explanation:**
- **Component Props**: TypeScript interface for prop validation
- **Service Data**: Structured data for dynamic rendering
- **Animation States**: Multiple animation triggers with delays
- **Responsive Design**: Progressive font sizing and spacing
- **Accessibility**: Motion preference handling
- **Performance**: Optimized with proper effect cleanup

---

### 6. **Service Card Component** (`app/components/ServiceCard.tsx`)

```tsx
"use client";

import { useState, useRef, MouseEvent } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  details: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  isVisible: boolean;
  prefersReducedMotion: boolean;
}

export default function ServiceCard({
  service,
  index,
  isVisible,
  prefersReducedMotion,
}: ServiceCardProps) {
  // State for 3D hover effects
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Mouse tracking effect
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation based on mouse position
    const rotateX = (y - centerY) / centerY;
    const rotateY = (centerX - x) / centerX;

    // Subtle 3D effect (5 degrees max)
    setMousePosition({ x: rotateY * 5, y: rotateX * 5 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Dynamic card styling based on hover state
  const cardStyle = prefersReducedMotion ? {} : {
    transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) translateZ(${isHovered ? "8px" : "0px"})`,
    transformStyle: "preserve-3d" as const,
  };

  return (
    <div
      ref={cardRef}
      className={`group relative cursor-pointer select-none
                 ${prefersReducedMotion ? "opacity-100" : 
                   isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{
        transitionDelay: prefersReducedMotion ? "0ms" : `${index * 200}ms`,
        transition: prefersReducedMotion ? "none" : "opacity 0.7s, transform 0.7s",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Container */}
      <div
        className="relative overflow-hidden rounded-lg h-72 w-full border border-gray-800/40 glass-card glass-card-hover"
        style={cardStyle}
      >
        {/* Premium Border Glow on Hover */}
        <div className="absolute inset-0 rounded-lg border border-cyan-400/0 group-hover:border-cyan-400/20 transition-all duration-700 bg-gradient-to-br from-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/5 group-hover:to-transparent" />

        {/* Card Content */}
        <div className="relative h-full flex flex-col justify-between p-6 text-left" style={{ transform: prefersReducedMotion ? "none" : "translateZ(10px)" }}>
          
          {/* Top Section - Service Title */}
          <div>
            <h3 className="text-2xl font-medium text-white mb-4 tracking-tight group-hover:text-cyan-400 transition-colors duration-700" style={{ fontFamily: 'var(--font-mono)' }}>
              {service.title}
            </h3>

            <p className="text-gray-300 text-base mb-4 leading-relaxed font-light group-hover:text-gray-200 transition-colors duration-700" style={{ fontFamily: 'var(--font-mono)' }}>
              {service.description}
            </p>
          </div>

          {/* Bottom Section - Details & Button */}
          <div>
            <p className="text-gray-500 text-sm leading-relaxed font-light mb-4 group-hover:text-gray-400 transition-all duration-700" style={{ fontFamily: 'var(--font-mono)' }}>
              {service.details}
            </p>

            {/* See More Button */}
            <button className="w-full transition-all duration-500 ease-out text-xs text-gray-400 hover:text-cyan-400 font-medium border border-gray-700/60 hover:border-cyan-400/40 rounded-sm px-4 py-2.5 bg-black/60 hover:bg-cyan-400/10 tracking-wide uppercase shadow-sm hover:shadow-cyan-400/20" style={{ fontFamily: 'var(--font-mono)' }}>
              See More
              <span className="inline-block ml-2 transform hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>

        {/* Hover Shadow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/10 group-hover:to-transparent rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
      </div>
    </div>
  );
}
```

**Code Explanation:**
- **3D Effects**: Mouse-tracking for perspective transforms
- **State Management**: Hover states and mouse positions
- **Performance**: Conditional rendering based on motion preference  
- **Responsive Design**: Mobile-friendly touch targets
- **Animation**: Staggered entrance with proper delays

---

## 🎯 **Key Coding Concepts Explained**

### 1. **Component Architecture Pattern**
```tsx
// Always follow this structure:

// 1. Imports (external first, then internal)
import { useState } from "react";
import CustomHook from "../hooks/customHook";

// 2. Interfaces/Types (define data structures)
interface ComponentProps {
  title: string;
  optional?: boolean;
}

// 3. Data/Constants (static content)
const DATA = [...];

// 4. Main Component (export default)
export default function Component({ title, optional = false }: ComponentProps) {
  // 5. State (useState hooks)
  const [state, setState] = useState(false);
  
  // 6. Effects (useEffect hooks)
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // 7. Event handlers (functions)
  const handleClick = () => {
    // Handler logic
  };
  
  // 8. Render (JSX return)
  return (
    <div className="responsive-classes">
      {/* Content */}
    </div>
  );
}
```

### 2. **Responsive Design Pattern**
```tsx
// Mobile-first responsive classes
className="
  px-4          /* Mobile: 16px padding */
  sm:px-6       /* Small+: 24px padding */  
  md:px-8       /* Medium+: 32px padding */
  lg:px-12      /* Large+: 48px padding */
  
  text-sm       /* Mobile: 14px text */
  sm:text-base  /* Small+: 16px text */
  md:text-lg    /* Medium+: 18px text */
  lg:text-xl    /* Large+: 20px text */
"
```

### 3. **Animation Pattern**
```tsx
// Standard animation approach
const [isVisible, setIsVisible] = useState(false);

// Conditional animation classes  
className={`
  transition-all duration-500
  ${prefersReducedMotion ? 'opacity-100' : 
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
`}
```

---

## 🚀 **Deployment Guide**

### 1. **Vercel Deployment (Recommended)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Configure domain (optional)
vercel --domain your-domain.com
```

### 2. **Environment Setup**
```bash
# Create .env.local file
echo "NEXT_PUBLIC_SITE_URL=https://your-domain.com" > .env.local
echo "NEXT_PUBLIC_CONTACT_EMAIL=contact@youragency.com" >> .env.local
```

### 3. **Performance Optimization**
```bash
# Analyze bundle size
npm run build

# Check Lighthouse scores
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

---

## 📚 **Learning Resources**

### **Essential Tutorials:**
1. **React Official Tutorial**: https://react.dev/learn
2. **Next.js Learn Course**: https://nextjs.org/learn
3. **TypeScript Handbook**: https://www.typescriptlang.org/docs/
4. **Tailwind CSS Docs**: https://tailwindcss.com/docs

### **Advanced Topics:**
1. **React Hooks Deep Dive**: Custom hooks and optimization
2. **CSS Animations**: Keyframes, transitions, and transforms  
3. **Web Performance**: Core Web Vitals and optimization
4. **Accessibility**: ARIA, keyboard navigation, screen readers

### **Tools to Master:**
1. **VS Code**: Primary IDE with React/TypeScript extensions
2. **Chrome DevTools**: Debugging and performance profiling
3. **Git**: Version control and collaboration
4. **Figma/Adobe XD**: Design-to-code workflow

---

## 🔧 **Common Troubleshooting**

### **Build Errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Type errors
npm run build -- --no-lint
```

### **Performance Issues:**
```bash
# Check bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Optimize images
npm install next-optimized-images
```

### **Responsive Issues:**
```tsx
// Always test breakpoints
const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px'
};
```

---

This guide provides everything needed to rebuild the DamiAgency website from scratch. Focus on understanding each concept before moving to the next, and practice building smaller components first before tackling the full site.