import { Canvas } from '@react-three/fiber';
import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { Stars } from '@react-three/drei';
import HomeScene from './scenes/HomeScene.jsx';
import GuideScene from './scenes/GuideScene.jsx';
import LibraryScene from './scenes/LibraryScene.jsx';
import SearchScene from './scenes/SearchScene.jsx';
import SourcesScene from './scenes/SourcesScene.jsx';
import Nav3D from './components/Nav3D.jsx';
import LastUpdatedHUD from './components/LastUpdatedHUD.jsx';

export default function Layout() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#05060a']} />
      <fog attach="fog" args={['#05060a', 18, 60]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.1} color="#88aaff" />
      <pointLight position={[-10, -6, -10]} intensity={0.7} color="#b060ff" />
      <Stars radius={140} depth={80} count={4200} factor={3} saturation={0} fade speed={0.4} />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomeScene />} />
          <Route path="/guide" element={<GuideScene />} />
          <Route path="/library" element={<LibraryScene />} />
          <Route path="/search" element={<SearchScene />} />
          <Route path="/sources" element={<SourcesScene />} />
        </Routes>
      </Suspense>
      <Nav3D />
      <LastUpdatedHUD />
    </Canvas>
  );
}
