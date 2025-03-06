"use client"

import { useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
import { MinifigureModel } from "@/components/minifigure-model"
import { Button } from "@/components/ui/button"
import { RotateCw, ZoomIn, ZoomOut } from "lucide-react"
import type { MinifigurePart, Layer } from "@/components/minifigure-designer"
import { Suspense } from "react";


interface MinifigureViewerProps {
  selectedPart: MinifigurePart
  setSelectedPart: (part: MinifigurePart) => void
  layers: Layer[]
}

export function MinifigureViewer({ selectedPart, setSelectedPart, layers }: MinifigureViewerProps) {
  const controlsRef = useRef(null)
  const [zoom, setZoom] = useState(5)

  const handleZoomIn = () => {
    setZoom(Math.max(zoom - 0.5, 2))
  }

  const handleZoomOut = () => {
    setZoom(Math.min(zoom + 0.5, 10))
  }

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
    setZoom(5)
  }

  return (
    <div className="relative h-[50vh] lg:h-screen">
        <Canvas>
        <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <mesh>
            <boxGeometry />
            <meshStandardMaterial color="red" />
            </mesh>
            <OrbitControls />
        </Suspense>
        </Canvas>
      {/* Controls Overlay */}
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

      {/* Part Selection Overlay */}
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
            variant={selectedPart === "leftArm" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPart("leftArm")}
            className="justify-start"
          >
            Left Arm
          </Button>
          <Button
            variant={selectedPart === "rightArm" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPart("rightArm")}
            className="justify-start"
          >
            Right Arm
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
      </div>
    </div>
  )
}

