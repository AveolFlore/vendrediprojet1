<script setup>
import ProductCard from '@/components/ProductCard.vue'
import { onMounted, ref } from 'vue'

const produits = ref([])
const loading = ref(true)

const emit = defineEmits(['add-to-cart'])

async function affichage() {
  try {
    const resultat = await fetch('https://dummyjson.com/products')
    const data = await resultat.json()
    produits.value = data.products
    loading.value = false
  } catch (error) {
    console.log(error)
  }
}

onMounted(affichage)

function addToCart(product) {
  emit('add-to-cart', product)
}
</script>


<template>
  <h2>Nos Produits</h2>

  <p v-if="loading">Chargement des produits...</p>

  <div v-else class="products-grid">
    <ProductCard
      v-for="prod in produits"
      :key="prod.id"
      :product="prod"
      @add="addToCart"
    />
  </div>
</template>
<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

</style>