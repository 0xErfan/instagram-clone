import { computed, ref } from "vue"
import type { User } from "@/@types/user"

type UserType = null | Partial<User> 

export const useUserStore = (from: string) => {

    if (from !== 'from provider') throw new Error('User store can only be used from provider, use injectUserState instead');

    const userData = ref<UserType>(null)

    const isLoggedIn = computed(() => userData.value !== null)

    const setter = (data: UserType) => {
        userData.value = { ...userData.value, ...data }
    }

    const logout = () => { userData.value = null }

    return { userData, setter, logout, isLoggedIn }

}