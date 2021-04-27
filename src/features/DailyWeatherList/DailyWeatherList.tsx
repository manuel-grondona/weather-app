import { WeatherCard } from "../../components/WeatherCard"
import { useAppSelector } from "../../hooks"
import styled from "styled-components"

interface DailyWeatherListProps {
  currentIndex: number
}

export function DailyWeatherList({ currentIndex }: DailyWeatherListProps) {
  const dailyWeather = useAppSelector((state) => state.weather.daily)

  return (
    <Container>
      <ContentWrapper>
        <Content
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
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
  padding: 2rem;
  overflow: hidden;
  width: 100%;
  height: 100%;
`

const Content = styled.div`
  display: flex;
  transition: all 250ms linear;

  > * {
    width: 100%;
    flex-shrink: 0;
    flex-grow: 1;
    width: calc(100% / 3);
  }
`
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
`
