<script setup lang="ts">
import { ref } from 'vue';

import type { Question } from '../tepmplates/QuestionToggles.vue';

const collapsed = ref(false)
const { data } = defineProps<{ data: Question }>()
const { info, title } = data

</script>

<template>
  <article @click="collapsed = !collapsed" class="question">
    <h4>{{ title }}</h4>
    <p :class="{ hidden: !collapsed }">{{ info }}</p>
  </article>
</template>
