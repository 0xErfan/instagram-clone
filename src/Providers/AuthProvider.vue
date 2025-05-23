<script setup lang="ts">
    import Loading from '@/components/templates/Loading.vue';
    import router from '@/router';
    import { isLogin } from '@/utils';
    import { onMounted, ref } from 'vue';
    import { injectUserState } from '@/composables';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const { setter, isLoggedIn, userData } = injectUserState();
    const isLoading = ref(true);
    const MIN_LOADING_TIME = 1000;

    onMounted(async () => {
        isLoading.value = true;
        const startTime = Date.now();

        await Promise.all([
            isLogin().then(({ isLoggedIn: loginStatus, data }) => {
                const redirectUrl = route.query?.redirectTo as string;
                if (loginStatus) {
                    router.replace('/');
                    // redirectUrl && (window.location.href = redirectUrl);
                } else {
                    // how to remove the redirectTo parameter from the route
                    router.replace({
                        path: '/auth/login',
                        query: { redirectUrl: window.location.href },
                    });
                }
                setter(data);
            }),
            new Promise((res) => {
                const remainingTime = Math.max(0, MIN_LOADING_TIME - (Date.now() - startTime));
                setTimeout(res, remainingTime);
            }),
        ]);

        isLoading.value = false;
        window.onkeyup = (e) => {
            if (e.key === 'w') {
                console.log(userData.value);
                setter(null);
            }
            if (e.key === 'p') {
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                location.reload();
            }
        };
    });
</script>

<template>
    <p class="text-red-500">{{ isLoggedIn ? 'in' : 'out' }}</p>
    <Loading v-if="isLoading" />
    <template v-else>
        <slot></slot>
    </template>
</template>
