<script setup lang="ts">
import ForecastView from '@/components/ForecastView.vue';
import WeatherWindow from '@/components/WeatherWindow.vue'
import { useLocationsStore } from '@/stores/location';
import { useWeatherStore } from '@/stores/weather';
import { watch } from 'vue';

const locationStore = useLocationsStore()
const weather = useWeatherStore()

watch(locationStore.usercoords, async (locationCoords) => {
  if (locationCoords.latitude && locationCoords.longitude) {
    await weather.getForecast()
  }
})

locationStore.getLocation()
</script>

<template>
  <main>
    <WeatherWindow />
    <ForecastView />
  </main>
</template>
