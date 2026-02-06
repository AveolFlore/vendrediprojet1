<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const productId = route.params.id

const product = ref(null)
const loading = ref(true)
const error = ref(null)

async function fetchProduct() {
  try {
    const res = await fetch(`https://dummyjson.com/products/${productId}`)
    if (!res.ok) throw new Error('Produit introuvable')
    product.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchProduct)
function handleAdd() {
  props.addToCart(props.product)
}
</script>

<template>
  <div class="details-container">
    <p v-if="loading" class="loading">Chargement du produit...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <div v-else class="details-card">

      <div class="images-section">
        <img :src="product.thumbnail" alt="" class="main-img" />
        <div class="other-images">
          <img v-for="img in product.images" :key="img" :src="img" />
        </div>
      </div>

    
      <div class="details-info">
        <h1>{{ product.title }}</h1>

        <div class="badges">
          <span class="badge category">{{ product.category }}</span>
          <span class="badge brand">{{ product.brand }}</span>
          <span class="badge stock" :class="{ 'out-stock': product.stock===0 }">
            {{ product.stock > 0 ? 'En stock' : 'Rupture' }}
          </span>
        </div>

        <p class="price">{{ product.price }} $</p>
        <p class="rating">⭐ {{ product.rating }}</p>
        <p class="description">{{ product.description }}</p>

       <button @click="handleAdd">Ajouter au panier</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Inter', sans-serif;
}

.loading, .error {
  text-align: center;
  font-size: 1.2rem;
  color: #2563eb;
}

.details-card {
  display: flex;
  gap: 40px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
  padding: 30px;
  transition: transform 0.3s ease;
}

.details-card:hover {
  transform: translateY(-4px);
}

.images-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.images-section .main-img {
  width: 100%;
  max-width: 450px;
  height: 450px;
  object-fit: cover;
  border-radius: 14px;
  background: #f3f4f6;
}

.images-section .other-images {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.images-section .other-images img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.images-section .other-images img:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.details-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.details-info h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
}

.badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 6px 0;
}

.badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
}

.badge.category { background: #2563eb; }
.badge.brand { background: #1e40af; }
.badge.stock { background: #16a34a; }
.badge.out-stock { background: #dc2626; }

.price {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1e40af;
}

.rating {
  font-size: 1rem;
  color: #fbbf24;
}

.description {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.6;
}

.btn-add-cart {
  width: fit-content;
  margin-top: 20px;
  padding: 12px 24px;
  border-radius: 10px;
  background: linear-gradient(135deg,#2563eb,#1e40af);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-add-cart:hover {
  transform: scale(1.05);
  background: linear-gradient(135deg,#1d4ed8,#1e3a8a);
}

@media(max-width: 1000px){
  .details-card {
    flex-direction: column;
    align-items: center;
  }
  .images-section .main-img {
    width: 100%;
    height: auto;
  }
  .details-info {
    width: 100%;
  }
}
</style>
