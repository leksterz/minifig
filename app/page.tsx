import { MinifigureDesigner } from "@/components/minifigure-designer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">LEGO® Minifigure Designer</span>
            </a>
          </div>
        </div>
      </header>
      <MinifigureDesigner />
    </main>
  )
}

