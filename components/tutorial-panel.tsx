"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function TutorialPanel() {
  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Design Tips</AlertTitle>
        <AlertDescription>Follow these tutorials to create authentic LEGO® minifigure designs.</AlertDescription>
      </Alert>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Getting Started</AccordionTrigger>
          <AccordionContent>
            <ol className="space-y-2 text-sm">
              <li>1. Select a part to work on from the 3D viewer</li>
              <li>2. Create a new layer for your design</li>
              <li>3. Choose colors from the official LEGO palette</li>
              <li>4. Use the drawing tools to create your design</li>
              <li>5. Preview your design in the 3D viewer</li>
              <li>6. Export when you're satisfied with your creation</li>
            </ol>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Facial Features</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>LEGO minifigure faces follow specific guidelines:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Eyes should be placed approximately 1/3 from the top of the head</li>
                <li>Standard eyes are simple black dots with white highlights</li>
                <li>Eyebrows should be thin and expressive</li>
                <li>Mouths are typically simple curves or lines</li>
                <li>Avoid gradients and use hard shading instead</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Torso Designs</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>For authentic torso prints:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Remember to design both front and back</li>
                <li>Account for arm cutouts on the sides</li>
                <li>Use minimal outlines for a clean look</li>
                <li>Consider the collar area at the top</li>
                <li>Designs can wrap slightly around the sides</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Working with Layers</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>Effective layer management:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Create separate layers for different elements (outlines, colors, details)</li>
                <li>Use the visibility toggle to hide/show layers while working</li>
                <li>Adjust layer order to control which elements appear on top</li>
                <li>Name your layers clearly for easier organization</li>
                <li>Consider creating backup layers before making major changes</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Color Guidelines</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>LEGO color best practices:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Stick to official LEGO colors for authentic designs</li>
                <li>Use metallic colors sparingly for special details</li>
                <li>Consider how colors will look when printed or rendered</li>
                <li>Create contrast between adjacent elements</li>
                <li>Remember that some colors may look different on plastic vs. digital</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

