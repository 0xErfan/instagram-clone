<script setup lang="ts">

type MenuFilers = 'all' | 'breakfast' | 'lunch' | 'shakes'

import { menu } from '@/jsonData';

export type MenuItem = typeof menu[number]

import { computed, ref } from 'vue';
import MenuItem from '../modules/MenuItem.vue';

const filterType = ref<MenuFilers>('all')

const filteredList = computed(() => menu.filter(item => (filterType.value === 'all' || item.category === filterType.value)))

</script>

<template>
  <section class="px-12 py-20 bg-red-100/25">
    <div class="container">
      <h2 class="restaurantTopic">Our Menu</h2>
      <ul
        class="flex items-center mt-12 text-xl justify-center gap-4 ch:cursor-pointer ch:duration-200 text-orange-500">
        <li @click="filterType = 'all'" :class="{ activeMenu: filterType === 'all' }" class="py-2 px-6 rounded-xl">All
        </li>
        <li @click="filterType = 'breakfast'" :class="{ activeMenu: filterType === 'breakfast' }"
          class="py-2 px-6 rounded-xl">Breakfast</li>
        <li @click="filterType = 'lunch'" :class="{ activeMenu: filterType === 'lunch' }" class="py-2 px-6 rounded-xl">
          Lunch</li>
        <li @click="filterType = 'shakes'" :class="{ activeMenu: filterType === 'shakes' }"
          class="py-2 px-6 rounded-xl">Shakes</li>
      </ul>
      <div class="grid grid-col-1 md:grid-cols-2 gap-6 mt-12">
        <MenuItem v-for="item in filteredList" :key="item.id" :item="item" />
      </div>
    </div>
  </section>
</template>
