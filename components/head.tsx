"use client"

import { useLoader } from "@react-three/fiber"
import { STLLoader } from "three-stdlib"

type HeadProps = {
  selected?: boolean
  onClick?: () => void
}

export function Head({ selected, onClick }: HeadProps) {
  const geometry = useLoader(STLLoader, "/stl-parts/head.stl")

  return (
    <mesh
      geometry={geometry}
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
      position={[0, 1.5, 0]}
      scale={[1, 1, 1]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color={selected ? "orange" : "yellow"} />
    </mesh>
  )
}
