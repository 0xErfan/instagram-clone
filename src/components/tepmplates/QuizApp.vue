<script setup lang="ts">

import { quizQuestions } from '@/jsonData';
import { ref } from 'vue';

const rightAnswers = ref(0)
const currentQuestionIndex = ref(0)
const timer = ref<number | undefined>(undefined)

const checkAnswer = (question: string, answer: string) => {

  if (timer.value) return
  clearTimeout(timer.value)

  const quizItem = quizQuestions.find(item => item.question === question)

  if (!quizItem) return alert('quiz not found')

  if (quizItem.correctAnswer === answer) rightAnswers.value++

  timer.value = setTimeout(() => {
    if (currentQuestionIndex.value + 1 == quizQuestions.length) {
      alert(`your shitty score is: ${rightAnswers.value}`)
      currentQuestionIndex.value = 0
    } else currentQuestionIndex.value++
    timer.value = undefined
  }, 2000);

}

</script>

<template>
  <section class="flex items-center justify-center py-28 w-full bg-gray-400">
    <div
      class="flex p-4 justify-center ch:basis-1/2 max-w-[500px] w-full text-white/80 bg-black/40 rounded-xl shadow-white shadow-regular">
      <div class="text-2xl">{{ quizQuestions[currentQuestionIndex].question }}</div>
      <ul
        class="flex flex-col w-full gap-3 ch:w-full ch:text-xl ch:cursor-pointer ch:border-2  ch:duration-100 ch:transition-all  ch:rounded-xl ch:p-2">
        <li @click="checkAnswer(quizQuestions[currentQuestionIndex].question, answer)"
          v-for="(answer, index) of quizQuestions[currentQuestionIndex].answers" :key="index"
          :class="['border-sky-600 border', timer && (quizQuestions[currentQuestionIndex].correctAnswer === answer ? '!border-green-400' : '!border-red-400')]">
          {{ answer }}
        </li>
      </ul>
    </div>
  </section>
</template>
