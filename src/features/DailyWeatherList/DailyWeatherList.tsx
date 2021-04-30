import { useState, useEffect } from "react"
import styled from "styled-components"
import { WeatherCard } from "../../components/WeatherCard"
import { useAppSelector, useAppDispatch } from "../../hooks"
import { selectDay } from "../../features/weatherSlice"
import { mediaQuery, useMediaQuery } from "../../mediaQuery"

interface DailyWeatherListProps {
  currentIndex: number
}

export function DailyWeatherList({ currentIndex }: DailyWeatherListProps) {
  const dailyWeather = useAppSelector((state) => state.weather.daily)
  const dispatch = useAppDispatch()
  const { screenSize } = useMediaQuery()
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState(1)

  useEffect(() => {
    dispatch(selectDay(dailyWeather.daily[currentSwipeIndex - 1].dt))
  }, [currentSwipeIndex, dispatch, dailyWeather.daily])

  function handleScroll(e: React.UIEvent<HTMLElement>) {
    const { scrollWidth, scrollLeft } = e.currentTarget

    updateCurrentIndex({ scrollWidth, scrollLeft })
  }

  function updateCurrentIndex({
    scrollWidth,
    scrollLeft,
  }: {
    scrollWidth: number
    scrollLeft: number
  }) {
    const elementWidth = scrollWidth / dailyWeather.daily.length
    const currentScrollIndex = Math.ceil(scrollLeft / elementWidth)
    const scrollPositionAtCurrentElement =
      1 + (scrollLeft - elementWidth * currentScrollIndex) / elementWidth

    const newScrollIndex =
      scrollPositionAtCurrentElement > 0.5
        ? currentScrollIndex + 1
        : currentScrollIndex

    if (newScrollIndex !== currentSwipeIndex) {
      setCurrentSwipeIndex(newScrollIndex)
    }
  }

  return (
    <Container>
      <ContentWrapper onScroll={handleScroll}>
        <Content currentIndex={currentIndex} screenWidth={screenSize.width}>
          {dailyWeather.daily.map((day) => (
            <CardContainer key={day.dt.toString()}>
              <WeatherCard
                temp={day.temp}
                date={day.dt}
                weather={day.weather[0]}
              />
            </CardContainer>
          ))}
        </Content>
      </ContentWrapper>
    </Container>
  )
}

const Container = styled.div``

const ContentWrapper = styled.div`
  overflow-y: hidden;
  padding: 2rem;
  width: 100%;
  height: 100%;
  scroll-snap-type: x mandatory;

  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }

  ${mediaQuery.desktop} {
    overflow: hidden;
  }
`

interface ContentProps {
  currentIndex: number
  screenWidth: number
}

const Content = styled.div<ContentProps>`
  display: grid;
  grid-auto-columns: ${(props) => `calc(${props.screenWidth}px - 12rem)`};
  grid-auto-flow: column;
  scroll-snap-align: center;

  ${mediaQuery.desktop} {
    display: flex;
    transition: all 250ms linear;
    transform: ${(props) =>
      `translateX(-${
        props.currentIndex > 2 ? (props.currentIndex - 2) * (100 / 3) : 0
      }%)`};

    > * {
      flex-shrink: 0;
      flex-grow: 1;
      width: calc(100% / 3);
    }
  }
`
const CardContainer = styled.div`
  width: 100%;
  text-align: center;
  scroll-snap-align: center;

  ${mediaQuery.desktop} {
    width: calc(100% / 3);
    display: flex;
    justify-content: center;
  }
`
