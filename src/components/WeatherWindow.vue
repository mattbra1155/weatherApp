<script lang="ts" setup>
import { useCounterStore } from '@/stores/counter';
import { useSearchStore } from '@/stores/search';
import { useWeatherStore } from '@/stores/weather';
import { storeToRefs } from 'pinia';
import { toRefs, computed, ref, onMounted } from 'vue';
import SearchIcon from './icons/searchIcon.vue';

const props = defineProps<{
    locationData: any
}>()

const { locationData } = toRefs(props)
const search = useSearchStore()
const { isOpen, } = storeToRefs(search)

// TO DO blew format date and time
const location = computed(() => locationData.value.location)
const currentWeather = computed(() => locationData.value.current)

// const localTime = ref(new Date(location.value?.localtime).toLocaleTimeString())
const localTime = ref(new Date().toLocaleTimeString())
// const localDate = ref(new Date(location.value?.localtime).toLocaleDateString())
const city = computed(() => location.value?.name)
const country = computed(() => location.value?.country)
const icon = computed(() => currentWeather.value?.condition.icon)
const wind = computed(() => currentWeather.value?.wind_kph)
const temp = computed(() => currentWeather.value?.temp_c)
const tempFeel = computed(() => currentWeather.value?.feelslike_c)

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