<script setup lang="ts">

import { ref } from 'vue';

const countDownValue = ref(0)
const formattedCountDown = ref('00:00:00')

let interval: number | undefined;

const formatCountDownValue = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  formattedCountDown.value = `${hours}:${minutes}:${seconds}`;
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

const resetCountDown = () => {
  clearInterval(interval)
  interval = undefined;
  countDownValue.value = 0
  formatCountDownValue(countDownValue.value)
}

</script>

<template>
  <section class="bg-gray-200 py-36">
    <div class="max-w-[500px] m-auto w-full space-y-4 shadow-sm rounded-md shadow-black p-4">
      <div class="relative w-5/6 m-auto">
        <div class="circle">
          <p class="flex items-center size-full justify-center rounded-md text-4xl font-semibold p-2">
            <span class=" p-2 rounded-md bg-white tracking-wide">{{ formattedCountDown }}</span>
          </p>
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
</template>
