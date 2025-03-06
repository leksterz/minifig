"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MinifigureViewer } from "@/components/minifigure-viewer"
import { ColorPalette } from "@/components/color-palette"
import { LayerManager } from "@/components/layer-manager"
import { ToolsPanel } from "@/components/tools-panel"
import { TutorialPanel } from "@/components/tutorial-panel"
import { ExportPanel } from "@/components/export-panel"
import { Button } from "@/components/ui/button"
import { HelpCircle, Download, Layers, Palette, PenToolIcon as Tool } from "lucide-react"

export type MinifigurePart = "head" | "torso" | "leftArm" | "rightArm" | "legs"
export type Layer = {
  id: string
  name: string
  visible: boolean
  part: MinifigurePart
  texture: string | null
  zIndex: number
}

export function MinifigureDesigner() {
  const [selectedPart, setSelectedPart] = useState<MinifigurePart>("head")
  const [selectedColor, setSelectedColor] = useState<string>("#FE8A18") // Bright Orange
  const [layers, setLayers] = useState<Layer[]>([
    { id: "1", name: "Head Base", visible: true, part: "head", texture: null, zIndex: 0 },
    { id: "2", name: "Face", visible: true, part: "head", texture: null, zIndex: 1 },
    { id: "3", name: "Torso Front", visible: true, part: "torso", texture: null, zIndex: 0 },
    { id: "4", name: "Torso Back", visible: true, part: "torso", texture: null, zIndex: 1 },
    { id: "5", name: "Left Arm", visible: true, part: "leftArm", texture: null, zIndex: 0 },
    { id: "6", name: "Right Arm", visible: true, part: "rightArm", texture: null, zIndex: 0 },
    { id: "7", name: "Legs", visible: true, part: "legs", texture: null, zIndex: 0 },
  ])
  const [showTutorial, setShowTutorial] = useState(false)

  const handleLayerUpdate = (updatedLayer: Layer) => {
    setLayers(layers.map((layer) => (layer.id === updatedLayer.id ? updatedLayer : layer)))
  }

  const handleAddLayer = (part: MinifigurePart) => {
    const newLayer: Layer = {
      id: `layer-${Date.now()}`,
      name: `New ${part} Layer`,
      visible: true,
      part,
      texture: null,
      zIndex: layers.filter((l) => l.part === part).length,
    }
    setLayers([...layers, newLayer])
  }

  const handleDeleteLayer = (id: string) => {
    setLayers(layers.filter((layer) => layer.id !== id))
  }

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      {/* 3D Viewer Section */}
      <div className="flex-1 border-r">
        <MinifigureViewer selectedPart={selectedPart} setSelectedPart={setSelectedPart} layers={layers} />
      </div>

      {/* Editor Section */}
      <div className="w-full lg:w-96 border-l">
        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="tools">
              <Tool className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline">Tools</span>
            </TabsTrigger>
            <TabsTrigger value="colors">
              <Palette className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline">Colors</span>
            </TabsTrigger>
            <TabsTrigger value="layers">
              <Layers className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline">Layers</span>
            </TabsTrigger>
            <TabsTrigger value="export">
              <Download className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline">Export</span>
            </TabsTrigger>
            <TabsTrigger value="help">
              <HelpCircle className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline">Help</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="p-4">
            <ToolsPanel selectedPart={selectedPart} setSelectedPart={setSelectedPart} selectedColor={selectedColor} />
          </TabsContent>

          <TabsContent value="colors" className="p-4">
            <ColorPalette selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
          </TabsContent>

          <TabsContent value="layers" className="p-4">
            <LayerManager
              layers={layers.filter((layer) => layer.part === selectedPart)}
              onLayerUpdate={handleLayerUpdate}
              onAddLayer={() => handleAddLayer(selectedPart)}
              onDeleteLayer={handleDeleteLayer}
            />
          </TabsContent>

          <TabsContent value="export" className="p-4">
            <ExportPanel layers={layers} />
          </TabsContent>

          <TabsContent value="help" className="p-4">
            <Button variant="outline" className="mb-4 w-full" onClick={() => setShowTutorial(true)}>
              Show Interactive Tutorial
            </Button>
            <TutorialPanel />
          </TabsContent>
        </Tabs>
      </div>

      {showTutorial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Welcome to the LEGO® Minifigure Designer!</h2>
            <p className="mb-4">
              This interactive tutorial will guide you through creating your first custom minifigure design.
            </p>
            {/* Tutorial content would go here */}
            <Button onClick={() => setShowTutorial(false)} className="mt-4">
              Close Tutorial
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

