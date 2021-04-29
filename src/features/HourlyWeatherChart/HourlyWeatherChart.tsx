import styled from "styled-components"
import { TemperatureBars } from "../../components/TemperatureBars"
import { useAppSelector } from "../../hooks"
import { DayItem } from "../../api/types"
import { fahrenheitToCelsius } from "../../utils"

interface HourlyWeatherProps {
  hourlyWeather: DayItem[]
}

export function HourlyWeatherChart({ hourlyWeather }: HourlyWeatherProps) {
  const unit = useAppSelector((state) => state.weather.unit)

  const data = hourlyWeather.map((hour, index) => {
    return {
      index,
      hour: new Date(hour.dt * 1000).getHours(),
      value: Math.round(
        unit === "fahrenheit"
          ? Math.round(hour.main.temp)
          : Math.round(fahrenheitToCelsius(hour.main.temp))
      ),
    }
  })

  return (
    <Container>
      {data != null && data.length > 0 ? (
        <TemperatureBars
          data={data}
          width={500}
          height={250}
          top={20}
          bottom={30}
          left={30}
          right={0}
        />
      ) : (
        <p>No information</p>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 4rem;
  text-align: center;
`
