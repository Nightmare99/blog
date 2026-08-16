import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Line } from "@react-three/drei"
import * as THREE from "three"
import { posts, type Category } from "@/lib/posts"

/**
 * Ambient double-helix — the log's own categories become its base pairs.
 * Each rung is colored by an actual post's category, so the strand is a
 * literal (if decorative) encoding of what's been logged so far.
 */
const CATEGORY_HEX: Record<Category, string> = {
  engineering: "#5EEAD4",
  notes: "#7C9CFF",
  career: "#FFB454",
  personal: "#B9A2FF",
}

const TURNS = 2.75
const POINTS_PER_TURN = 10
const TOTAL_POINTS = Math.round(TURNS * POINTS_PER_TURN)
const RADIUS = 1
const HEIGHT = 5.4

function buildStrand(offset: number): [number, number, number][] {
  return Array.from({ length: TOTAL_POINTS }, (_, i) => {
    const t = i / (TOTAL_POINTS - 1)
    const angle = t * TURNS * Math.PI * 2 + offset
    const y = t * HEIGHT - HEIGHT / 2
    return [Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS]
  })
}

function Helix() {
  const group = useRef<THREE.Group>(null)

  const strandA = useMemo(() => buildStrand(0), [])
  const strandB = useMemo(() => buildStrand(Math.PI), [])

  const rungColors = useMemo(() => {
    const flattened = posts.flatMap((p) => p.meta.categories)
    const cats: Category[] = flattened.length > 0 ? flattened : (Object.keys(CATEGORY_HEX) as Category[])
    return Array.from({ length: TOTAL_POINTS }, (_, i) => CATEGORY_HEX[cats[i % cats.length]])
  }, [])

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.22
  })

  return (
    <group rotation={[0.3, 0, 0.15]}>
      <group ref={group}>
        {strandA.map((p, i) => (
          <mesh key={`a-${i}`} position={p}>
            <sphereGeometry args={[0.085, 12, 12]} />
            <meshStandardMaterial
              color="#5EEAD4"
              emissive="#5EEAD4"
              emissiveIntensity={0.55}
              roughness={0.3}
              metalness={0.4}
            />
          </mesh>
        ))}
        {strandB.map((p, i) => (
          <mesh key={`b-${i}`} position={p}>
            <sphereGeometry args={[0.085, 12, 12]} />
            <meshStandardMaterial
              color="#7C9CFF"
              emissive="#7C9CFF"
              emissiveIntensity={0.55}
              roughness={0.3}
              metalness={0.4}
            />
          </mesh>
        ))}
        {strandA.map((p, i) =>
          i % 2 === 0 ? (
            <Line
              key={`r-${i}`}
              points={[p, strandB[i]]}
              color={rungColors[i]}
              lineWidth={1.5}
              transparent
              opacity={0.6}
            />
          ) : null
        )}
      </group>
    </group>
  )
}

export default function DnaHelix() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <pointLight color="#5EEAD4" position={[3, 2, 4]} intensity={40} distance={14} decay={2} />
      <pointLight color="#B9A2FF" position={[-3, -2, -4]} intensity={30} distance={14} decay={2} />
      <Helix />
    </Canvas>
  )
}
