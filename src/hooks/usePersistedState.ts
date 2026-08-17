import { useEffect, useState } from "react"

export function usePersistedState(key: string, defaultValue: boolean) {
  const [value, setValue] = useState<boolean>(() => {
    if (typeof window === "undefined") return defaultValue
    const stored = window.localStorage.getItem(key)
    return stored === null ? defaultValue : stored === "true"
  })

  useEffect(() => {
    window.localStorage.setItem(key, String(value))
  }, [key, value])

  return [value, setValue] as const
}
