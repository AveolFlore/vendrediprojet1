<script setup>
import { ref } from 'vue'

const props = defineProps({
  cart: Array,
  clearCart: Function
})

const name = ref('')
const card = ref('')
const exp = ref('')
const cvv = ref('')
const success = ref(false)

function pay() {
  if (!name.value || !card.value || !exp.value || !cvv.value) return alert('Remplir tous les champs')
  if (props.cart.length === 0) return alert('Panier vide')
  success.value = true
  props.clearCart()
}
</script>

<template>
  <div>
    <h3>Paiement</h3>
    <div v-if="success">✅ Paiement effectué avec succès</div>
    <div v-else>
      <input v-model="name" placeholder="Nom du client"/>
      <input v-model="card" placeholder="Numéro de carte"/>
      <input v-model="exp" placeholder="Date d’expiration"/>
      <input v-model="cvv" placeholder="CVV"/>
      <button @click="pay">Payer</button>
    </div>
  </div>
</template>
