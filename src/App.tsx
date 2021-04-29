import { useEffect, useState } from "react"
import styled from "styled-components"
import IconButton from "@material-ui/core/IconButton"
import CircularProgress from "@material-ui/core/CircularProgress"
import Card from "@material-ui/core/Card"
import { Arrow as RightArrow } from "./icons"
import { useAppSelector, useAppDispatch } from "./hooks"
import { DailyWeatherList } from "./features/DailyWeatherList"
import { fetchWeather, selectDay } from "./features/weatherSlice"
import { UnitCheckbox } from "./features/UnitCheckbox"
import { HourlyWeatherChart } from "./features/HourlyWeatherChart"

function App() {
  const [currentIndex, setCurrentIndex] = useState(1)
  const dispatch = useAppDispatch()
  const dailyWeather = useAppSelector((state) => state.weather.daily.daily)
  const isLoading = useAppSelector((state) => state.weather.loading)
  const selectedDay = useAppSelector((state) => state.weather.selectedDayDate)
  const hourlyWeather = useAppSelector(
    (state) => state.weather.selectedDayHours
  )

  const dailyWeatherLength = dailyWeather.length

  useEffect(() => {
    dispatch(fetchWeather())
  }, [dispatch])

  useEffect(() => {
    const day = dailyWeather.findIndex((day) => {
      return day.dt === selectedDay
    })

    setCurrentIndex(day)
  }, [dailyWeather, selectedDay])

  function handleNext() {
    dispatch(selectDay(dailyWeather[currentIndex + 1].dt))
    setCurrentIndex((prevState) => prevState + 1)
  }

  function handlePrev() {
    dispatch(selectDay(dailyWeather[currentIndex - 1].dt))
    setCurrentIndex((prevState) => prevState - 1)
  }

  return isLoading ? (
    <LoaderContainer>
      <CircularProgress />
    </LoaderContainer>
  ) : (
    <Container>
      <StyledCard>
        <UnitCheckbox />
        <ActionsContainer>
          {currentIndex > 0 && (
            <span>
              <IconButton onClick={handlePrev}>
                <LeftArrow />
              </IconButton>
            </span>
          )}
          {currentIndex < dailyWeatherLength - 1 && (
            <RightButtonContainer>
              <IconButton onClick={handleNext}>
                <RightArrow />
              </IconButton>
            </RightButtonContainer>
          )}
        </ActionsContainer>
        <DailyWeatherList currentIndex={currentIndex} />
        <HourlyWeatherChart hourlyWeather={hourlyWeather} />
      </StyledCard>
    </Container>
  )
}

const LoaderContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  height: 100vh;
  width: 72rem;
  margin: auto;
  padding: 2rem 0;
`

const StyledCard = styled(Card)`
  padding: 4rem;
`

const ActionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const RightButtonContainer = styled.span`
  justify-self: flex-end;
  grid-column: 2;
`

const LeftArrow = styled(RightArrow)`
  transform: rotate(180deg);
`

export default App
