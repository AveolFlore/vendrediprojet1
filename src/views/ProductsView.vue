<script setup>
import ProductCard from '@/components/ProductCard.vue'
import { onMounted, ref, computed } from 'vue'

const produits = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('Toutes')

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

// Obtenir toutes les catégories
const categories = computed(() => {
  const cats = produits.value.map(p => p.category)
  return ['Toutes', ...new Set(cats)]
})

// Filtrage produit
const filteredProducts = computed(() => {
  return produits.value.filter(p => {
    const matchesCategory = selectedCategory.value === 'Toutes' || p.category === selectedCategory.value
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <h2>Nos Produits</h2>

  <div class="controls">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Rechercher par nom..."
    />

    <select v-model="selectedCategory">
      <option v-for="cat in categories" :key="cat" :value="cat">
        {{ cat }}
      </option>
    </select>
  </div>

  <p v-if="loading">Chargement des produits...</p>

  <div class="products-grid">
    <ProductCard
      v-for="prod in filteredProducts"
      :key="prod.id"
      :product="prod"
      @add="addToCart"
    />
    <p v-if="!loading && filteredProducts.length === 0">Aucun produit trouvé 😕</p>
  </div>
</template>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 2fr));
  gap: 95px;
  margin-top: 20px;
}

.controls {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.controls input,
.controls select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  flex: 1;
}
</style>
