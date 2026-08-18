/**
 * Flat, static "blueprint" backdrop — a graph-paper hairline grid plus a
 * few oversized outline shapes. Atmosphere without lighting, gradients, or
 * 3D, matching the main portfolio site's background (which replaced its own
 * Three.js scene for the same reason: it fought the flat brutalist UI in
 * front of it).
 */
export function BlueprintGrid() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-void" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,241,232,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,232,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -left-32 top-[8%] h-[380px] w-[380px] rotate-45 border-2 border-ink/[0.06]" />
      <div className="absolute -right-40 top-[46%] h-[520px] w-[520px] rounded-full border-2 border-ink/[0.05]" />
      <div className="absolute left-1/4 top-[82%] h-[240px] w-[240px] rotate-12 border-2 border-signal-cyan/[0.07]" />
      <div className="absolute -right-16 top-[16%] h-[130px] w-[130px] border-2 border-signal-pink/[0.08]" />
    </div>
  )
}
