<script setup lang="ts">

defineProps({
    product: Object,
})

</script>

<template>
    <div class="card">
        <img class="card__favorite" src="../assets/images/favorite.svg" alt="">
        <img class="card__product" :src="product?.image" alt="">
        <span class="card__price">{{ product?.price }} ₽</span>
        <span class="card__subprice">{{ Math.ceil(product?.price / 2) }} ₽ × 2</span>
        <p class="card__name">{{ product?.name }}</p>
    </div>
</template>

<style scoped>

</style>