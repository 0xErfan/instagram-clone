<script setup lang="ts"></script>

<template>

    <section class="container flex items-center justify-center sm:gap-4 w-full text-white m-auto">

        <div class="w-[350px] hidden sm:flex bg-gray-500">1</div>

        <div
            class="w-full sm:w-[350px] flex items-center flex-col justify-center rounded-[1px] sm:border border-[#333333] px-10">

            <img class="text-white mt-9 mb-3" src="/images/IG logo.svg" alt="ig log">

            <div class="mt-6 flex flex-col items-center w-full *:w-full gap-2">
                <div class="px-2 border border-[#555555] rounded-[2px] bg-secondary-bg relative">
                    <div class="pt-3">
                        <input
                            class="bg-transparent w-full text-sm font-normal mt-auto border-none outline-none peer z-10 relative"
                            type="text">
                        <div
                            class="absolute top-1/2 -translate-y-1/2 z-0 left-1 w-full text-[12px] transition-all duration-300 text-secondary-text peer-focus:top-2 peer-focus:text-[10px]">
                            Phone number, username
                            or
                            email.
                        </div>
                    </div>
                </div>
                <div class="px-2 border border-[#555555] rounded-[2px] bg-secondary-bg relative">
                    <div class="pt-3 flex items-center gap-2">
                        <input
                            class="bg-transparent w-4/5 text-sm font-normal mt-auto border-none outline-none peer z-10 relative"
                            type="text">
                        <div
                            class="absolute cursor-pointer right-2 text-sm font-normal text-[#fafafa] hover:text-secondary-text transition-all z-20 top-1/2 -translate-y-1/2">
                            Show</div>
                        <div
                            class="absolute top-1/2 -translate-y-1/2 z-0 left-1 w-full text-[12px] transition-all duration-300 text-secondary-text peer-focus:top-2 peer-focus:text-[10px]">
                            Password
                        </div>
                    </div>
                </div>
                <button type="submit"
                    class="outline-none mt-2 rounded-lg text-center p-1 justify-center text-white bg-btn-primary text-sm">Log
                    in</button>
            </div>

        </div>

    </section>

</template>
