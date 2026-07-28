import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Eye,
  Sun,
  Moon,
  CloudRain,
  AlertTriangle,
  Compass,
} from 'lucide-react';
import { PipelineRoute, LeakAlert, ReservoirData } from '../../types/waterSystem';

interface City3DViewerProps {
  pipelines: PipelineRoute[];
  leaks: LeakAlert[];
  reservoirs: ReservoirData[];
  floodRiskPct: number;
  theme?: 'dark' | 'light';
}

export const City3DViewer: React.FC<City3DViewerProps> = ({
  pipelines,
  leaks,
  reservoirs,
  floodRiskPct,
  theme = 'dark',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Scene state controls
  const [isXRay, setIsXRay] = useState(true);
  const [isNight, setIsNight] = useState(theme === 'dark');
  const [isRaining, setIsRaining] = useState(true);
  const [activePreset, setActivePreset] = useState<'city' | 'underground' | 'dam' | 'flood' | 'farm'>('city');

  // Sync theme changes with 3D day/night lighting
  useEffect(() => {
    setIsNight(theme === 'dark');
  }, [theme]);

  // Animation & Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const waterFlowParticlesRef = useRef<THREE.Points | null>(null);
  const leakSpraysRef = useRef<THREE.Group | null>(null);
  const reservoirWaterRef = useRef<THREE.Mesh | null>(null);
  const floodPlaneRef = useRef<THREE.Mesh | null>(null);
  const rainParticlesRef = useRef<THREE.Points | null>(null);
  const terrainMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Setup Three.js Scene, Camera, Renderer
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const bgColor = isNight ? 0x050914 : 0xe0f2fe;
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(bgColor, 0.008);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(40, 35, 60);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear previous canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(
      isNight ? 0x1a2b54 : 0xffffff,
      isNight ? 0.8 : 1.3
    );
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(
      isNight ? 0x00d2ff : 0xfffaed,
      isNight ? 1.5 : 2.2
    );
    dirLight.position.set(50, 80, 40);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    // 3. Create Ground Terrain Plane
    const terrainGeo = new THREE.PlaneGeometry(120, 120, 64, 64);
    const terrainMat = new THREE.MeshStandardMaterial({
      color: isNight ? 0x0b1226 : 0x386641,
      roughness: 0.8,
      metalness: 0.2,
      transparent: true,
      opacity: isXRay ? 0.35 : 0.95,
      wireframe: isXRay,
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = 0;
    terrain.receiveShadow = true;
    terrainMeshRef.current = terrain;
    scene.add(terrain);

    // 4. Create 3D City Buildings
    const buildingGroup = new THREE.Group();
    const buildingMat = new THREE.MeshStandardMaterial({
      color: isNight ? 0x111d3d : 0xe2e8f0,
      roughness: 0.3,
      metalness: 0.7,
      emissive: isNight ? 0x004466 : 0x000000,
      emissiveIntensity: 0.3,
    });

    for (let i = 0; i < 40; i++) {
      const bHeight = 4 + Math.random() * 18;
      const bWidth = 2 + Math.random() * 4;
      const bDepth = 2 + Math.random() * 4;
      const bGeo = new THREE.BoxGeometry(bWidth, bHeight, bDepth);
      const bMesh = new THREE.Mesh(bGeo, buildingMat);

      // Position grid
      const x = -40 + Math.random() * 35;
      const z = -40 + Math.random() * 35;
      bMesh.position.set(x, bHeight / 2, z);
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;

      // Add window glowing dots
      if (isNight) {
        const windowGeo = new THREE.BoxGeometry(bWidth + 0.1, bHeight * 0.8, bDepth + 0.1);
        const windowMat = new THREE.MeshBasicMaterial({
          color: 0x00f2fe,
          wireframe: true,
          transparent: true,
          opacity: 0.3,
        });
        const windowMesh = new THREE.Mesh(windowGeo, windowMat);
        bMesh.add(windowMesh);
      }

      buildingGroup.add(bMesh);
    }
    scene.add(buildingGroup);

    // 5. Underground Pipeline Network Geometry
    const pipeGroup = new THREE.Group();
    const pipePoints: THREE.Vector3[] = [];

    // Pipeline routes
    const routes = [
      { start: new THREE.Vector3(-40, -4, -30), end: new THREE.Vector3(0, -4, -30), leaking: false },
      { start: new THREE.Vector3(0, -4, -30), end: new THREE.Vector3(30, -4, -30), leaking: false },
      { start: new THREE.Vector3(0, -4, -30), end: new THREE.Vector3(0, -4, 20), leaking: true }, // Leaking route
      { start: new THREE.Vector3(0, -4, 20), end: new THREE.Vector3(35, -4, 20), leaking: false },
      { start: new THREE.Vector3(-30, -4, 10), end: new THREE.Vector3(0, -4, 10), leaking: false },
    ];

    routes.forEach((route) => {
      const path = new THREE.LineCurve3(route.start, route.end);
      const pipeGeo = new THREE.TubeGeometry(path, 20, 0.8, 8, false);
      const pipeMat = new THREE.MeshStandardMaterial({
        color: route.leaking ? 0xff3b30 : 0x0284c7,
        emissive: route.leaking ? 0xaa0000 : 0x0088cc,
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.85,
      });
      const pipeMesh = new THREE.Mesh(pipeGeo, pipeMat);
      pipeGroup.add(pipeMesh);

      // Collect points for animated water flow particles inside pipe
      for (let t = 0; t <= 1; t += 0.05) {
        const point = path.getPoint(t);
        pipePoints.push(point);
      }
    });
    scene.add(pipeGroup);

    // 6. Water Flow Particle System inside Pipelines
    const flowCount = pipePoints.length * 3;
    const flowGeo = new THREE.BufferGeometry();
    const flowPos = new Float32Array(flowCount * 3);

    for (let i = 0; i < flowCount; i++) {
      const pt = pipePoints[i % pipePoints.length];
      flowPos[i * 3] = pt.x + (Math.random() - 0.5) * 0.5;
      flowPos[i * 3 + 1] = pt.y + (Math.random() - 0.5) * 0.5;
      flowPos[i * 3 + 2] = pt.z + (Math.random() - 0.5) * 0.5;
    }

    flowGeo.setAttribute('position', new THREE.BufferAttribute(flowPos, 3));
    const flowMat = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 0.6,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const flowParticles = new THREE.Points(flowGeo, flowMat);
    waterFlowParticlesRef.current = flowParticles;
    scene.add(flowParticles);

    // 7. Leak Water Spray Particles (Glowing Red Pulse)
    const leakGroup = new THREE.Group();
    const leakPos = new THREE.Vector3(0, 0, 20); // Leak location

    // Glowing red pulse sphere at leak junction
    const leakPulseGeo = new THREE.SphereGeometry(2, 16, 16);
    const leakPulseMat = new THREE.MeshBasicMaterial({
      color: 0xff3b30,
      transparent: true,
      opacity: 0.6,
      wireframe: true,
    });
    const leakPulseMesh = new THREE.Mesh(leakPulseGeo, leakPulseMat);
    leakPulseMesh.position.copy(leakPos);
    leakGroup.add(leakPulseMesh);

    // Water spray mist particles emitting upward
    const sprayCount = 150;
    const sprayGeo = new THREE.BufferGeometry();
    const sprayPos = new Float32Array(sprayCount * 3);
    for (let i = 0; i < sprayCount; i++) {
      sprayPos[i * 3] = leakPos.x + (Math.random() - 0.5) * 1.5;
      sprayPos[i * 3 + 1] = leakPos.y + Math.random() * 6;
      sprayPos[i * 3 + 2] = leakPos.z + (Math.random() - 0.5) * 1.5;
    }
    sprayGeo.setAttribute('position', new THREE.BufferAttribute(sprayPos, 3));
    const sprayMat = new THREE.PointsMaterial({
      color: 0xff5555,
      size: 0.4,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const sprayParticles = new THREE.Points(sprayGeo, sprayMat);
    leakGroup.add(sprayParticles);
    leakSpraysRef.current = leakGroup;
    scene.add(leakGroup);

    // 8. Reservoir Water Body Mesh (3D Filling Effect)
    const resGeo = new THREE.CylinderGeometry(14, 14, 12, 32);
    const resTankMat = new THREE.MeshStandardMaterial({
      color: isNight ? 0x112244 : 0x94a3b8,
      transparent: true,
      opacity: 0.6,
      roughness: 0.1,
    });
    const resTank = new THREE.Mesh(resGeo, resTankMat);
    resTank.position.set(-35, 6, -30);
    scene.add(resTank);

    // Water fluid mesh inside reservoir
    const fillRatio = reservoirs[0] ? reservoirs[0].fillPercentage / 100 : 0.85;
    const resWaterGeo = new THREE.CylinderGeometry(13.6, 13.6, 12 * fillRatio, 32);
    const resWaterMat = new THREE.MeshPhysicalMaterial({
      color: 0x00d2ff,
      transmission: 0.9,
      opacity: 0.85,
      transparent: true,
      roughness: 0.1,
      ior: 1.33,
    });
    const resWater = new THREE.Mesh(resWaterGeo, resWaterMat);
    resWater.position.set(-35, (12 * fillRatio) / 2, -30);
    reservoirWaterRef.current = resWater;
    scene.add(resWater);

    // 9. Translucent Blue Flood Zone Water Overlay
    const floodHeight = (floodRiskPct / 100) * 4;
    const floodGeo = new THREE.PlaneGeometry(50, 50, 32, 32);
    const floodMat = new THREE.MeshPhysicalMaterial({
      color: 0x00a8ff,
      transparent: true,
      opacity: 0.55,
      roughness: 0.2,
      transmission: 0.8,
    });
    const floodMesh = new THREE.Mesh(floodGeo, floodMat);
    floodMesh.rotation.x = -Math.PI / 2;
    floodMesh.position.set(20, floodHeight, 20);
    floodPlaneRef.current = floodMesh;
    scene.add(floodMesh);

    // 10. Particle Rain Animation Setup
    const rainCount = 1200;
    const rainGeo = new THREE.BufferGeometry();
    const rainPos = new Float32Array(rainCount * 3);

    for (let i = 0; i < rainCount; i++) {
      rainPos[i * 3] = -60 + Math.random() * 120;
      rainPos[i * 3 + 1] = Math.random() * 60;
      rainPos[i * 3 + 2] = -60 + Math.random() * 120;
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
    const rainMat = new THREE.PointsMaterial({
      color: isNight ? 0x88ccff : 0x0284c7,
      size: 0.35,
      transparent: true,
      opacity: 0.7,
    });
    const rainParticles = new THREE.Points(rainGeo, rainMat);
    rainParticlesRef.current = rainParticles;
    if (isRaining) scene.add(rainParticles);

    // 11. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Controls update
      controls.update();

      // Flow water particles inside pipes
      if (waterFlowParticlesRef.current) {
        const positions = waterFlowParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length / 3; i++) {
          positions[i * 3 + 1] += Math.sin(elapsedTime * 4 + i) * 0.02;
        }
        waterFlowParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Leak water spray mist animation
      if (leakSpraysRef.current) {
        const spray = leakSpraysRef.current.children[1] as THREE.Points;
        if (spray) {
          const positions = spray.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < positions.length / 3; i++) {
            positions[i * 3 + 1] += 0.15;
            if (positions[i * 3 + 1] > 8) {
              positions[i * 3 + 1] = 0;
            }
          }
          spray.geometry.attributes.position.needsUpdate = true;
        }

        // Pulse scale of red alert sphere
        const redPulse = leakSpraysRef.current.children[0] as THREE.Mesh;
        if (redPulse) {
          const scale = 1 + Math.sin(elapsedTime * 6) * 0.25;
          redPulse.scale.set(scale, scale, scale);
        }
      }

      // Rain animation
      if (rainParticlesRef.current && isRaining) {
        const positions = rainParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length / 3; i++) {
          positions[i * 3 + 1] -= 0.8;
          if (positions[i * 3 + 1] < 0) {
            positions[i * 3 + 1] = 50 + Math.random() * 10;
          }
        }
        rainParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [isNight, isXRay, isRaining, floodRiskPct]);

  // Handle Preset Camera Positions
  const handlePresetChange = (preset: 'city' | 'underground' | 'dam' | 'flood' | 'farm') => {
    setActivePreset(preset);
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (preset === 'city') {
      camera.position.set(40, 35, 60);
      controls.target.set(0, 0, 0);
      setIsXRay(false);
    } else if (preset === 'underground') {
      camera.position.set(10, 15, 30);
      controls.target.set(0, -4, 0);
      setIsXRay(true);
    } else if (preset === 'dam') {
      camera.position.set(-20, 20, -10);
      controls.target.set(-35, 6, -30);
      setIsXRay(false);
    } else if (preset === 'flood') {
      camera.position.set(40, 18, 40);
      controls.target.set(20, 2, 20);
      setIsXRay(false);
    } else if (preset === 'farm') {
      camera.position.set(-30, 22, 40);
      controls.target.set(-20, 0, 20);
      setIsXRay(false);
    }
    controls.update();
  };

  return (
    <div className="relative w-full h-[650px] glass-panel rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD Control Overlay */}
      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 bg-[#050914]/85 dark:bg-[#050914]/85 light:bg-white/90 backdrop-blur-xl border border-cyan-500/30 p-2 rounded-2xl shadow-neon-blue z-10">
        
        {/* X-Ray Underground Toggle */}
        <button
          onClick={() => setIsXRay(!isXRay)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
            isXRay
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-700 dark:text-cyan-300 shadow-neon-cyan'
              : 'bg-slate-100 dark:bg-slate-900/60 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-400'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{isXRay ? 'X-RAY PIPELINE ON' : 'GROUND SURFACE ON'}</span>
        </button>

        {/* Day / Night Toggle */}
        <button
          onClick={() => setIsNight(!isNight)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-cyan-300 hover:border-cyan-400 transition"
        >
          {isNight ? <Moon className="w-3.5 h-3.5 text-cyan-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
          <span>{isNight ? 'NIGHT LIGHTING' : 'DAY LIGHTING'}</span>
        </button>

        {/* Rain Weather Toggle */}
        <button
          onClick={() => setIsRaining(!isRaining)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
            isRaining
              ? 'bg-blue-100 dark:bg-blue-950/80 border-blue-400 text-blue-800 dark:text-blue-300'
              : 'bg-slate-100 dark:bg-slate-900/60 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-400'
          }`}
        >
          <CloudRain className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>{isRaining ? 'RAIN ON' : 'RAIN OFF'}</span>
        </button>
      </div>

      {/* Preset Camera Bookmarks Bar */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#050914]/85 dark:bg-[#050914]/85 light:bg-white/90 backdrop-blur-xl border border-cyan-500/30 p-2 rounded-2xl z-10">
        <span className="text-[10px] text-cyan-600 dark:text-cyan-300 font-orbitron px-2 uppercase font-bold flex items-center gap-1">
          <Compass className="w-3 h-3 text-cyan-500 dark:text-cyan-400" /> PRESETS:
        </span>
        {[
          { id: 'city', label: 'City Overview' },
          { id: 'underground', label: 'Underground Pipes' },
          { id: 'dam', label: 'Grand Reservoir' },
          { id: 'flood', label: 'Flood Zone C' },
        ].map((preset) => (
          <button
            key={preset.id}
            onClick={() => handlePresetChange(preset.id as any)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              activePreset === preset.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-neon-blue'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Bottom Live Telemetry Legend Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-4 bg-[#050914]/90 dark:bg-[#050914]/90 light:bg-white/90 backdrop-blur-xl border border-cyan-500/30 p-3 rounded-2xl z-10 text-xs">
        
        {/* Underground Pipes & Leak Status Legend */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-neon-cyan animate-pulse"></span>
            <span className="text-slate-800 dark:text-slate-300">Active Flow (Blue)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 shadow-neon-red animate-ping"></span>
            <span className="text-red-600 dark:text-red-400 font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Leak Burst Spray (Red Pulse)
            </span>
          </div>
        </div>

        {/* Live HUD Indicator */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-600 dark:text-cyan-300">
          <span>Interactive 3D WebGL Engine | Drag to Rotate | Scroll to Zoom</span>
        </div>
      </div>
    </div>
  );
};
