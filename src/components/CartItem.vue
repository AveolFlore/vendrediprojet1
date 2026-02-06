<script setup>
const props = defineProps({
  item: Object,
  removeFromCart: Function
})
</script>

<template>
  <div class="cart-item">
    <img :src="item.thumbnail" />
    <div>
      <h4>{{ item.title }}</h4>
      <p>{{ item.price }} $ x {{ item.quantity }}</p>
      <p>Sous-total : {{ item.price * item.quantity }} $</p>
      <button @click="props.removeFromCart(item.id)">Supprimer</button>
    </div>
  </div>
</template>
