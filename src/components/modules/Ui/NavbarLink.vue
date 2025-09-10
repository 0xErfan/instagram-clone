<script setup lang="ts">

    import { RouterLink } from 'vue-router'
    import { type Component } from 'vue'

    interface NavbarLinkProps {
        link?: string
        icon: Component
        text: string
        iconSize?: string
    }

    const { link, icon, text, iconSize = '' } = defineProps<NavbarLinkProps>()

</script>

<template>
    <component
        :is="link ? RouterLink : 'div'"
        v-bind="link ? { to: link, exactActiveClass: 'md:bg-[#FFFFFF19] font-semibold' } : {}"
        class="w-12 md:w-full md:px-3 h-12 flex items-center justify-center md:justify-start font-segoe-ui gap-3 rounded-lg transition-all cursor-pointer duration-300 md:hover:bg-[#FFFFFF19] text-[#F5F5F5] text-[16px]"
    >
        <component :is="icon" :class="[iconSize || 'size-7', 'flex-shrink-0']" />
        <p class="hidden lg:inline-block">{{ text }}</p>
    </component>
</template>
