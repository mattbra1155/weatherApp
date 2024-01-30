<script lang="ts" setup>
import { toRefs, computed, ref } from 'vue';


const props = defineProps<{
    locationData: any
}>()

const { locationData } = toRefs(props)
// TO DO blew format date and time
const location = computed(() => locationData.value.location)
const currentWeather = computed(() => locationData.value.current)

console.log(location.value);

// const localTime = ref(new Date(location.value?.localtime).toLocaleTimeString())
const localTime = ref(new Date().toLocaleTimeString())
const localDate = ref(new Date(location.value?.localtime).toLocaleDateString())
const city = ref(location.value.name)
const country = ref(location.value.country)
const icon = ref(currentWeather.value.condition.icon)
const wind = ref(currentWeather.value.wind_kph)
const temp = ref(currentWeather.value.temp_c)
const tempFeel = ref(currentWeather.value.feelslike_c)

setInterval(() => {
    localTime.value = new Date().toLocaleTimeString()
}, 1000)

</script>

<template>
    <div class="wrapper">
        <div class="row">
            <div class="column">
                <p class="text --bold city">{{ city }}, {{ country }}</p>
                <p class="text">{{ localTime }}</p>
                <!-- <p class="text">{{ localDate }}</p> -->
            </div>
            <div class="column">
                <img :src="icon" alt="">
            </div>
        </div>
        <div class="row">
            <div class="column">
                <p class="text">Condition: Clear</p>
                <p class="text">Wind: <b>{{ wind }} km/h</b></p>
                <p class="text">Temperature: {{ temp }}°C</p>
                <p class="text">Feels like: {{ tempFeel }}°C</p>
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
    font-size: 1.5rem
</style>