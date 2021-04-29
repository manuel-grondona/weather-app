import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../api"
import {
  DailyForecastResponse,
  FiveDaysForecastResponse,
  DayItem,
} from "../api/types"

type StateProps = {
  loading: boolean
  unit: "celsius" | "fahrenheit"
  hourly: Pick<FiveDaysForecastResponse, "list">
  daily: DailyForecastResponse
  selectedDayDate: number | null
  selectedDayHours: DayItem[]
}

export const fetchWeather = createAsyncThunk("fetchWeather", async () => {
  const hourly = await api.fetchFiveDaysForecast()

  const daily = await api.fetchDailyForecast(hourly.city.coord)

  return { daily, hourly }
})

const initialState: StateProps = {
  loading: false,
  unit: "fahrenheit",
  hourly: {
    list: [],
  },
  daily: {
    daily: [],
  },
  selectedDayDate: null,
  selectedDayHours: [],
}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    changeUnit(state, action) {
      state.unit = action.payload
    },
    selectDay(state, action) {
      const selectedDate = new Date(action.payload * 1000)

      const foundDate = state.hourly.list.filter((day) => {
        const listDate = new Date(day.dt * 1000)

        return listDate.getDate() === selectedDate.getDate()
      })

      state.selectedDayHours = foundDate
      state.selectedDayDate = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      const firstDay = new Date(action.payload.daily.daily[1].dt * 1000)

      const HoursFirstDay = action.payload.hourly.list.filter((day) => {
        const listDate = new Date(day.dt * 1000)
        return listDate.getDate() === firstDay.getDate()
      })

      state.loading = false
      state.hourly.list = action.payload.hourly.list
      state.daily.daily = action.payload.daily.daily
      state.selectedDayDate = action.payload.daily.daily[1].dt
      state.selectedDayHours = HoursFirstDay
    })
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.loading = false
    })
  },
})

export const { changeUnit, selectDay } = weatherSlice.actions

export default weatherSlice.reducer
