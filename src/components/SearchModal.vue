<script setup lang="ts" >
import { useWeatherStore } from '@/stores/weather';
import { nextTick, onMounted, ref, watch, watchEffect } from 'vue';
import { useSearchStore } from '@/stores/search';
import searchIcon from '@/components/icons/searchIcon.vue'
const weather = useWeatherStore()
const store = useSearchStore()
const searchedLocation = ref<string>()


const locationInput = ref()
const search = async () => {
    if (!searchedLocation.value) {
        return
    }
    await weather.searchLocation(searchedLocation.value)
    store.toggleModal()

}

onMounted(() => {
    locationInput.value.focus()
})
</script>

<template>
    <transition>
        <div v-if="store.isOpen" class="wrapper" @click.self="store.toggleModal">
            <form class="form" @submit.prevent="search" method="dialog">
                <input ref="locationInput" class="input" type="search" v-model="searchedLocation"
                    placeholder="type location..." />
                <button class="button --search" type="submit">
                    <searchIcon />
                </button>
            </form>
        </div>
    </transition>
</template>

<style scoped lang="sass">
   
.v-enter-active,
.v-leave-active 
  transition: opacity 0.5s ease


.v-enter-from,
.v-leave-to 
  opacity: 0

.wrapper 
    position: absolute
    top: 0
    left: 0
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
    background: rgba(#000, 0.7)

.form
    display: flex
    justify-content: center
    align-items: center
    gap: 0.5rem
    background: #fff
    padding: 1rem 1.5rem
    border-radius: 5px
</style>