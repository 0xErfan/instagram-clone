<script setup lang="ts">

import { ref } from 'vue';

const loginData = ref<Record<string, unknown>>({})

const update_form = (e: Event, key: string) => {
    const target = e.target as HTMLInputElement
    loginData.value = { ...loginData.value, [key]: target.value }
}

const submit_login_form = () => {
    console.log(loginData)
    alert(JSON.stringify(loginData.value))
}

</script>

<template>
    <section class="sign-form flex items-center justify-center w-full h-[600px] *:text-white/80">
        <div class="max-w-[520px] w-full p-4 bg-transparent backdrop-blur-md border rounded-md border-white/50">
            <p class="text-2xl text-center pb-6">Sign-In</p>
            <form @submit.prevent="submit_login_form" class="flex flex-col gap-4">
                <input :value="loginData.name ?? ''" @change="e => update_form(e, 'name')"
                    class="bg-transparent border-b-2 outline-none pb-2 border-red-600" placeholder="Enter your name"
                    type="text">
                <input :value="loginData.password ?? ''" @change="e => update_form(e, 'password')"
                    class="bg-transparent border-b-2 outline-none pb-2 border-red-600" placeholder="Enter your password"
                    type="text">
                <input :value="loginData.email ?? ''" @change="e => update_form(e, 'email')"
                    class="bg-transparent border-b-2 outline-none pb-2 border-red-600" placeholder="Enter your email"
                    type="text">
                <div class="flex xs:flex-row justify-between flex-col text-center"><label
                        class="flex gap-2 xs:justify-start justify-center">Remember me<input type="checkbox"></label>
                    <p>Forgot password?</p>
                </div><input class="bg-white/80 text-black w-full py-2 rounded-md duration-300 hover:bg-white/50"
                    type="submit" value="Sign In">
            </form>
        </div>
    </section>
</template>
