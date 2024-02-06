<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useWeatherStore } from '@/stores/weather';


const weather = useWeatherStore()
const days = ref<any>();

onMounted(async () => {
    const response = await weather.getForecast('dopiewiec', 1)

    days.value = response.forecast.forecastday
})

</script>
<template>
    <div class="list">
        <div v-for="day in days" :key="day.date_epoch">
            {{ day.day }}
        </div>
    </div>
</template>