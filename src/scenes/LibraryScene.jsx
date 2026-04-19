import { useState, useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import { useSearchParams } from 'react-router-dom';
import { getTechniques } from '../content/registry.js';

const TIERS = ['all', 'basics', 'intermediate', 'advanced', 'frontier'];
const TIER_COLORS = {
  basics: '#7fe8ff',
  intermediate: '#5ac8ff',
  advanced: '#b070ff',
  frontier: '#ff6bb0',
};

function Card({ tech, position, onOpen }) {
  const [hover, setHover] = useState(false);
  const ref = useRef();
  useFrame((_, dt) => {
    if (!ref.current) return;
    const wantY = hover ? 0.18 : 0;
    const wantX = hover ? -0.08 : 0;
    ref.current.rotation.y += (wantY - ref.current.rotation.y) * Math.min(1, dt * 6);
    ref.current.rotation.x += (wantX - ref.current.rotation.x) * Math.min(1, dt * 6);
    const s = hover ? 1.05 : 1;
    ref.current.scale.x += (s - ref.current.scale.x) * Math.min(1, dt * 6);
    ref.current.scale.y += (s - ref.current.scale.y) * Math.min(1, dt * 6);
    ref.current.scale.z += (s - ref.current.scale.z) * Math.min(1, dt * 6);
  });
  const color = TIER_COLORS[tech.tier] || '#7fe8ff';
  return (
    <group
      position={position}
      ref={ref}
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
        onOpen(tech);
      }}
    >
      <mesh>
        <boxGeometry args={[1.7, 1.05, 0.08]} />
        <meshStandardMaterial
          color={hover ? '#0f1a30' : '#0a1220'}
          emissive={color}
          emissiveIntensity={hover ? 0.5 : 0.18}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0, 0, 0.045]}>
        <boxGeometry args={[1.7, 0.08, 0.01]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Text
        position={[0, 0.12, 0.06]}
        fontSize={0.13}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.5}
        textAlign="center"
      >
        {tech.title}
      </Text>
      <Text
        position={[0, -0.3, 0.06]}
        fontSize={0.075}
        color="#9fb2da"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        {(tech.tier || '').toUpperCase()}
      </Text>
    </group>
  );
}

export default function LibraryScene() {
  const [params, setParams] = useSearchParams();
  const currentTier = params.get('tier') || 'all';
  const focus = params.get('focus');
  const [open, setOpen] = useState(null);

  const all = getTechniques();
  const filtered = useMemo(() => {
    if (currentTier === 'all') return all;
    return all.filter((t) => t.tier === currentTier);
  }, [all, currentTier]);

  useEffect(() => {
    if (!focus) return;
    const t = all.find((x) => x.slug === focus);
    if (t) setOpen(t);
  }, [focus, all]);

  const cols = 5;
  const positions = useMemo(
    () =>
      filtered.map((_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const rows = Math.ceil(filtered.length / cols);
        return [
          (c - (cols - 1) / 2) * 2.05,
          (rows - 1) / 2 * 1.45 - r * 1.45,
          0,
        ];
      }),
    [filtered],
  );

  return (
    <>
      {filtered.map((tech, i) => (
        <Card key={tech.slug} tech={tech} position={positions[i]} onOpen={setOpen} />
      ))}
      {filtered.length === 0 && (
        <Text position={[0, 0, 0]} fontSize={0.22} color="#9fb2da" anchorX="center">
          no techniques in this tier yet
        </Text>
      )}
      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            top: 70,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            flexWrap: 'wrap',
            padding: '0 20px',
          }}
        >
          {TIERS.map((t) => {
            const active = currentTier === t;
            const c = TIER_COLORS[t] || '#7fe8ff';
            return (
              <button
                key={t}
                className="hud-panel"
                style={{
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  borderColor: active ? c : 'rgba(120,160,255,0.25)',
                  color: active ? c : '#c9d3ea',
                  padding: '6px 16px',
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 1.2,
                  background: active ? 'rgba(127,232,255,0.08)' : 'rgba(10,14,26,0.72)',
                }}
                onClick={() => setParams(t === 'all' ? {} : { tier: t })}
              >
                {t}
              </button>
            );
          })}
        </div>

        {open && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(5,6,10,0.55)',
              backdropFilter: 'blur(4px)',
              pointerEvents: 'auto',
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(null);
            }}
          >
            <div className="hud-panel" style={{ maxWidth: 640, width: '90%', maxHeight: '76vh', overflow: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      color: TIER_COLORS[open.tier] || '#9fb2da',
                      textTransform: 'uppercase',
                      letterSpacing: 1.4,
                    }}
                  >
                    {open.tier}
                  </div>
                  <h2 style={{ margin: '4px 0 0', color: '#7fe8ff', fontSize: 22 }}>{open.title}</h2>
                </div>
                <button
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(127,232,255,0.3)',
                    color: '#9fb2da',
                    cursor: 'pointer',
                    padding: '4px 12px',
                    borderRadius: 6,
                    fontSize: 12,
                  }}
                  onClick={() => setOpen(null)}
                >
                  close
                </button>
              </div>
              <div
                className="md-body"
                style={{ marginTop: 16, lineHeight: 1.65, fontSize: 14, color: '#d7dee9' }}
                dangerouslySetInnerHTML={{ __html: open.html }}
              />
            </div>
          </div>
        )}
      </Html>
    </>
  );
}
