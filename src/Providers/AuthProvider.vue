<script setup lang="ts">

import Loading from '@/components/templates/Loading.vue';
import router from '@/router';
import { isLogin } from '@/utils';
import { onMounted, ref } from 'vue';

const isLoading = ref(true);
const isLoggedIn = ref(false);

const MIN_LOADING_TIME = 1000;

onMounted(async () => {

    isLoading.value = true;
    const startTime = Date.now();

    await Promise.all([
        isLogin()
            .then(({ isLoggedIn: status, data }) => {
                !status && router.push('/auth/login')
                isLoggedIn.value = status;
            })
            .catch(error => console.log(error)),
        new Promise(res => {
            const remainingTime = Math.max(0, MIN_LOADING_TIME - (Date.now() - startTime));
            setTimeout(res, remainingTime);
        }),
    ]);

    isLoading.value = false;

});

</script>

<template>
    <Loading v-if="isLoading" />
    <template v-else>
        <slot></slot>
    </template>
</template>
