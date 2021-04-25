export interface FiveDaysForecastResponse {
  list: DayItem[]
  city: {
    coord: {
      lat: number
      lon: number
    }
  }
}

interface DayItem {
  dt: number
  dt_text: string
  main: {
    temp: number
  }
}

export interface DailyForecastResponse {
  daily: DailyItem[]
  weather: WeatherItem[]
}

interface DailyItem {
  dt: number
  temp: {
    min: number
    max: number
  }
}

interface WeatherItem {
  id: number
  main: string
}
