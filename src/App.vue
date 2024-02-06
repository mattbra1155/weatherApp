<script setup lang="ts">
import { RouterView } from 'vue-router';
import SearchModal from './components/SearchModal.vue';



</script>

<template>
  <RouterView />
  <SearchModal />
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap')
* 
  margin: 0
  padding: 0
  box-sizing: border-box
  font-family: 'Lato', sans-serif
  font-weight: 400

.button
  // display: flex
  // place-items: center
  max-width: 150px
  padding: 5px 10px
  border-radius: 5px
  background: white
  border: none
  cursor: pointer
  &.--search
    svg
      width: 16px
      height: 16px
.input
  padding: 5px 10px
  height: 30px
</style>