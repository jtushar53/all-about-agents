import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

const TIERS = [
  { tier: 'basics', label: 'Basics', color: '#7fe8ff', blurb: 'Ages 8+ · what even is a prompt' },
  { tier: 'intermediate', label: 'Intermediate', color: '#5ac8ff', blurb: 'roles, shots, structure' },
  { tier: 'advanced', label: 'Advanced', color: '#b070ff', blurb: 'react, reflexion, rag' },
  { tier: 'frontier', label: 'Frontier', color: '#ff6bb0', blurb: 'dspy, opro, multi-agent' },
];

function fibSphere(n, r) {
  const pts = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(1, n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push([Math.cos(theta) * rad * r, y * r * 0.7, Math.sin(theta) * rad * r]);
  }
  return pts;
}

function Orb({ pos, color, label, blurb, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.9}>
      <group position={pos}>
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            setHover(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHover(false);
            document.body.style.cursor = 'auto';
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <sphereGeometry args={[hover ? 0.52 : 0.42, 48, 48]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hover ? 1.15 : 0.65}
            roughness={0.25}
            metalness={0.15}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[hover ? 0.7 : 0.58, 32, 32]} />
          <meshBasicMaterial color={color} transparent opacity={hover ? 0.18 : 0.08} />
        </mesh>
        <Text
          position={[0, 0.85, 0]}
          fontSize={0.2}
          color="#e6e7ea"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {label}
        </Text>
        <Text
          position={[0, 0.58, 0]}
          fontSize={0.1}
          color="#9fb2da"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
          textAlign="center"
        >
          {blurb}
        </Text>
      </group>
    </Float>
  );
}

export default function HomeScene() {
  const navigate = useNavigate();
  const grp = useRef();
  const pts = fibSphere(TIERS.length, 2.8);

  useFrame((_, dt) => {
    if (grp.current) grp.current.rotation.y += dt * 0.08;
  });

  return (
    <group ref={grp}>
      <Text
        position={[0, 0.35, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.02}
      >
        all about agents
      </Text>
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.16}
        color="#9fb2da"
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
        textAlign="center"
      >
        a 3D guide to prompt engineering — basics to frontier. tap a tier.
      </Text>
      {TIERS.map((t, i) => (
        <Orb
          key={t.tier}
          pos={pts[i]}
          color={t.color}
          label={t.label}
          blurb={t.blurb}
          onClick={() => navigate(`/library?tier=${t.tier}`)}
        />
      ))}
    </group>
  );
}
