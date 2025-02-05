<script setup lang="ts">

import { isLogin } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const isLoading = ref(true);
const isLoggedIn = ref(false);

onMounted(async () => {

  isLoading.value = true;

  isLogin()
    .then(({ isLoggedIn: status, data }) => {
      isLoggedIn.value = status;
      if (!status) return router.push('auth/login')
      console.log(data)
    })
    .catch(error => {
      console.log(error)
      router.push('auth/login')
    })
    .finally(() => isLoading.value = false)

})

</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <slot></slot>
</template>
