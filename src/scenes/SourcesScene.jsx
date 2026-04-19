import { useState, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import sources from '../../content/sources.json';

const TYPE_COLOR = {
  paper: '#ffd070',
  docs: '#7fe8ff',
  blog: '#ff6bb0',
  repo: '#6af49a',
  course: '#b070ff',
};

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

function posFor(s) {
  const h1 = Math.abs(hash(s + 'x'));
  const h2 = Math.abs(hash(s + 'y'));
  const h3 = Math.abs(hash(s + 'z'));
  const r = 3.6 + ((h3 % 1000) / 1000) * 2.2;
  const theta = ((h1 % 1000) / 1000) * Math.PI * 2;
  const phi = ((h2 % 1000) / 1000) * Math.PI;
  return [
    Math.sin(phi) * Math.cos(theta) * r,
    Math.cos(phi) * r * 0.7,
    Math.sin(phi) * Math.sin(theta) * r - 2,
  ];
}

function Star({ src, position, onHover, onOpen }) {
  const [hover, setHover] = useState(false);
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.elapsedTime + position[0];
      ref.current.scale.setScalar(1 + Math.sin(t * 2) * 0.15);
    }
  });
  const color = TYPE_COLOR[src.type] || '#ffffff';
  return (
    <group position={position}>
      <mesh
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          onHover(src);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHover(false);
          onHover(null);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onOpen(src.url);
        }}
      >
        <sphereGeometry args={[hover ? 0.18 : 0.1, 20, 20]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
      </mesh>
      {hover && (
        <mesh>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.18} />
        </mesh>
      )}
    </group>
  );
}

export default function SourcesScene() {
  const grp = useRef();
  const [hovered, setHovered] = useState(null);
  const positioned = useMemo(
    () => sources.map((s) => ({ src: s, pos: posFor(s.title) })),
    [],
  );

  useFrame((_, dt) => {
    if (grp.current) grp.current.rotation.y += dt * 0.05;
  });

  return (
    <>
      <group ref={grp}>
        {positioned.map(({ src, pos }) => (
          <Star
            key={src.url}
            src={src}
            position={pos}
            onHover={setHovered}
            onOpen={(u) => u && window.open(u, '_blank', 'noopener')}
          />
        ))}
      </group>

      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            top: 70,
            left: 0,
            right: 0,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'inline-flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {Object.entries(TYPE_COLOR).map(([k, c]) => (
              <div
                key={k}
                className="hud-panel"
                style={{
                  padding: '5px 12px',
                  fontSize: 11,
                  color: c,
                  textTransform: 'uppercase',
                  letterSpacing: 1.2,
                  pointerEvents: 'auto',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    background: c,
                    borderRadius: '50%',
                    marginRight: 8,
                    boxShadow: `0 0 8px ${c}`,
                  }}
                />
                {k}
              </div>
            ))}
          </div>
        </div>

        {hovered && (
          <div
            style={{
              position: 'absolute',
              bottom: 140,
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
            }}
          >
            <div className="hud-panel" style={{ maxWidth: 460 }}>
              <div
                style={{
                  fontSize: 10,
                  color: TYPE_COLOR[hovered.type] || '#9fb2da',
                  textTransform: 'uppercase',
                  letterSpacing: 1.4,
                }}
              >
                {hovered.type}
              </div>
              <div style={{ color: '#e6e7ea', fontSize: 15, marginTop: 4, fontWeight: 600 }}>
                {hovered.title}
              </div>
              <div style={{ color: '#9fb2da', fontSize: 12, marginTop: 4 }}>
                {hovered.authors}
                {hovered.year ? ` · ${hovered.year}` : ''}
              </div>
              <div style={{ color: '#7fe8ff', fontSize: 11, marginTop: 8 }}>
                click to open
              </div>
            </div>
          </div>
        )}
      </Html>
    </>
  );
}
