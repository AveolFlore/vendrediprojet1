<script setup>
import CartItem from '@/components/CartItem.vue'
import PaymentForm from '@/components/PaymentForm.vue'

const props = defineProps({
  cart: Array,
  removeFromCart: Function,
  clearCart: Function,
  addToCart: Function
})

const total = computed(() => props.cart.reduce((sum, item) => sum + item.price * item.quantity, 0))
</script>

<template>
  <h2>Mon panier</h2>
  <div v-if="cart.length === 0">Panier vide</div>
  <div v-else>
    <CartItem 
      v-for="item in cart" 
      :key="item.id" 
      :item="item"
      :remove-from-cart="removeFromCart"
    />
    <p>Total : {{ total }} $</p>
    <PaymentForm :cart="cart" :clear-cart="clearCart"/>
  </div>
</template>
