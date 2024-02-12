import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useLocationsStore } from './location';



interface IWeatherState {
    latitude: null | number
    longitude: null | number
    location: any
    forecastActiveDay: null | string
    forecastDays: number
    forecast: any
    current: any

}
export const useWeatherStore = defineStore('weather', () => {
    const state = ref<IWeatherState>({
        location: {},
        latitude: null,
        longitude: null,
        forecastDays: 5,
        forecastActiveDay: null,
        forecast: null,
        current: null,
    })

    const searchLocation = async (location: string) => {
        try {
            const url = `http://api.weatherapi.com/v1/search.json?q=${location}&key=${import.meta.env.VITE_WEATHER_KEY}`
            const response = await fetch(url)

            const data = await response.json()

            console.log(data);

            state.value.latitude = data[0].lat
            state.value.longitude = data[0].lon

            state.value.location = data[0]

            console.log(state.value);

            if (state.value.latitude && state.value.longitude) {
                // need to add to state locationData from HomeView
                // state.value.location = getCurrentWeather(state.value.latitude, state.value.longitude)
                const forecastPayload = await getForecast(state.value.forecastDays)
                // const currentPayload = await getCurrentWeather()
                state.value.current = forecastPayload.current
                state.value.location = forecastPayload.location
                state.value.forecast = forecastPayload.forecast.forecastday
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getCurrentWeather = async () => {

        try {
            const url = `http://api.weatherapi.com/v1/current.json?q=${state.value.latitude},${state.value.longitude}&key=${import.meta.env.VITE_WEATHER_KEY}`
            const response = await fetch(url)

            const data = await response.json()

            state.value.current = data.current
            return data

        } catch (error) {
            console.error(error)
        }
    }

    const getForecast = async (days: number = state.value.forecastDays, alerts = true, airQuality?: boolean) => {

        const { usercoords } = useLocationsStore()

        state.value.latitude = usercoords.latitude
        state.value.longitude = usercoords.longitude

        const location: string | null | undefined = state.value.location?.name || `${state.value.latitude},${state.value.longitude}`

        try {
            const url = `http://api.weatherapi.com/v1/forecast.json?q=${location}&days=${days}&aqi=${airQuality}&alerts=${alerts}&key=${import.meta.env.VITE_WEATHER_KEY}`
            const response = await fetch(url)

            const data = await response.json()
            console.log(data);

            state.value.location = data.location
            state.value.current = data.current
            state.value.forecast = data.forecast.forecastday

            return data

        } catch (error) {
            console.error(error)
        }
    }

    return {
        state,
        getCurrentWeather,
        searchLocation,
        getForecast
    }
})