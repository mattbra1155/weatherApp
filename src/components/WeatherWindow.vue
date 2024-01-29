<script lang="ts" setup>
import { toRefs, computed } from 'vue';


const props = defineProps<{
    locationData: any
}>()

const { locationData } = toRefs(props)
// TO DO blew format date and time
const localTime = computed(() => new Date(locationData.value.location?.localtime).toLocaleDateString())
const city = computed(() => locationData.value.location?.name)
const country = computed(() => locationData.value.location?.country)
const icon = computed(() => locationData.value.current?.condition?.icon)

</script>

<template>
    <div class="wrapper">
        <div class="column">
            <p class="text">{{ city }}, {{ country }}</p>
            <p class="text">{{ localTime }}</p>
        </div>
        <div class="column">
            <img :src="icon" alt="">
        </div>
    </div>
</template>

<style scoped lang="sass">
.wrapper 
    display: flex
    flex-direction: row
    gap: 1rem
    justify-content: space-between
    align-items: flex-start
    width: 100%
    height: 50vh
    background: url('/DayClear.webp')
    background-size: cover
    padding: 1rem
.text
    color: #000
</style>