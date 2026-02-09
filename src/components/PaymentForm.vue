<script setup>
import router from '@/router'
import { ref } from 'vue'

const props = defineProps({
  cart: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['clear-cart'])

const name = ref('')
const card = ref('')
const exp = ref('')
const cvv = ref('')
const success = ref(false)

const errors = ref({
  name: '',
  card: '',
  exp: '',
  cvv: '',
  cart: ''
})

function pay() {
  errors.value = { name: '', card: '', exp: '', cvv: '', cart: '' }

  let hasError = false

  if (!name.value) { errors.value.name = 'Nom du titulaire requis'; hasError = true }
  if (!card.value) { errors.value.card = 'Numéro de carte requis'; hasError = true }
  if (!exp.value) { errors.value.exp = 'Date d’expiration requise'; hasError = true }
  if (!cvv.value) { errors.value.cvv = 'CVC requis'; hasError = true }
  if (props.cart.length === 0) { errors.value.cart = 'Le panier est vide'; hasError = true }

  if (hasError) return

  success.value = true

  setTimeout(() => {
    emit('clear-cart')
  }, 2000) 

  setTimeout(() => {
    success.value = false
    name.value = ''
    card.value = ''
    exp.value = ''
    cvv.value = ''
  }, 20000)
  router.push({ name: 'products-view'})
}
</script>

<template>
  <div class="payment-form">
    <h3>Checkout</h3>
    
    <p v-if="errors.cart" class="error">{{ errors.cart }}</p>

    <div v-if="success" class="success">
      ✅ Paiement effectué avec succès
    </div>

    <div v-else class="form">
      <div class="form-group">
        <input v-model="name" placeholder="Cardholder name" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <input v-model="card" placeholder="Card number" type="number" />
        <span v-if="errors.card" class="error">{{ errors.card }}</span>
      </div>

      <div class="row">
        <div class="form-group">
          <input v-model="exp" placeholder="MM/YY" type="month" />
          <span v-if="errors.exp" class="error">{{ errors.exp }}</span>
        </div>
        <div class="form-group">
          <input v-model="cvv" placeholder="CVC" type="password" />
          <span v-if="errors.cvv" class="error">{{ errors.cvv }}</span>
        </div>
      </div>

      <button @click="pay">Pay now</button>
    </div>
  </div>
</template>

<style scoped>
.payment-form {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  font-family: 'Inter', sans-serif;
}

.payment-form h3 {
  margin-bottom: 16px;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.form input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.row {
  display: flex;
  gap: 10px;
}

button {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg,#6366f1,#8b5cf6);
  color: white;
  font-weight: 600;
  cursor: pointer;
  margin-top: 12px;
  transition: transform 0.15s ease, background 0.2s ease;
}

button:hover {
  transform: scale(1.03);
}

.success {
  text-align: center;
  color: #16a34a;
  font-weight: 600;
  margin-bottom: 16px;
  transition: opacity 0.3s ease;
}

.error {
  color: #dc2626;
  font-size: 0.85rem;
  margin-top: 4px;
}
</style>
