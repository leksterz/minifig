"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileImage, FileIcon as File3d } from "lucide-react"
import type { Layer } from "@/components/minifigure-designer"

interface ExportPanelProps {
  layers: Layer[]
}

export function ExportPanel({ layers }: ExportPanelProps) {
  const [exportFormat, setExportFormat] = useState<string>("png")
  const [resolution, setResolution] = useState<string>("1024")
  const [includeTransparency, setIncludeTransparency] = useState<boolean>(true)
  const [fileName, setFileName] = useState<string>("my-minifigure")

  const handleExport = () => {
    // In a real implementation, this would generate and download the file
    console.log("Exporting:", {
      format: exportFormat,
      resolution,
      includeTransparency,
      fileName,
      layers: layers.filter((l) => l.visible).length,
    })

    // Simulate download
    alert(`Exporting ${fileName}.${exportFormat} at ${resolution}px resolution`)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Export Options</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file-name">File Name</Label>
          <Input
            id="file-name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="my-minifigure"
          />
        </div>

        <div className="space-y-2">
          <Label>Export Format</Label>
          <RadioGroup value={exportFormat} onValueChange={setExportFormat}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="png" id="png" />
              <Label htmlFor="png" className="cursor-pointer">
                PNG (2D Image)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="jpg" id="jpg" />
              <Label htmlFor="jpg" className="cursor-pointer">
                JPG (2D Image)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="obj" id="obj" />
              <Label htmlFor="obj" className="cursor-pointer">
                OBJ (3D Model)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="glb" id="glb" />
              <Label htmlFor="glb" className="cursor-pointer">
                GLB (3D Model)
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="resolution">Resolution</Label>
          <Select value={resolution} onValueChange={setResolution}>
            <SelectTrigger id="resolution">
              <SelectValue placeholder="Select resolution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="512">512 x 512 px</SelectItem>
              <SelectItem value="1024">1024 x 1024 px</SelectItem>
              <SelectItem value="2048">2048 x 2048 px</SelectItem>
              <SelectItem value="4096">4096 x 4096 px</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="transparency"
            checked={includeTransparency}
            onCheckedChange={(checked) => setIncludeTransparency(checked as boolean)}
          />
          <Label htmlFor="transparency" className="cursor-pointer">
            Include transparency
          </Label>
        </div>

        <div className="pt-2">
          <Button onClick={handleExport} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Export Design
          </Button>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2">Additional Export Options</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              <FileImage className="h-4 w-4 mr-2" />
              UV Template
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <File3d className="h-4 w-4 mr-2" />
              Texture Maps
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

