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
        v-bind="link ? { to: link, exactActiveClass: 'bg-[#FFFFFF19] font-semibold' } : {}"
        class="w-full flex items-center font-segoe-ui gap-3 rounded-lg transition-all cursor-pointer duration-300 hover:bg-[#FFFFFF19] text-[#F5F5F5] text-[16px] px-3 h-12"
    >
        <component :is="icon" :class="[iconSize || 'size-7', 'flex-shrink-0']" />
        {{ text }}
    </component>
</template>