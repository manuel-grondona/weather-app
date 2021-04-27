import { useState } from "react"
import { useAppDispatch } from "../../hooks"
import { changeUnit } from "../weatherSlice"

export function UnitCheckbox() {
  const dispatch = useAppDispatch()
  const [selectedOption, setSelectedOption] = useState("celsius")

  function handleOptionChange(
    e: import("react").ChangeEvent<HTMLInputElement>
  ) {
    setSelectedOption(e.target.value)
    dispatch(changeUnit(e.target.value))
  }

  return (
    <>
      <input
        type="radio"
        name="unit"
        value="celsius"
        checked={selectedOption === "celsius"}
        onChange={(e) => handleOptionChange(e)}
      />
      <label htmlFor="celsius">Celsius</label>
      <input
        type="radio"
        name="unit"
        value="fahrenheit"
        checked={selectedOption === "fahrenheit"}
        onChange={(e) => handleOptionChange(e)}
      />
      <label htmlFor="fahrenheit">Fahrenheit</label>
    </>
  )
}
