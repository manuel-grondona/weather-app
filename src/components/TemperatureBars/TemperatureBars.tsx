import { Fragment } from "react"
import * as d3 from "d3"
import { Rect } from "./Rect"
import { XAxis } from "./XAxis"

export interface TemperatureData {
  index: number
  hour: number
  value: number
}

interface TemperatureBarsProps {
  data: TemperatureData[]
  width: number
  height: number
  top: number
  bottom: number
  left: number
  right: number
}

export function TemperatureBars({
  data,
  width,
  height,
  top,
  bottom,
  left,
  right,
}: TemperatureBarsProps) {
  const x = d3
    .scaleBand()
    .range([0, width - left - right])
    .domain(data.map((d) => d.hour.toString())) // TODO remove toString()
    .padding(0.4)

  const y = d3
    .scaleLinear()
    .range([height - top - bottom, 0])
    .domain([0, d3.max(data, (d) => d.value) as number])

  return (
    <Fragment>
      <svg width={width} height={height}>
        <XAxis bottom={bottom} height={height} left={left} scale={x} />
        <g transform={`translate(${left}, ${top})`}>
          {data.map((d, i) => (
            <Rect
              data={d}
              x={x}
              y={y}
              height={height}
              top={top}
              bottom={bottom}
            />
          ))}
        </g>
      </svg>
    </Fragment>
  )
}
