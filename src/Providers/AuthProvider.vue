<script setup lang="ts">
    import Loading from '@/components/templates/Loading.vue';
    import { isLogin } from '@/utils';
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const isLoading = ref(true);
    const isLoggedIn = ref(false);

    const MIN_LOADING_TIME = 1000;

    onMounted(async () => {
        isLoading.value = true;
        const startTime = Date.now();

        await Promise.all([
            isLogin()
                .then(({ isLoggedIn: status, data }) => {
                    isLoggedIn.value = status;
                    console.log(status, data);
                    if (!status) return router.replace('/auth/login');
                })
                .catch((error) => {
                    console.log(error);
                    router.replace('/auth/login');
                }),
            new Promise((res) => {
                const remainingTime = Math.max(0, MIN_LOADING_TIME - (Date.now() - startTime));
                setTimeout(res, remainingTime);
            }),
        ]);

        isLoading.value = false;
    });
</script>

<template>
    <Loading v-if="isLoading" />
    <slot v-else></slot>
</template>
