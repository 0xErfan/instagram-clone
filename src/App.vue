<script setup lang="ts">
    import { RouterView } from 'vue-router';
    import AuthProvider from './Providers/AuthProvider.vue';
    import { provideState } from './composables';
    provideState(); // provide all the global states on load
</script>

<template>
    <main class="size-full bg-black font-segoe-ui">
        <AuthProvider>
            <RouterView />
        </AuthProvider>
    </main>
</template>
