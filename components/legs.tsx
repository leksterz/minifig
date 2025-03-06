"use client"

import { useLoader } from "@react-three/fiber"
import { OBJLoader } from "three-stdlib"
import { TextureLoader, MeshStandardMaterial } from "three"
import { useEffect } from "react"

// A list of texture image paths to cycle through
const TEXTURE_PATHS = [
  "/obj-parts/Cave Girl Legs.png",
  "/obj-parts/Galaxy Patrol Legs.png",
  "/obj-parts/Jay Legs.png",
  "/obj-parts/Jungle Boy Legs.png",
  "/obj-parts/Mummy Legs.png",
  "/obj-parts/Princess Leia Slave Outfit Legs.png",
  "/obj-parts/Scottish Bagpiper Legs.png",
  "/obj-parts/Slithra Legs.png",
  "/obj-parts/Wonder Woman Legs.png",
]

/**
 * Renders just the 3D geometry for the legs,
 * using the specified `textureIndex` to choose which .png is applied.
 * No buttons or Canvas here—just the geometry.
 */
export function Legs({ textureIndex = 0 }: { textureIndex?: number }) {
  // 1) Load the OBJ geometry (no MTL).
  const legsObj = useLoader(OBJLoader, "/obj-parts/legs.obj")

  // 2) Load all the PNG textures into an array.
  const allTextures = useLoader(TextureLoader, TEXTURE_PATHS)

  // 3) Apply whichever texture is at [textureIndex].
  useEffect(() => {
    if (!legsObj) return

    legsObj.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({
          map: allTextures[textureIndex],
        })
      }
    })
  }, [legsObj, allTextures, textureIndex])

  // 4) Return the actual 3D object as a <primitive>.
  return <primitive object={legsObj} position={[0, -0.5, 0]} scale={[1, 1, 1]} />
}
