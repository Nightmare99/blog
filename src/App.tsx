import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"
import { BlueprintGrid } from "@/components/background/BlueprintGrid"
import { BlogIndex } from "@/pages/BlogIndex"
import { PostPage } from "@/pages/PostPage"
import { NotFound } from "@/pages/NotFound"

function App() {
  return (
    <BrowserRouter basename="/blog">
      <BlueprintGrid />
      <div className="relative z-10 flex min-h-screen w-full flex-col overflow-x-hidden">
        <Nav />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<BlogIndex />} />
            <Route path="/:slug" element={<PostPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
