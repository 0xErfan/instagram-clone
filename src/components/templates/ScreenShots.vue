<script setup lang="ts">

import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const currentScreenShot = ref(1)

const screenShotCounts = 4
let interval: number | undefined = undefined;

onMounted(() => {
    interval && clearInterval(interval)
    interval = setInterval(() => {
        if (currentScreenShot.value + 1 > screenShotCounts) {
            currentScreenShot.value = 1
        } else currentScreenShot.value++
    }, 2000);
})

onBeforeUnmount(() => clearInterval(interval))

const currentScreenShotSrc = computed(() => `/images/dynamic-insta-ad-${currentScreenShot.value}.png`);

</script>

<template>
    <img class="bg-black" src="/images/static-instagram.png" alt="static static-instagram">
    <div class="flex items-center justify-center absolute w-[54.7%] right-[42.5px] bottom-[45px]">
        <img :key="currentScreenShot" :src="currentScreenShotSrc" alt="screen shot">
    </div>
</template>
