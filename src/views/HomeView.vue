<script setup lang="ts">
import WeatherWindow from '@/components/WeatherWindow.vue'
import { useLocationsStore } from '@/stores/location';
import { useWeatherStore } from '@/stores/weather';
import { ref, watch } from 'vue';

const locationData = ref<any>({})
const { coords, getLocation } = useLocationsStore()
const { getCurrentWeather } = useWeatherStore()


getLocation()
watch(coords, async (locationCoords) => {
  if (locationCoords.latitude && locationCoords.longitude) {
    locationData.value = await getCurrentWeather(locationCoords.latitude, locationCoords.longitude)
    console.log(locationData.value);

  }
})

</script>

<template>
  <main>
    <WeatherWindow :location-data="locationData" />
  </main>
</template>
