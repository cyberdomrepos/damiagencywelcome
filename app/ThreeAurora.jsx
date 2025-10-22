"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeAurora() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Reduced motion? Bail.
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.pointerEvents = "none"; // ⬅ important
    container.appendChild(renderer.domElement);

    // Scene & camera (orthographic-ish: full-screen quad)
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Geometry: single quad
    const geom = new THREE.PlaneGeometry(2, 2);

    // Shader: fast, banded aurora using layered sines
    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(container.clientWidth, container.clientHeight),
      },
      uSaturation: { value: 1.1 },
      uIntensity: { value: 0.9 },
    };

    const mat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2  uResolution;
        uniform float uSaturation;
        uniform float uIntensity;

        // palette helper
        vec3 palette(float t) {
          // cyan -> mint -> violet
          vec3 a = vec3(0.0, 0.8, 1.0);
          vec3 b = vec3(0.2, 1.0, 0.8);
          vec3 c = vec3(0.6, 0.4, 1.0);
          return mix(mix(a, b, smoothstep(0.0, 1.0, t)), c, 0.35);
        }

        void main() {
          // center coords
          vec2 uv = vUv * 2.0 - 1.0;
          uv.x *= uResolution.x / uResolution.y;

          // layered waves
          float t = uTime * 0.07;
          float band1 = 0.55 + 0.45 * sin(uv.x * 2.6 + t*1.3) * cos(uv.y * 1.9 - t*1.1);
          float band2 = 0.55 + 0.45 * sin(uv.x * 3.4 - t*0.9) * sin(uv.y * 2.8 + t*1.7);
          float band3 = 0.55 + 0.45 * cos(uv.x * 1.6 + t*0.6) * cos(uv.y * 3.6 - t*1.4);

          // combine & shape
          float a = (band1*0.5 + band2*0.35 + band3*0.25);
          a = smoothstep(0.35, 1.0, a);             // contrast
          float vignette = smoothstep(1.4, 0.1, length(uv)); // soft edges

          vec3 col = palette(a) * uIntensity;
          // desaturate slightly for “pro” feel
          float g = dot(col, vec3(0.299, 0.587, 0.114));
          col = mix(vec3(g), col, uSaturation);

          col *= vignette;
          // subtle base opacity; additive blending will stack nicely
          gl_FragColor = vec4(col, 0.35);
        }
      `,
    });

    const mesh = new THREE.Mesh(geom, mat);
    scene.add(mesh);

    // Resize handling
    const onResize = () => {
      uniforms.uResolution.value.set(
        container.clientWidth,
        container.clientHeight
      );
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Animate
    let rafId = 0;
    const clock = new THREE.Clock();
    const renderLoop = () => {
      uniforms.uTime.value += clock.getDelta();
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(renderLoop);
    };
    rafId = requestAnimationFrame(renderLoop);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      geom.dispose();
      mat.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="absolute inset-0 z-0 pointer-events-none" />;
}
