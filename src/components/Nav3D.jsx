import { useState } from 'react';
import { Hud, PerspectiveCamera, Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useNavigate, useLocation } from 'react-router-dom';

const ITEMS = [
  { to: '/', label: 'home' },
  { to: '/guide', label: 'guide' },
  { to: '/library', label: 'library' },
  { to: '/search', label: 'search' },
  { to: '/sources', label: 'sources' },
];

function NavButton({ to, label, active, onClick, x, y }) {
  const [hover, setHover] = useState(false);
  const textColor = active ? '#7fe8ff' : hover ? '#ffffff' : '#b0bed9';
  const plateColor = active ? '#122033' : hover ? '#0f1a2c' : '#08101c';
  const outline = active ? '#7fe8ff' : hover ? '#7fe8ff' : '#2a3a5a';

  return (
    <group
      position={[x, y, 0]}
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
        onClick(to);
      }}
    >
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[1.35, 0.5]} />
        <meshBasicMaterial color={outline} transparent opacity={0.65} />
      </mesh>
      <mesh>
        <planeGeometry args={[1.28, 0.44]} />
        <meshBasicMaterial color={plateColor} transparent opacity={0.92} />
      </mesh>
      <Text fontSize={0.17} color={textColor} anchorX="center" anchorY="middle" letterSpacing={0.05}>
        {label}
      </Text>
    </group>
  );
}

function NavScene() {
  const { viewport } = useThree();
  const navigate = useNavigate();
  const location = useLocation();
  const spacing = 1.5;
  const totalWidth = (ITEMS.length - 1) * spacing;
  const startX = -totalWidth / 2;
  const y = viewport.height / 2 - 0.45;

  return (
    <>
      <ambientLight intensity={1} />
      {ITEMS.map((it, i) => (
        <NavButton
          key={it.to}
          to={it.to}
          label={it.label}
          active={location.pathname === it.to}
          onClick={navigate}
          x={startX + i * spacing}
          y={y}
        />
      ))}
    </>
  );
}

export default function Nav3D() {
  return (
    <Hud renderPriority={1}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={55} />
      <NavScene />
    </Hud>
  );
}
