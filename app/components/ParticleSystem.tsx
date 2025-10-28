"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  originalX: number;
  originalY: number;
}

interface ParticleSystemProps {
  particleCount?: number;
  maxDistance?: number;
  mouseInfluence?: number;
  colors?: string[];
  className?: string;
}

export default function ParticleSystem({
  particleCount = 80,
  maxDistance = 150,
  mouseInfluence = 100,
  colors = [
    "rgba(34, 211, 238, 0.3)",
    "rgba(255, 255, 255, 0.2)",
    "rgba(34, 211, 238, 0.1)",
  ],
  className = "",
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    particlesRef.current = particles;
  };

  // Draw particles and connections
  const draw = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctx.clearRect(0, 0, width, height);

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Update and draw particles
    particles.forEach((particle, i) => {
      // Mouse influence
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseInfluence) {
        const force = (mouseInfluence - distance) / mouseInfluence;
        const angle = Math.atan2(dy, dx);
        particle.vx -= Math.cos(angle) * force * 0.01;
        particle.vy -= Math.sin(angle) * force * 0.01;
      }

      // Return to original position (elastic effect)
      const returnForceX = (particle.originalX - particle.x) * 0.001;
      const returnForceY = (particle.originalY - particle.y) * 0.001;
      particle.vx += returnForceX;
      particle.vy += returnForceY;

      // Apply velocity with damping
      particle.vx *= 0.95;
      particle.vy *= 0.95;
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Keep particles in bounds
      if (particle.x < 0 || particle.x > width) particle.vx *= -0.5;
      if (particle.y < 0 || particle.y > height) particle.vy *= -0.5;

      // Draw particle
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw connections to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.15;
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = "rgba(34, 211, 238, 0.3)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    });
  };

  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  // Mount-only effect: define animate and resize handlers inside the effect
  // We intentionally run this effect once on mount. draw and initParticles
  // are stable for this component's lifecycle, so it's fine to omit them
  // from dependencies here.
  // eslint-disable-next-line
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Local resize handler
    const handleResizeLocal = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      initParticles(c.width, c.height);
    };

    // Local animation loop
    const animateLocal = () => {
      const c = canvasRef.current;
      if (!c) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      draw(ctx, c.width, c.height);
      animationRef.current = requestAnimationFrame(animateLocal);
    };

    // Set up canvas
    handleResizeLocal();

    // Start animation with delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
      animateLocal();
    }, 500);

    // Event listeners
    window.addEventListener("resize", handleResizeLocal);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timer);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResizeLocal);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}
