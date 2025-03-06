"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { MinifigureModel } from "./minifigure-model"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCw } from "lucide-react"
import type { MinifigurePart } from "@/components/minifigure-designer"

interface MinifigureViewerProps {
  selectedPart: MinifigurePart
  setSelectedPart: (part: MinifigurePart) => void
}

export function MinifigureViewer({ selectedPart, setSelectedPart }: MinifigureViewerProps) {
  const controlsRef = useRef(null)
  const [zoom, setZoom] = useState(5)

  // State for cycling the legs texture index
  const [textureIndex, setTextureIndex] = useState(0)
  const handleNextTexture = () => {
    setTextureIndex((prev) => prev + 1)
  }

  const handleZoomIn = () => setZoom(Math.max(zoom - 0.5, 2))
  const handleZoomOut = () => setZoom(Math.min(zoom + 0.5, 10))
  const handleReset = () => controlsRef.current?.reset()

  return (
    <div className="relative h-[50vh] lg:h-screen">
      {/* Our 3D scene: */}
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <Suspense fallback={null}>
          {/* The minifigure model picks which part to show, 
              and if that part is "legs", we pass textureIndex */}
          <MinifigureModel selectedPart={selectedPart} textureIndex={textureIndex} />

          <OrbitControls ref={controlsRef} />
        </Suspense>
      </Canvas>

      {/* Some overlay UI (zoom / reset): */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button variant="secondary" size="icon" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleReset}>
          <RotateCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Part selection UI (head, torso, or legs) */}
      <div className="absolute top-4 left-4 bg-background/80 p-2 rounded-md">
        <h3 className="text-sm font-medium mb-2">Select Part:</h3>
        <div className="flex flex-col gap-1">
          <Button
            variant={selectedPart === "head" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPart("head")}
            className="justify-start"
          >
            Head
          </Button>
          <Button
            variant={selectedPart === "torso" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPart("torso")}
            className="justify-start"
          >
            Torso
          </Button>
          <Button
            variant={selectedPart === "legs" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPart("legs")}
            className="justify-start"
          >
            Legs
          </Button>
        </div>

        {/* If the user selects "legs," show a "Next Texture" button below */}
        {selectedPart === "legs" && (
          <Button variant="secondary" size="sm" onClick={handleNextTexture} className="mt-2">
            Next Texture
          </Button>
        )}
      </div>
    </div>
  )
}
