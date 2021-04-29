import { TemperatureData } from "./TemperatureBars"
import * as d3 from "d3"

interface RectProps {
  data: TemperatureData
  x: d3.ScaleBand<string>
  y: d3.ScaleLinear<number, number, never>
  height: number
  top: number
  bottom: number
}

const format = d3.format(".2")

export function Rect({ data, x, y, height, top, bottom }: RectProps) {
  return (
    <g
      key={data.index}
      transform={`translate(${x(data.hour.toString())}, ${y(data.value)})`}
    >
      <rect
        width={x.bandwidth()}
        height={height - bottom - top - y(data.value)}
        fill={"#FEF5D7"}
        stroke="#FFCC00"
      />
      <text
        transform={`translate(${x.bandwidth() / 2}, ${-6})`}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="grey"
        fontSize="12"
      >
        {format(data.value)}
      </text>
    </g>
  )
}
