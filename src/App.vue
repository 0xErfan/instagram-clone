<script setup lang="ts">

import { ref, computed } from "vue";

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answers: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
    correctAnswer: "William Shakespeare",
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: ["Indian Ocean", "Atlantic Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
  },
  {
    question: "What is the chemical symbol for water?",
    answers: ["O2", "H2O", "CO2", "NaCl"],
    correctAnswer: "H2O",
  },
];


const counter = ref(0)
const temperature = ref(0)
const countDownValue = ref(0)
const formattedCountDown = ref('00:00:00')
const loginData = ref<Record<string, unknown>>({})
const rightAnswers = ref(0)
const currentQuestionIndex = ref(0)
const timer = ref<number | undefined>(undefined)

let interval: number | undefined;

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

const update_form = (e: Event, key: string) => {
  const target = e.target as HTMLInputElement
  loginData.value = { ...loginData.value, [key]: target.value }
}

const submit_login_form = () => {
  console.log(loginData)
  alert(JSON.stringify(loginData.value))
}

const stopCountDown = () => {
  clearInterval(interval)
  interval = undefined;
}

const startCountDown = () => {
  if (interval) return;
  clearInterval(interval)
  formatCountDownValue(countDownValue.value)
  interval = setInterval(() => {
    formatCountDownValue(++countDownValue.value)
  }, 1000)
}

const formatCountDownValue = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  formattedCountDown.value = `${hours}:${minutes}:${seconds}`;
}

const resetCountDown = () => {
  clearInterval(interval)
  interval = undefined;
  countDownValue.value = 0
  formatCountDownValue(countDownValue.value)
}

const temperature_color = computed(() => {
  return temperature.value < 0 ? 'bg-blue-400' : (temperature.value > 0 && temperature.value < 5) ? 'bg-green-300' : 'bg-red-400'
})

</script>

