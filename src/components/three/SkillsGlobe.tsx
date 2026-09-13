"use client";

import type * as Three from "three";
import type { CSSProperties, RefObject } from "react";
import { useEffect, useMemo, useRef } from "react";
import type { SkillIcon } from "@/data/skills";
import { isDarkTheme, observeTheme } from "@/lib/theme";

export type GlobeSkill = {
  name: string;
  icon: SkillIcon;
  color: string;
  category: string;
};

type SkillsGlobeProps = {
  skills: GlobeSkill[];
  activeCategory: string;
  onSelect: (skill: GlobeSkill) => void;
};

type Point = [number, number, number];

const CHIP_RADIUS = 1.12;
const SHELL_RADIUS = 0.94;

function fibonacciSphere(count: number): Point[] {
  const points: Point[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < count; index += 1) {
    const y = 1 - ((index + 0.5) / count) * 2;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * index;
    points.push([Math.cos(theta) * ring, y, Math.sin(theta) * ring]);
  }

  return points;
}

/**
 * Interactive 3D skills globe. Three.js draws the wireframe shell, surface
 * dots, and an orbit. Each technology is a real DOM button projected onto
 * the rotating sphere every frame, so icons stay crisp and clickable.
 *
 * Drag rotates the globe with inertia. Hovering slows it down. Clicking an
 * icon opens that skill's category. Before Three.js loads, CSS places the
 * icons on a static sphere, so the globe is never empty.
 */
