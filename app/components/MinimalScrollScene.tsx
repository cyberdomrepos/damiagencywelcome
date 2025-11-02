"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  opacity?: number; // 0..1
  gridSize?: number;
  lineColor?: string;
};

export default function MinimalScrollScene({
  opacity = 0.08,
  gridSize = 60,
  lineColor = "#0ad0c9",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.zIndex = "-1";
    container.appendChild(renderer.domElement);

    // Scene + camera - straight-on minimal view
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      3000
    );
    camera.position.set(0, 150, 500);
    camera.lookAt(0, 0, -200);

    // Ultra-minimal grid - barely visible, just for depth
    const gridHelper = new THREE.GridHelper(
      2500,
      50,
      new THREE.Color(lineColor),
      new THREE.Color(lineColor)
    );
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = opacity * 0.4; // extra subtle
    gridHelper.material.blending = THREE.AdditiveBlending;
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Radial fade to make edges disappear completely
    const fadeGeo = new THREE.PlaneGeometry(3000, 3000);
    const fadeMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uOpacity: { value: 1.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        varying vec2 vUv;
        void main() {
          // Strong radial fade from center
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          float radialFade = 1.0 - smoothstep(0.3, 0.8, dist);
          
          // Extra fade at top
          float topFade = smoothstep(0.0, 0.4, vUv.y);
          
          // Combine fades
          float finalFade = radialFade * topFade;
          
          // Almost invisible cyan tint
          vec3 darkColor = vec3(0.02, 0.05, 0.06);
          float alpha = finalFade * 0.3 * uOpacity;
          
          gl_FragColor = vec4(darkColor, alpha);
        }
      `,
    });
    const fadePlane = new THREE.Mesh(fadeGeo, fadeMat);
    fadePlane.rotation.x = -Math.PI / 2;
    fadePlane.position.y = -1;
    scene.add(fadePlane);

    // Responsive resize
    function onResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", onResize);

    // Track scroll for very subtle parallax
    let scrollOffset = 0;
    let targetScrollOffset = 0;

    function loop() {
      // Minimal scroll parallax
      const rawScroll = window.scrollY || window.pageYOffset || 0;
      targetScrollOffset = rawScroll * 0.15; // very gentle
      scrollOffset += (targetScrollOffset - scrollOffset) * 0.06;

      // Barely noticeable forward drift
      gridHelper.position.z = -400 + scrollOffset;

      // No breathing motion - completely still except for scroll

      // Constant opacity - no pulse
      const baseMat = gridHelper.material as THREE.Material & {
        opacity: number;
      };
      baseMat.opacity = opacity * 0.4;

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(loop);
    }

    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(loop);
    } else {
      renderer.render(scene, camera);
    }

    // cleanup
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      gridHelper.geometry.dispose();
      (gridHelper.material as THREE.Material).dispose();
      fadePlane.geometry.dispose();
      fadeMat.dispose();
      renderer.dispose();
      const gl = renderer.getContext() as
        | WebGLRenderingContext
        | WebGL2RenderingContext
        | null;
      if (gl && typeof gl.getExtension === "function") {
        const loseExt = gl.getExtension("WEBGL_lose_context") as {
          loseContext?: () => void;
        } | null;
        loseExt?.loseContext?.();
      }
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [opacity, gridSize, lineColor]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
      className="minimal-scroll-scene"
    />
  );
}
