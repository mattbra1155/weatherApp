import { defineStore } from "pinia";
import { ref } from "vue";


export const useSearchStore = defineStore('search', () => {
    const isOpen = ref<boolean>(false)

    const toggleModal = () => {
        if (isOpen.value) {
            isOpen.value = false
        } else {
            isOpen.value = true
        }
    }
    return {
        isOpen,
        toggleModal
    }
})
