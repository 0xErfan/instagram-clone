import { computed, ref } from "vue"

// TODO: update types with user interface

export const userUserStore = () => {

    const userData = ref<null | {}>({})

    const isLoggedIn = computed(() => userData.value !== null)

    const setter = (data: unknown) => {
        userData.value = { ...userData.value, ...data! }
    }

    const logout = () => { userData.value = null }

    return { userData, setter, logout, isLoggedIn }

}