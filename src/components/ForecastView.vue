<script setup lang="ts">
import { ref, watch } from 'vue';
import { useWeatherStore } from '@/stores/weather';

const weather = useWeatherStore()
const activeDay = ref<any>()
const setActiveDay = (day: any) => {
    activeDay.value = day
    console.log(activeDay.value);
    weather.state.forecastActiveDay = activeDay.value.date
}

watch(() => weather.state.latitude, async (locationCoords) => {
    if (locationCoords && weather.state.current) {
        setActiveDay(weather.state.current)

    }
})

</script>
<template>
    <section class="forecast">
        <h2>Forecast</h2>
        <div class="list">
            <template v-for="dayItem in weather.state.forecast" :key="dayItem.date_epoch">
                <div @click="setActiveDay(dayItem)" class="day"
                    :class="{ '--active': dayItem.date === weather.state.forecastActiveDay }">
                    <p class="text">{{ new Date(dayItem.date).getDate() }}.{{ new Date(dayItem.date).getMonth() }}</p>
                    <img :src="dayItem.day?.condition.icon" alt="">
                    <p class="text">{{ dayItem.day?.avgtemp_c }}°C</p>
                </div>
            </template>
        </div>
        <div class="details">
        </div>
    </section>
</template>


<style lang="sass" scoped>

.list
    display: flex
    gap: 1rem
    padding: 1rem 0
    overflow-x: scroll
.day
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    padding: 2px
    &.--active
        background: #e3e3e3
        padding: 2px
        border-radius: 4px
        transition: 0.3s ease-in-out
</style>