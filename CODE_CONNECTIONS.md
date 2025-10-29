# 🔗 Code Connections & Architecture Guide

## 🏗️ How Components Connect Together

### **Data Flow Architecture**
```
├── app/layout.tsx (Root Layout)
│   ├── NavBar (Global Navigation)
│   ├── AuroraLayer (Background Effects)
│   └── page.tsx (Main Content)
│       ├── InteractiveBackground
│       ├── CreativeTrinity (Hero)
│       │   ├── GradientUnderline
│       │   └── ServiceCard[] (Array of cards)
│       ├── AboutUs (Tabbed Content)
│       ├── QuoteBuilder (Contact Form)  
│       └── Footer (Site Links)
```

---

## 📊 Component Relationships Explained

### 1. **Root Layout → All Pages**
```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuroraLayer />     {/* Background for all pages */}
        <NavBar />          {/* Navigation for all pages */}
        {children}          {/* Dynamic page content */}
      </body>
    </html>
  );
}
```

**Connection Points:**
- `AuroraLayer` → Provides visual background across entire site
- `NavBar` → Accessible from every page, handles navigation
- `{children}` → Renders specific page content (page.tsx)

### 2. **Main Page → Section Components**  
```tsx
// app/page.tsx
export default function HomePage() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  return (
    <main>
      <InteractiveBackground prefersReducedMotion={prefersReducedMotion} />
      <CreativeTrinity prefersReducedMotion={prefersReducedMotion} />
      <AboutUs prefersReducedMotion={prefersReducedMotion} />
      <QuoteBuilder prefersReducedMotion={prefersReducedMotion} />
      <Footer prefersReducedMotion={prefersReducedMotion} />
    </main>
  );
}
```

**Connection Points:**
- **Shared State**: `prefersReducedMotion` passed to all components
- **Consistent Spacing**: Each section uses same margin system
- **Z-Index Layering**: Components stack properly with `relative z-10`

### 3. **CreativeTrinity → ServiceCard Array**
```tsx
// app/components/CreativeTrinity.tsx
const services = [
  { id: "design", title: "Design", description: "...", details: "..." },
  { id: "music", title: "Music", description: "...", details: "..." },  
  { id: "code", title: "Code", description: "...", details: "..." }
];

export default function CreativeTrinity({ prefersReducedMotion }) {
  const { elementRef, visibleItems } = useStaggeredScrollAnimation(3, 200, 150);
  
  return (
    <div ref={elementRef}>
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}                    // Data connection
          index={index}                       // Animation delay
          isVisible={visibleItems[index]}     // Animation state  
          prefersReducedMotion={prefersReducedMotion} // Accessibility
        />
      ))}
    </div>
  );
}
```

**Connection Points:**
- **Data Flow**: Services array → individual ServiceCard props
- **Animation Sync**: `useStaggeredScrollAnimation` → `visibleItems` → individual card visibility
- **Performance**: Each card gets its own animation delay based on `index`

### 4. **Custom Hook → Multiple Components**
```tsx
// app/hooks/useScrollAnimation.ts
export function useStaggeredScrollAnimation(count, baseDelay, staggerDelay) {
  const [visibleItems, setVisibleItems] = useState(new Array(count).fill(false));
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
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
    });
    
    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [count, baseDelay, staggerDelay]);

  return { elementRef, visibleItems };
}
```

**Used By:**
- `CreativeTrinity` → Service cards animation
- `AboutUs` → Tab content animations  
- `Footer` → Link section animations

---

## 🎨 CSS Architecture & Connections

### 1. **Global Styles → Component Styles**
```css
/* app/globals.css */
:root {
  --font-mono: 'JetBrains Mono', monospace;
  --color-cyan-glow: #22d3ee;
  --glass-bg: rgba(0, 0, 0, 0.4);
}

.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
}

.glow-cyan {
  text-shadow: 0 0 20px var(--color-cyan-glow);
}
```

**Connected Components:**
```tsx
// Used in multiple components
<div className="glass-card">           {/* AboutUs, QuoteBuilder, ServiceCard */}
<h1 className="glow-cyan">            {/* CreativeTrinity, NavBar */}
<p style={{ fontFamily: 'var(--font-mono)' }}> {/* All components */}
```

### 2. **Responsive System Connections**
```css
/* Consistent breakpoint system across all components */
Mobile:  320px+ (default classes)
Small:   640px+ (sm: prefix) 
Medium:  768px+ (md: prefix)
Large:   1024px+ (lg: prefix)
XL:      1280px+ (xl: prefix)
```

**Example Usage Pattern:**
```tsx
// Same pattern used in every component
className="
  px-4 sm:px-6 md:px-8 lg:px-12        /* Padding progression */
  text-sm sm:text-base md:text-lg       /* Font size progression */
  mb-4 sm:mb-6 md:mb-8 lg:mb-12        /* Spacing progression */
"
```

---

## ⚡ State Management Connections

### 1. **Accessibility State Flow**
```tsx
// app/page.tsx (Source)
const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

useEffect(() => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
  
  updateMotionPreference();
  mediaQuery.addEventListener("change", updateMotionPreference);
  
  return () => mediaQuery.removeEventListener("change", updateMotionPreference);
}, []);

// Passed to all child components
<CreativeTrinity prefersReducedMotion={prefersReducedMotion} />
<AboutUs prefersReducedMotion={prefersReducedMotion} />
<QuoteBuilder prefersReducedMotion={prefersReducedMotion} />
```

