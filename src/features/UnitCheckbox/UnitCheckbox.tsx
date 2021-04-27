import { useState } from "react"
import styled from "styled-components"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import Typography from "@material-ui/core/Typography"
import { useAppDispatch } from "../../hooks"
import { changeUnit } from "../weatherSlice"

export function UnitCheckbox() {
  const dispatch = useAppDispatch()
  const [selectedOption, setSelectedOption] = useState("fahrenheit")

  function handleOptionChange(
    e: import("react").ChangeEvent<HTMLInputElement>
  ) {
    setSelectedOption(e.target.value)
    dispatch(changeUnit(e.target.value))
  }

  return (
    <Container>
      <FormControl component="fieldset">
        <RadioGroup
          row={true}
          name="unit"
          value={selectedOption}
          onChange={(e) => handleOptionChange(e)}
        >
          <FormControlLabel
            value="celsius"
            control={<Radio color="primary" />}
            label={<Typography variant="h6">Celsius</Typography>}
          />
          <FormControlLabel
            value="fahrenheit"
            control={<Radio color="primary" />}
            label={<Typography variant="h6">Fahrenheit</Typography>}
          />
        </RadioGroup>
      </FormControl>
    </Container>
  )
}

const Container = styled.div`
  text-align: center;
`
