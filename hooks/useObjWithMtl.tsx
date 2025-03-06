"use client"

import { useLoader } from "@react-three/fiber"
import { OBJLoader, MTLLoader } from "three-stdlib"

// A hook that loads MTL materials first, then passes them to OBJLoader
export function useObjWithMtl(objUrl: string, mtlUrl: string) {
  // 1) Load the MTL to get materials
  const materials = useLoader(MTLLoader, mtlUrl)

  // 2) Load the OBJ, passing a callback that sets the materials on the loader
  const object = useLoader(OBJLoader, objUrl, (loader) => {
    loader.setMaterials(materials)
  })

  // Return the fully loaded Three.js object/group
  return object
}
