<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['remove-from-cart', 'increase', 'decrease'])
</script>


<template>
  <div class="cart-item">
    <img :src="item.thumbnail" alt="" class="product-img" />

    <div class="item-info">
      <h4 class="title">{{ item.title }}</h4>

      <div class="price-row">
        <span>{{ item.price }} $</span>
        <span class="qty">x {{ item.quantity }}</span>
      </div>

      <p class="subtotal">
        Sous-total : <strong>{{ item.price * item.quantity }} $</strong>
      </p>

      <button class="remove-btn" @click="emit('remove', item)">
        Supprimer
      </button>
    </div>
    <div class="quantity-controls">
  <button @click="emit('decrease', item.id)">−</button>
  <span>{{ item.quantity }}</span>
  <button @click="emit('increase', item.id)">+</button>
</div>

  </div>
</template>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
}

.product-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  background: #f3f4f6;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #111827;
}

.price-row {
  display: flex;
  gap: 10px;
  font-size: 0.95rem;
  color: #374151;
}

.qty {
  color: #6b7280;
}

.subtotal {
  font-size: 0.95rem;
  color: #1e40af;
}

.remove-btn {
  align-self: flex-start;
  margin-top: 8px;
  background: #fee2e2;
  color: #b91c1c;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
}

.remove-btn:hover {
  background: #fecaca;
  transform: scale(1.03);
}

.remove-btn:active {
  transform: scale(0.96);
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls button {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: #e5e7eb;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.quantity-controls span {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 600px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .product-img {
    width: 100%;
    height: 180px;
  }
}
</style>

