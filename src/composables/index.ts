import { inject, provide } from "vue"
import { useUserStore } from "./userStore"
import type { GetReturnType } from "@/@types/global";

let isProvided = false;

export const provideState = () => {

    if (isProvided) return console.warn('States already provided');

    provide('userState', useUserStore('from provider'))

    isProvided = true;

}

export const injectUserState = () => inject('userState') as GetReturnType<typeof useUserStore>;