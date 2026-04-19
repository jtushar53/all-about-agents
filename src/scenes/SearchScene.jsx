import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import search from '../search/client.js';

function PulsingOrb({ pulse }) {
  const inner = useRef();
  const outer = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const intensity = pulse ? 1.15 : 1;
    if (inner.current) {
      const s = (1 + Math.sin(t * 2.3) * 0.06) * intensity;
      inner.current.scale.setScalar(s);
      inner.current.rotation.y = t * 0.15;
      inner.current.rotation.x = t * 0.1;
    }
    if (outer.current) {
      const s2 = (1 + Math.sin(t * 1.6 + 1) * 0.08) * intensity;
      outer.current.scale.setScalar(s2);
      outer.current.rotation.y = -t * 0.08;
    }
  });
  return (
    <group position={[0, 0, -2]}>
      <mesh ref={inner}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshStandardMaterial
          color="#7fe8ff"
          emissive="#7fe8ff"
          emissiveIntensity={pulse ? 1.1 : 0.6}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh ref={outer}>
        <sphereGeometry args={[1.55, 32, 32]} />
        <meshBasicMaterial color={pulse ? '#b070ff' : '#7fe8ff'} transparent opacity={0.12} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#7fe8ff" emissiveIntensity={1.6} />
      </mesh>
    </group>
  );
}

function ResultShard({ hit, index, total, onClick }) {
  const ref = useRef();
  const theta = (index / Math.max(1, total)) * Math.PI * 2;
  const radius = 3.6;
  const x = Math.cos(theta) * radius;
  const y = Math.sin(theta) * radius * 0.45;
  const z = -2 + Math.sin(index * 1.3) * 0.6;
  const [hover, setHover] = useState(false);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.6;
    ref.current.rotation.x += dt * 0.3;
  });

  const color = hover ? '#ff6bb0' : hit.section === 'sources' ? '#ffd070' : '#b070ff';

  return (
    <group
      position={[x, y, z]}
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
        onClick(hit);
      }}
    >
      <mesh ref={ref}>
        <tetrahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} />
      </mesh>
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.1}
        color="#e6e7ea"
        maxWidth={2.6}
        anchorX="center"
        anchorY="bottom"
        textAlign="center"
      >
        {hit.title}
      </Text>
      <Text
        position={[0, -0.52, 0]}
        fontSize={0.07}
        color="#9fb2da"
        anchorX="center"
        letterSpacing={0.1}
      >
        {(hit.section || '').toUpperCase()}
      </Text>
    </group>
  );
}

export default function SearchScene() {
  const [q, setQ] = useState('');
  const [hits, setHits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => {
      const trimmed = q.trim();
      if (!trimmed) {
        setHits([]);
        return;
      }
      const results = search(trimmed).slice(0, 12);
      setHits(results);
    }, 120);
    return () => clearTimeout(id);
  }, [q]);

  const onOpen = (hit) => {
    if (hit.section === 'sources' && hit.url) {
      window.open(hit.url, '_blank', 'noopener');
      return;
    }
    if (hit.section === 'techniques') {
      navigate(`/library?focus=${encodeURIComponent(hit.slug)}`);
      return;
    }
    if (hit.section === 'guide') {
      navigate('/guide');
      return;
    }
    navigate('/sources');
  };

  return (
    <>
      <PulsingOrb pulse={hits.length > 0} />
      {hits.map((h, i) => (
        <ResultShard key={h.slug} hit={h} index={i} total={hits.length} onClick={onOpen} />
      ))}
      <Html center position={[0, 2.3, 0]} style={{ pointerEvents: 'auto' }}>
        <div className="hud-panel" style={{ padding: 6, width: 520 }}>
          <input
            autoFocus
            placeholder="search guides, techniques, sources..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#e6e7ea',
              fontSize: 17,
            }}
          />
        </div>
      </Html>
      {q.trim() === '' && hits.length === 0 && (
        <Text
          position={[0, -3, -2]}
          fontSize={0.14}
          color="#9fb2da"
          anchorX="center"
          maxWidth={6}
          textAlign="center"
        >
          type anything — chain of thought, react, dspy, reflexion, rag...
        </Text>
      )}
      {q.trim() !== '' && hits.length === 0 && (
        <Text position={[0, -3, -2]} fontSize={0.14} color="#ff6bb0" anchorX="center">
          no matches. try another term.
        </Text>
      )}
    </>
  );
}
