import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useLocationsStore } from './location';

interface IWeatherState {
    latitude: null | number
    longitude: null | number
    location: {
        city: null |string
        country: null | string

    }
}
export const useWeatherStore = defineStore('weather', () => {
    const state = ref<IWeatherState>({
        location: {
            city: null,
            country: null
        },
        latitude: null,
        longitude: null,
    }) 

    const searchLocation = async(location: string)=> {
        try {
            const url = `http://api.weatherapi.com/v1/search.json?q=${location}&key=${import.meta.env.VITE_WEATHER_KEY}`
            const response = await fetch(url)
        
            const data = await response.json()   
            
            console.log(data);
            
            state.value.latitude = data[0].lat
            state.value.longitude = data[0].lon
            console.log(state.value);
            
            state.value.location.city = data[0].name
            state.value.location.country = data[0].country

            if (state.value.latitude && state.value.longitude) {
                // need to add to state locationData from HomeView
                getCurrentWeather(state.value.latitude, state.value.longitude)
            }
        } catch(error) {
            console.error(error)
        }
    }

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
        getCurrentWeather,
        searchLocation
    }
})