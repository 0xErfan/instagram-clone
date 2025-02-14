<script setup lang="ts">
import Loading from '@/components/templates/Loading.vue';
import Authentication from '@/components/templates/Authentication/Authentication.vue'
import { isLogin } from '@/utils';
import MainPage from '@/components/templates/Main.vue'
import { onMounted, ref } from 'vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const isLoading = ref(true);
const isLoggedIn = ref(false);
const route = useRoute()

const authType = computed(() => {
    let authType = route.query.authType
    return authType === 'login' || authType === 'signup' ? authType : 'login'
})

const MIN_LOADING_TIME = 1000;

onMounted(async () => {

    isLoading.value = true;
    const startTime = Date.now();

    await Promise.all([
        isLogin()
            .then(({ isLoggedIn: status, data }) => {
                isLoggedIn.value = status;
                console.log(data);
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
        <MainPage v-if="isLoggedIn" />
        <Authentication v-else :auth-type="authType" />
    </template>
</template>
