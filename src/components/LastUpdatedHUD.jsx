import { Hud, PerspectiveCamera, Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import meta from '../data/meta.json';

function Badge() {
  const { viewport } = useThree();
  const x = viewport.width / 2 - 0.25;
  const y = -viewport.height / 2 + 0.35;
  const label = `updated ${meta.lastUpdated} \u2022 ${meta.commit}`;

  return (
    <group position={[x, y, 0]}>
      <mesh position={[-1.15, 0, -0.01]}>
        <planeGeometry args={[2.4, 0.38]} />
        <meshBasicMaterial color="#08101c" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-1.15, 0, -0.02]}>
        <planeGeometry args={[2.46, 0.44]} />
        <meshBasicMaterial color="#2a3a5a" transparent opacity={0.7} />
      </mesh>
      <Text
        fontSize={0.12}
        color="#7fe8ff"
        anchorX="right"
        anchorY="middle"
        position={[0, 0, 0]}
        letterSpacing={0.03}
      >
        {label}
      </Text>
    </group>
  );
}

export default function LastUpdatedHUD() {
  return (
    <Hud renderPriority={2}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={55} />
      <ambientLight intensity={1} />
      <Badge />
    </Hud>
  );
}
