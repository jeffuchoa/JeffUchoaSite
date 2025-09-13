import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type AnimatedMeshProps = {
  node: THREE.Mesh;
  speed?: number;
  float?: number;
  dirX?: number;
  dirY?: number;
};

function AnimatedMesh({
  node,
  speed = 1,
  float = 0.5,
  dirX = 1,
  dirY = 1,
}: AnimatedMeshProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotação em direções diferentes
      ref.current.rotation.y += delta * speed * 0.1 * dirY;
      ref.current.rotation.x += delta * speed * 0.2 * dirX;

      // Flutuação suave
      ref.current.position.y =
        node.position.y + Math.sin(state.clock.elapsedTime * speed) * float;
    }
  });

  return (
    <mesh
      ref={ref}
      geometry={node.geometry}
      material={node.material}
      position={node.position}
      scale={node.scale}
    />
  );
}

const BlenderModel: React.FC = () => {
  const { nodes } = useGLTF("./models/floating_shapes4.glb") as any;

  return (
    <group>
      {Object.values(nodes)
        .filter((n: any): n is THREE.Mesh => n instanceof THREE.Mesh)
        .map((mesh, i) => (
          <AnimatedMesh
            key={i}
            node={mesh}
            speed={0.5 + Math.random() * 1}       // velocidades diferentes
            float={0.2 + Math.random() * 2}         // amplitudes diferentes
            dirX={Math.random() < 0.5 ? -1 : 1}     // direção X aleatória
            dirY={Math.random() < 0.5 ? -1 : 1}     // direção Y aleatória
          />
        ))}
    </group>
  );
};

const App: React.FC = () => {
  return (
    <Canvas
      style={{ width: "100%", height: "100vh", backgroundColor: '#ccc5c5' }}
      camera={{ position: [100, 0, 50], fov: 60 }}
      shadows 
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <BlenderModel />
    </Canvas>
  );
};

export default App;

useGLTF.preload("./models/floating_shapes4.glb");