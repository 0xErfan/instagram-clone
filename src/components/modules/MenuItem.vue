<script setup lang="ts">

import type { MenuItem } from '../tepmplates/RestaurantMenu.vue';

const { item } = defineProps<{ item: MenuItem }>()
const { desc, img, price, title } = item

</script>


<template>
  <div class="flex gap-3 max-h-32">
    <div class="flex-[1] border-4 border-orange-500 rounded-sm overflow-hidden"><img class="size-full object-cover"
        :src="img"></div>
    <div class="flex-[2]">
      <div class="flex justify-between border-b border-black/20 pb-2">
        <p class=" first-letter:capitalize font-bold">{{ title }}</p>
        <p class="text-orange-500">${{ price }}</p>
      </div>
      <p>{{ desc }}
      </p>
    </div>
  </div>
</template>
