<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUpdated, ref } from 'vue';

const counter = ref(0)

onMounted(() => {
  console.log('Component mounted i think')
})

onUpdated(() => {
  console.log('component updated.')
})

onBeforeUnmount(() => {
  alert('ops')
  console.log('unbeforeunmount lifecycle runs here i think hahahaa.')
  localStorage.setItem('beforeunmount', 'done')
})

</script>

<template>
  <section class="flex items-center justify-center py-28 w-full bg-gray-400">
    <div @click="counter++">Vue LifeCycle Methods</div>
  </section>
</template>
