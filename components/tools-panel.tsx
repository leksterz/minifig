"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import type { MinifigurePart } from "@/components/minifigure-designer"
import { Brush, Eraser, Pipette, Square, Circle, Type, Undo, Redo } from "lucide-react"

interface ToolsPanelProps {
  selectedPart: MinifigurePart
  setSelectedPart: (part: MinifigurePart) => void
  selectedColor: string
}

export function ToolsPanel({ selectedPart, setSelectedPart, selectedColor }: ToolsPanelProps) {
  const [activeTool, setActiveTool] = useState<string>("brush")
  const [brushSize, setBrushSize] = useState<number>(5)
  const [opacity, setOpacity] = useState<number>(100)

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Drawing Tools</h2>

      <div className="grid grid-cols-4 gap-2">
        <Button
          variant={activeTool === "brush" ? "default" : "outline"}
          size="icon"
          onClick={() => setActiveTool("brush")}
          title="Brush Tool"
        >
          <Brush className="h-4 w-4" />
        </Button>
        <Button
          variant={activeTool === "eraser" ? "default" : "outline"}
          size="icon"
          onClick={() => setActiveTool("eraser")}
          title="Eraser Tool"
        >
          <Eraser className="h-4 w-4" />
        </Button>
        <Button
          variant={activeTool === "eyedropper" ? "default" : "outline"}
          size="icon"
          onClick={() => setActiveTool("eyedropper")}
          title="Color Picker"
        >
          <Pipette className="h-4 w-4" />
        </Button>
        <Button
          variant={activeTool === "rectangle" ? "default" : "outline"}
          size="icon"
          onClick={() => setActiveTool("rectangle")}
          title="Rectangle Tool"
        >
          <Square className="h-4 w-4" />
        </Button>
        <Button
          variant={activeTool === "circle" ? "default" : "outline"}
          size="icon"
          onClick={() => setActiveTool("circle")}
          title="Circle Tool"
        >
          <Circle className="h-4 w-4" />
        </Button>
        <Button
          variant={activeTool === "text" ? "default" : "outline"}
          size="icon"
          onClick={() => setActiveTool("text")}
          title="Text Tool"
        >
          <Type className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" title="Undo">
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" title="Redo">
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="brush-size">Brush Size: {brushSize}px</Label>
          </div>
          <Slider
            id="brush-size"
            min={1}
            max={20}
            step={1}
            value={[brushSize]}
            onValueChange={(value) => setBrushSize(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="opacity">Opacity: {opacity}%</Label>
          </div>
          <Slider
            id="opacity"
            min={0}
            max={100}
            step={1}
            value={[opacity]}
            onValueChange={(value) => setOpacity(value[0])}
          />
        </div>
      </div>

      <div className="pt-4 border-t">
        <h3 className="text-sm font-medium mb-2">Current Part: {selectedPart}</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: selectedColor }} />
            <span className="text-sm">Selected Color</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">{brushSize}</div>
            <span className="text-sm">Brush Size</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <h3 className="text-sm font-medium mb-2">LEGO® Design Tips</h3>
        <ul className="text-xs space-y-1 text-muted-foreground">
          <li>• Use minimal outlines for authentic LEGO look</li>
          <li>• Place eyes 1/3 from the top of the head</li>
          <li>• Use hard shading rather than gradients</li>
          <li>• Keep designs simple and bold</li>
        </ul>
      </div>
    </div>
  )
}

