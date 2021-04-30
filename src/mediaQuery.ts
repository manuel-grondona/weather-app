import { useState, useEffect } from "react"

export const BREAKPOINTS = {
  DESKTOP_MIN: 1024,
} as const

export const mediaQuery = {
  desktop: `@media (min-width: ${BREAKPOINTS.DESKTOP_MIN}px)`,
} as const

const mediaQueryJS = window.matchMedia(
  `(min-width: ${BREAKPOINTS.DESKTOP_MIN}px)`
)

export function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(!mediaQueryJS.matches)
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    function handleChange(e: MediaQueryListEvent) {
      setIsMobile(!e.matches)
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    mediaQueryJS.addEventListener("change", handleChange)

    return () => {
      mediaQueryJS.removeEventListener("change", handleChange)
    }
  }, [])

  return { isMobile, screenSize }
}
