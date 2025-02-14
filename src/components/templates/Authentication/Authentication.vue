<script setup lang="ts">
import Login from './Login.vue';
import SignUp from './SignUp.vue';
const { authType } = defineProps<{ authType: 'login' | 'signup' | undefined }>()
</script>

<template>
    <Login v-if="authType === 'login'" />
    <SignUp v-else />
</template>