<template>
  <main>
    <!-- ___________________________ -->
    <section class="w-full h-[500px] bg-sky-500/75 flex items-center justify-center">
      <div class="border border-black/30 bg-blue-400 text-center space-y-6 p-12 rounded-xl">
        <p class="text-2xl text-black">Counter</p>
        <p class="text-white text-2xl">{{ counter }}</p>
        <div class="flex items-center justify-between gap-4">
          <button @click="counter++"
            class="flex items-center justify-center p-4 cursor-pointer transition-all duration-300 hover:bg-gray-600 bg-gray-500 text-white text-xl rounded-xl">Inc</button>
          <button @click="counter--"
            class="flex items-center justify-center p-4 cursor-pointer transition-all duration-300 hover:bg-gray-600 bg-gray-500 text-white text-xl rounded-xl">Dec</button>
          <button @click="counter = 0"
            class="flex items-center justify-center p-4 cursor-pointer transition-all duration-300 hover:bg-gray-600 bg-gray-500 text-white text-xl rounded-xl">Reset</button>
        </div>
      </div>
    </section>
    <!-- ___________________________ -->
    <section class="flex items-center justify-center w-full h-[500px] bg-pink-200">
      <div
        class="flex flex-col w-52 h-[300px] p-4 space-y-4 rounded-md bg-blue-950 *:flex *:items-center *:justify-center text-center shadow-black shadow-xl">
        <div
          :class='["border border-white duration-200 transition-all w-full h-[176px] rounded-full", temperature_color]'>
          <p class="text-white shadow-xl p-1 bg-inherit text-xl">{{ temperature }} °C</p>
        </div>
        <div class="gap-8 *:flex *:items-center *:justify-center">
          <button @click="temperature++"
            class="size-14 border border-white rounded-full duration-300 transition-all hover:bg-gray-600 p-px bg-gray-500">+</button>
          <button @click="temperature--"
            class="size-14 border border-white rounded-full duration-300 transition-all hover:bg-gray-400 p-px bg-gray-300">-</button>
        </div>
      </div>
    </section>
    <!-- ___________________________ -->
    <section class="bg-gray-200 py-36">
      <div class="max-w-[500px] m-auto w-full space-y-4 shadow-sm rounded-md shadow-black p-4">
        <div class="relative w-5/6 m-auto">
          <div class="circle">
            <p class="flex items-center size-full justify-center rounded-md text-4xl font-semibold p-2"><span
                class=" p-2 rounded-md bg-white tracking-wide">{{ formattedCountDown }}</span></p>
          </div>
          <div class="flex items-center justify-evenly *:cursor-pointer *:duration-200 mt-20">
            <div @click="startCountDown"
              class="flex items-center justify-center hover:bg-purple-800  hover:text-white text-purple-800 rounded-full p-2 border border-purple-500">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16"
                class="*:size-6 rounded-md" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M4.25 3l1.166-.624 8 5.333v1.248l-8 5.334-1.166-.624V3zm1.5 1.401v7.864l5.898-3.932L5.75 4.401z">
                </path>
              </svg>
            </div>
            <div @click="stopCountDown"
              class="flex items-center justify-center rounded-full bg-purple-800 gap-3 text-white py-2 px-4 border border-purple-500">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                class="*:size-6 rounded-md" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <g id="Stop_1">
                  <path
                    d="M18.437,20.937H5.563a2.5,2.5,0,0,1-2.5-2.5V5.563a2.5,2.5,0,0,1,2.5-2.5H18.437a2.5,2.5,0,0,1,2.5,2.5V18.437A2.5,2.5,0,0,1,18.437,20.937ZM5.563,4.063a1.5,1.5,0,0,0-1.5,1.5V18.437a1.5,1.5,0,0,0,1.5,1.5H18.437a1.5,1.5,0,0,0,1.5-1.5V5.563a1.5,1.5,0,0,0-1.5-1.5Z">
                  </path>
                </g>
              </svg>
              <p>stop</p>
            </div>
            <div @click="resetCountDown"
              class="flex items-center justify-center hover:bg-purple-800  hover:text-white rounded-full text-purple-800 p-2 border border-purple-500">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="*:size-6"
                height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"
                  d="m400 148-21.12-24.57A191.43 191.43 0 0 0 240 64C134 64 48 150 48 256s86 192 192 192a192.09 192.09 0 0 0 181.07-128">
                </path>
                <path
                  d="M464 97.42V208a16 16 0 0 1-16 16H337.42c-14.26 0-21.4-17.23-11.32-27.31L436.69 86.1C446.77 76 464 83.16 464 97.42z">
                </path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ___________________________ -->
    <section class="sign-form flex items-center justify-center w-full h-[600px] *:text-white/80">
      <div class="max-w-[520px] w-full p-4 bg-transparent backdrop-blur-md border rounded-md border-white/50">
        <p class="text-2xl text-center pb-6">Sign-In</p>
        <form @submit.prevent="submit_login_form" class="flex flex-col gap-4">
          <input :value="loginData.name ?? ''" @change="e => update_form(e, 'name')"
            class="bg-transparent border-b-2 outline-none pb-2 border-red-600" placeholder="Enter your name"
            type="text">
          <input :value="loginData.password ?? ''" @change="e => update_form(e, 'password')"
            class="bg-transparent border-b-2 outline-none pb-2 border-red-600" placeholder="Enter your password"
            type="text">
          <input :value="loginData.email ?? ''" @change="e => update_form(e, 'email')"
            class="bg-transparent border-b-2 outline-none pb-2 border-red-600" placeholder="Enter your email"
            type="text">
          <div class="flex xs:flex-row justify-between flex-col text-center"><label
              class="flex gap-2 xs:justify-start justify-center">Remember me<input type="checkbox"></label>
            <p>Forgot password?</p>
          </div><input class="bg-white/80 text-black w-full py-2 rounded-md duration-300 hover:bg-white/50"
            type="submit" value="Sign In">
        </form>
      </div>
    </section>
    <!-- ___________________________ -->
    <section class="flex items-center justify-center py-28 w-full bg-gray-400">
      <div
        class="flex p-4 justify-center ch:basis-1/2 max-w-[500px] w-full text-white/80 bg-black/40 rounded-xl shadow-white shadow-regular">
        <div class="text-2xl">{{ quizQuestions[currentQuestionIndex].question }}</div>
        <ul
          class="flex flex-col w-full gap-3 ch:w-full ch:text-xl ch:cursor-pointer ch:border-2  ch:duration-100 ch:transition-all  ch:rounded-xl ch:p-2">
          <li @click="checkAnswer(quizQuestions[currentQuestionIndex].question, answer)"
            v-for="(answer, index) of quizQuestions[currentQuestionIndex].answers" :key="index"
            :class="['border-sky-600 border', timer && (quizQuestions[currentQuestionIndex].correctAnswer === answer ? 'border-green-400' : 'border-red-400')]">
            {{ answer }}
          </li>
        </ul>
      </div>
    </section>
    <!-- ___________________________ -->
  </main>
</template>
