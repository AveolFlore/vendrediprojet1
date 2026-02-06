<script setup>
import { ref } from 'vue';


let tab = ref([])
function ajouterPanier(Produit){
  console.log(Produit);
  const item = tab.value.find((p) => p.id ===Produit.id)
  if(item){
    item.quantity++
  }else{
    
    tab.value.push({
      ...Produit,
    quantity:1
    })
  }
}
function removeProduit(produit) {
  console.log('Supprimer moi oooh!!!',produit);
  
}
</script>


<template>
  <div>
    <nav class="navbar">
      <RouterLink :to="{name : 'Home-view'}" class="nav-link">Accueil</RouterLink>
      <RouterLink :to="{name : 'products-view'}" class="nav-link">Nos Produits</RouterLink>
      <RouterLink :to="{name : 'cart-view'}" class="nav-link">Paniers</RouterLink>
    </nav>
    <div class="container">
      <RouterView
      @add-to-cart="ajouterPanier"
      @clear-cart="removeProduit"
      :cart="tab"
      />
    </div>
  </div>
</template>

<style scoped>
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


.container{
  width: 800px;
  padding: 15px;
  margin: auto;
  /* text-align: center; */
}
</style>
