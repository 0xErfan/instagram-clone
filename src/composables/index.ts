import { inject, provide } from "vue"
import { useUserStore } from "./userStore"

export const provideState = () => {

    provide('userState', useUserStore())

}

export const injectUserState = () => inject('userState')