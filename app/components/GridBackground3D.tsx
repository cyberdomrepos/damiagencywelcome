"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GridBackground3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

    // detect mobile for performance fallbacks
    const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(
      navigator.userAgent || ""
    );

    const mountEl = mountRef.current;
    const width = mountEl.clientWidth || window.innerWidth;
    const height = mountEl.clientHeight || window.innerHeight;

    // Scene / Camera / Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.003);

    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 2000);
    camera.position.set(0, 22, 200);
    camera.lookAt(new THREE.Vector3(0, -15, 0));

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const dpr = isMobile ? 1.0 : Math.min(1.5, window.devicePixelRatio || 1);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";

    mountEl.appendChild(renderer.domElement);

    // Create minimal, professional grid layer
    const createGridLayer = (
      size: number,
      divisions: number,
      color: number,
      opacity: number,
      y: number
    ) => {
      const canvasSize = isMobile ? 512 : 1024;
      const canvas = document.createElement("canvas");
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("2D context not available");

      ctx.clearRect(0, 0, canvasSize, canvasSize);
      ctx.translate(0.5, 0.5);

      const hex = (n: number) => `#${n.toString(16).padStart(6, "0")}`;
      const stroke = hex(color);
      const spacing = canvasSize / divisions;
      const r = parseInt(stroke.slice(1, 3), 16);
      const g = parseInt(stroke.slice(3, 5), 16);
      const b = parseInt(stroke.slice(5, 7), 16);

      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${r},${g},${b},${opacity})`;

      // vertical lines
      for (let i = 0; i <= divisions; i++) {
        const x = i * spacing;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasSize);
        ctx.stroke();
      }

      // horizontal lines
      for (let j = 0; j <= divisions; j++) {
        const yPos = j * spacing;
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(canvasSize, yPos);
        ctx.stroke();
      }

      // subtle vignette
      const grad = ctx.createRadialGradient(
        canvasSize / 2,
        canvasSize / 2,
        canvasSize * 0.3,
        canvasSize / 2,
        canvasSize / 2,
        canvasSize * 0.8
      );
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(0,0,0,0.45)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.needsUpdate = true;

      const plane = new THREE.PlaneGeometry(size, size);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        blending: THREE.NormalBlending,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(plane, mat);
      mesh.rotation.x = -Math.PI / 2 + 0.35;
      mesh.position.y = y;
      return mesh;
    };

    // Single clean layer for minimal professional look
    const layer1 = createGridLayer(300, isMobile ? 28 : 40, 0x0fbfe0, 0.06, 0);
    const baseY1 = layer1.position.y;

    scene.add(layer1);

    // Resize handler
    function onResize() {
      const w = mountEl.clientWidth || window.innerWidth;
      const h = mountEl.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    // Minimal animation
    let rafId = 0;
    function animate() {
      rafId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    // Gentle scroll-driven depth
    function onScroll() {
      if (prefersReduced) return;
      const y = window.scrollY || window.pageYOffset;
      layer1.position.y = baseY1 + y * 0.002;
    }

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    onResize();
    if (!prefersReduced) animate();
    else renderer.render(scene, camera);
    onScroll();

    return () => {
      if (!prefersReduced) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      try {
        renderer.forceContextLoss();
        renderer.dispose();
      } catch {
        /* ignore */
      }
      if (mountEl && renderer.domElement.parentNode === mountEl)
        mountEl.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />
  );
}
