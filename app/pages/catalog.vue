<script setup lang="ts">
import { ref } from 'vue';

import ProductCard from '~/components/ProductCard.vue';

import { useFetchProducts } from '#imports';

const {
  products,
  loading,
  error,
  currentPage,
  hasMorePages,
  fetchProducts,
  initProducts
} = useFetchProducts()


const isScrollY = ref(false)

const btnTextList = ref({
  base: 'Показать ещё',
  loading: 'Загрузка...',
  error: 'Повторить',
})

const btnText = computed(() => {
  if (error.value) return btnTextList.value.error
  return loading.value ? btnTextList.value.loading : btnTextList.value.base
})

function getProducts() {
  if (!loading.value) {
    loading.value = true
    setTimeout(() => {
      fetchProducts()
    }, 1000)
    // Сделал задержку вызова, чтобы было видно кнопку загрузки. Иначе всё слишком быстро)
  }
}

onBeforeMount(() => {
  initProducts()
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrollY.value = !!window.scrollY
  })
})


</script>

<template>
  <div class="page page__catalog">
    <span class="page__catalog__title">каталог</span>
    <div v-if="products.length" class="page__catalog__products">
      <ProductCard v-for="(product, index) in products" :key="index" :product="product" />
    </div>
    <div class="page__catalog__footer">
      <p v-if="error">Произошла ошибка, попробуйте позже</p>
      <button
        v-show="hasMorePages && products.length || error"
        :class="loading ? 'button-loading' : ''"
        @click="getProducts"
      >
        {{ btnText }}
      </button>
    </div>
    <a v-show="isScrollY" class="page__catalog__up" href="#">
      <img src="../assets/images/icons8-свернуть-48.png" alt="">
    </a>
  </div>
</template>

<style scoped>

</style>