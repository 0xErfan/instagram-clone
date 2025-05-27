import { computed, ref } from "vue"

// TODO: update types with user interface

export const useUserStore = () => {

    const userData = ref<null | {}>(null)

    const isLoggedIn = computed(() => userData.value !== null)

    const setter = (data: unknown) => {
        userData.value = { ...userData.value, ...data! }
    }

    const logout = () => { userData.value = null }

    return { userData, setter, logout, isLoggedIn }

}