<script setup lang="ts">

    import { debounceFn } from '@/utils';
    import { ref, watch } from 'vue';

    interface AuthInput {
        title: string;
        onupdate: (title: string, value: string) => void;
        value?: string;
    }

    const { title, onupdate, value } = defineProps<AuthInput>();
    const inputValue = ref(value);
    
    watch(
        () => value,
        (newVal) => {
            inputValue.value = newVal;
        },
    );

    const debounceInputUpdate = debounceFn(onupdate);

</script>

<template>
    <div class="px-2 max-h-8 border border-[#555555] rounded-[2px] bg-secondary-bg relative">
        <div class="pt-3 flex items-center gap-2">
            <input @input="(e) => debounceInputUpdate(title, (e.target as HTMLInputElement).value)" v-model="inputValue" class="bg-transparent mb-1 w-full text-sm font-normal mt-auto border-none outline-none peer z-10 relative" :id="title" type="text" />
            <div class="absolute top-1/2 -translate-y-1/2 z-0 left-1 w-full text-[12px] transition-all duration-300 text-secondary-text peer-focus:top-2 peer-focus:text-[10px]" :class="{ '!text-[10px] top-2': inputValue?.trim().length }">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
