"use client";

import type * as Three from "three";
import { useEffect, useRef } from "react";
import { isDarkTheme, observeTheme } from "@/lib/theme";

const simplexNoise = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
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
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

const blobVertexShader = /* glsl */ `
uniform float uTime;
uniform float uIntensity;
uniform float uSize;
uniform float uPixelRatio;
varying float vNoise;
varying float vFacing;

${simplexNoise}

void main() {
  vec3 base = position;
  vec3 direction = normalize(base);
  float primary = snoise(base * 0.62 + vec3(0.0, uTime * 0.16, uTime * 0.1));
  float detail = snoise(base * 1.8 - vec3(uTime * 0.22));
  float displacement = primary * (0.22 + uIntensity * 0.2) + detail * (0.05 + uIntensity * 0.08);
  vec3 displaced = base + direction * displacement;

  vNoise = displacement;
  vFacing = normalize(normalMatrix * direction).z * 0.5 + 0.5;

  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize * uPixelRatio * (1.0 / -mvPosition.z);
}
`;

const blobFragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uOpacity;
varying float vNoise;
varying float vFacing;

void main() {
  float distanceToCenter = length(gl_PointCoord - 0.5);
  if (distanceToCenter > 0.5) discard;

  float alpha = smoothstep(0.5, 0.05, distanceToCenter);
  vec3 color = mix(uColorA, uColorB, smoothstep(-0.2, 0.25, vNoise));
  color = mix(color, uColorC, smoothstep(0.18, 0.42, vNoise));

  gl_FragColor = vec4(color, alpha * uOpacity * (0.22 + vFacing * 0.78));
  #include <colorspace_fragment>
}
`;

/**
 * Hero backdrop: a noise-morphing particle sphere with a wireframe core,
 * orbit rings, and drifting dust. It follows the pointer, bulges when the
 * pointer moves fast, and drifts on scroll.
 *
 * Three.js is loaded lazily after the page is idle, so it never blocks
 * first paint. The render loop pauses off-screen and in background tabs.
 */
export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    let disposed = false;
    let teardown: (() => void) | undefined;
    let idleHandle = 0;
    let timeoutHandle = 0;

    const start = () => {
      import("three")
        .then((THREE) => {
          if (!disposed) {
            teardown = createHeroScene(THREE, host);
          }
        })
        .catch(() => undefined);
    };

    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(start, { timeout: 900 });
    } else {
      timeoutHandle = window.setTimeout(start, 250);
    }

    return () => {
      disposed = true;
      if (idleHandle && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle) {
        window.clearTimeout(timeoutHandle);
      }
      teardown?.();
    };
  }, []);

  return <div ref={hostRef} className="hero-scene" aria-hidden="true" />;
}

function createHeroScene(THREE: typeof Three, host: HTMLDivElement) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const compact = window.matchMedia("(max-width: 767px)").matches;

  let renderer: Three.WebGLRenderer;

  try {
    renderer = new THREE.WebGLRenderer({ antialias: !compact, alpha: true, powerPreference: "high-performance" });
  } catch {
    return () => undefined;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 1.75));
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
  camera.position.set(0, 0, 8);

  const root = new THREE.Group();
  scene.add(root);

  // Morphing particle sphere, evenly distributed with a Fibonacci lattice.
  const blobRadius = 1.9;
  const blobCount = compact ? 2400 : 4600;
  const blobPositions = new Float32Array(blobCount * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < blobCount; index += 1) {
    const y = 1 - ((index + 0.5) / blobCount) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = goldenAngle * index;
    blobPositions[index * 3] = Math.cos(theta) * ring * blobRadius;
    blobPositions[index * 3 + 1] = y * blobRadius;
    blobPositions[index * 3 + 2] = Math.sin(theta) * ring * blobRadius;
  }

  const blobGeometry = new THREE.BufferGeometry();
  blobGeometry.setAttribute("position", new THREE.BufferAttribute(blobPositions, 3));

  const blobUniforms = {
    uTime: { value: 0 },
    uIntensity: { value: 0 },
    uSize: { value: compact ? 17 : 19 },
    uPixelRatio: { value: renderer.getPixelRatio() },
    uColorA: { value: new THREE.Color() },
    uColorB: { value: new THREE.Color() },
    uColorC: { value: new THREE.Color() },
    uOpacity: { value: 1 }
  };

  const blobMaterial = new THREE.ShaderMaterial({
    uniforms: blobUniforms,
    vertexShader: blobVertexShader,
    fragmentShader: blobFragmentShader,
    transparent: true,
    depthWrite: false
  });
  const blob = new THREE.Points(blobGeometry, blobMaterial);
  root.add(blob);

  // Wireframe core.
  const coreSource = new THREE.IcosahedronGeometry(1.05, 1);
  const coreGeometry = new THREE.EdgesGeometry(coreSource);
  coreSource.dispose();
  const coreMaterial = new THREE.LineBasicMaterial({ transparent: true, depthWrite: false });
  const core = new THREE.LineSegments(coreGeometry, coreMaterial);
  root.add(core);

  // Orbit rings with travelling satellites.
  const ringGeometry = new THREE.TorusGeometry(2.75, 0.007, 8, 240);
  const ringMaterial = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false });
  const ringA = new THREE.Mesh(ringGeometry, ringMaterial);
  ringA.rotation.set(1.18, 0.24, 0);
  const ringB = new THREE.Mesh(ringGeometry, ringMaterial);
  ringB.rotation.set(1.95, -0.52, 0.4);
  ringB.scale.setScalar(1.14);

  const satelliteGeometry = new THREE.SphereGeometry(0.032, 16, 16);
  const satelliteMaterial = new THREE.MeshBasicMaterial();
  const satelliteA = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
  satelliteA.position.set(2.75, 0, 0);
  ringA.add(satelliteA);
  const satelliteB = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
  satelliteB.position.set(-2.75, 0, 0);
  ringB.add(satelliteB);
  root.add(ringA, ringB);

  // Ambient dust across the whole hero.
  const dustCount = compact ? 240 : 650;
  const dustPositions = new Float32Array(dustCount * 3);

  for (let index = 0; index < dustCount; index += 1) {
    dustPositions[index * 3] = (Math.random() - 0.5) * 20;
    dustPositions[index * 3 + 1] = (Math.random() - 0.5) * 12;
    dustPositions[index * 3 + 2] = Math.random() * -9 + 3;
  }

  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
  const dustMaterial = new THREE.PointsMaterial({ size: 0.045, sizeAttenuation: true, transparent: true, depthWrite: false });
  const dust = new THREE.Points(dustGeometry, dustMaterial);
  scene.add(dust);

  // Layout: centre the sphere behind the portrait (data-hero-anchor).
  let width = 1;
  let height = 1;
  let baseX = 0;
  let baseY = 0;

  const layout = () => {
    const rect = host.getBoundingClientRect();
    width = Math.max(rect.width, 1);
    height = Math.max(rect.height, 1);

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const worldPerPixel = (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z) / height;
    const wide = width >= 900;
    let centerX = width * (wide ? 0.74 : 0.5);
    let centerY = height * (wide ? 0.5 : 0.72);
    const anchor = host.parentElement?.querySelector<HTMLElement>("[data-hero-anchor]");

    if (anchor) {
      const anchorRect = anchor.getBoundingClientRect();
      centerX = anchorRect.left - rect.left + anchorRect.width / 2;
      centerY = anchorRect.top - rect.top + anchorRect.height / 2;
    }

    const radiusPx = wide ? Math.min(height * 0.44, 380) : Math.min(width * 0.5, 230);
    root.scale.setScalar((radiusPx * worldPerPixel) / blobRadius);
    baseX = (centerX - width / 2) * worldPerPixel;
    baseY = -(centerY - height / 2) * worldPerPixel;
    root.position.set(baseX, baseY, 0);
    blobUniforms.uPixelRatio.value = renderer.getPixelRatio();
  };

  // Pointer tracking: position steers the scene, speed adds "energy".
  const pointer = { x: 0, y: 0 };
  const pointerTarget = { x: 0, y: 0 };
  let energy = 0;
  let hasPointer = false;
  let lastPointerX = 0;
  let lastPointerY = 0;

  const onPointerMove = (event: PointerEvent) => {
    pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointerTarget.y = -((event.clientY / window.innerHeight) * 2 - 1);

    if (hasPointer) {
      const travelled = Math.hypot(event.clientX - lastPointerX, event.clientY - lastPointerY);
      energy = Math.min(1, energy + travelled * 0.0035);
    }

    hasPointer = true;
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
  };

  const renderFrame = (elapsed: number) => {
    pointer.x += (pointerTarget.x - pointer.x) * 0.05;
    pointer.y += (pointerTarget.y - pointer.y) * 0.05;
    energy *= 0.955;

    blobUniforms.uTime.value = elapsed;
    blobUniforms.uIntensity.value += (energy - blobUniforms.uIntensity.value) * 0.08;

    blob.rotation.y = elapsed * 0.07 + pointer.x * 0.45;
    blob.rotation.x = -pointer.y * 0.3;
    core.rotation.x = elapsed * 0.21;
    core.rotation.y = -elapsed * 0.26 + pointer.x * 0.3;
    ringA.rotation.z = elapsed * 0.35;
    ringB.rotation.z = -elapsed * 0.26;
    dust.rotation.y = elapsed * 0.012 + pointer.x * 0.06;
    dust.rotation.x = pointer.y * 0.04;

    const scrollRatio = Math.min(window.scrollY / height, 1.2);
    root.position.x = baseX;
    root.position.y = baseY + scrollRatio * 1.4;
    root.rotation.z = scrollRatio * 0.35;

    camera.position.x += (pointer.x * 0.4 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.28 - camera.position.y) * 0.04;

    renderer.render(scene, camera);
  };

  // Render loop that only runs while visible.
  const startTime = performance.now();
  let lastElapsed = 0;
  let frameId = 0;
  let running = false;
  let inView = true;
  let pageVisible = document.visibilityState === "visible";

  // Adaptive quality: skip the first 90 frames (shader warm-up), then average the
  // next 90. If the device cannot hold ~30 fps, render at 1x pixel ratio.
  let lastTickAt = 0;
  let sampledFrames = 0;
  let sampledTime = 0;
  let qualityChecked = false;

  const tick = (now: number) => {
    frameId = window.requestAnimationFrame(tick);

    if (!qualityChecked && lastTickAt) {
      const delta = now - lastTickAt;

      if (delta < 250) {
        sampledFrames += 1;

        if (sampledFrames > 90) {
          sampledTime += delta;
        }

        if (sampledFrames >= 180) {
          qualityChecked = true;

          if (sampledTime / 90 > 34 && renderer.getPixelRatio() > 1) {
            renderer.setPixelRatio(1);
            layout();
          }
        }
      }
    }

    lastTickAt = now;
    lastElapsed = (now - startTime) / 1000;
    renderFrame(lastElapsed);
  };

  const syncLoop = () => {
    const shouldRun = inView && pageVisible && !reducedMotion;

    if (shouldRun && !running) {
      running = true;
      lastTickAt = 0;
      frameId = window.requestAnimationFrame(tick);
    } else if (!shouldRun && running) {
      running = false;
      window.cancelAnimationFrame(frameId);
    }
  };

  const applyTheme = (dark: boolean) => {
    const blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;

    for (const material of [blobMaterial, coreMaterial, ringMaterial, dustMaterial]) {
      material.blending = blending;
      material.needsUpdate = true;
    }

    blobUniforms.uColorA.value.set(dark ? "#10b981" : "#047857");
    blobUniforms.uColorB.value.set(dark ? "#22d3ee" : "#0e7490");
    blobUniforms.uColorC.value.set(dark ? "#a7f3d0" : "#34d399");
    blobUniforms.uOpacity.value = dark ? 0.9 : 0.78;
    coreMaterial.color.set(dark ? "#6ee7b7" : "#047857");
    coreMaterial.opacity = dark ? 0.34 : 0.26;
    ringMaterial.color.set(dark ? "#34d399" : "#0f766e");
    ringMaterial.opacity = dark ? 0.32 : 0.2;
    satelliteMaterial.color.set(dark ? "#67e8f9" : "#0891b2");
    dustMaterial.color.set(dark ? "#94a3b8" : "#64748b");
    dustMaterial.opacity = dark ? 0.55 : 0.32;

    if (!running) {
      renderFrame(lastElapsed);
    }
  };

  const resizeObserver = new ResizeObserver(() => {
    layout();
    if (!running) {
      renderFrame(lastElapsed);
    }
  });

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      // Entries can batch several changes; the last one is the current state.
      const latest = entries[entries.length - 1];
      inView = latest ? latest.isIntersecting : true;
      syncLoop();
    },
    { rootMargin: "120px" }
  );

  const onVisibilityChange = () => {
    pageVisible = document.visibilityState === "visible";
    syncLoop();
  };

  layout();
  applyTheme(isDarkTheme());
  const stopObservingTheme = observeTheme(applyTheme);
  resizeObserver.observe(host);
  intersectionObserver.observe(host);
  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  renderFrame(0);
  host.classList.add("is-ready");
  syncLoop();

  return () => {
    running = false;
    window.cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    stopObservingTheme();
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("pointermove", onPointerMove);

    for (const geometry of [blobGeometry, coreGeometry, ringGeometry, satelliteGeometry, dustGeometry]) {
      geometry.dispose();
    }

    for (const material of [blobMaterial, coreMaterial, ringMaterial, satelliteMaterial, dustMaterial]) {
      material.dispose();
    }

    renderer.dispose();
    renderer.domElement.remove();
    host.classList.remove("is-ready");
  };
}
