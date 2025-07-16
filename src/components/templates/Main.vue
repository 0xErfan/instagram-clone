<script setup lang="ts">
    import NavbarLink from '@/components/modules/Ui/NavbarLink.vue'
    import { RouterLink } from 'vue-router'
    import { BxSolidHome, AkThreadsFill, QuHamburger, IcProfileCircle, ClAddPlusSquare, FaRegHeart, FlFilledSearch, CaExplore, FlFilmstripPlay, FeSend } from '@kalimahapps/vue-icons'
</script>

<template>
    <section class="fixed left-0 inset-x-0 w-[245px] min-h-full border-r border-r-primary-border z-50 bg-black p-3">
        <RouterLink to="/">
            <img class="text-white mt-7 mb-4 mx-3 flex-shrink-0" width="103" height="29" src="/images/IG logo.svg" alt="Instagram logo" />
        </RouterLink>
        <div class="flex flex-col gap-2 mt-8">
            <NavbarLink :icon="BxSolidHome" text="Home" link="/" />
            <NavbarLink :icon="FlFilledSearch" text="Search" />
            <NavbarLink :icon="CaExplore" text="Explore" link="/explore/" />
            <NavbarLink :icon="FlFilmstripPlay" text="Reels" link="/reels/" />
            <NavbarLink :icon="FeSend" text="Messages" icon-size="size-6" link="/messages/" />
            <NavbarLink :icon="FaRegHeart" text="Notifications" icon-size="size-6" />
            <NavbarLink :icon="ClAddPlusSquare" text="Create" />
            <NavbarLink :icon="IcProfileCircle" text="Profile" link="/profile/" />
        </div>
        <div class="flex flex-col gap-2 mt-4 fixed left-0 bottom-0 w-[245px] p-3">
            <NavbarLink :icon="AkThreadsFill" icon-size="size-6" text="Threads" />
            <NavbarLink :icon="QuHamburger" text="More" />
        </div>
    </section>
</template>