<script setup lang="ts">
import { RouterView } from 'vue-router';
import AuthProvider from './Providers/AuthProvider.vue';
</script>

<template>
  <main class="size-full bg-black font-segoe-ui">
    <AuthProvider>
      <RouterView />
    </AuthProvider>
  </main>
</template>
