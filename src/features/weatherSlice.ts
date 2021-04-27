import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../api"
import { DailyForecastResponse, FiveDaysForecastResponse } from "../api/types"

type StateProps = {
  loading: boolean
  unit: "celsius" | "fahrenheit"
  hourly: Pick<FiveDaysForecastResponse, "list">
  daily: DailyForecastResponse
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
}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    changeUnit(state, action) {
      state.unit = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      console.log(action)
      state.loading = false
      state.hourly.list = action.payload.hourly.list
      state.daily.daily = action.payload.daily.daily
    })
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.loading = false
    })
  },
})

export const { changeUnit } = weatherSlice.actions

export default weatherSlice.reducer