### 2. **Animation State Management**
```tsx
// Pattern used in every animated component
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) setIsVisible(true);
  });
  
  if (elementRef.current) observer.observe(elementRef.current);
  return () => observer.disconnect();
}, []);

// Applied to animations
className={`
  transition-all duration-500
  ${prefersReducedMotion ? 'opacity-100' : 
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
`}
```

---

## 🔄 Event Flow & Interactions

### 1. **Form Submission Flow**
```tsx
// app/components/QuoteBuilder.tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // 1. Collect form data
  const formData = {
    name,
    email,
    serviceType,
    budget,
    timeline,
    notes
  };
  
  // 2. Create mailto URL
  const subject = "Quote Request";
  const body = `Name: ${name}\nEmail: ${email}...`;
  const mailto = `mailto:contact@damiagency.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // 3. Open email client
  window.location.href = mailto;
};

return (
  <form onSubmit={handleSubmit}>
    {/* Form fields connected to state */}
    <input value={name} onChange={(e) => setName(e.target.value)} />
    <button type="submit">Send Quote Request</button>
  </form>
);
```

### 2. **Navigation Flow**
```tsx
// app/components/NavBar.tsx
<nav>
  <a href="#about">About</a>      {/* → AboutUs component */}
  <a href="#quote">Quote</a>      {/* → QuoteBuilder component */}
</nav>

// Smooth scrolling enabled in globals.css
html { scroll-behavior: smooth; }
```

---

## 🎭 Animation System Connections

### 1. **Staggered Animation Pattern**
```tsx
// Hook provides array of visibility states
const { elementRef, visibleItems } = useStaggeredScrollAnimation(3, 200, 150);

// Each item gets its own visibility state
{items.map((item, index) => (
  <div
    key={item.id}
    className={visibleItems[index] ? 'animate-in' : 'animate-out'}
    style={{ transitionDelay: `${index * 150}ms` }}
  >
    {item.content}
  </div>
))}
```

### 2. **3D Hover Effects Connection**
```tsx
// app/components/ServiceCard.tsx
const handleMouseMove = (e) => {
  if (prefersReducedMotion) return; // Accessibility check
  
  // Calculate 3D rotation based on mouse position
  const rotateX = (mouseY - centerY) / centerY * 5;
  const rotateY = (centerX - mouseX) / centerX * 5;
  
  setMousePosition({ x: rotateY, y: rotateX });
};

// Apply 3D transform
const cardStyle = {
  transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
};
```

---

## 🎨 Styling System Connections

### 1. **Glass Morphism Effect**
```scss
// Global utility class
.glass-card {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(6, 182, 212, 0.2);
}

.glass-card-hover:hover {
  background: rgba(0, 0, 0, 0.6);
  border-color: rgba(6, 182, 212, 0.4);
  box-shadow: 0 8px 32px rgba(34, 211, 238, 0.1);
}
```

**Used Across Components:**
```tsx
<div className="glass-card glass-card-hover">  // AboutUs tabs
<div className="glass-card">                   // ServiceCard containers  
<div className="glass-card glass-card-hover">  // QuoteBuilder form
```

### 2. **Color System Connections**
```css
/* Consistent color variables */
--cyan-400: #22D3EE;    /* Primary accent */
--cyan-300: #67E8F9;    /* Light accent */  
--cyan-500: #06B6D4;    /* Dark accent */

/* Applied via Tailwind classes */
.text-cyan-400    /* Primary text accent */
.bg-cyan-400/10   /* Background with opacity */
.border-cyan-400/30  /* Border with opacity */
```

---

## 🚀 Performance Optimization Connections

### 1. **Bundle Optimization**
```tsx
// Lazy loading for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

// Conditional rendering to avoid unnecessary work
{!prefersReducedMotion && <AnimatedComponent />}
```

### 2. **Image Optimization** 
```tsx
// Next.js Image component (auto-optimized)
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={true}        // Above fold images
  placeholder="blur"     // Smooth loading
/>
```

### 3. **CSS Optimization**
```css
/* Use CSS transforms for animations (GPU accelerated) */
.animate-element {
  transform: translateX(0);  /* Better than changing 'left' */
  will-change: transform;    /* Hint to browser */
  backface-visibility: hidden; /* Prevent flickering */
}
```

---

## 🔍 Debugging & Development Connections

### 1. **TypeScript Integration**
```tsx
// Interfaces ensure proper data flow
interface ServiceCardProps {
  service: Service;          // Type safety
  index: number;            // Must be number
  isVisible: boolean;       // Must be boolean
  prefersReducedMotion: boolean;
}

// Compiler catches errors at build time
<ServiceCard 
  service={service}        // ✅ Correct type
  index="0"               // ❌ Error: string not number
  isVisible={true}        // ✅ Correct type
/>
```

### 2. **Development Tools Integration**
```bash
# ESLint catches code issues
npm run lint

# TypeScript checks types
npm run build

# Next.js dev tools
npm run dev -- --turbo   # Faster development builds
```

---

## 🎯 **Key Connection Patterns**

### **1. Props Down, Events Up**
```tsx
// Parent passes data down
<ChildComponent data={parentData} onEvent={handleEvent} />

// Child emits events up  
const ChildComponent = ({ data, onEvent }) => {
  return <button onClick={() => onEvent(data.id)}>Click</button>
}
```

### **2. Shared State via Props**
```tsx
// Single source of truth in parent
const [sharedState, setSharedState] = useState(initialValue);

// Passed to multiple children
<ComponentA shared={sharedState} />
<ComponentB shared={sharedState} />
```

### **3. Custom Hook Sharing**
```tsx
// Reusable logic in custom hook
const useScrollAnimation = () => {
  // Animation logic here
  return { isVisible, elementRef };
};

// Used by multiple components
const ComponentA = () => {
  const { isVisible, elementRef } = useScrollAnimation();
  // Component logic
};
```

This architecture ensures all components work together seamlessly while maintaining clean separation of concerns and optimal performance.