<script setup lang="ts">

import { computed, onMounted, onUnmounted, ref } from 'vue';

const currentScreenShot = ref(1)

const screenShotCounts = 4
let interval: number | undefined = undefined;

onMounted(() => {
    interval && clearInterval(interval)
    interval = setInterval(() => {
        if (currentScreenShot.value + 1 > screenShotCounts) {
            currentScreenShot.value = 1
        } else currentScreenShot.value++
    }, 3000);
})

onUnmounted(() => clearInterval(interval))

const currentScreenShotSrc = computed(() => `/images/dynamic-insta-ad-${currentScreenShot.value}.png`);

</script>

<template>
    <div class="relative m-auto">
        <img class="bg-black" src="/images/static-instagram.png" alt="static instagram">
        <div
            class="flex items-center justify-center absolute w-[54.7%] right-[45.2px] top-[21px] lg:right-[58.5px] lg:top-[26px]">
            <img data-aos="zoom-in" :key="currentScreenShot" :src="currentScreenShotSrc" alt="screen shot"
                class="max-w-full h-auto">
        </div>
    </div>
</template>
