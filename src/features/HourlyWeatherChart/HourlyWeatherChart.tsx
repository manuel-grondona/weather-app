import styled from "styled-components"
import { TemperatureBars } from "../../components/TemperatureBars"
import { useAppSelector } from "../../hooks"
import { DayItem } from "../../api/types"
import { fahrenheitToCelsius } from "../../utils"
import { mediaQuery, useMediaQuery } from "../../mediaQuery"

interface HourlyWeatherProps {
  hourlyWeather: DayItem[]
}

export function HourlyWeatherChart({ hourlyWeather }: HourlyWeatherProps) {
  const { isMobile, screenSize } = useMediaQuery()
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
          width={isMobile ? screenSize.width - 80 : 500}
          height={isMobile ? 200 : 250}
          top={20}
          bottom={30}
          left={isMobile ? 0 : 30}
          right={0}
        />
      ) : (
        <WarningText>No information for selected day</WarningText>
      )}
    </Container>
  )
}

const Container = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  ${mediaQuery.desktop} {
    padding: 4rem;
    display: block;
  }
`
const WarningText = styled.p`
  font-size: 1.6rem;
`
