<script setup lang="ts">
    import { footerLinks } from '@/data.json';
</script>

<template>
    <div class="flex flex-col gap-1 py-2">
        <div class="flex items-center flex-wrap justify-center gap-4 text-secondary-text *:text-nowrap *:w-fit text-[12px] font-normal *:cursor-pointer hover:*:underline">
            <a v-for="link in footerLinks" :href="link.link">{{ link.key }}</a>
        </div>
        <h5 class="text-secondary-text m-auto text-center font-normal text-[12px] mt-2">© 2025 Instagram from Meta</h5>
    </div>
</template>
