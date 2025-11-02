"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  intensity?: number; // overall visual strength
  count?: number; // number of rings
  speed?: number; // animation speed
  drift?: number; // horizontal drift amplitude
};

export default function NeonElevatorScene({
  intensity = 0.12,
  count = 14,
  speed = 0.35,
  drift = 0.02,
}: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mountEl = mountRef.current;
    if (!mountEl) return;
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

    const w = Math.max(320, mountEl.clientWidth || window.innerWidth);
    const h = Math.max(240, mountEl.clientHeight || window.innerHeight);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio || 1));
    renderer.setSize(w, h);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.pointerEvents = "none";
    mountEl.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 4000);
    camera.position.set(0, 18, 160);

    // ambient fill
    scene.add(new THREE.AmbientLight(0xffffff, 0.03));

    const rootStyle = getComputedStyle(document.documentElement);
    const cssPrimary = (
      rootStyle.getPropertyValue("--primary") || "#0fb5c3"
    ).trim();
    const color = new THREE.Color(cssPrimary || "#0fb5c3");

    // rings group
    const group = new THREE.Group();
    scene.add(group);

    const ringMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < count; i++) {
      const radius = 24 + i * 8;
      const tube = 0.12 + (i % 3 === 0 ? 0.04 : 0.0);
      const geom = new THREE.TorusGeometry(radius, tube, 8, 240);
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.06 + (i / count) * 0.12 * intensity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.rotation.x = Math.PI * 0.5 + (i % 2 ? 0.02 : -0.02);
      mesh.position.z = -i * 18;
      mesh.renderOrder = 10;
      group.add(mesh);
      ringMeshes.push(mesh);
    }

    // subtle central glow using a Sprite
    const spriteMap = new THREE.TextureLoader().load(
      "/grid-dot.png",
      undefined,
      undefined,
      () => {}
    );
    const spriteMat = new THREE.SpriteMaterial({
      map: spriteMap,
      color,
      transparent: true,
      opacity: 0.06 * intensity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(24, 6, 1);
    sprite.position.set(0, -2, -20);
    scene.add(sprite);

    function onResize() {
      const el = mountRef.current;
      if (!el) return;
      const W = Math.max(320, el.clientWidth || window.innerWidth);
      const H = Math.max(240, el.clientHeight || window.innerHeight);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    }
    window.addEventListener("resize", onResize, { passive: true });

    let raf = 0;
    let last = performance.now();
    // smooth state for damping
    let groupZ = group.position.z;
    let groupRotY = group.rotation.y;
    let camY = camera.position.y;
    let camZ = camera.position.z;

    function animate() {
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const timeT = now * 0.001 * speed;

      // read scroll progress 0..1
      const scroll = window.scrollY || window.pageYOffset || 0;
      const docH = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.min(1, scroll / docH);

      // hero proximity: detect .hero-text if present and compute proximity 0..1
      let heroProx = 0;
      try {
        const heroEl = document.querySelector(".hero-text");
        if (heroEl) {
          const r = (heroEl as Element).getBoundingClientRect();
          const threshold = window.innerHeight * 0.6; // area where hero matters
          heroProx = Math.max(0, Math.min(1, 1 - r.top / threshold));
        }
      } catch {}

      // target positions based on scroll (feel like a scrubbed video)
      const targetGroupZ = -progress * 900; // push rings into depth as you scroll
      const targetGroupRotY = timeT * 0.06 + progress * 0.8; // combine time + scroll

      // camera subtle lift when scrolling
      const targetCamY = 18 + progress * 40;
      const targetCamZ = 160 - progress * 60;

      // damping (exponential)
      const lambda = 8.0;
      const damp = 1 - Math.exp(-lambda * dt);
      groupZ += (targetGroupZ - groupZ) * damp;
      groupRotY += (targetGroupRotY - groupRotY) * damp;
      camY += (targetCamY - camY) * damp;
      camZ += (targetCamZ - camZ) * damp;

      group.position.z = groupZ;
      group.rotation.y = groupRotY;
      camera.position.y = camY;
      camera.position.z = camZ;
      camera.lookAt(0, 0, -400 * Math.min(1, progress + 0.08));

      // intensity scaling to avoid clashing with hero: reduce when hero is near
      const baseIntensity = intensity;
      const intensityScale = 1 - Math.min(0.85, heroProx * 0.9); // reduce up to ~85%

      // animate ring opacities smoothly based on intensityScale and ring index
      for (let i = 0; i < ringMeshes.length; i++) {
        const m = ringMeshes[i];
        const mat = m.material as THREE.MeshBasicMaterial;
        // per-ring base opacity computed when created was: 0.06 + (i/count)*0.12*intensity
        const base = 0.06 + (i / ringMeshes.length) * 0.12 * baseIntensity;
        const targetOpacity =
          base * intensityScale * (0.9 + (i / ringMeshes.length) * 0.6);
        // smooth approach
        mat.opacity += (targetOpacity - mat.opacity) * Math.min(1, 8.0 * dt);
        // micro-rotation for subtle motion
        m.rotation.z +=
          (i % 3 === 0 ? -1 : 1) * 0.0015 * speed * (0.6 + progress * 0.8);
      }

      // group slow horizontal breathing (time-based)
      group.position.x =
        Math.sin(timeT * 0.4) * (drift * 40) * (0.6 + progress * 0.4);

      renderer.render(scene, camera);
      if (!prefersReduced) raf = requestAnimationFrame(animate);
    }

    if (!prefersReduced) {
      last = performance.now();
      animate();
    } else {
      renderer.render(scene, camera);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      try {
        renderer.forceContextLoss();
        renderer.dispose();
      } catch {}
      try {
        for (const m of ringMeshes) {
          const g = m.geometry as THREE.BufferGeometry;
          const mat = m.material as THREE.Material;
          g.dispose();
          mat.dispose();
        }
        spriteMat.dispose();
        if (spriteMap) spriteMap.dispose?.();
      } catch {}
      if (mountEl && renderer.domElement.parentNode === mountEl)
        mountEl.removeChild(renderer.domElement);
    };
  }, [intensity, count, speed, drift]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 neon-scene minimal-orb"
    />
  );
}
