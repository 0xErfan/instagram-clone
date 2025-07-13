<script setup lang="ts">

    import { RouterLink, useRoute } from 'vue-router';
    import { computed, ref } from 'vue';
    import FooterLinks from '../FooterLinks.vue';
    import useAxios from '@/utils/useAxios';
    import router from '@/router';
    import AuthInput from '@/components/modules/Ui/AuthInput.vue';
    import { toast } from '@/utils';
    import { injectUserState } from '@/composables';
    import { type User } from '@/@types/user'
    import { handleError } from '@/utils/handleError';
    
    interface SignUpForm {
        payload: string;
        password: string;
        fullname: string;
        username: string;
    }

    const { setter } = injectUserState()

    const formData = ref<SignUpForm>({ payload: '', password: '', fullname: '', username: '' });
    const isLoading = ref(false);

    const route = useRoute();

    const validation = computed(() => {
        let notValidKey = '';

        const isFormNotValid = Object.entries(formData.value).some(([key, value]) => {
            if (!value.trim().length) {
                notValidKey = key;
                return true;
            }
        });

        return { isFormNotValid, notValidKey };
    });

    const updateFormData = (key: string, value: string) => {
        formData.value = { ...formData.value, [key]: value };
    };

    const signup = async () => {

        const { isFormNotValid, notValidKey } = validation.value;

        if (isFormNotValid) {
            (document.querySelector(`#${notValidKey}`) as HTMLInputElement)?.focus();
            return;
        }

        isLoading.value = true;

        try {
            const { data, message } = await useAxios().post('/auth/signup', formData.value);
            setter(data?.userData as User)
            toast('success', message!)
            router.replace((route.query?.redirectUrl as string) ?? '/');
        } catch (error) {
            handleError(error)
        } finally {
            isLoading.value = false;
        }

    };

</script>

<template>
    <section class="flex items-center justify-center flex-col size-full container p-4 mt-12">
        <div class="flex justify-center items-center sm:gap-4 size-full text-white m-auto">
            <div class="flex flex-col items-center justify-center h-full gap-2 w-full md:w-auto">
                <div class="w-full md:w-[350px] flex items-center flex-col justify-center rounded-[1px] sm:border border-[#333333] sm:px-10 sm:py-6">
                    <img class="text-white pt-5 mb-3" width="175" height="51" src="/images/IG logo.svg" alt="ig log" />
                    <h3 class="text-center text-[16px] font-bold text-secondary-text">Sign up to see photos and videos from your friends.</h3>
                    <form @submit.prevent="signup" class="mt-6 flex flex-col items-center w-full *:w-full gap-2">
                        <AuthInput v-model="formData.payload" :title="'payload'" :onupdate="updateFormData">Mobile number or email</AuthInput>
                        <AuthInput v-model="formData.password" :isPassword="true" :title="'password'" :onupdate="updateFormData">Password</AuthInput>
                        <AuthInput v-model="formData.fullname" :title="'fullname'" :onupdate="updateFormData">Full name</AuthInput>
                        <AuthInput v-model="formData.username" :title="'username'" :onupdate="updateFormData">Username</AuthInput>
                        <div class="flex flex-col gap-2 text-secondary-text text-center text-[12px] mt-1">
                            <h5>
                                People who use our service may have uploaded your contact information to Instagram.
                                <a href="https://www.facebook.com/help/instagram" class="text-[#e0f1ff]">Learn More</a>
                            </h5>
                            <p>
                                By signing up, you agree to our
                                <a href="https://www.facebook.com/help/instagram" class="text-[#e0f1ff]">Terms & Policy</a>
                            </p>
                        </div>
                        <button :disabled="isLoading" type="submit" class="outline-none my-2 rounded-lg text-center p-1 justify-center text-white h-8 bg-btn-primary text-sm" :class="{ 'opacity-70': validation.isFormNotValid }">Sign up</button>
                    </form>
                </div>
                <div class="flex items-center gap-1 justify-center w-full sm:border border-[#333333] px-10 py-4 text-[#e0f1ff] text-sm">
                    Have an account?
                    <RouterLink :to="{ path: '/auth/login', query: { redirectUrl: route.query?.redirectUrl } }" class="text-btn-primary font-bold">Log in</RouterLink>
                </div>
                <div class="flex flex-col gap-2 items-center justify-center mb-4">
                    <p class="my-2">Get the app.</p>
                    <div class="flex items-center gap-2 max-w-full *:h-10 *:cursor-pointer">
                        <img src="/images/download-from-gp.png" alt="download-from-gp" />
                        <img src="/images/download-from-ms.png" alt="download-from-ms" />
                    </div>
                </div>
            </div>
        </div>

        <FooterLinks />
    </section>
</template>
