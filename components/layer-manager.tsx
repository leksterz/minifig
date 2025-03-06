"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Eye, EyeOff, Trash2, Plus, ArrowUp, ArrowDown, Edit2 } from "lucide-react"
import type { Layer } from "@/components/minifigure-designer"

interface LayerManagerProps {
  layers: Layer[]
  onLayerUpdate: (layer: Layer) => void
  onAddLayer: () => void
  onDeleteLayer: (id: string) => void
}

export function LayerManager({ layers, onLayerUpdate, onAddLayer, onDeleteLayer }: LayerManagerProps) {
  const [editingLayerId, setEditingLayerId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState("")

  const handleToggleVisibility = (layer: Layer) => {
    onLayerUpdate({ ...layer, visible: !layer.visible })
  }

  const handleMoveUp = (layer: Layer) => {
    const currentIndex = layers.findIndex((l) => l.id === layer.id)
    if (currentIndex > 0) {
      const higherLayer = layers[currentIndex - 1]
      onLayerUpdate({ ...layer, zIndex: higherLayer.zIndex })
      onLayerUpdate({ ...higherLayer, zIndex: layer.zIndex })
    }
  }

  const handleMoveDown = (layer: Layer) => {
    const currentIndex = layers.findIndex((l) => l.id === layer.id)
    if (currentIndex < layers.length - 1) {
      const lowerLayer = layers[currentIndex + 1]
      onLayerUpdate({ ...layer, zIndex: lowerLayer.zIndex })
      onLayerUpdate({ ...lowerLayer, zIndex: layer.zIndex })
    }
  }

  const startEditing = (layer: Layer) => {
    setEditingLayerId(layer.id)
    setEditingName(layer.name)
  }

  const saveLayerName = (layer: Layer) => {
    onLayerUpdate({ ...layer, name: editingName })
    setEditingLayerId(null)
  }

  // Sort layers by zIndex
  const sortedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Layers</h2>
        <Button size="sm" onClick={onAddLayer}>
          <Plus className="h-4 w-4 mr-1" /> Add Layer
        </Button>
      </div>

      {layers.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No layers for this part. Click "Add Layer" to create one.
        </div>
      ) : (
        <ScrollArea className="h-[350px]">
          <div className="space-y-2">
            {sortedLayers.map((layer) => (
              <Card key={layer.id} className="overflow-hidden">
                <CardContent className="p-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <Button variant="ghost" size="icon" onClick={() => handleToggleVisibility(layer)}>
                        {layer.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>

                      {editingLayerId === layer.id ? (
                        <Input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onBlur={() => saveLayerName(layer)}
                          onKeyDown={(e) => e.key === "Enter" && saveLayerName(layer)}
                          autoFocus
                          className="h-8 text-sm"
                        />
                      ) : (
                        <span className="text-sm font-medium truncate">{layer.name}</span>
                      )}
                    </div>

                    <div className="flex items-center">
                      <Button variant="ghost" size="icon" onClick={() => startEditing(layer)} className="h-8 w-8">
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMoveUp(layer)}
                        disabled={layers.indexOf(layer) === 0}
                        className="h-8 w-8"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMoveDown(layer)}
                        disabled={layers.indexOf(layer) === layers.length - 1}
                        className="h-8 w-8"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteLayer(layer.id)}
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}

