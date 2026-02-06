<script setup>
const emit = defineEmits(['add'])

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="card">
    <img :src="product.thumbnail" />
    <h3>{{ product.title }}</h3>
    <p class="price">{{ product.price }} $</p>
    <p>⭐ {{ product.rating }}</p>

    <RouterLink
      :to="{ name: 'product-details-view',params : {id:product.id} }">
      Voir détails
    </RouterLink>

    <button @click="emit('add', product)">
      Ajouter au panier
    </button>
  </div>
</template>
<style scoped>
.card {
  width: 260px;
  background: #ffffff;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.12);
}

.card img {
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 10px;
  background: #f3f4f6;
}

.card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 6px 0 0;
}

.price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2563eb;
}

.card p {
  font-size: 0.9rem;
  color: #4b5563;
  margin: 0;
}

.card a {
  margin-top: auto;
  font-size: 0.9rem;
  text-decoration: none;
  color: #2563eb;
  font-weight: 500;
}

.card a:hover {
  text-decoration: underline;
}

.card button {
  margin-top: 10px;
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
}

.card button:hover {
  background: linear-gradient(135deg, #1d4ed8, #1e3a8a);
  transform: scale(1.03);
}

.card button:active {
  transform: scale(0.97);
}

</style>