export function SkillsGlobe({ skills, activeCategory, onSelect }: SkillsGlobeProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const points = useMemo(() => fibonacciSphere(skills.length), [skills.length]);

  useEffect(() => {
    const stage = stageRef.current;
    const canvasHost = canvasHostRef.current;

    if (!stage || !canvasHost) {
      return;
    }

    let disposed = false;
    let teardown: (() => void) | undefined;

    import("three")
      .then((THREE) => {
        if (!disposed) {
          teardown = createGlobe(THREE, stage, canvasHost, chipRefs, points);
        }
      })
      .catch(() => undefined);

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [points]);

  return (
    <div ref={stageRef} className="skills-globe">
      <div className="skills-globe-glow" aria-hidden="true" />
      <div ref={canvasHostRef} className="skills-globe-canvas" aria-hidden="true" />
      <div className="skills-globe-chips" aria-hidden="true">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          const [x, y, z] = points[index] ?? [0, 0, 0];
          const depth = (z + 1) / 2;
          const style = {
            "--skill-color": skill.color,
            "--fx": `${(50 + x * 40).toFixed(2)}%`,
            "--fy": `${(50 - y * 40).toFixed(2)}%`,
            "--fo": (0.3 + depth * 0.7).toFixed(2),
            "--fs": (0.6 + depth * 0.45).toFixed(2),
            "--fz": Math.round(depth * 100)
          } as CSSProperties;

          return (
            <button
              key={skill.name}
              ref={(node) => {
                chipRefs.current[index] = node;
              }}
              type="button"
              tabIndex={-1}
              className={`skills-globe-chip${skill.category === activeCategory ? " is-active" : ""}`}
              style={style}
              onClick={() => onSelect(skill)}
            >
              <Icon className="skills-globe-chip-icon" style={{ color: skill.color }} aria-hidden />
              <span className="skills-globe-chip-label">{skill.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function createGlobe(
  THREE: typeof Three,
  stage: HTMLDivElement,
  canvasHost: HTMLDivElement,
  chipRefs: RefObject<(HTMLButtonElement | null)[]>,
  points: Point[]
) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
  camera.position.set(0, 0, 5.1);
  camera.updateMatrixWorld();

  // WebGL is optional: if it is unavailable the icons still orbit.
  let renderer: Three.WebGLRenderer | null = null;

  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    canvasHost.appendChild(renderer.domElement);
  } catch {
    renderer = null;
  }

  const globe = new THREE.Group();
  scene.add(globe);
  const disposables: { dispose: () => void }[] = [];

  // Latitude and longitude wireframe.
  const lineMaterial = new THREE.LineBasicMaterial({ transparent: true, depthWrite: false });
  disposables.push(lineMaterial);
  const segments = 96;

  const addLoop = (loop: Three.Vector3[]) => {
    const geometry = new THREE.BufferGeometry().setFromPoints(loop);
    disposables.push(geometry);
    globe.add(new THREE.LineLoop(geometry, lineMaterial));
  };

  for (const latitude of [-60, -30, 0, 30, 60]) {
    const phi = THREE.MathUtils.degToRad(latitude);
    const ringRadius = Math.cos(phi) * SHELL_RADIUS;
    const ringY = Math.sin(phi) * SHELL_RADIUS;
    const loop: Three.Vector3[] = [];

    for (let step = 0; step < segments; step += 1) {
      const t = (step / segments) * Math.PI * 2;
      loop.push(new THREE.Vector3(Math.cos(t) * ringRadius, ringY, Math.sin(t) * ringRadius));
    }

    addLoop(loop);
  }

  for (let meridian = 0; meridian < 6; meridian += 1) {
    const lambda = (meridian / 6) * Math.PI;
    const loop: Three.Vector3[] = [];

    for (let step = 0; step < segments; step += 1) {
      const t = (step / segments) * Math.PI * 2;
      loop.push(
        new THREE.Vector3(
          Math.cos(t) * Math.cos(lambda) * SHELL_RADIUS,
          Math.sin(t) * SHELL_RADIUS,
          Math.cos(t) * Math.sin(lambda) * SHELL_RADIUS
        )
      );
    }

    addLoop(loop);
  }

  // Surface dots.
  const dotPoints = fibonacciSphere(520);
  const dotPositions = new Float32Array(dotPoints.length * 3);
  dotPoints.forEach(([x, y, z], index) => {
    dotPositions[index * 3] = x * SHELL_RADIUS;
    dotPositions[index * 3 + 1] = y * SHELL_RADIUS;
    dotPositions[index * 3 + 2] = z * SHELL_RADIUS;
  });
  const dotGeometry = new THREE.BufferGeometry();
  dotGeometry.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
  const dotMaterial = new THREE.PointsMaterial({ size: 0.028, sizeAttenuation: true, transparent: true, depthWrite: false });
  disposables.push(dotGeometry, dotMaterial);
  globe.add(new THREE.Points(dotGeometry, dotMaterial));

  // Tilted orbit with a comet.
  const orbitGeometry = new THREE.TorusGeometry(1.36, 0.0045, 6, 200);
  const orbitMaterial = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false });
  const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
  orbit.rotation.set(Math.PI / 2 - 0.35, 0.3, 0);
  const cometGeometry = new THREE.SphereGeometry(0.035, 16, 16);
  const cometMaterial = new THREE.MeshBasicMaterial();
  const comet = new THREE.Mesh(cometGeometry, cometMaterial);
  comet.position.set(1.36, 0, 0);
  orbit.add(comet);
  scene.add(orbit);
  disposables.push(orbitGeometry, orbitMaterial, cometGeometry, cometMaterial);

  const basePoints = points.map(([x, y, z]) => new THREE.Vector3(x, y, z).multiplyScalar(CHIP_RADIUS));
  const projected = new THREE.Vector3();

  // Hand chip positioning over from CSS to the projection below.
  for (const chip of chipRefs.current) {
    if (chip) {
      chip.style.left = "0px";
      chip.style.top = "0px";
    }
  }

  let width = 1;
  let height = 1;

  const layout = () => {
    const rect = stage.getBoundingClientRect();
    width = Math.max(rect.width, 1);
    height = Math.max(rect.height, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer?.setSize(width, height, false);
  };

  // Drag, inertia, and hover state.
  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
  const autoSpin = reducedMotion ? 0 : 0.0035;
  let rotationX = 0.32;
  let rotationY = 0;
  let velocityX = 0;
  let velocityY = 0;
  let pointerDown = false;
  let dragging = false;
  let hovering = false;
  let activePointer = -1;
  let lastX = 0;
  let lastY = 0;
  let travel = 0;

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    pointerDown = true;
    dragging = false;
    activePointer = event.pointerId;
    lastX = event.clientX;
    lastY = event.clientY;
    travel = 0;
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!pointerDown || event.pointerId !== activePointer) {
      return;
    }

    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    lastX = event.clientX;
    lastY = event.clientY;
    travel += Math.abs(dx) + Math.abs(dy);

    // Capture only once it is clearly a drag, so plain clicks still reach the icons.
    if (!dragging && travel > 6) {
      dragging = true;
      stage.classList.add("is-dragging");
      try {
        stage.setPointerCapture(event.pointerId);
      } catch {
        // Capture is a progressive enhancement.
      }
    }

    if (!dragging) {
      return;
    }

    velocityY = dx * 0.0055;
    velocityX = dy * 0.0055;
    rotationY += velocityY;
    rotationX = clamp(rotationX + velocityX, -1.2, 1.2);
  };

  const endDrag = (event: PointerEvent) => {
    if (event.pointerId !== activePointer) {
      return;
    }

    pointerDown = false;
    activePointer = -1;

    if (dragging) {
      dragging = false;
      stage.classList.remove("is-dragging");
      try {
        if (stage.hasPointerCapture(event.pointerId)) {
          stage.releasePointerCapture(event.pointerId);
        }
      } catch {
        // Ignore: capture may already be released.
      }
    }
  };

  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType === "mouse") {
      hovering = true;
    }
  };

  const onPointerLeave = () => {
    hovering = false;
  };

  const startTime = performance.now();
  let lastFrameTime = startTime;

  const renderFrame = (now: number) => {
    const elapsed = (now - startTime) / 1000;
    // Frame-rate independent motion: 1 unit = one 60 Hz frame. Clamped so a
    // stalled or resumed loop does not jump.
    const frames = Math.min(Math.max((now - lastFrameTime) / (1000 / 60), 0), 3);
    lastFrameTime = now;

    if (!dragging) {
      const targetSpin = hovering ? autoSpin * 0.3 : autoSpin;
      velocityY += (targetSpin - velocityY) * (1 - Math.pow(1 - 0.035, frames));
      velocityX *= Math.pow(0.92, frames);
      rotationY += velocityY * frames;
      rotationX = clamp(rotationX + velocityX * frames, -1.2, 1.2);
      rotationX += (0.32 - rotationX) * (1 - Math.pow(1 - 0.008, frames));
    }

    globe.rotation.set(rotationX, rotationY, 0);
    globe.updateMatrixWorld();

    if (!reducedMotion) {
      orbit.rotation.z = elapsed * 0.4;
    }

    const chips = chipRefs.current;

    for (let index = 0; index < basePoints.length; index += 1) {
      const chip = chips[index];

      if (!chip) {
        continue;
      }

      projected.copy(basePoints[index]).applyMatrix4(globe.matrixWorld);
      const depth = clamp((projected.z / CHIP_RADIUS + 1) / 2, 0, 1);
      projected.project(camera);

      const x = (projected.x * 0.5 + 0.5) * width;
      const y = (-projected.y * 0.5 + 0.5) * height;
      const scale = 0.58 + depth * 0.5;

      chip.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      chip.style.opacity = (0.16 + depth * 0.84).toFixed(3);
      chip.style.zIndex = String(Math.round(depth * 100));
      chip.style.pointerEvents = depth > 0.42 ? "auto" : "none";
    }

    renderer?.render(scene, camera);
  };

  const applyTheme = (dark: boolean) => {
    lineMaterial.color.set(dark ? "#34d399" : "#047857");
    lineMaterial.opacity = dark ? 0.26 : 0.18;
    dotMaterial.color.set(dark ? "#67e8f9" : "#0f766e");
    dotMaterial.opacity = dark ? 0.8 : 0.55;
    orbitMaterial.color.set(dark ? "#34d399" : "#0f766e");
    orbitMaterial.opacity = dark ? 0.35 : 0.25;
    cometMaterial.color.set(dark ? "#a7f3d0" : "#10b981");
    renderFrame(performance.now());
  };

  // Loop that only runs while the globe is on screen and the tab is visible.
  let frameId = 0;
  let running = false;
  let inView = false;
  let pageVisible = document.visibilityState === "visible";

  const tick = (now: number) => {
    frameId = window.requestAnimationFrame(tick);
    renderFrame(now);
  };

  const syncLoop = () => {
    const shouldRun = inView && pageVisible;

    if (shouldRun && !running) {
      running = true;
      frameId = window.requestAnimationFrame(tick);
    } else if (!shouldRun && running) {
      running = false;
      window.cancelAnimationFrame(frameId);
    }
  };

  const resizeObserver = new ResizeObserver(() => {
    layout();
    renderFrame(performance.now());
  });

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      // Entries can batch several changes; the last one is the current state.
      const latest = entries[entries.length - 1];
      inView = latest ? latest.isIntersecting : true;
      syncLoop();
    },
    { rootMargin: "160px" }
  );

  const onVisibilityChange = () => {
    pageVisible = document.visibilityState === "visible";
    syncLoop();
  };

  layout();
  applyTheme(isDarkTheme());
  const stopObservingTheme = observeTheme(applyTheme);
  resizeObserver.observe(stage);
  intersectionObserver.observe(stage);
  document.addEventListener("visibilitychange", onVisibilityChange);
  stage.addEventListener("pointerdown", onPointerDown);
  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);
  stage.addEventListener("pointerenter", onPointerEnter);
  stage.addEventListener("pointerleave", onPointerLeave);

  return () => {
    running = false;
    window.cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    stopObservingTheme();
    document.removeEventListener("visibilitychange", onVisibilityChange);
    stage.removeEventListener("pointerdown", onPointerDown);
    stage.removeEventListener("pointermove", onPointerMove);
    stage.removeEventListener("pointerup", endDrag);
    stage.removeEventListener("pointercancel", endDrag);
    stage.removeEventListener("pointerenter", onPointerEnter);
    stage.removeEventListener("pointerleave", onPointerLeave);
    stage.classList.remove("is-dragging");

    for (const chip of chipRefs.current) {
      if (chip) {
        for (const property of ["left", "top", "transform", "opacity", "z-index", "pointer-events"]) {
          chip.style.removeProperty(property);
        }
      }
    }

    for (const item of disposables) {
      item.dispose();
    }

    if (renderer) {
      renderer.dispose();
      renderer.domElement.remove();
    }
  };
}
