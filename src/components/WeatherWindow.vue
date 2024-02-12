<script lang="ts" setup>
import { useSearchStore } from '@/stores/search';
import { useWeatherStore } from '@/stores/weather';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import SearchIcon from './icons/searchIcon.vue';

const search = useSearchStore()
const weather = useWeatherStore()

const forecastCurrentWeather = ref<any>()

const { state } = storeToRefs(weather)

const location = computed(() => state.value.location)
let currentWeather = ref<any>(state.value.current)

const localTime = ref(new Date().toLocaleTimeString())
const city = computed(() => location.value?.name)
const country = computed(() => location.value?.country)
const condition = computed(() => currentWeather.value?.condition)
const wind = computed(() => currentWeather.value?.wind_kph | currentWeather.value?.maxwind_kph)
const temp = computed(() => currentWeather.value?.temp_c | currentWeather.value?.maxtemp_c)
const tempFeel = computed(() => currentWeather.value?.feelslike_c)


weather.$subscribe((mutation, state) => {
    currentWeather.value = state.state.current
    if (state.state.forecastActiveDay) {
        forecastCurrentWeather.value = state.state.forecast.find((day: any) => day.date === state.state.forecastActiveDay)
        currentWeather.value = forecastCurrentWeather.value.day
        console.log(currentWeather.value);

    }

})
setInterval(() => {
    localTime.value = new Date().toLocaleTimeString()
}, 1000)


</script>

<template>
    <div class="wrapper">
        <div class="row">
            <div class="column">
                <p @click="search.toggleModal()" class="text --bold city">{{ city }}, {{ country }}
                    <SearchIcon class="icon" />
                </p>
                <p class="text">{{ localTime }}</p>
                <!-- <p class="text">{{ localDate }}</p> -->
            </div>
            <div class="column">
                <img v-if="condition?.icon" :src="condition?.icon" alt="">
            </div>
        </div>
        <div class="row">
            <div class="column">
                <p class="text">Condition: {{ condition?.text }}</p>
                <p class="text">Wind: <b>{{ wind }} km/h</b></p>
                <p class="text">Temperature: {{ temp }}°C</p>
                <p v-if="tempFeel" class="text">Feels like: {{ tempFeel }}°C</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
.wrapper 
    display: flex
    flex-direction: column
    gap: 1rem
    justify-content: space-between
    align-items: flex-start
    width: 100%
    height: 50vh
    background: linear-gradient(45deg, rgba(#000, 0.5 ), rgba(#000, 0.5 )), url('/DayClear.webp')
    background-size: cover
    padding: 1rem
.row
    display: flex
    justify-content: space-between
    align-items: center
    width: 100%
.column
    display: flex
    flex-direction: column
    gap: 0.5rem
.text
    color: #fff
    &.--bold 
        font-weight: bold
.city
    display: flex
    justify-content: center
    align-items: center
    font-size: 1.5rem
    cursor: pointer
.icon
    fill: #fff
    margin-left: 0.5rem
    width: 16px
    cursor: pointer
</style>