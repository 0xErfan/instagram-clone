<script setup lang="ts">
import { ref } from 'vue';

import type { Question } from '../tepmplates/QuestionToggles.vue';

const toggle = ref(false)
const { data } = defineProps<{ data: Question }>()
const { info, title } = data

</script>

<template>
  <article @click="toggle = !toggle" class="question">
    <h4>{{ title }}</h4><button class="btn"><svg stroke="currentColor" fill="currentColor" stroke-width="0"
        viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path>
        <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8Z"></path>
      </svg></button>
    <p :class="{ hidden: toggle }">{{ info }}</p>
  </article>
</template>
