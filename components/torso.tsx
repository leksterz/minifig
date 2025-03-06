"use client"

import { useLoader } from "@react-three/fiber"
import { STLLoader } from "three-stdlib"

type TorsoProps = {
  selected?: boolean
  onClick?: () => void
}

export function Torso({ selected, onClick }: TorsoProps) {
  const geometry = useLoader(STLLoader, "/stl-parts/torso.stl")

  return (
    <mesh
      geometry={geometry}
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
      position={[0, 0.5, 0]}
      scale={[1, 1, 1]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color={selected ? "orange" : "blue"} />
    </mesh>
  )
}
