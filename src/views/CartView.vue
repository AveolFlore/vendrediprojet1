<script setup>
import { computed, ref } from 'vue'
import CartItem from '@/components/CartItem.vue'
import PaymentForm from '@/components/PaymentForm.vue'
const pays = ref(false)
const props = defineProps({
  cart: {
    type: Array,
    required: true
  }
})
console.log(props.cart);
const emit = defineEmits([
  'remove-from-cart',
  'increase-qty',
  'decrease-qty',
  'clear-cart'
])

const total = computed(() =>
  props.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

function handlePaymentSuccess() {
  emit('clear-cart')
  pays.value = false
  window.location.reload()
}

</script>

<template>
  <div class="cart-container">
    <h2>🛒 Mon panier</h2>

    <p v-if="cart.length === 0" class="empty">
      Votre panier est vide
    </p>

    <div v-else class="cart-content">
      <!-- Liste des produits -->
      <div class="items">
        <CartItem v-for="item in cart" 
        :key="item.id" 
        :item="item" 
        @remove="emit('remove-from-cart', item)"
        @increase="emit('increase-qty', $event)" 
        @decrease="emit('decrease-qty', $event)" />
      </div>

      <!-- Résumé -->
      <div class="summary">
        <h3>Résumé</h3>

        <div class="line">
          <span>Total</span>
          <strong>{{ total }} $</strong>
        </div>

        <button class="pay-btn" @click="pays = true">
          Procéder au paiement
        </button>
      </div>
    </div>

    <!-- <PaymentForm v-if="pays" :cart="cart" @clear-cart="emit('clear-cart')" /> -->

    <div v-if="pays" class="modal-overlay" @click.self="pays = false">
  <div class="modal">
    <PaymentForm
      :cart="cart"
      @clear-cart="handlePaymentSuccess"
    />
  </div>
</div>
  </div>
</template>

<style scoped>
.cart-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
}

.cart-container h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 24px;
}

.empty {
  text-align: center;
  font-size: 1.1rem;
  color: #6b7280;
  margin-top: 60px;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.items {
  display: flex;
  flex-direction: column;
}

.summary {
  background: #ffffff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  height: fit-content;
}

.summary h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #111827;
}

.line {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: #1f2937;
}

.pay-btn {
  width: 100%;
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
}

.pay-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(37, 99, 235, 0.4);
}

.pay-btn:active {
  transform: scale(0.97);
}


.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: white;
  width: 100%;
  max-width: 420px;
  border-radius: 16px;
  padding: 24px;
  animation: fadeIn 0.25s ease;
}

@keyframes fadeIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 900px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}
</style>
