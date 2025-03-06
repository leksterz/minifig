"use client"

import { Head } from "./head"
import { Torso } from "./torso"
import { Legs } from "./legs"
import type { MinifigurePart } from "@/components/minifigure-designer"

/**
 * Conditionally renders the correct part (head, torso, or legs) in the 3D scene,
 * based on `selectedPart`. For legs, we accept a `textureIndex` to choose which texture is displayed.
 */
interface MinifigureModelProps {
  selectedPart: MinifigurePart
  textureIndex?: number
}

export function MinifigureModel({ selectedPart, textureIndex = 0 }: MinifigureModelProps) {
  return (
    <group>
      {selectedPart === "head" && <Head />}
      {selectedPart === "torso" && <Torso />}
      {selectedPart === "legs" && <Legs textureIndex={textureIndex} />}
    </group>
  )
}
