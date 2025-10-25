"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeAurora() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    // scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geom = new THREE.PlaneGeometry(2, 2);

    const uniforms: {
      uTime: THREE.IUniform<number>;
      uResolution: THREE.IUniform<THREE.Vector2>;
      uSaturation: THREE.IUniform<number>;
      uIntensity: THREE.IUniform<number>;
    } = {
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
      vertexShader: `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime; uniform vec2 uResolution;
        uniform float uSaturation; uniform float uIntensity;

        vec3 palette(float t){
          vec3 a=vec3(0.0,0.8,1.0), b=vec3(0.2,1.0,0.8), c=vec3(0.6,0.4,1.0);
          return mix(mix(a,b,smoothstep(0.0,1.0,t)), c, 0.35);
        }
        void main(){
          vec2 uv=vUv*2.0-1.0; uv.x*=uResolution.x/uResolution.y;
          float t=uTime*0.07;
          float b1=0.55+0.45*sin(uv.x*2.6+t*1.3)*cos(uv.y*1.9-t*1.1);
          float b2=0.55+0.45*sin(uv.x*3.4-t*0.9)*sin(uv.y*2.8+t*1.7);
          float b3=0.55+0.45*cos(uv.x*1.6+t*0.6)*cos(uv.y*3.6-t*1.4);
          float a=(b1*0.5+b2*0.35+b3*0.25); a=smoothstep(0.35,1.0,a);
          float v=smoothstep(1.4,0.1,length(uv));
          vec3 col=palette(a)*uIntensity;
          float g=dot(col, vec3(0.299,0.587,0.114));
          col=mix(vec3(g), col, uSaturation)*v;
          gl_FragColor=vec4(col, 0.35);
        }
      `,
    });

    const mesh = new THREE.Mesh(geom, mat);
    scene.add(mesh);

    const onResize = () => {
      uniforms.uResolution.value.set(
        container.clientWidth,
        container.clientHeight
      );
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      uniforms.uTime.value += clock.getDelta();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      geom.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  // fill parent; parent is fixed inset-0
  return <div ref={ref} className="h-full w-full" />;
}
