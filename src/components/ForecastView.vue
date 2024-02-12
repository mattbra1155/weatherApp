<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useWeatherStore } from '@/stores/weather';
import { useLocationsStore } from '@/stores/location';

const weather = useWeatherStore()
const activeDay = ref<any>()

const setActiveDay = (day: any) => {
    activeDay.value = day
    console.log(activeDay.value);

    weather.state.forecastActiveDay = activeDay.value.date
}

watch(() => weather.state.latitude, async (locationCoords) => {
    if (locationCoords && weather.state.current) {
        console.log('here', weather.state.current);

        setActiveDay(weather.state.current)

    }
})

// weather.$subscribe((mut, state) => {
//     if (state.state.current) {
//         setActiveDay(weather.state.current)
//         console.log(weather.state.current.date);

//     }
// })

</script>
<template>
    <section class="forecast">
        <h2>Forecast</h2>
        <!-- {{ activeDay.date }} -->
        <div class="list">
            <template v-for="dayItem in weather.state.forecast" :key="dayItem.date_epoch">
                <div v-if="dayItem.date !== weather.state.current.date" @click="setActiveDay(dayItem)" class="day"
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