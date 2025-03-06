"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"

interface ColorPaletteProps {
  selectedColor: string
  setSelectedColor: (color: string) => void
}

// Official LEGO colors
const LEGO_COLORS = {
  standard: [
    { name: "Bright Red", hex: "#FF0000" },
    { name: "Bright Blue", hex: "#0055BF" },
    { name: "Bright Yellow", hex: "#F8C300" },
    { name: "Dark Green", hex: "#184632" },
    { name: "Black", hex: "#05131D" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Bright Orange", hex: "#FE8A18" },
    { name: "Bright Purple", hex: "#81007B" },
    { name: "Dark Azure", hex: "#078BC9" },
    { name: "Medium Azure", hex: "#36AEBF" },
    { name: "Bright Green", hex: "#4B9F4A" },
    { name: "Dark Brown", hex: "#352100" },
    { name: "Medium Brown", hex: "#A05F35" },
    { name: "Sand Blue", hex: "#6C81B7" },
    { name: "Sand Green", hex: "#A0BCAC" },
    { name: "Dark Red", hex: "#C91A09" },
    { name: "Medium Blue", hex: "#5A93DB" },
    { name: "Reddish Brown", hex: "#582A12" },
    { name: "Light Bluish Gray", hex: "#A0A5A9" },
    { name: "Dark Bluish Gray", hex: "#6C6E68" },
  ],
  metallic: [
    { name: "Metallic Silver", hex: "#A5A9B4" },
    { name: "Metallic Gold", hex: "#DBAC34" },
    { name: "Metallic Dark Gray", hex: "#6D6E5C" },
    { name: "Metallic Green", hex: "#3CB371" },
    { name: "Metallic Blue", hex: "#5C9DD1" },
  ],
  transparent: [
    { name: "Trans-Clear", hex: "#FCFCFC" },
    { name: "Trans-Red", hex: "#C91A09" },
    { name: "Trans-Blue", hex: "#0020A0" },
    { name: "Trans-Yellow", hex: "#F5CD2F" },
    { name: "Trans-Green", hex: "#84B68D" },
    { name: "Trans-Purple", hex: "#8C00FF" },
    { name: "Trans-Orange", hex: "#F08F1C" },
  ],
}

export function ColorPalette({ selectedColor, setSelectedColor }: ColorPaletteProps) {
  const [customColor, setCustomColor] = useState("#FFFFFF")

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">LEGO® Color Palette</h2>

      <Tabs defaultValue="standard">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="metallic">Metallic</TabsTrigger>
          <TabsTrigger value="transparent">Transparent</TabsTrigger>
        </TabsList>

        {Object.entries(LEGO_COLORS).map(([category, colors]) => (
          <TabsContent key={category} value={category} className="mt-2">
            <ScrollArea className="h-[300px] rounded-md border p-2">
              <div className="grid grid-cols-4 gap-2">
                {colors.map((color) => (
                  <Button
                    key={color.hex}
                    variant="outline"
                    className="h-14 p-0 relative"
                    style={{ backgroundColor: color.hex, borderColor: color.hex === "#FFFFFF" ? "#ddd" : color.hex }}
                    onClick={() => setSelectedColor(color.hex)}
                  >
                    {selectedColor === color.hex && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-sm">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <span className="sr-only">{color.name}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-2 text-xs text-muted-foreground">
              {colors.find((c) => c.hex === selectedColor)?.name || "Custom Color"}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="space-y-2 pt-2 border-t">
        <Label htmlFor="custom-color">Custom Color</Label>
        <div className="flex gap-2">
          <Input
            id="custom-color"
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="w-12 h-10 p-1"
          />
          <Input type="text" value={customColor} onChange={(e) => setCustomColor(e.target.value)} className="flex-1" />
          <Button onClick={() => setSelectedColor(customColor)}>Apply</Button>
        </div>
      </div>
    </div>
  )
}

