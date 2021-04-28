import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface XAxisProps {
  bottom: number
  left: number
  height: number
  scale: d3.ScaleBand<string>
}

export function XAxis({ bottom, left, height, scale }: XAxisProps) {
  const axis = useRef(null)

  useEffect(() => {
    d3.select(axis.current).call(d3.axisBottom(scale) as any)
  })

  return (
    <g ref={axis} transform={`translate(${left}, ${height - bottom + 4})`} />
  )
}
