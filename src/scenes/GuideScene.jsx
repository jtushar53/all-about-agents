import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, Html } from '@react-three/drei';
import PromptTweaker from '../components/PromptTweaker.jsx';
import { getGuide } from '../content/registry.js';

const ROLE_COLOR = {
  teacher: '#7fe8ff',
  critic: '#ff6bb0',
  engineer: '#b070ff',
  peer: '#ffd070',
};

function buildCurve(n) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const t = i / Math.max(1, n - 1);
    const angle = t * Math.PI * 2;
    pts.push(
      new THREE.Vector3(
        Math.sin(angle) * 4.2,
        (t - 0.5) * 9,
        Math.cos(angle) * 4.2,
      ),
    );
  }
  return new THREE.CatmullRomCurve3(pts, false, 'centripetal');
}

function OutputCard({ temp, role, shots }) {
  const ref = useRef();
  const scale = 0.6 + temp * 0.75;
  const color = ROLE_COLOR[role] || '#7fe8ff';
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.6;
      ref.current.rotation.x += dt * 0.25;
    }
  });
  return (
    <group position={[-1.8, 0.2, 0]} ref={ref} scale={scale}>
      <mesh>
        <octahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          wireframe={shots === 0}
          roughness={0.3}
        />
      </mesh>
      <Text position={[0, -0.85, 0]} fontSize={0.1} color="#9fb2da" anchorX="center">
        {`out · t=${temp.toFixed(2)} · ${role} · ${shots}-shot`}
      </Text>
    </group>
  );
}

function Station({ index, position, active, guide, onClick }) {
  const [hover, setHover] = useState(false);
  const [temp, setTemp] = useState(0.7);
  const [role, setRole] = useState('teacher');
  const [shots, setShots] = useState(1);
  const ringRef = useRef();

  useFrame((_, dt) => {
    if (ringRef.current && active) ringRef.current.rotation.z += dt * 0.4;
  });

  const color = active ? '#7fe8ff' : hover ? '#b070ff' : '#3a4a6a';

  return (
    <group position={position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 1.2 : 0.35}
          roughness={0.25}
        />
      </mesh>
      {active && (
        <mesh ref={ringRef}>
          <torusGeometry args={[0.9, 0.02, 12, 60]} />
          <meshBasicMaterial color="#7fe8ff" transparent opacity={0.7} />
        </mesh>
      )}
      <Text
        position={[0, 0.85, 0]}
        fontSize={0.15}
        color={active ? '#ffffff' : '#b0bed9'}
        anchorX="center"
        maxWidth={3}
        textAlign="center"
      >
        {`${index + 1}. ${guide?.title ?? ''}`}
      </Text>
      {active && <OutputCard temp={temp} role={role} shots={shots} />}
      {active && (
        <Html
          position={[1.8, 0.1, 0]}
          transform
          distanceFactor={4}
          occlude="blending"
          style={{ pointerEvents: 'auto' }}
        >
          <div className="hud-panel" style={{ width: 420, maxHeight: 460, overflow: 'auto' }}>
            <div
              style={{
                fontSize: 10,
                color: '#9fb2da',
                textTransform: 'uppercase',
                letterSpacing: 1.2,
              }}
            >
              step {index + 1} of 12 · {guide?.tier || 'basics'}
            </div>
            <h2 style={{ margin: '6px 0 4px', color: '#7fe8ff', fontSize: 18 }}>
              {guide?.title}
            </h2>
            <div
              className="md-body"
              style={{ marginTop: 6, lineHeight: 1.55, fontSize: 13, color: '#c9d3ea' }}
              dangerouslySetInnerHTML={{ __html: guide?.html ?? '' }}
            />
            <PromptTweaker
              temp={temp}
              setTemp={setTemp}
              role={role}
              setRole={setRole}
              shots={shots}
              setShots={setShots}
            />
          </div>
        </Html>
      )}
    </group>
  );
}

export default function GuideScene() {
  const guides = getGuide();
  const stationCount = guides.length || 12;
  const curve = useMemo(() => buildCurve(stationCount), [stationCount]);
  const positions = useMemo(
    () =>
      Array.from({ length: stationCount }, (_, i) =>
        curve.getPoint(i / Math.max(1, stationCount - 1)),
      ),
    [curve, stationCount],
  );
  const [idx, setIdx] = useState(0);
  const { camera } = useThree();
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    if (idx >= stationCount) setIdx(stationCount - 1);
  }, [idx, stationCount]);

  useFrame((_, dt) => {
    const p = positions[idx] || positions[0];
    if (!p) return;
    tmp.copy(p).add(new THREE.Vector3(2.5, 0.6, 3.2));
    camera.position.lerp(tmp, Math.min(1, dt * 1.6));
    camera.lookAt(p);
  });

  return (
    <>
      {positions.map((p, i) => (
        <Station
          key={i}
          index={i}
          position={p}
          active={i === idx}
          guide={guides[i]}
          onClick={() => setIdx(i)}
        />
      ))}
      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            pointerEvents: 'none',
          }}
        >
          <button
            className="hud-panel"
            style={{
              pointerEvents: 'auto',
              cursor: idx === 0 ? 'not-allowed' : 'pointer',
              opacity: idx === 0 ? 0.5 : 1,
              padding: '8px 18px',
              fontSize: 13,
            }}
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
          >
            prev
          </button>
          <div className="hud-panel" style={{ pointerEvents: 'auto', padding: '8px 18px', fontSize: 13, color: '#7fe8ff' }}>
            {idx + 1} / {stationCount}
          </div>
          <button
            className="hud-panel"
            style={{
              pointerEvents: 'auto',
              cursor: idx === stationCount - 1 ? 'not-allowed' : 'pointer',
              opacity: idx === stationCount - 1 ? 0.5 : 1,
              padding: '8px 18px',
              fontSize: 13,
            }}
            onClick={() => setIdx((i) => Math.min(stationCount - 1, i + 1))}
            disabled={idx === stationCount - 1}
          >
            next
          </button>
        </div>
      </Html>
    </>
  );
}
