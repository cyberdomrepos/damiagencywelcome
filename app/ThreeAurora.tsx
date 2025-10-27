"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeAurora() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Uniforms
    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(container.clientWidth, container.clientHeight),
      },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    // Brand new minimal glassy aurora - designed for visibility & elegance
    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        varying vec2 vUv;

        // Clean noise function for glass-like effects
        float noise(vec2 p) {
          return sin(p.x * 1.2) * cos(p.y * 0.8) + sin(p.x * 2.1) * cos(p.y * 1.7) * 0.5;
        }

        // Fractal brownian motion for organic patterns
        float fbm(vec2 p) {
          float f = 0.0;
          float amp = 0.5;
          for(int i = 0; i < 4; i++) {
            f += amp * noise(p);
            p *= 2.0;
            amp *= 0.5;
          }
          return f;
        }

        // Smooth flowing distortion
        vec2 flow(vec2 p, float time) {
          return vec2(
            fbm(p + time * 0.1),
            fbm(p + time * 0.13 + 10.0)
          ) * 0.3;
        }

        void main() {
          vec2 uv = (vUv - 0.5) * 2.0;
          uv.x *= uResolution.x / uResolution.y;
          
          float time = uTime * 0.2;
          
          // Gentle flowing distortion
          vec2 distortion = flow(uv * 0.8, time);
          vec2 p = uv + distortion;
          
          // Create flowing aurora bands
          float band1 = sin(p.x * 1.5 + p.y * 0.5 + time) * 0.5 + 0.5;
          float band2 = sin(p.x * 0.8 - p.y * 1.2 + time * 0.7) * 0.5 + 0.5;
          float band3 = sin(p.x * 2.1 + p.y * 0.9 - time * 0.5) * 0.5 + 0.5;
          
          // Combine bands for natural aurora shape
          float aurora = (band1 * 0.6 + band2 * 0.8 + band3 * 0.4) / 1.8;
          
          // Add subtle texture
          float texture = fbm(p * 2.0 + time * 0.05) * 0.15;
          aurora += texture;
          
          // Gentle breathing effect
          float breathe = sin(time * 0.4) * 0.1 + 0.9;
          aurora *= breathe;
          
          // Professional cyan color palette - visible yet elegant
          vec3 baseColor = vec3(0.0, 0.15, 0.25);      // Dark glass base
          vec3 cyanGlow = vec3(0.0, 0.4, 0.6);         // Medium cyan
          vec3 brightCyan = vec3(0.15, 0.7, 0.9);      // Bright cyan
          vec3 highlight = vec3(0.3, 0.9, 1.0);        // Cyan white
          
          // Smooth color transitions
          float t = smoothstep(0.1, 0.9, aurora);
          vec3 color = mix(baseColor, cyanGlow, t);
          color = mix(color, brightCyan, smoothstep(0.3, 0.8, aurora));
          color = mix(color, highlight, smoothstep(0.6, 1.0, aurora));
          
          // Distance-based intensity for natural falloff
          float dist = length(uv);
          float falloff = 1.0 / (1.0 + dist * 0.8);
          
          // Subtle mouse interaction
          vec2 mouseUv = (uMouse - 0.5) * 2.0;
          mouseUv.x *= uResolution.x / uResolution.y;
          float mouseDist = length(uv - mouseUv);
          float mouseEffect = exp(-mouseDist * 2.0) * 0.3;
          
          // Final intensity - gentle to avoid covering text
          float intensity = (aurora * 0.4 + mouseEffect) * falloff;
          intensity = smoothstep(0.0, 1.0, intensity) * 0.5;
          
          gl_FragColor = vec4(color, intensity);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = (event.clientX - rect.left) / rect.width;
      mouseRef.current.y = 1.0 - (event.clientY - rect.top) / rect.height;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      uniforms.uTime.value = time;
      uniforms.uMouse.value.x = mouseRef.current.x;
      uniforms.uMouse.value.y = mouseRef.current.y;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: -1,
      }}
    />
  );
}
