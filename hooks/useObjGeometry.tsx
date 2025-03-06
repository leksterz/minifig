"use client"

import { useLoader } from "@react-three/fiber"
import { OBJLoader } from "three-stdlib"

/**
 * Load only the OBJ geometry or group, ignoring MTL references.
 */
export function useObjGeometry(objUrl: string) {
  // This just loads the OBJ (no .mtl)
  const object = useLoader(OBJLoader, objUrl)
  return object
}
