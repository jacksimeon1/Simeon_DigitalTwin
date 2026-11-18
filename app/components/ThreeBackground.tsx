'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ── Simplex-inspired 3D noise (compact, GPU-free) ──
function noise3D(x: number, y: number, z: number): number {
  const p = x * 12.9898 + y * 78.233 + z * 45.164;
  const s = Math.sin(p) * 43758.5453;
  return (s - Math.floor(s)) * 2 - 1;
}

function fbm(x: number, y: number, z: number, octaves = 4): number {
  let val = 0, amp = 0.5, freq = 1;
  for (let i = 0; i < octaves; i++) {
    val += amp * noise3D(x * freq, y * freq, z * freq);
    amp *= 0.5;
    freq *= 2.0;
  }
  return val;
}

// ── Synthesized celestial chime on click (Zero external dependencies) ──
function playCelestialChime() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    
    // Harmonic crystalline chord (528Hz Solfeggio Love frequency + 792Hz Perfect Fifth)
    [528, 792].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.035);
      
      gain.gain.setValueAtTime(0.09, now + i * 0.035);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + i * 0.035);
      osc.stop(now + 1.2);
    });
  } catch {
    // Graceful fallback if audio is blocked
  }
}

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Scene, Camera, Renderer ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ── Theme Detection ──
    const isDarkTheme = () =>
      document.documentElement.classList.contains('dark') ||
      document.documentElement.getAttribute('data-theme') === 'dark';
    let isDark = isDarkTheme();

    // Theme observer
    const themeObserver = new MutationObserver(() => {
      const newDark = isDarkTheme();
      if (newDark !== isDark) {
        isDark = newDark;
        updateTheme();
      }
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });

    // ── Color Palettes ──
    const darkColors = {
      orbBase: new THREE.Color(0x1a1030),
      orbHighlight: new THREE.Color(0x8b5cf6),
      orbEdge: new THREE.Color(0xc4b5fd),
      particles: new THREE.Color(0xddd6fe),
      stars: new THREE.Color(0xffffff),
    };
    const lightColors = {
      orbBase: new THREE.Color(0xe2e0ea),
      orbHighlight: new THREE.Color(0x7c3aed),
      orbEdge: new THREE.Color(0xa78bfa),
      particles: new THREE.Color(0x6d28d9),
      stars: new THREE.Color(0x3f3f46),
    };
    let colors = isDark ? darkColors : lightColors;

    function updateTheme() {
      colors = isDark ? darkColors : lightColors;
      orbMat.uniforms.uBaseColor.value.copy(colors.orbBase);
      orbMat.uniforms.uHighlightColor.value.copy(colors.orbHighlight);
      orbMat.uniforms.uEdgeColor.value.copy(colors.orbEdge);
      orbMat.uniforms.uOpacity.value = isDark ? 0.85 : 0.55;
      particleMat.color.copy(colors.particles);
      particleMat.opacity = isDark ? 0.6 : 0.35;
      starMat.color.copy(colors.stars);
      starMat.opacity = isDark ? 0.5 : 0.2;
    }

    // ── Master Group ──
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // ════════════════════════════════════════════
    // 1. MORPHING CRYSTALLINE ORB
    // ════════════════════════════════════════════
    const orbGeo = new THREE.IcosahedronGeometry(3.2, 5);
    const basePositions = new Float32Array(orbGeo.attributes.position.array);

    const orbMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide,
      uniforms: {
        uTime: { value: 0 },
        uBaseColor: { value: colors.orbBase.clone() },
        uHighlightColor: { value: colors.orbHighlight.clone() },
        uEdgeColor: { value: colors.orbEdge.clone() },
        uOpacity: { value: isDark ? 0.85 : 0.55 },
        uHover: { value: 0 },
        uClickRipple: { value: 0 },
        uClickFlash: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying float vDisplacement;
        uniform float uTime;
        uniform float uHover;
        uniform float uClickRipple;
        
        // Simplex-like noise in GLSL
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }
        
        void main() {
          vec3 pos = position;
          float slowTime = uTime * 0.28;
          
          // Multi-octave organic crystalline noise displacement
          float n = snoise(pos * 0.65 + slowTime) * 0.38
                  + snoise(pos * 1.3 + slowTime * 0.8) * 0.18
                  + snoise(pos * 2.6 + slowTime * 0.5) * 0.08;
          
          // Smooth cosmic breathing pulse
          float breathe = sin(uTime * 0.8) * 0.1;
          
          // Click ripple wave propagating across surface
          float clickWave = sin(pos.y * 4.5 - uTime * 14.0) * uClickRipple * 0.4;
          
          // Hover expansion
          float hoverExp = uHover * 0.12;

          pos += normalize(pos) * (n + breathe + clickWave + hoverExp);
          vDisplacement = n + clickWave;
          
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          vViewDir = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uBaseColor;
        uniform vec3 uHighlightColor;
        uniform vec3 uEdgeColor;
        uniform float uTime;
        uniform float uOpacity;
        uniform float uHover;
        uniform float uClickFlash;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying float vDisplacement;
        
        void main() {
          // Fresnel rim lighting - intensifies dynamically on hover
          float fresnelPower = mix(2.8, 1.5, uHover);
          float fresnel = 1.0 - abs(dot(vNormal, vViewDir));
          fresnel = pow(fresnel, fresnelPower);
          
          // Iridescent color mixing
          float shift = vDisplacement * 2.0 + uTime * 0.08;
          vec3 col = mix(uBaseColor, uHighlightColor, smoothstep(-0.2, 0.3, vDisplacement + sin(shift) * 0.3));
          
          // Dynamic electric rim on hover
          vec3 electricEdge = mix(uEdgeColor, vec3(0.35, 0.85, 1.0), uHover * 0.65);
          col = mix(col, electricEdge, fresnel * (0.85 + uHover * 0.35));
          
          // Inner glow + click flash burst (supernova)
          float glow = pow(fresnel, 1.4) * (0.35 + uHover * 0.4);
          vec3 flashColor = vec3(0.95, 0.45, 1.0);
          col += (uHighlightColor * glow) + (flashColor * uClickFlash * 0.9);
          
          // Final alpha
          float alpha = mix(0.25, 1.0, fresnel) * (uOpacity + uHover * 0.15 + uClickFlash * 0.25);
          
          gl_FragColor = vec4(col, min(alpha, 1.0));
        }
      `,
    });

    const orb = new THREE.Mesh(orbGeo, orbMat);
    masterGroup.add(orb);

    // Wireframe overlay for crystalline feel
    const wireGeo = new THREE.IcosahedronGeometry(3.22, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x8b5cf6 : 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.08 : 0.06,
      depthWrite: false,
    });
    const wireframe = new THREE.Mesh(wireGeo, wireMat);
    masterGroup.add(wireframe);

    // Shockwave Rings on Click
    const shockGeo = new THREE.RingGeometry(3.15, 3.42, 64);
    const shockMat1 = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7, // Cyan/sky blue
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const shockwave1 = new THREE.Mesh(shockGeo, shockMat1);
    shockwave1.rotation.x = Math.PI * 0.5;
    masterGroup.add(shockwave1);

    const shockMat2 = new THREE.MeshBasicMaterial({
      color: isDark ? 0xc084fc : 0x9333ea, // Vivid purple/magenta
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const shockwave2 = new THREE.Mesh(shockGeo, shockMat2);
    shockwave2.rotation.y = Math.PI * 0.35;
    masterGroup.add(shockwave2);

    // ════════════════════════════════════════════
    // 2. ORBITING STARDUST PARTICLES
    // ════════════════════════════════════════════
    const particleCount = 220;
    const pPositions = new Float32Array(particleCount * 3);
    const pSpeeds: number[] = [];
    const pRadii: number[] = [];
    const pPhases: number[] = [];
    const pYOffsets: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const r = 5 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;

      pPositions[i * 3] = r * Math.cos(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi);
      pPositions[i * 3 + 2] = r * Math.cos(phi) * Math.sin(theta);

      pRadii.push(r);
      pPhases.push(theta);
      pYOffsets.push(phi);
      pSpeeds.push((0.02 + Math.random() * 0.04) / Math.sqrt(r));
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: colors.particles,
      size: 0.06,
      transparent: true,
      opacity: isDark ? 0.6 : 0.35,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // ════════════════════════════════════════════
    // 3. DEEP BACKGROUND STARFIELD
    // ════════════════════════════════════════════
    const starCount = 600;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 60 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: colors.stars,
      size: 0.12,
      transparent: true,
      opacity: isDark ? 0.5 : 0.2,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ════════════════════════════════════════════
    // 4. ORB POSITION & RESPONSIVE LAYOUT
    // ════════════════════════════════════════════
    // Track responsive base positions
    let baseX = 0;
    let baseY = 0;

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (w < 768) {
        baseX = 0;
        baseY = 1.0;
        masterGroup.position.set(baseX, baseY, -5);
        masterGroup.scale.setScalar(0.62);
        container.style.opacity = '0.55';
      } else if (w < 1024) {
        baseX = 1.0;
        baseY = 0.2;
        masterGroup.position.set(baseX, baseY, -2);
        masterGroup.scale.setScalar(0.76);
        container.style.opacity = '0.75';
      } else if (w < 1440) {
        baseX = 1.8;
        baseY = 0;
        masterGroup.position.set(baseX, baseY, -0.5);
        masterGroup.scale.setScalar(0.88);
        container.style.opacity = '0.88';
      } else {
        baseX = 2.1;
        baseY = 0;
        masterGroup.position.set(baseX, baseY, 0);
        masterGroup.scale.setScalar(0.94);
        container.style.opacity = '0.92';
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // ════════════════════════════════════════════
    // 5. MOUSE, HOVER & CLICK INTERACTION
    // ════════════════════════════════════════════
    let targetMX = 0, targetMY = 0, currentMX = 0, currentMY = 0;
    let scrollProgress = 0;

    // Raycasting for interactive orb
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(-999, -999);
    let isOrbHovered = false;
    let hoverProgress = 0;
    let clickProgress = 0;
    let clickTime = 0;
    let shockProgress = 1.0;
    let particleBurstVelocity = 0;

    const checkOrbIntersection = () => {
      raycaster.setFromCamera(mouseNDC, camera);
      const intersects = raycaster.intersectObject(orb);
      return intersects.length > 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMY = (e.clientY / window.innerHeight - 0.5) * 2;

      mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;

      const hovered = checkOrbIntersection();
      if (hovered !== isOrbHovered) {
        isOrbHovered = hovered;
        document.body.style.cursor = hovered ? 'pointer' : '';
      }
    };

    const triggerOrbClick = () => {
      clickProgress = 1.0;
      clickTime = 0;
      shockProgress = 0;
      particleBurstVelocity = 2.6;
      playCelestialChime();
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('a, button, input, textarea, select, [role="button"]')) {
        return;
      }
      mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
      if (checkOrbIntersection()) {
        triggerOrbClick();
      }
    };

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        targetMX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        targetMY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('click', onClick);
    window.addEventListener('scroll', onScroll, { passive: true });

    // ════════════════════════════════════════════
    // 6. VISIBILITY STATE
    // ════════════════════════════════════════════
    let isVisible = true;
    const onVisChange = () => { isVisible = !document.hidden; };
    document.addEventListener('visibilitychange', onVisChange);

    // ════════════════════════════════════════════
    // 7. ANIMATION LOOP
    // ════════════════════════════════════════════
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();

      // Smooth mouse easing
      currentMX += (targetMX - currentMX) * 0.03;
      currentMY += (targetMY - currentMY) * 0.03;

      // ── Interactive Hover & Click Easing ──
      hoverProgress += ((isOrbHovered ? 1.0 : 0.0) - hoverProgress) * 0.1;
      orbMat.uniforms.uTime.value = t;
      orbMat.uniforms.uHover.value = hoverProgress;
      orbMat.uniforms.uClickRipple.value = clickProgress;
      orbMat.uniforms.uClickFlash.value = clickProgress;

      if (clickProgress > 0.001) {
        clickProgress *= 0.93;
        clickTime += 0.05;
      }

      // Elastic wobble wave on click
      const wobble = Math.sin(clickTime * 18.0) * clickProgress * 0.22;
      const hoverScale = 1.0 + hoverProgress * 0.12;

      // ── Passive Zero-G Floating Levitation (Multi-harmonic Lissajous drift) ──
      const floatY = Math.sin(t * 0.85) * 0.24 + Math.cos(t * 0.4) * 0.1;
      const floatX = Math.cos(t * 0.65) * 0.14 + Math.sin(t * 0.3) * 0.06;
      const floatZ = Math.sin(t * 0.5) * 0.16;

      // ── Continuous Multi-Axis Gyroscopic Rotation & Tumbling ──
      const baseSpinY = t * (0.12 + hoverProgress * 0.08);
      const baseTumbleX = Math.sin(t * 0.45) * 0.28 + Math.cos(t * 0.22) * 0.12;
      const baseTiltZ = Math.sin(t * 0.35) * 0.18 + Math.cos(t * 0.7) * 0.08;

      orb.rotation.y = baseSpinY + currentMX * 0.15;
      orb.rotation.x = baseTumbleX - currentMY * 0.1;
      orb.rotation.z = baseTiltZ;

      // ── Wireframe counter-tumbling with distinct optical phase ──
      wireframe.rotation.y = -t * 0.07 + currentMX * 0.08;
      wireframe.rotation.x = Math.cos(t * 0.4) * 0.25 - currentMY * 0.06;
      wireframe.rotation.z = Math.sin(t * 0.5) * 0.18;

      // ── Passive organic breathing scale pulsation ──
      const passiveBreath = Math.sin(t * 1.1) * 0.035 + Math.cos(t * 0.55) * 0.015;

      // ── Hero-scoped scroll transformation (graceful ascension and fade when leaving Hero) ──
      const heroThreshold = Math.max(window.innerHeight * 0.75, 400);
      const heroExit = Math.min(window.scrollY / heroThreshold, 1);
      const heroFade = Math.max(1 - heroExit, 0);

      const scrollScale = (1 - heroExit * 0.4) * hoverScale * (1.0 + wobble + passiveBreath);
      const scrollY = heroExit * 14;
      orb.scale.setScalar(scrollScale);
      wireframe.scale.setScalar(scrollScale * (1.005 + hoverProgress * 0.06 + wobble * 1.1));
      wireMat.opacity = ((isDark ? 0.08 : 0.06) + hoverProgress * 0.18 + clickProgress * 0.25) * heroFade;
      orbMat.uniforms.uOpacity.value = (isDark ? 0.85 : 0.55) * heroFade;

      masterGroup.position.x = baseX + floatX;
      masterGroup.position.y = masterGroup.position.y * 0.95 + (baseY + scrollY + floatY) * 0.08;
      masterGroup.position.z = floatZ;

      // ── Click Shockwave Rings ──
      if (shockProgress < 1.0) {
        shockProgress += 0.028;
        const shockScale = (1.0 + shockProgress * 2.8) * hoverScale;
        const shockAlpha = Math.sin(shockProgress * Math.PI) * (isDark ? 0.85 : 0.6);
        shockwave1.scale.setScalar(shockScale);
        shockMat1.opacity = shockAlpha;
        shockwave1.rotation.z += 0.02;

        shockwave2.scale.setScalar(shockScale * 0.92);
        shockMat2.opacity = shockAlpha * 0.8;
        shockwave2.rotation.z -= 0.025;
      } else {
        shockMat1.opacity = 0;
        shockMat2.opacity = 0;
      }

      // ── Orbiting particles (speedup on hover, shock burst on click) ──
      particleBurstVelocity *= 0.93;
      const speedMult = 1.0 + hoverProgress * 2.2 + clickProgress * 3.5;
      const pPos = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        pPhases[i] += pSpeeds[i] * speedMult;
        const expandFactor = 1 + scrollProgress * 0.5 + hoverProgress * 0.16 + particleBurstVelocity;
        const r = pRadii[i] * expandFactor;
        const phi = pYOffsets[i] + Math.sin(t * 0.1 + i) * 0.05;

        pPos.setXYZ(
          i,
          r * Math.cos(phi) * Math.cos(pPhases[i]),
          r * Math.sin(phi) + Math.sin(t * 0.2 + i * 0.5) * 0.3,
          r * Math.cos(phi) * Math.sin(pPhases[i])
        );
      }
      pPos.needsUpdate = true;

      // ── Starfield gentle drift ──
      stars.rotation.y = t * 0.002 + currentMX * 0.01;
      stars.rotation.x = currentMY * 0.008;

      // ── Master parallax tilt ──
      masterGroup.rotation.y = currentMX * 0.12;
      masterGroup.rotation.x = -currentMY * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // ════════════════════════════════════════════
    // CLEANUP
    // ════════════════════════════════════════════
    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.cursor = '';
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisChange);
      themeObserver.disconnect();

      shockGeo.dispose();
      shockMat1.dispose();
      shockMat2.dispose();
      orbGeo.dispose();
      orbMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-700"
      style={{ opacity: 0.92 }}
    />
  );
}
