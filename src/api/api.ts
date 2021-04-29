import { FiveDaysForecastResponse, DailyForecastResponse } from "./types"

const APPID = "75f972b80e26f14fe6c920aa6a85ad57"

interface DailyForecastRequest {
  lat: number
  lon: number
}

export async function fetchDailyForecast({ lat, lon }: DailyForecastRequest) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APPID}&exclude=current,minutely,hourly,alerts&units=imperial`
  )

  const data: DailyForecastResponse = await response.json()

  return data
}

export async function fetchFiveDaysForecast() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=buenos+aires,ar&APPID=${APPID}&cnt=40&units=imperial`
  )

  const data: FiveDaysForecastResponse = await response.json()

  return data
}
