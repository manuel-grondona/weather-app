import { useEffect, useState } from "react"
import styled from "styled-components"
import IconButton from "@material-ui/core/IconButton"
import CircularProgress from "@material-ui/core/CircularProgress"
import { Arrow as RightArrow } from "./icons"
import { useAppSelector, useAppDispatch } from "./hooks"
import { DailyWeatherList } from "./features/DailyWeatherList"
import { fetchWeather } from "./features/weatherSlice"
import { UnitCheckbox } from "./features/UnitCheckbox"

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const dispatch = useAppDispatch()
  const dailyWeather = useAppSelector((state) => state.weather.daily.daily)
  const isLoading = useAppSelector((state) => state.weather.loading)

  const dailyWeatherLength = dailyWeather.length

  useEffect(() => {
    dispatch(fetchWeather())
  }, [dispatch])

  function handleNext() {
    if (currentIndex < dailyWeatherLength - 3) {
      setCurrentIndex((prevState) => prevState + 1)
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1)
    }
  }

  return isLoading ? (
    <LoaderContainer>
      <CircularProgress />
    </LoaderContainer>
  ) : (
    <Container>
      <UnitCheckbox />
      <ActionsContainer>
        {currentIndex > 0 && (
          <span>
            <IconButton onClick={handlePrev}>
              <LeftArrow />
            </IconButton>
          </span>
        )}
        {currentIndex < dailyWeatherLength - 3 && (
          <RightButtonContainer>
            <IconButton onClick={handleNext}>
              <RightArrow />
            </IconButton>
          </RightButtonContainer>
        )}
      </ActionsContainer>
      <DailyWeatherList currentIndex={currentIndex} />
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
