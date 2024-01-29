import { defineStore } from "pinia";
import { ref } from "vue";


export const useLocationsStore = defineStore('location', () => {
    const coords = ref<{
        latitude: number | null
        longitude: number | null
    }>({
        latitude: null,
        longitude: null
    })
    const getLocation = async () => {
        // First, get the user's location coordinates using the Geolocation API
        if (navigator.geolocation) {            
            navigator.geolocation.getCurrentPosition((data) => {
                coords.value.latitude = data.coords.latitude
                coords.value.longitude = data.coords.longitude
            });

        } else {
            console.log("Geolocation is not supported by this browser.");
        }


    }
    return {
        coords,
        getLocation,
    }
})
