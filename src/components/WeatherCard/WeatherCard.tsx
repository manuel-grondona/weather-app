import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import styled from "styled-components"
import { WeatherItem } from "../../api/types"
import { days, months } from "../../constants"

interface WeatherCardProps {
  date: number
  temp: {
    min: number
    max: number
  }
  weather: WeatherItem
}

export function WeatherCard({ temp, date, weather }: WeatherCardProps) {
  const dateObj = new Date(date * 1000)

  const year = dateObj.getFullYear()
  const dayNumber = dateObj.getDate()
  const monthIndex = dateObj.getMonth()
  const month = months[monthIndex]
  const dayIndex = dateObj.getDay()
  const day = days[dayIndex]

  return (
    <CardContainer>
      <CardContentContainer>
        <div>
          <Typography variant="h5">{day}</Typography>
          <Typography variant="subtitle1">
            {`${dayNumber} ${month} ${year}`}
          </Typography>
        </div>
        <IconContainer
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.main}
        />

        <TemperatureContainer>
          <MaxTemperature variant="h6">{`${Math.round(
            temp.max
          )}°C`}</MaxTemperature>
          <MinTemperature variant="h6">{`${Math.round(
            temp.min
          )}°C`}</MinTemperature>
        </TemperatureContainer>
      </CardContentContainer>
    </CardContainer>
  )
}

const CardContainer = styled(Card)`
  width: 14rem;
  text-align: center;
`

const CardContentContainer = styled(CardContent)`
  display: grid;
  grid-gap: 1rem;
  justify-content: center;
`

const IconContainer = styled.img`
  align-self: center;
  height: 8rem;
`
const TemperatureContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
`

const MaxTemperature = styled(Typography)`
  color: red;
`

const MinTemperature = styled(Typography)`
  color: blue;
`
