import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useWeatherStore = defineStore('weather', () => {
    const state = ref<{
        latitude: null | number
        longitude: null | number
    }>({
            latitude: null,
            longitude: null
    })

    const getCurrentWeather = async (lat: number, long: number) => {
        state.value.latitude = lat
        state.value.longitude = long
        
        try {
            const url = `http://api.weatherapi.com/v1/current.json?q=${lat},${long}&key=${import.meta.env.VITE_WEATHER_KEY}`
            const response = await fetch(url)
    
            const data = await response.json()   
            console.log(data);
            return data

        } catch(error) {
            console.error(error)
        }
    }
    return {
        state,
        getCurrentWeather
    }
})