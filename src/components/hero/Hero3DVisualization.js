import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import styles from './Hero3DVisualization.module.css';

/**
 * 3D Scientific Visualization: Procedural Thinking Brain + Mechanical Gears
 * Built with Three.js.
 * Dynamically frames the central typography zone with intelligent particle density,
 * soft depth layering, precision mechanical gears, and reactive dark/light theme systems.
 */
const Hero3DVisualization = ({ isLoaded = false }) => {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isLoadedRef = useRef(isLoaded);
  const isDarkRef = useRef(isDark);
  const themeUpdaterRef = useRef(null);

  useEffect(() => {
    isLoadedRef.current = isLoaded;
  }, [isLoaded]);

  useEffect(() => {
    isDarkRef.current = isDark;
    if (themeUpdaterRef.current) {
      themeUpdaterRef.current(isDark);
    }
  }, [isDark]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // --- 1. Scene, Camera, Renderer Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDarkRef.current ? 0x050505 : 0xf5f5f2, 0.045);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(
      42,
      width / height,
      0.1,
      100
    );
    camera.position.set(0, 0, isMobile ? 7.8 : isTablet ? 7.2 : 6.6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // --- 2. Master Groups ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const brainGroup = new THREE.Group();
    const gearsGroup = new THREE.Group();
    const telemetryGroup = new THREE.Group();
    masterGroup.add(brainGroup);
    masterGroup.add(gearsGroup);
    masterGroup.add(telemetryGroup);

    // Position and scale master group to create a natural visual frame around typography
    const baseScale = isMobile ? 0.92 : isTablet ? 1.05 : 1.18;
    masterGroup.scale.set(baseScale, baseScale, baseScale);
    masterGroup.position.set(0, isMobile ? 0.15 : 0.0, 0);

    // --- Helper: Soft Radial Sprite Textures for Dark & Light Themes ---
    const createDarkParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.25, 'rgba(230, 240, 255, 0.85)');
      gradient.addColorStop(0.55, 'rgba(160, 185, 220, 0.35)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const createLightParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 1)');
      gradient.addColorStop(0.3, 'rgba(30, 41, 59, 0.8)');
      gradient.addColorStop(0.65, 'rgba(71, 85, 105, 0.35)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const darkParticleTexture = createDarkParticleTexture();
    const lightParticleTexture = createLightParticleTexture();

    // --- 3. Procedural 3D Scientific Brain Geometry ---
    const totalBrainPoints = isMobile ? 750 : isTablet ? 1100 : 1550;
    const targetPositions = new Float32Array(totalBrainPoints * 3);
    const initialPositions = new Float32Array(totalBrainPoints * 3);
    const currentPositions = new Float32Array(totalBrainPoints * 3);
    const darkColors = new Float32Array(totalBrainPoints * 3);
    const lightColors = new Float32Array(totalBrainPoints * 3);
    const activeColors = new Float32Array(totalBrainPoints * 3);
    const sizes = new Float32Array(totalBrainPoints);

    const pointCoordinates = [];

    let pIdx = 0;
    for (let i = 0; i < totalBrainPoints; i++) {
      // Hemisphere selection: -1 (left hemisphere) or 1 (right hemisphere)
      const hemisphere = i % 2 === 0 ? 1 : -1;

      // Parametric polar coordinates with sulci/gyri folding harmonics
      const u = Math.random();
      const theta = Math.acos(2 * u - 1); // 0 to PI
      const phi = (Math.random() * Math.PI * 0.96 - Math.PI * 0.48) * hemisphere; // -PI/2 to PI/2

      // Biological brain proportions (front-to-back elongation, cortical sulci wrinkles)
      const sulciHarmonics =
        1 +
        0.12 * Math.sin(7 * theta) * Math.cos(5 * phi) +
        0.08 * Math.sin(11 * phi) * Math.cos(3 * theta) +
        0.05 * Math.sin(17 * theta);

      // Radial distribution: create outer framing shell while keeping central core deep/translucent
      const isPerimeterHalo = Math.random() < 0.78;
      const baseRadius = isPerimeterHalo
        ? (Math.random() * 0.45 + 1.28) * sulciHarmonics
        : (Math.random() * 0.6 + 0.4) * sulciHarmonics;

      // Brain dimensional scaling
      const fissureOffset = hemisphere * (isPerimeterHalo ? 0.28 : 0.1);
      let bx = (baseRadius * Math.sin(theta) * Math.sin(phi) * 0.96) + fissureOffset;
      let by = (baseRadius * Math.cos(theta) * 0.92);
      let bz = (baseRadius * Math.sin(theta) * Math.cos(phi) * 1.35) - 0.15;

      // --- Intelligent Focal Negative Space Modulation ---
      const isDirectlyBehindText = Math.abs(bx) < 1.35 && Math.abs(by) < 0.68;
      if (isDirectlyBehindText && bz > -0.3) {
        bz = -0.45 - Math.random() * 0.8;
      }

      targetPositions[pIdx] = bx;
      targetPositions[pIdx + 1] = by;
      targetPositions[pIdx + 2] = bz;

      // Scatter start positions for entrance assembly animation
      const scatterDistance = Math.random() * 6.5 + 4.0;
      const scatterTheta = Math.random() * Math.PI * 2;
      const scatterPhi = Math.random() * Math.PI - Math.PI / 2;
      initialPositions[pIdx] = Math.cos(scatterPhi) * Math.cos(scatterTheta) * scatterDistance;
      initialPositions[pIdx + 1] = Math.sin(scatterPhi) * scatterDistance;
      initialPositions[pIdx + 2] = Math.cos(scatterPhi) * Math.sin(scatterTheta) * scatterDistance;

      currentPositions[pIdx] = initialPositions[pIdx];
      currentPositions[pIdx + 1] = initialPositions[pIdx + 1];
      currentPositions[pIdx + 2] = initialPositions[pIdx + 2];

      pointCoordinates.push(new THREE.Vector3(bx, by, bz));

      // Scientific coloration: Dark & Light buffers
      const isSynapticNode = Math.random() < 0.09;
      if (isSynapticNode) {
        // Dark Mode: Glowing Emerald
        darkColors[pIdx] = 0.06;
        darkColors[pIdx + 1] = 0.82;
        darkColors[pIdx + 2] = 0.55;

        // Light Mode: Rich Deep Emerald
        lightColors[pIdx] = 0.02;
        lightColors[pIdx + 1] = 0.59;
        lightColors[pIdx + 2] = 0.41;

        sizes[i] = isDirectlyBehindText ? 0.05 : (Math.random() * 0.11 + 0.08);
      } else {
        const darkLuminance = isDirectlyBehindText ? (Math.random() * 0.25 + 0.25) : (Math.random() * 0.45 + 0.55);
        darkColors[pIdx] = darkLuminance * 0.88;
        darkColors[pIdx + 1] = darkLuminance * 0.92;
        darkColors[pIdx + 2] = darkLuminance * 1.0;

        const lightLuminance = isDirectlyBehindText ? (Math.random() * 0.15 + 0.12) : (Math.random() * 0.22 + 0.22);
        lightColors[pIdx] = lightLuminance * 0.95;
        lightColors[pIdx + 1] = lightLuminance * 1.05;
        lightColors[pIdx + 2] = lightLuminance * 1.25;

        sizes[i] = isDirectlyBehindText ? 0.04 : (Math.random() * 0.07 + 0.04);
      }

      // Initialize active colors
      activeColors[pIdx] = isDark ? darkColors[pIdx] : lightColors[pIdx];
      activeColors[pIdx + 1] = isDark ? darkColors[pIdx + 1] : lightColors[pIdx + 1];
      activeColors[pIdx + 2] = isDark ? darkColors[pIdx + 2] : lightColors[pIdx + 2];

      pIdx += 3;
    }

    const brainGeometry = new THREE.BufferGeometry();
    brainGeometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    brainGeometry.setAttribute('color', new THREE.BufferAttribute(activeColors, 3));
    brainGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const brainMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.075 : 0.085,
      vertexColors: true,
      map: isDark ? darkParticleTexture : lightParticleTexture,
      transparent: true,
      opacity: 0,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const brainPoints = new THREE.Points(brainGeometry, brainMaterial);
    brainGroup.add(brainPoints);

    // --- 4. Neural Synaptic Connection Lines (Lattice Wireframe) ---
    const lineIndices = [];
    const maxDistance = isMobile ? 0.36 : 0.32;
    const maxConnectionsPerPoint = 3;

    for (let i = 0; i < pointCoordinates.length; i++) {
      let connections = 0;
      for (let j = i + 1; j < pointCoordinates.length; j++) {
        if (connections >= maxConnectionsPerPoint) break;
        const dist = pointCoordinates[i].distanceTo(pointCoordinates[j]);
        if (dist < maxDistance) {
          lineIndices.push(i, j);
          connections++;
        }
      }
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    linesGeometry.setIndex(lineIndices);

    const linesMaterial = new THREE.LineBasicMaterial({
      color: isDark ? 0x4a6582 : 0x64748b,
      transparent: true,
      opacity: 0,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const brainLines = new THREE.LineSegments(linesGeometry, linesMaterial);
    brainGroup.add(brainLines);

    // --- 5. Dynamic Synaptic Impulses Traveling along Outer Curves ---
    const impulseCount = 8;
    const impulseSplines = [];
    const impulseMeshes = [];

    for (let i = 0; i < impulseCount; i++) {
      const p1 = pointCoordinates[Math.floor(Math.random() * pointCoordinates.length)];
      const p2 = pointCoordinates[Math.floor(Math.random() * pointCoordinates.length)];
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      mid.y += (Math.random() - 0.5) * 0.4;
      mid.x += (Math.random() - 0.5) * 0.4;

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      impulseSplines.push({
        curve,
        progress: Math.random(),
        speed: Math.random() * 0.007 + 0.003,
      });

      const impGeom = new THREE.SphereGeometry(0.03, 8, 8);
      const impMat = new THREE.MeshBasicMaterial({
        color: isDark ? (i % 2 === 0 ? 0x10b981 : 0xd1e4ff) : (i % 2 === 0 ? 0x059669 : 0x0284c7),
        transparent: true,
        opacity: 0,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      });
      const impMesh = new THREE.Mesh(impGeom, impMat);
      brainGroup.add(impMesh);
      impulseMeshes.push(impMesh);
    }

    // --- 6. Procedural 3D Mechanical Precision Gears (Offset in Depth) ---
    gearsGroup.position.set(0, 0, -0.35);

    const createGearGeometry = (radius, innerRadius, teeth, toothDepth, toothWidth) => {
      const shape = new THREE.Shape();
      const totalSteps = teeth * 2;
      const angleStep = (Math.PI * 2) / totalSteps;

      for (let i = 0; i < totalSteps; i++) {
        const isTooth = i % 2 === 1;
        const r = isTooth ? radius + toothDepth : radius;
        const a = i * angleStep;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;

        if (i === 0) {
          shape.moveTo(x, y);
        } else {
          shape.lineTo(x, y);
        }
      }
      shape.closePath();

      const holePath = new THREE.Path();
      holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
      shape.holes.push(holePath);

      const extrudeSettings = {
        depth: 0.08,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.015,
        bevelThickness: 0.015,
      };

      return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    };

    // Gear Materials
    const gearWireMaterial1 = new THREE.MeshBasicMaterial({
      color: isDark ? 0x3b4c60 : 0x475569,
      wireframe: true,
      transparent: true,
      opacity: 0,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const gearWireMaterial2 = new THREE.MeshBasicMaterial({
      color: isDark ? 0x2d5a52 : 0x059669,
      wireframe: true,
      transparent: true,
      opacity: 0,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    // Core Equatorial Gear Ring
    const gearGeom1 = createGearGeometry(1.6, 1.3, 26, 0.12, 0.08);
    const gearMesh1 = new THREE.Mesh(gearGeom1, gearWireMaterial1);
    gearMesh1.rotation.x = Math.PI / 2.1;
    gearMesh1.position.y = -0.2;
    gearsGroup.add(gearMesh1);

    // Planetary Angled Gear Ring
    const gearGeom2 = createGearGeometry(2.05, 1.8, 36, 0.1, 0.06);
    const gearMesh2 = new THREE.Mesh(gearGeom2, gearWireMaterial2);
    gearMesh2.rotation.x = Math.PI / 3.2;
    gearMesh2.rotation.y = Math.PI / 5.5;
    gearsGroup.add(gearMesh2);

    // Core Hub Spoke Ring
    const hubGeom = new THREE.TorusGeometry(0.75, 0.02, 12, 48);
    const hubMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x718da8 : 0x334155,
      wireframe: true,
      transparent: true,
      opacity: 0,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const hubMesh = new THREE.Mesh(hubGeom, hubMat);
    hubMesh.rotation.x = Math.PI / 2.1;
    hubMesh.position.y = -0.2;
    gearsGroup.add(hubMesh);

    // --- 7. Precision Orbital Telemetry Rings & Coordinate Markers ---
    telemetryGroup.position.set(0, 0, -0.4);

    const orbitalRingGeom1 = new THREE.RingGeometry(2.55, 2.57, 64);
    const orbitalRingMat1 = new THREE.MeshBasicMaterial({
      color: isDark ? 0x2a394a : 0x94a3b8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const orbitalRing1 = new THREE.Mesh(orbitalRingGeom1, orbitalRingMat1);
    orbitalRing1.rotation.x = Math.PI / 2.3;
    telemetryGroup.add(orbitalRing1);

    // Dashed Vertical Coordinate Arc
    const arcPoints = [];
    for (let a = 0; a <= Math.PI * 2; a += 0.15) {
      if (Math.sin(a * 6) > 0) {
        arcPoints.push(
          new THREE.Vector3(Math.cos(a) * 2.35, Math.sin(a) * 2.35, 0),
          new THREE.Vector3(Math.cos(a + 0.08) * 2.35, Math.sin(a + 0.08) * 2.35, 0)
        );
      }
    }
    const arcGeom = new THREE.BufferGeometry().setFromPoints(arcPoints);
    const arcMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x10b981 : 0x059669,
      transparent: true,
      opacity: 0,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const arcLines = new THREE.LineSegments(arcGeom, arcMat);
    arcLines.rotation.y = Math.PI / 4;
    telemetryGroup.add(arcLines);

    // --- Dynamic In-Place Theme Updater ---
    themeUpdaterRef.current = (darkState) => {
      scene.fog.color.setHex(darkState ? 0x050505 : 0xf5f5f2);

      brainMaterial.map = darkState ? darkParticleTexture : lightParticleTexture;
      brainMaterial.blending = darkState ? THREE.AdditiveBlending : THREE.NormalBlending;
      brainMaterial.needsUpdate = true;

      const colorAttr = brainGeometry.attributes.color;
      colorAttr.array.set(darkState ? darkColors : lightColors);
      colorAttr.needsUpdate = true;

      linesMaterial.color.setHex(darkState ? 0x4a6582 : 0x64748b);
      linesMaterial.blending = darkState ? THREE.AdditiveBlending : THREE.NormalBlending;
      linesMaterial.needsUpdate = true;

      gearWireMaterial1.color.setHex(darkState ? 0x3b4c60 : 0x475569);
      gearWireMaterial1.blending = darkState ? THREE.AdditiveBlending : THREE.NormalBlending;
      gearWireMaterial1.needsUpdate = true;

      gearWireMaterial2.color.setHex(darkState ? 0x2d5a52 : 0x059669);
      gearWireMaterial2.blending = darkState ? THREE.AdditiveBlending : THREE.NormalBlending;
      gearWireMaterial2.needsUpdate = true;

      hubMat.color.setHex(darkState ? 0x718da8 : 0x334155);
      hubMat.blending = darkState ? THREE.AdditiveBlending : THREE.NormalBlending;
      hubMat.needsUpdate = true;

      orbitalRingMat1.color.setHex(darkState ? 0x2a394a : 0x94a3b8);
      orbitalRingMat1.blending = darkState ? THREE.AdditiveBlending : THREE.NormalBlending;
      orbitalRingMat1.needsUpdate = true;

      arcMat.color.setHex(darkState ? 0x10b981 : 0x059669);
      arcMat.blending = darkState ? THREE.AdditiveBlending : THREE.NormalBlending;
      arcMat.needsUpdate = true;

      impulseMeshes.forEach((mesh, idx) => {
        mesh.material.color.setHex(
          darkState ? (idx % 2 === 0 ? 0x10b981 : 0xd1e4ff) : (idx % 2 === 0 ? 0x059669 : 0x0284c7)
        );
        mesh.material.blending = darkState ? THREE.AdditiveBlending : THREE.NormalBlending;
        mesh.material.needsUpdate = true;
      });
    };

    // --- 8. Mouse & Pointer Movement Handlers ---
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.22;
      mouseRef.current.targetY = y * 0.18;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mouseRef.current.targetX = x * 0.14;
        mouseRef.current.targetY = y * 0.12;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // --- 9. Responsive Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      const currentMobile = newWidth < 768;
      const currentTablet = newWidth >= 768 && newWidth < 1024;

      camera.aspect = newWidth / newHeight;
      camera.position.z = currentMobile ? 7.8 : currentTablet ? 7.2 : 6.6;
      const updatedScale = currentMobile ? 0.92 : currentTablet ? 1.05 : 1.18;
      masterGroup.scale.set(updatedScale, updatedScale, updatedScale);
      masterGroup.position.y = currentMobile ? 0.15 : 0.0;
      camera.updateProjectionMatrix();

      const newDpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(newDpr);
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // --- 10. Animation Loop & Timeline Sequencing ---
    let animationFrameId;
    let clock = new THREE.Clock();
    let entranceProgress = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // --- Entrance Progression (0.0s to 3.0s timeline) ---
      if (entranceProgress < 1) {
        entranceProgress = Math.min(entranceProgress + 0.009, 1);

        // Smooth cubic ease-out for particle assembly
        const ease = 1 - Math.pow(1 - entranceProgress, 3);

        const posAttr = brainGeometry.attributes.position;
        for (let i = 0; i < totalBrainPoints * 3; i++) {
          currentPositions[i] =
            initialPositions[i] + (targetPositions[i] - initialPositions[i]) * ease;
        }
        posAttr.needsUpdate = true;
        linesGeometry.attributes.position.needsUpdate = true;

        // Progressive alpha reveals
        brainMaterial.opacity = Math.min(ease * 0.78, 0.78);

        if (entranceProgress > 0.4) {
          const lineEase = (entranceProgress - 0.4) / 0.6;
          linesMaterial.opacity = lineEase * 0.24;
        }

        if (entranceProgress > 0.6) {
          const gearEase = (entranceProgress - 0.6) / 0.4;
          gearWireMaterial1.opacity = gearEase * 0.35;
          gearWireMaterial2.opacity = gearEase * 0.28;
          hubMat.opacity = gearEase * 0.38;
          orbitalRingMat1.opacity = gearEase * 0.22;
          arcMat.opacity = gearEase * 0.45;
          impulseMeshes.forEach((m) => (m.material.opacity = gearEase * 0.8));
        }
      }

      // --- Lerped Mouse Parallax Interaction ---
      if (!prefersReducedMotion) {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

        // Subtle camera & master group tilting
        masterGroup.rotation.y = mouseRef.current.x * 0.5 + elapsedTime * 0.06;
        masterGroup.rotation.x = -mouseRef.current.y * 0.35 + Math.sin(elapsedTime * 0.35) * 0.025;
        masterGroup.rotation.z = Math.sin(elapsedTime * 0.25) * 0.015;

        // Gentle breathing float
        masterGroup.position.y = (isMobile ? 0.15 : 0.0) + Math.sin(elapsedTime * 0.7) * 0.05;

        // Differential Mechanical Gear Rotations
        gearMesh1.rotation.z = elapsedTime * 0.16;
        gearMesh2.rotation.z = -elapsedTime * 0.1;
        hubMesh.rotation.z = elapsedTime * 0.2;
        orbitalRing1.rotation.z = -elapsedTime * 0.05;
        arcLines.rotation.z = elapsedTime * 0.08;

        // Update synaptic impulse positions
        for (let i = 0; i < impulseSplines.length; i++) {
          const item = impulseSplines[i];
          item.progress += item.speed;
          if (item.progress > 1) {
            item.progress = 0;
          }
          const pt = item.curve.getPoint(item.progress);
          impulseMeshes[i].position.copy(pt);
        }
      } else {
        // Reduced motion: static elegant orientation
        masterGroup.rotation.y = 0.2;
        masterGroup.rotation.x = 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup & Resource Disposal ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      // Dispose Geometries
      brainGeometry.dispose();
      linesGeometry.dispose();
      gearGeom1.dispose();
      gearGeom2.dispose();
      hubGeom.dispose();
      orbitalRingGeom1.dispose();
      arcGeom.dispose();
      darkParticleTexture.dispose();
      lightParticleTexture.dispose();

      // Dispose Materials
      brainMaterial.dispose();
      linesMaterial.dispose();
      gearWireMaterial1.dispose();
      gearWireMaterial2.dispose();
      hubMat.dispose();
      orbitalRingMat1.dispose();
      arcMat.dispose();

      impulseMeshes.forEach((m) => {
        m.geometry.dispose();
        m.material.dispose();
      });

      // Dispose Renderer
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.canvasContainer}
      aria-label="3D Procedural Scientific Brain and Mechanical Gears Visualization"
      role="img"
    />
  );
};

export default React.memo(Hero3DVisualization);
