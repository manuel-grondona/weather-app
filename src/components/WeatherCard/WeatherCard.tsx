import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import styled from "styled-components"
import { PartialCloud } from "../../icons"

export function WeatherCard() {
  return (
    <CardContainer>
      <CardContentContainer>
        <div>
          <Typography variant="h5">FRI</Typography>
          <Typography variant="subtitle1">10/06/2021</Typography>
        </div>
        <IconContainer>
          <PartialCloud />
        </IconContainer>
        <TemperatureContainer>
          <MaxTemperature variant="h6">23°C</MaxTemperature>
          <MinTemperature variant="h6">10°C</MinTemperature>
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

const IconContainer = styled.div`
  align-self: center;
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
