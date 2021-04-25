import { FiveDaysForecastResponse, DailyForecastResponse } from "./types"

export async function fetchDailyForecast() {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=-34.6132&lon=-58.3772&appid=75f972b80e26f14fe6c920aa6a85ad57&exclude=current,minutely,hourly,alerts&units=metric"
  )

  const data: DailyForecastResponse = await response.json()

  console.log("Daily", data)
  return data
}

export async function fetchFiveDaysForecast() {
  const response = await fetch(
    "http://api.openweathermap.org/data/2.5/forecast?q=buenos+aires,ar&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40&units=metric"
  )

  const data: FiveDaysForecastResponse = await response.json()

  console.log("5 days", data)

  return data
}
