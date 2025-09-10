<script setup lang="ts">
    import NavbarLink from '@/components/modules/Ui/NavbarLink.vue'
    import { RouterLink } from 'vue-router'
    import { BxSolidHome, AkInstagramFill, AkThreadsFill, QuHamburger, IcProfileCircle, ClAddPlusSquare, FaRegHeart, FlFilledSearch, CaExplore, FlFilmstripPlay, FeSend } from '@kalimahapps/vue-icons'
</script>

<template>

    <header class="sticky top-0 inset-x-0 bg-black z-50 h-[60px] pl-3 w-full flex md:hidden items-center justify-between gap-6">
        <RouterLink to="/" class="flex items-center justify-center w-min">
            <img class="text-white flex-shrink-0" width="103" height="29" src="/images/IG logo.svg" alt="Instagram logo" />
        </RouterLink>
        <div class="flex items-center gap-1">
            <div class="flex items-center gap-1 h-9 rounded-lg bg-[#363636] flex-shrink-0">
                <NavbarLink class="size-5 h-9 w-9 flex items-center justify-center" :icon="FlFilledSearch" icon-size="size-5" text="Search" />
                <input type="text" class="h-9 text-secondary-text outline-none border-none flex-shrink bg-transparent" placeholder="Search" />
            </div>
            <div class="flex items-center justify-center m-auto relative">
                <NavbarLink :icon="FaRegHeart" text="Notifications" icon-size="size-[20px]" />
                <span class="absolute top-[14px] right-[9px] rounded-full border border-black size-[10px] bg-[#ff3040]"></span>
            </div>
        </div>
    </header>

    <!--  start left bar menu  -->
    <section class="fixed left-0 inset-x-0 bottom-0 md:bottom-auto w-full md:w-min lg:w-[245px] md:min-h-full border-t border-t-primary-border border-r border-r-primary-border z-50 bg-black md:p-3">
        <RouterLink to="/" class="flex items-center justify-center lg:justify-start m-auto">
            <img class="text-white mt-5 hidden lg:block mx-3 flex-shrink-0" width="103" height="29" src="/images/IG logo.svg" alt="Instagram logo" />
            <AkInstagramFill class="hidden md:block lg:hidden size-6 shrink-0 text-white mt-4"/>
        </RouterLink>
        <div class="flex flex-row justify-evenly md:flex-col gap-2 md:mt-8">
            <NavbarLink :icon="BxSolidHome" text="Home" link="/" />
            <NavbarLink class="hidden md:flex" :icon="FlFilledSearch" text="Search" />
            <NavbarLink :icon="CaExplore" text="Explore" link="/explore/" />
            <NavbarLink :icon="FlFilmstripPlay" text="Reels" link="/reels/" />
            <NavbarLink :icon="FeSend" text="Messages" icon-size="size-6" link="/messages/" />
            <NavbarLink class="hidden md:flex" :icon="FaRegHeart" text="Notifications" icon-size="size-6" />
            <NavbarLink :icon="ClAddPlusSquare" text="Create" />
            <NavbarLink :icon="IcProfileCircle" text="Profile" link="/profile/" />
        </div>
        <div class="hidden md:flex flex-col gap-2 mt-4 fixed left-0 bottom-0 w-min lg:w-[245px] p-3">
            <NavbarLink :icon="AkThreadsFill" icon-size="size-6" text="Threads" />
            <NavbarLink :icon="QuHamburger" text="More" />
        </div>
    </section>
    <!--  end left bar menu  -->

    <!--  start page content  -->
    <section class="w-full bg-white/90 pl-[76px] lg:pl-[245px]">
        hi
    </section>
    <!--  end page content  -->


</template>
