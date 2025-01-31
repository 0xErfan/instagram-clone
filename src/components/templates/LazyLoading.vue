<script setup lang="ts">
import { markRaw, shallowRef, defineAsyncComponent, ref } from 'vue';

// @ts-expect-error shitty ts errors
const Component_1 = defineAsyncComponent(() => fakeAsyncImport(() => import('../modules/differentComponents/Component_1.vue')));
// @ts-expect-error shitty ts errors
const Component_2 = defineAsyncComponent(() => fakeAsyncImport(() => import('../modules/differentComponents/Component_2.vue')));

const fakeAsyncImport = (importFunction: () => Promise<unknown>, delay = 1500) => {
  isLoading.value = true
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(importFunction())
      isLoading.value = false;
    }, delay);
  });
};

const currentComponent = shallowRef<unknown>(markRaw(Component_1));

const isLoading = ref(false)

const toggleComponents = () => {

  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false;
    currentComponent.value = currentComponent.value === Component_1 ? markRaw(Component_2) : markRaw(Component_1);
  }, 500)

};

</script>

<template>
  <section class="sign-form flex items-center justify-center w-full h-[600px] *:text-white/80">
    <div class="max-w-[520px] w-full p-4 bg-transparent backdrop-blur-md border rounded-md border-white/50">
      <button class="underline" @click="toggleComponents">CLICK to toggle Components</button>
      <div class="flex items-center">
        <div v-if="isLoading">Loading begin...</div>
        <component v-else :key="currentComponent" :is="currentComponent"></component>
      </div>
    </div>
  </section>
</template>
