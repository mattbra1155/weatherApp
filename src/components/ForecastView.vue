<script setup lang="ts">
import { ref } from 'vue';
import { useWeatherStore } from '@/stores/weather';

const weather = useWeatherStore()
const days = ref<any>()
const activeDay = ref<any>()

const setActiveDay = (day: any) => {
    activeDay.value = day

    weather.state.location = activeDay.value.location
    weather.state.forecast = activeDay.value.forecast
    weather.state.current = activeDay.value.current

}

weather.$subscribe((mutation, state) => {
    if (state.state.location) {
        // weather.getForecast()
    }
})


</script>
<template>
    <section class="forecast">
        <div class="list">
            <div @click="setActiveDay(dayItem)" class="day" v-for="dayItem in days" :key="dayItem.date_epoch">
                <p class="text">{{ new Date(dayItem.date).getDate() }}.{{ new Date(dayItem.date).getMonth() }}</p>
                <img :src="dayItem.day.condition.icon" alt="">
                <p class="text">{{ dayItem.day.avgtemp_c.toFixed() }}°C</p>
            </div>
        </div>
        <div class="details">
            {{ activeDay }}
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
</style>