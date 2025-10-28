"use client";

import { useEffect, useRef, useState } from 'react';

interface MatrixChar {
  char: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  trail: number[];
}

interface MatrixAuroraProps {
  prefersReducedMotion?: boolean;
}

export default function MatrixAurora({ prefersReducedMotion = false }: MatrixAuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const matrixChars = useRef<MatrixChar[]>([]);

  // Matrix characters - subtle and minimal
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize matrix characters - very sparse
      matrixChars.current = [];
      const charCount = prefersReducedMotion ? 15 : 25;
      
      for (let i = 0; i < charCount; i++) {
        matrixChars.current.push({
          char: chars[Math.floor(Math.random() * chars.length)],
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: Math.random() * 0.5 + 0.2, // Very slow
          opacity: Math.random() * 0.3 + 0.1, // Very subtle
          trail: Array(8).fill(0).map((_, j) => Math.random() * 0.1 * (8 - j) / 8), // Soft trail
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'; // Very gentle fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Aurora background gradient based on scroll
      const scrollProgress = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) || 0;
      
      // Create subtle aurora gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const hue1 = 180 + scrollProgress * 60; // Cyan to blue range
      const hue2 = 280 + scrollProgress * 40; // Purple to pink range
      
      gradient.addColorStop(0, `hsla(${hue1}, 70%, 50%, 0.05)`);
      gradient.addColorStop(0.5, 'hsla(0, 0%, 0%, 0)');
      gradient.addColorStop(1, `hsla(${hue2}, 60%, 60%, 0.03)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw matrix characters
      matrixChars.current.forEach((matrixChar, index) => {
        // Update position
        matrixChar.y += matrixChar.speed + scrollY * 0.01;
        
        if (matrixChar.y > canvas.height + 50) {
          matrixChar.y = -50;
          matrixChar.x = Math.random() * canvas.width;
          matrixChar.char = chars[Math.floor(Math.random() * chars.length)];
        }

        // Subtle horizontal drift based on scroll
        matrixChar.x += Math.sin(scrollY * 0.001 + index) * 0.2;

        // Draw character trail (very subtle)
        matrixChar.trail.forEach((trailOpacity, trailIndex) => {
          const trailY = matrixChar.y - trailIndex * 20;
          if (trailY > 0 && trailY < canvas.height) {
            ctx.font = '14px monospace';
            ctx.fillStyle = `rgba(0, 255, 150, ${trailOpacity * matrixChar.opacity * 0.5})`;
            ctx.fillText(matrixChar.char, matrixChar.x, trailY);
          }
        });

        // Draw main character
        ctx.font = '16px monospace';
        ctx.fillStyle = `rgba(0, 255, 200, ${matrixChar.opacity})`;
        ctx.fillText(matrixChar.char, matrixChar.x, matrixChar.y);

        // Update trail
        for (let i = matrixChar.trail.length - 1; i > 0; i--) {
          matrixChar.trail[i] = matrixChar.trail[i - 1] * 0.9;
        }
        matrixChar.trail[0] = matrixChar.opacity;
      });

      if (!prefersReducedMotion) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (!prefersReducedMotion) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Static version for reduced motion
      ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'hsla(180, 70%, 50%, 0.03)');
      gradient.addColorStop(1, 'hsla(280, 60%, 60%, 0.02)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prefersReducedMotion, scrollY]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Canvas for Matrix effect */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.7 }}
      />
      
      {/* Subtle overlay gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Top gradient */}
        <div 
          className="absolute inset-x-0 top-0 h-96 opacity-30"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)'
          }}
        />
        
        {/* Bottom gradient */}
        <div 
          className="absolute inset-x-0 bottom-0 h-96 opacity-30"
          style={{
            background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)'
          }}
        />
        
        {/* Side vignette */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)'
          }}
        />
      </div>
    </>
  );
}