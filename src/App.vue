<script setup>
import { ref } from 'vue';

const error = ref('')
let cart = ref([])

const showModal = ref(false)
const productToDelete = ref(null)

function ajouterPanier(Produit) {
  const item = cart.value.find((p) => p.id === Produit.id)
  if (item) {
    item.quantity++
  } else {
    cart.value.push({
      ...Produit,
      quantity: 1
    })
  }
  error.value = 'Ajout dans le panier effectué avec succès'
}

function increaseQty(id) {
  const item = cart.value.find(p => p.id === id)
  if (item) item.quantity++
}

function decreaseQty(id) {
  const item = cart.value.find(p => p.id === id)
  if (!item) return
  if (item.quantity > 1) {
    item.quantity--
  } else {
    confirmRemove(item)
  }
}

function confirmRemove(item) {
  console.log(item);
  
  productToDelete.value = item
  showModal.value = true
  
}

function removeProduitConfirmed() {
  if (productToDelete.value) {
    cart.value = cart.value.filter(p => p.id !== productToDelete.value.id)
    productToDelete.value = null
    showModal.value = false
  }
}

function cancelRemove() {
  productToDelete.value = null
  showModal.value = false
}
</script>



<template>
  <div>
    <nav class="navbar">
      <!-- <h1>Flory'Shop</h1> -->
      <RouterLink :to="{ name: 'Home-view' }" class="nav-link">Accueil</RouterLink>
      <RouterLink :to="{ name: 'products-view' }" class="nav-link">Nos Produits</RouterLink>
      <RouterLink :to="{ name: 'about-view' }" class="nav-link">A Propos</RouterLink>
      <RouterLink :to="{ name: 'cart-view' }" class="nav-link">🛒Paniers</RouterLink>
    </nav>
    <div class="container">
      <RouterView :cart="cart" @add-to-cart="ajouterPanier" @remove-from-cart="confirmRemove"
        @increase-qty="increaseQty" @decrease-qty="decreaseQty" />

    </div>
   <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Confirmation</h3>
        <p>Voulez-vous vraiment supprimer ce produit ?</p>
        <div class="modal-actions">
          <button @click="removeProduitConfirmed" class="confirm-btn">Oui</button>
          <button @click="cancelRemove" class="cancel-btn">Non</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
h1{
  font-size: 1.2rem;
  color: #38bdf8;
}
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  background: #111827;
  padding: 15px 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.nav-link {
  color: #e5e7eb;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  position: relative;
  padding: 6px 0;
  transition: color 0.3s ease;
}

/* hover */
.nav-link:hover {
  color: #38bdf8;
}

/* underline animé */
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0%;
  height: 2px;
  background-color: #38bdf8;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.router-link-active {
  color: #38bdf8;
  font-weight: 600;
}

.router-link-active::after {
  width: 100%;
}


.container {
  width: 800px;
  padding: 15px;
  margin: auto;
  /* text-align: center; */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* Modal box */
.modal {
  background: white;
  padding: 24px 32px;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.modal h3 {
  margin-bottom: 16px;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
}

.confirm-btn {
  background-color: #dc2626;
  color: white;
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.confirm-btn:hover {
  background-color: #b91c1c;
}

.cancel-btn {
  background-color: #e5e7eb;
  color: #111827;
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: #d1d5db;
}
</style>
