import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type GLTFResult = {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
} & THREE.Group;

const BlenderModel: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("/models/cube.glb") as unknown as GLTFResult;

  return (
    <group ref={group} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={materials.Material} />
    </group>
  );
};

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <BlenderModel />
      <OrbitControls />
    </Canvas>
  );
}