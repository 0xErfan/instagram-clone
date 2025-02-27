<script setup lang="ts">

    import { debounceFn } from '@/utils';
    import { ref } from 'vue';

    interface AuthInput {
        title: string;
        onupdate: (title: string, value: string) => void;
        value?: string;
        isPassword?: boolean;
    }

    const isPasswordHidden = ref(true);

    const { title, onupdate, value, isPassword } = defineProps<AuthInput>();
    const inputValue = ref(value);

    const debounceInputUpdate = debounceFn(onupdate);

</script>

<template>
    
    <div class="px-2 max-h-8 border border-[#555555] rounded-[2px] bg-secondary-bg relative">

        <div
            class="flex items-center tw-h-8 gap-2"
            :class="[inputValue?.trim().length ? 'pt-3' : '']"
        >

            <input
                @input="(e) => debounceInputUpdate(title, (e.target as HTMLInputElement).value)"
                v-model="inputValue"
                :class="['bg-transparent mb-1 w-full text-sm font-normal mt-auto border-none outline-none peer z-10 relative', inputValue?.trim().length ? 'h-4' : 'h-8']"
                :id="title"
                :type="isPassword && isPasswordHidden ? 'password' : 'text'"
            />

            <div
                v-if="isPassword"
                @click="isPasswordHidden = !isPasswordHidden"
                class="absolute cursor-pointer right-2 text-sm font-normal text-[#fafafa] hover:text-secondary-text transition-all z-20 top-1/2 -translate-y-1/2"
            >
                {{ isPasswordHidden ? 'Show' : 'Hide' }}
            </div>

            <div 
                class="absolute top-1/2 -translate-y-1/2 z-0 left-1 w-full text-[12px] transition-all duration-300 text-secondary-text peer-focus:top-2 peer-focus:text-[10px]"
                :class="{ '!text-[10px] top-2': inputValue?.trim().length }"
            >
                <slot></slot>
            </div>

        </div>

    </div>

</template>
