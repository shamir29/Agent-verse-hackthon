import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function ThreeCanvas({ aqi, temp, windSpeed, windDeg, pm25, pm10 }) {
  const containerRef = useRef(null);

  // AQI color scale helper
  const getAqiColorHex = (val) => {
    if (val <= 50) return 0x10b981; // Emerald
    if (val <= 100) return 0xf59e0b; // Amber
    if (val <= 150) return 0xef4444; // Red
    if (val <= 200) return 0xdc2626; // Deep Red
    return 0x8b5cf6; // Purple
  };

  const aqiColorHex = getAqiColorHex(aqi);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf1f5f9); // Clean light slate sky
    scene.fog = new THREE.FogExp2(0xf1f5f9, 0.025);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(12, 12, 16);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't allow camera under ground
    controls.minDistance = 5;
    controls.maxDistance = 40;

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    const aqiPointLight = new THREE.PointLight(aqiColorHex, 2.5, 25);
    aqiPointLight.position.set(0, 4, 0);
    scene.add(aqiPointLight);

    // 6. Stylized City Grid Ground
    const gridHelper = new THREE.GridHelper(30, 30, 0x94a3b8, 0xcbd5e1);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Create standard wireframe buildings
    const buildingsGroup = new THREE.Group();
    const citySize = 18;
    const buildingCount = 20;

    // Simple building geometry & materials (Light Mode)
    const bldMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
      roughness: 0.2,
      metalness: 0.1
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x64748b,
      wireframe: true
    });

    // Seed buildings
    for (let i = 0; i < buildingCount; i++) {
      const bHeight = 1.5 + Math.random() * 5.5;
      const bWidth = 1.2 + Math.random() * 1.8;
      const bDepth = 1.2 + Math.random() * 1.8;

      const geom = new THREE.BoxGeometry(bWidth, bHeight, bDepth);
      const mesh = new THREE.Mesh(geom, bldMat);
      const wire = new THREE.Mesh(geom, wireMat);
      mesh.add(wire);

      // Random position on the grid (avoiding direct center)
      let px = (Math.random() - 0.5) * citySize;
      let pz = (Math.random() - 0.5) * citySize;
      
      // Push away from origin
      if (Math.abs(px) < 2) px += px >= 0 ? 2 : -2;
      if (Math.abs(pz) < 2) pz += pz >= 0 ? 2 : -2;

      mesh.position.set(px, bHeight / 2, pz);
      buildingsGroup.add(mesh);
    }
    scene.add(buildingsGroup);

    // 7. 3D Stacked Pollution Height Layers (3 Translucent Planes)
    const layersGroup = new THREE.Group();
    const planeGeo = new THREE.PlaneGeometry(24, 24);

    // Colors mapping for height layers
    const c1 = new THREE.Color(aqiColorHex);
    const c2 = new THREE.Color(0x10b981);
    const midColor = c1.clone().lerp(c2, 0.4).getHex();

    const layerColors = [
      aqiColorHex,                      // Ground layer
      midColor,                         // Mid boundary layer
      0x10b981                          // High level
    ];

    const layerHeights = [2.0, 4.5, 7.5];

    layerHeights.forEach((hHeight, index) => {
      const layerMat = new THREE.MeshBasicMaterial({
        color: layerColors[index],
        transparent: true,
        opacity: 0.12 - (index * 0.03), // fade as they go higher
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const plane = new THREE.Mesh(planeGeo, layerMat);
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = hHeight;
      layersGroup.add(plane);

      // Add a subtle grid wireframe boundary to the plane
      const wireframe = new THREE.LineSegments(
        new THREE.EdgesGeometry(planeGeo),
        new THREE.LineBasicMaterial({ color: layerColors[index], transparent: true, opacity: 0.15 })
      );
      wireframe.rotation.x = -Math.PI / 2;
      wireframe.position.y = hHeight;
      layersGroup.add(wireframe);
    });
    scene.add(layersGroup);

    // 8. Floating Pollution Clouds (Particle spheres drifting)
    const particleCount = 120;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cColor = new THREE.Color(aqiColorHex);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = 1.0 + Math.random() * 7.5; // height offset
      positions[i * 3 + 2] = (Math.random() - 0.5) * 22;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      const variation = Math.random() * 0.15 - 0.075;
      particleColors[i * 3] = Math.max(0, Math.min(1, cColor.r + variation));
      particleColors[i * 3 + 1] = Math.max(0, Math.min(1, cColor.g + variation));
      particleColors[i * 3 + 2] = Math.max(0, Math.min(1, cColor.b + variation));
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.65,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(particlesGeo, particleMat);
    scene.add(particleSystem);

    // 9. Animated Wind Flow Lines
    const angleRad = (windDeg * Math.PI) / 180;
    const baseWindSpeed = Math.max(0.2, windSpeed * 0.1); 
    const windVector = new THREE.Vector3(
      Math.sin(angleRad) * baseWindSpeed,
      0,
      Math.cos(angleRad) * baseWindSpeed
    );

    const windLineCount = 18;
    const windLines = [];
    const windLineLength = 8;

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x93c5fd, // Light blue
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });

    for (let i = 0; i < windLineCount; i++) {
      const lineGeo = new THREE.BufferGeometry();
      const linePositions = new Float32Array(windLineLength * 3);
      
      const startX = (Math.random() - 0.5) * 24;
      const startY = 1.5 + Math.random() * 7;
      const startZ = (Math.random() - 0.5) * 24;

      for (let j = 0; j < windLineLength; j++) {
        linePositions[j * 3] = startX - (windVector.x * j * 0.7);
        linePositions[j * 3 + 1] = startY;
        linePositions[j * 3 + 2] = startZ - (windVector.z * j * 0.7);
      }

      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
      
      windLines.push({
        line,
        startX,
        startY,
        startZ,
        length: windLineLength,
        age: Math.random() * 100
      });
    }

    // 10. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      const currentAngleRad = (windDeg * Math.PI) / 180;
      const currentWindSpeed = Math.max(0.15, windSpeed * 0.15); 
      const currentWindVector = new THREE.Vector3(
        Math.sin(currentAngleRad) * currentWindSpeed,
        0,
        Math.cos(currentAngleRad) * currentWindSpeed
      );

      aqiPointLight.position.x = Math.sin(elapsedTime * 0.5) * 6;
      aqiPointLight.position.z = Math.cos(elapsedTime * 0.5) * 6;

      const posAttr = particleSystem.geometry.attributes.position;
      const posArray = posAttr.array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += currentWindVector.x * 0.05 + (Math.random() - 0.5) * 0.01;
        posArray[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.003 + (Math.random() - 0.5) * 0.005;
        posArray[i * 3 + 2] += currentWindVector.z * 0.05 + (Math.random() - 0.5) * 0.01;

        if (Math.abs(posArray[i * 3]) > 15) {
          posArray[i * 3] = -currentWindVector.x * 12 + (Math.random() - 0.5) * 5;
        }
        if (Math.abs(posArray[i * 3 + 2]) > 15) {
          posArray[i * 3 + 2] = -currentWindVector.z * 12 + (Math.random() - 0.5) * 5;
        }
        if (posArray[i * 3 + 1] < 0.5 || posArray[i * 3 + 1] > 9) {
          posArray[i * 3 + 1] = 1.0 + Math.random() * 6.5;
        }
      }
      posAttr.needsUpdate = true;

      windLines.forEach(w => {
        w.age += delta * windSpeed * 2.0;
        const linePosAttr = w.line.geometry.attributes.position;
        const arr = linePosAttr.array;

        for (let j = 0; j < w.length; j++) {
          arr[j * 3] += currentWindVector.x * 0.5;
          arr[j * 3 + 2] += currentWindVector.z * 0.5;
          arr[j * 3 + 1] = w.startY + Math.sin(elapsedTime * 2 + j * 0.5) * 0.08;
        }

        const headX = arr[0];
        const headZ = arr[0 + 2];
        if (Math.abs(headX) > 16 || Math.abs(headZ) > 16) {
          const rx = -currentWindVector.x * 12 + (Math.random() - 0.5) * 14;
          const rz = -currentWindVector.z * 12 + (Math.random() - 0.5) * 14;
          const ry = 1.5 + Math.random() * 7;

          for (let j = 0; j < w.length; j++) {
            arr[j * 3] = rx - (currentWindVector.x * j * 0.8);
            arr[j * 3 + 1] = ry;
            arr[j * 3 + 2] = rz - (currentWindVector.z * j * 0.8);
          }
          w.startY = ry;
        }
        linePosAttr.needsUpdate = true;
      });

      if (!controls.state === -1) {
        scene.rotation.y = elapsedTime * 0.02;
      } else {
        scene.rotation.y = 0;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [aqi, windSpeed, windDeg, temp]);

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* 3D UI Overlays */}
      <div className="absolute top-3 left-3 z-[10] pointer-events-none space-y-1">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest bg-white/90 px-2.5 py-1 rounded border border-slate-200 backdrop-blur-sm inline-block shadow-sm">
          Interactive 3D Engine
        </h4>
        <div className="text-[10px] text-slate-600 block bg-white/80 px-2 py-0.5 rounded border border-slate-200/60 backdrop-blur-sm shadow-sm">
          Left-click + Drag to rotate | Right-click to pan | Scroll to zoom
        </div>
      </div>

      <div className="absolute bottom-3 right-3 z-[10] pointer-events-none glass-panel p-2.5 rounded-lg text-[10px] space-y-1 text-slate-700 shadow-md">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-1.5 bg-sky-500 border border-sky-600 rounded-sm"></span>
          <span className="font-medium text-slate-800">Wind Flow lines ({windSpeed} m/s)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-1.5 rounded-sm" style={{ backgroundColor: `rgba(${aqiColorHex >> 16 & 255}, ${aqiColorHex >> 8 & 255}, ${aqiColorHex & 255}, 0.8)` }}></span>
          <span className="font-medium text-slate-800">Pollution Particles (AQI {aqi})</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="flex -space-x-0.5">
            <span className="w-2 h-1 bg-emerald-200 border-t border-emerald-500"></span>
            <span className="w-2 h-1 bg-amber-200 border-t border-amber-500"></span>
            <span className="w-2 h-1 bg-rose-200 border-t border-rose-500"></span>
          </div>
          <span className="font-medium text-slate-800">Altitude layers (2m, 4.5m, 7.5m)</span>
        </div>
      </div>
    </div>
  );
}
