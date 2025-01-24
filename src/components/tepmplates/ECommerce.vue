<script setup lang="ts">

import { products as ProductList } from '@/jsonData';
import { computed, ref } from 'vue';
import ProductCard from '../modules/ProductCard.vue';
import BasketItem from '../modules/BasketItem.vue';

export type Product = typeof ProductList[number]

const basket = ref<(Product & { count: number })[]>([])

const finalPrice = computed(() => basket.value.reduce((prev, current) => prev + (current.price * (current.count ?? 1)), 0))

const addToCard = (productData: Product) => {

    const isInBasket = basket.value.some(prd => {
        if (prd.name === productData.name) {
            prd.count++
            return true;
        }
    })

    if (!isInBasket) basket.value.push({ ...productData, count: 1 })

}

const updateBasketItemCount = (productName: string, count: number) => {

    const basketItem = basket.value.some(prd => {
        if (prd.name === productName) {
            prd.count = count > 0 ? count : 1;
            return true;
        }
    })

    if (!basketItem) throw new Error('No product fount with this name buddy')

}

const removeCard = (name: string) => {
    basket.value = basket.value.filter(item => item.name !== name)
}

</script>

<template>
    <section class="bg-gray-800 h-auto py-20">
        <div class="container bg-inherit">
            <h3 class=" text-white/75 text-2xl text-center pb-8">Our Products</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 px-8">
                <ProductCard v-for="product of ProductList" :key="product.name" :data="{ ...product, addToCard }" />
            </div>
            <div class="max-w-[720px] w-full m-auto">
                <div class="flex items-center text-xl text-white/80 pt-20 justify-between gap-8">
                    <p class="w-full border-b pb-1 border-black">Product</p>
                    <p class="w-full border-b pb-1 border-black">Price</p>
                    <p class="w-full border-b pb-1 border-black">Quantity</p>
                </div>
                <div v-if="basket.length">
                    <BasketItem v-for="item in basket" :key="item.name"
                        :data="{ ...item, removeCard, updateBasketItemCount }" />
                </div>
                <div v-else
                    class="flex items-center justify-center  bg-gray-500 duration-200 transition-all max-h-auto w-full opacity-100 text-white h-20 mt-12 text-xl text-center rounded-md">
                    Your basket is empty!
                </div>
                <div
                    class="max-w-[45%] m-auto mt-12 transition-all duration-200 w-full text-xl bg-black text-white/75 text-center p-2 rounded-md">
                    Final cost: ${{ finalPrice ?? 0 }}</div>
            </div>
        </div>
    </section>
</template>
