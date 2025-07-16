<script setup lang="ts">

    import Loading from '@/components/templates/Loading.vue';
    import router from '@/router';
    import { isLogin } from '@/utils';
    import { onMounted, ref } from 'vue';
    import { injectUserState } from '@/composables';
    import { useRoute } from 'vue-router';
    import useAxios from '@/utils/useAxios';
    
    const { setter, isLoggedIn, userData } = injectUserState();
    
    const isLoading = ref(true);
    const MIN_LOADING_TIME = 1000;
    const route = useRoute();

    onMounted(async () => {

        isLoading.value = true;

        const startTime = Date.now();

        await Promise.all([
            
            isLogin().then(({ isLoggedIn: loginStatus, data }) => {

                if (loginStatus) return setter(data);

                const fullRoute = route.fullPath;

                if (
                    fullRoute.startsWith('/auth/login')
                    ||
                    fullRoute.startsWith('/auth/signup')
                ) return

                router.replace({
                    path: '/auth/login',
                    query: { redirectUrl: route.fullPath },
                });

            }),
            new Promise(res => {
                const remainingTime = Math.max(0, MIN_LOADING_TIME - (Date.now() - startTime));
                setTimeout(res, remainingTime);
            })
        ]);

        isLoading.value = false;

        window.onkeyup = async (e) => {
            switch (e.key) {
                case 'w': {
                    setter(null);
                    break;
                }
                case 'p': {
                    await useAxios().post('auth/logout');
                    location.reload();
                    break;
                }
                case 'z': {
                    router.push('/data/name/2');
                    break;
                }
                case 'n': {
                    console.log(userData.value)
                }
            }
        };
    });

</script>

<template>
    <Loading v-if="isLoading" />
    <template v-else>
        <slot></slot>
    </template>
</template>
