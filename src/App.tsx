import { Fragment, useEffect, useState } from "react"
import styled from "styled-components"
import IconButton from "@material-ui/core/IconButton"
import CircularProgress from "@material-ui/core/CircularProgress"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import { Arrow as RightArrow } from "./icons"
import { useAppSelector, useAppDispatch } from "./hooks"
import { DailyWeatherList } from "./features/DailyWeatherList"
import { fetchWeather, selectDay } from "./features/weatherSlice"
import { UnitCheckbox } from "./features/UnitCheckbox"
import { HourlyWeatherChart } from "./features/HourlyWeatherChart"
import { mediaQuery, useMediaQuery } from "./mediaQuery"

export function App() {
  const isLoading = useAppSelector((state) => state.weather.loading)
  const dispatch = useAppDispatch()

  const { isMobile } = useMediaQuery()

  useEffect(() => {
    dispatch(fetchWeather())
  }, [dispatch])

  if (isLoading) {
    return (
      <LoaderContainer>
        <CircularProgress />
      </LoaderContainer>
    )
  }

  return (
    <Container>
      <TitleContainer>
        <Typography align="center" variant={isMobile ? "h6" : "h4"}>
          Buenos Aires, Argentina
        </Typography>
      </TitleContainer>
      {isMobile ? (
        <AppContent />
      ) : (
        <StyledCard>
          <AppContent />
        </StyledCard>
      )}
    </Container>
  )
}

function AppContent() {
  const [currentIndex, setCurrentIndex] = useState(1)
  const dispatch = useAppDispatch()
  const dailyWeather = useAppSelector((state) => state.weather.daily.daily)
  const selectedDay = useAppSelector((state) => state.weather.selectedDayDate)
  const hourlyWeather = useAppSelector(
    (state) => state.weather.selectedDayHours
  )

  const { isMobile } = useMediaQuery()

  const dailyWeatherLength = dailyWeather.length

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

  return (
    <Fragment>
      <UnitCheckbox />
      {!isMobile && (
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
      )}
      <DailyWeatherList currentIndex={currentIndex} />
      <HourlyWeatherChart hourlyWeather={hourlyWeather} />
    </Fragment>
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
  display: flex;
  flex-direction: column;

  ${mediaQuery.desktop} {
    width: 72rem;
    height: 100%;
    display: block;
    align-items: center;
    margin: auto;
  }
`
const TitleContainer = styled.div`
  margin: 1rem 0;

  ${mediaQuery.desktop} {
    margin: 2rem 0;
  }
`

const StyledCard = styled(Card)`
  padding: 4rem;
  height: 100vh;
  display: flex;
  flex-direction: column;

  ${mediaQuery.desktop} {
    display: block;
    height: 68rem;
  }
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
