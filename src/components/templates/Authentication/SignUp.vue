<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import ScreenShots from '../ScreenShots.vue';
    import { computed, ref } from 'vue';
    import axios from 'axios';
    import FooterLinks from '../FooterLinks.vue';

    interface LoginForm {
        payload: string;
        password: string;
    }

    const formData = ref<LoginForm>({ payload: '', password: '' });
    const isLoading = ref(false);
    const isPasswordHidden = ref(true);

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

    const updateFormData = <T extends keyof LoginForm>(key: T, value: LoginForm[T]) => {
        formData.value = { ...formData.value, [key]: value };
    };

    const login = async () => {
        const { isFormNotValid, notValidKey } = validation.value;

        if (isFormNotValid) {
            (document.querySelector(`#${notValidKey}`) as HTMLInputElement)?.focus();
            return;
        }

        isLoading.value = true;

        try {
            const { data, status } = await axios.post('http://localhost:3001/auth/login', formData.value);
            document.cookie = data?.token;
            console.log(data, status);
        } catch (error) {
            console.log(error);
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
                    <form @submit.prevent="login" class="mt-6 flex flex-col items-center w-full *:w-full gap-2">
                        <div class="px-2 max-h-8 border border-[#555555] rounded-[2px] bg-secondary-bg relative">
                            <div class="pt-3 flex items-center gap-2">
                                <input @input="(e) => updateFormData('payload', (e.target as HTMLInputElement).value)" :value="formData.payload" class="bg-transparent mb-1 w-full text-sm font-normal mt-auto border-none outline-none peer z-10 relative" id="mobile-or-email" type="text" />
                                <div
                                    class="absolute top-1/2 -translate-y-1/2 z-0 left-1 w-full text-[12px] transition-all duration-300 text-secondary-text peer-focus:top-2 peer-focus:text-[10px]"
                                    :class="{
                                        '!text-[10px] top-2': formData.payload.trim().length,
                                    }">
                                    Mobile number or email
                                </div>
                            </div>
                        </div>
                        <div class="px-2 max-h-8 border border-[#555555] rounded-[2px] bg-secondary-bg relative">
                            <div class="pt-3 flex items-center gap-2">
                                <input @input="(e) => updateFormData('payload', (e.target as HTMLInputElement).value)" :value="formData.payload" class="bg-transparent mb-1 w-full text-sm font-normal mt-auto border-none outline-none peer z-10 relative" id="password" type="text" />
                                <div
                                    class="absolute top-1/2 -translate-y-1/2 z-0 left-1 w-full text-[12px] transition-all duration-300 text-secondary-text peer-focus:top-2 peer-focus:text-[10px]"
                                    :class="{
                                        '!text-[10px] top-2': formData.payload.trim().length,
                                    }">
                                    Password
                                </div>
                            </div>
                        </div>
                        <div class="px-2 max-h-8 border border-[#555555] rounded-[2px] bg-secondary-bg relative">
                            <div class="pt-3 flex items-center gap-2">
                                <input @input="(e) => updateFormData('payload', (e.target as HTMLInputElement).value)" :value="formData.payload" class="bg-transparent mb-1 w-full text-sm font-normal mt-auto border-none outline-none peer z-10 relative" id="fullname" type="text" />
                                <div
                                    class="absolute top-1/2 -translate-y-1/2 z-0 left-1 w-full text-[12px] transition-all duration-300 text-secondary-text peer-focus:top-2 peer-focus:text-[10px]"
                                    :class="{
                                        '!text-[10px] top-2': formData.payload.trim().length,
                                    }">
                                    Full Name
                                </div>
                            </div>
                        </div>
                        <div class="px-2 max-h-8 border border-[#555555] rounded-[2px] bg-secondary-bg relative">
                            <div class="pt-3 flex items-center gap-2">
                                <input @input="(e) => updateFormData('password', (e.target as HTMLInputElement).value)" :value="formData.password" id="username" class="bg-transparent mb-1 w-4/5 text-sm font-normal mt-auto border-none outline-none peer z-10 relative" :type="isPasswordHidden ? 'password' : 'text'" />
                                <div @click="isPasswordHidden = !isPasswordHidden" class="absolute cursor-pointer right-2 text-sm font-normal text-[#fafafa] hover:text-secondary-text transition-all z-20 top-1/2 -translate-y-1/2">
                                    {{ isPasswordHidden ? 'Show' : 'Hide' }}
                                </div>
                                <div
                                    class="absolute top-1/2 -translate-y-1/2 z-0 left-1 w-full text-[12px] transition-all duration-300 text-secondary-text peer-focus:!top-2 peer-focus:!text-[10px]"
                                    :class="{
                                        '!text-[10px] top-2': formData.password.trim().length,
                                    }">
                                    Username
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col gap-2 text-secondary-text text-center text-[12px] mt-1">
                            <h5>
                                People who use our service may have uploaded your contact information to Instagram.
                                <a href="https://www.facebook.com/help/instagram" class="text-[#e0f1ff]">Learn More</a>
                            </h5>
                            <p>By signing up, you agree to our <a href="https://www.facebook.com/help/instagram" class="text-[#e0f1ff]">Terms & Policy</a></p>
                        </div>

                        <button :disabled="isLoading" type="submit" class="outline-none my-2 rounded-lg text-center p-1 justify-center text-white h-8 bg-btn-primary text-sm" :class="{ 'opacity-70': validation.isFormNotValid }">Sign up</button>
                    </form>
                </div>
                <div class="flex items-center gap-1 justify-center w-full sm:border border-[#333333] px-10 py-4 text-[#e0f1ff] text-sm">
                    Have an account?
                    <RouterLink to="/auth/login" class="text-btn-primary font-bold">Log in</RouterLink>
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
