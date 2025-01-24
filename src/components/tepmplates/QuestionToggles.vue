<script setup lang="ts">

import { authQuestions } from '@/jsonData';
import QuestionToggle from '../modules/QuestionToggle.vue';

export type Question = typeof authQuestions[number]

</script>

<template>
  <div class="container">
    <h3 class="text-center font-bold flex items-center justify-center text-gray-400">questions and answers about login
      forms</h3>
    <QuestionToggle v-for="question in authQuestions" :key="question.id" :data="question" />
  </div>
</template>
