export interface FiveDaysForecastResponse {
  list: DayItem[]
  city: {
    coord: {
      lat: number
      lon: number
    }
  }
}

export interface DayItem {
  dt: number
  dt_text: string
  main: {
    temp: number
  }
}

export interface DailyForecastResponse {
  daily: DailyItem[]
}

interface DailyItem {
  dt: number
  temp: {
    min: number
    max: number
  }
  weather: WeatherItem[]
}

export interface WeatherItem {
  id: number
  main: string
  icon: string
}
