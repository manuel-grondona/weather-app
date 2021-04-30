import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActionArea from "@material-ui/core/CardActionArea"
import Typography from "@material-ui/core/Typography"
import styled from "styled-components"
import { WeatherItem } from "../../api/types"
import { days, months } from "../../constants"
import { useAppSelector, useAppDispatch } from "../../hooks"
import { selectDay } from "../../features/weatherSlice"
import { fahrenheitToCelsius } from "../../utils"
import { mediaQuery } from "../../mediaQuery"

interface WeatherCardProps {
  date: number
  temp: {
    min: number
    max: number
  }
  weather: WeatherItem
}

export function WeatherCard({ temp, date, weather }: WeatherCardProps) {
  const unit = useAppSelector((state) => state.weather.unit)
  const selected = useAppSelector((state) => state.weather.selectedDayDate)
  const dispatch = useAppDispatch()

  const isFahrenheit = unit === "fahrenheit"
  const isSelectedDate = selected === date

  const dateObj = new Date(date * 1000)
  const year = dateObj.getFullYear()
  const dayNumber = dateObj.getDate()
  const monthIndex = dateObj.getMonth()
  const month = months[monthIndex]
  const dayIndex = dateObj.getDay()
  const day = days[dayIndex]

  const max = Math.round(
    isFahrenheit ? temp.max : fahrenheitToCelsius(temp.max)
  )
  const min = Math.round(
    isFahrenheit ? temp.min : fahrenheitToCelsius(temp.min)
  )

  const unitSymbol = isFahrenheit ? "°F" : "°C"

  function handleClick() {
    dispatch(selectDay(date))
  }

  return (
    <CardContainer selected={isSelectedDate}>
      <CardActionArea disableTouchRipple onClick={handleClick}>
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
            <MaxTemperature variant="h6">{`${max}${unitSymbol}`}</MaxTemperature>
            <MinTemperature variant="h6">{`${min}${unitSymbol}`}</MinTemperature>
          </TemperatureContainer>
        </CardContentContainer>
      </CardActionArea>
    </CardContainer>
  )
}

interface CardContainerProps {
  selected: boolean
}

const CardContainer = styled(Card)<CardContainerProps>`
  width: 14rem;
  text-align: center;
  margin: auto;
  border: ${(props) =>
    props.selected ? "1px solid #ffc107 !important" : null};

  ${mediaQuery.desktop} {
    margin: inherit;
  }
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
