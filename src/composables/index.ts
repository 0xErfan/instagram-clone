import { inject, provide } from "vue"
import { userUserStore } from "./userStore"

export const provideState = () => {

    const userState = userUserStore()

    provide('userState', userState)

    return { userState }

}

export const injectUserState = () => inject('userState')