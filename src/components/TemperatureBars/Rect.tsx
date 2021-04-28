import { useSpring, animated } from "react-spring"
import { TemperatureData } from "./TemperatureBars"
import * as d3 from "d3"

interface RectProps {
  index: number
  data: TemperatureData
  prev: TemperatureData[]
  next: TemperatureData[]
  x: d3.ScaleBand<string>
  y: d3.ScaleLinear<number, number, never>
  height: number
  top: number
  bottom: number
}

const format = d3.format(".2f")

export function Rect({
  index,
  data,
  prev,
  next,
  x,
  y,
  height,
  top,
  bottom,
}: RectProps) {
  const [animatedProps, setAnimatedProps] = useSpring(() => ({
    to: async (next, cancel) => {
      await next({ t: 1 })
    },
    from: { t: 0 },
    config: { duration: 150 },
    reset: true,
  }))

  setAnimatedProps({
    to: async (next, cancel) => {
      await next({ t: 1 })
    },
    from: { t: 0 },
    config: { duration: 150 },
    reset: true,
  })

  const prevIndex = prev.findIndex(
    (d: TemperatureData) => d.index === next[index].index
  )
  const interpolator = d3.interpolate(prev[index], data)
  const shouldUpdate =
    prev[index].index === data.index && prev[index].value !== data.value

  const interpolatorX = d3.interpolate(
    x(prevIndex.toString()),
    x(data.index.toString()) || {}
  )

  const interpolatorY = d3.interpolate(
    y(shouldUpdate ? prev[index].value : data.value),
    y(data.value)
  )

  return (
    <animated.g
      key={data.index}
      transform={animatedProps.t.to((t) => {
        return `translate(${interpolatorX(t)}, ${interpolatorY(t)})`
      })}
    >
      <animated.rect
        width={x.bandwidth()}
        height={animatedProps.t.to((t) => {
          return height - bottom - top - interpolatorY(t)
        })}
        fill={"#FEF5D7"}
        stroke="#FFCC00"
      />
      <animated.text
        transform={`translate(${x.bandwidth() / 2}, ${-6})`}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="grey"
        fontSize="12"
      >
        {shouldUpdate
          ? animatedProps.t.to((t) => format(interpolator(t).value))
          : format(data.value)}
      </animated.text>
    </animated.g>
  )
}
