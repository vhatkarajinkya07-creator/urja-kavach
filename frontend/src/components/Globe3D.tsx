import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface Globe3DProps {
  emergencyMode?: boolean;
}

export const Globe3D: React.FC<Globe3DProps> = ({ emergencyMode }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Globe Base Sphere - Light Teal Slate Color
    const globeGeometry = new THREE.SphereGeometry(75, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: emergencyMode ? 0x881122 : 0x1C2A39,
      emissive: emergencyMode ? 0x440011 : 0x0F1A26,
      specular: 0xE6AA53,
      shininess: 40,
      transparent: true,
      opacity: 0.96
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Wireframe Grid Overlay - Warm Gold / Amber Accent
    const wireframeGeometry = new THREE.SphereGeometry(76, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: emergencyMode ? 0xff0044 : 0xE6AA53,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const wireframeSphere = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframeSphere);

    // Atmosphere Glow
    const atmosphereGeometry = new THREE.SphereGeometry(82, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: emergencyMode ? 0xff0055 : 0x2B4459,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Routes
    const routes = [
      { start: [25.0, 50.0], end: [22.4, 69.8], color: 0xE6AA53 },
      { start: [12.5, 43.3], end: [19.0, 72.8], color: 0xff6600 },
      { start: [44.7, 37.8], end: [20.2, 86.6], color: 0x22c55e },
      { start: [1.3, 103.8], end: [12.9, 74.8], color: 0x3b82f6 }
    ];

    function latLonToVector3(lat: number, lon: number, radius: number) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    }

    routes.forEach(route => {
      const p1 = latLonToVector3(route.start[0], route.start[1], 76);
      const p2 = latLonToVector3(route.end[0], route.end[1], 76);
      const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(95);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: route.color,
        linewidth: 2.5,
        transparent: true,
        opacity: 0.9
      });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(100, 100, 100);
    scene.add(dirLight);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      globe.rotation.y += 0.002;
      wireframeSphere.rotation.y += 0.002;
      atmosphere.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [emergencyMode]);

  return (
    <div className="w-full h-full relative min-h-[380px] rounded-3xl overflow-hidden glass-panel-light flex items-center justify-center border border-slate-200">
      <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab" />
      
      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C2A39] text-[#E6AA53] font-bold text-xs shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#E6AA53] animate-ping"></span>
          <span>3D GLOBAL ENERGY CORRIDORS</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 pointer-events-none text-right font-mono text-[10px] text-[#566A7A] bg-white/90 p-2.5 rounded-2xl border border-slate-200 shadow-sm">
        <div>ORBITAL LAT/LON: 22.4° N, 69.8° E</div>
        <div className="text-[#1C2A39] font-bold">ACTIVE CRUDE ARCS: 4 LANES</div>
      </div>
    </div>
  );
};
