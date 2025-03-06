"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { type Mesh, MeshStandardMaterial } from "three"
import type { MinifigurePart, Layer } from "@/components/minifigure-designer"

interface MinifigureModelProps {
  selectedPart: MinifigurePart
  setSelectedPart: (part: MinifigurePart) => void
  layers: Layer[]
}

export function MinifigureModel({ selectedPart, setSelectedPart, layers }: MinifigureModelProps) {
  // Use a duck as a placeholder since we don't have a minifigure model
  const { scene } = useGLTF("/assets/3d/duck.glb")
  const headRef = useRef<Mesh>(null)
  const torsoRef = useRef<Mesh>(null)
  const leftArmRef = useRef<Mesh>(null)
  const rightArmRef = useRef<Mesh>(null)
  const legsRef = useRef<Mesh>(null)

  // This would be replaced with actual minifigure parts in a real implementation
  useEffect(() => {
    // Clone the duck model for each part as a placeholder
    const duckMesh = scene.children[0].clone()

    if (headRef.current) {
      headRef.current.geometry = duckMesh.geometry
      headRef.current.position.set(0, 1.5, 0)
      headRef.current.scale.set(0.5, 0.5, 0.5)
    }

    if (torsoRef.current) {
      torsoRef.current.geometry = duckMesh.geometry
      torsoRef.current.position.set(0, 0.5, 0)
      torsoRef.current.scale.set(0.6, 0.6, 0.6)
    }

    if (leftArmRef.current) {
      leftArmRef.current.geometry = duckMesh.geometry
      leftArmRef.current.position.set(-0.8, 0.5, 0)
      leftArmRef.current.scale.set(0.3, 0.3, 0.3)
    }

    if (rightArmRef.current) {
      rightArmRef.current.geometry = duckMesh.geometry
      rightArmRef.current.position.set(0.8, 0.5, 0)
      rightArmRef.current.scale.set(0.3, 0.3, 0.3)
    }

    if (legsRef.current) {
      legsRef.current.geometry = duckMesh.geometry
      legsRef.current.position.set(0, -0.5, 0)
      legsRef.current.scale.set(0.6, 0.6, 0.6)
    }
  }, [scene])

  // Apply textures based on layers
  useEffect(() => {
    const applyTexturesToPart = (part: MinifigurePart, ref: React.RefObject<Mesh>) => {
      if (!ref.current) return

      const partLayers = layers.filter((layer) => layer.part === part && layer.visible)

      if (partLayers.length === 0) {
        // Default material if no layers
        const material = new MeshStandardMaterial({
          color: part === selectedPart ? 0xffa500 : 0xffd700,
        })
        ref.current.material = material
      } else {
        // In a real implementation, we would apply textures from layers here
        const material = new MeshStandardMaterial({
          color: part === selectedPart ? 0xffa500 : 0xffd700,
          // We would use the texture from the layer here
          // map: texture
        })
        ref.current.material = material
      }
    }

    applyTexturesToPart("head", headRef)
    applyTexturesToPart("torso", torsoRef)
    applyTexturesToPart("leftArm", leftArmRef)
    applyTexturesToPart("rightArm", rightArmRef)
    applyTexturesToPart("legs", legsRef)
  }, [layers, selectedPart])

  // Handle part selection on click
  const { raycaster, camera, mouse } = useThree()

  const handleClick = (part: MinifigurePart) => {
    setSelectedPart(part)
  }

  return (
    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <mesh
        ref={headRef}
        onClick={() => handleClick("head")}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      />
      <mesh
        ref={torsoRef}
        onClick={() => handleClick("torso")}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      />
      <mesh
        ref={leftArmRef}
        onClick={() => handleClick("leftArm")}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      />
      <mesh
        ref={rightArmRef}
        onClick={() => handleClick("rightArm")}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      />
      <mesh
        ref={legsRef}
        onClick={() => handleClick("legs")}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      />
    </group>
  )
}

