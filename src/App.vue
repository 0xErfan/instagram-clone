<script setup lang="ts">
import { RouterView } from 'vue-router';
import AuthProvider from './Providers/AuthProvider.vue';
</script>

<template>
  <main class="text-red-800 bg-blue-400 font-bold">
    <AuthProvider>
      <RouterView />
    </AuthProvider>
  </main>
</template>
