<script setup>
import { RouterLink } from "vue-router"


</script>


<template>
  <div class="home">

    <!-- HERO -->
    <section class="hero">
      <h1>Bienvenue sur notre boutique</h1>
      <p>Des produits de qualité au meilleur prix</p>

      <RouterLink :to="{ name: 'products-view' }" class="btn">
        Voir nos produits
      </RouterLink>
    </section>

    <!-- PRODUITS -->


  </div>
</template>

<style scoped>
.home {
  padding: 40px 20px;
}

/* HERO */
.hero {
  text-align: center;
  background: linear-gradient(135deg, #111827, #1f2933);
  color: #fff;
  padding: 70px 20px;
  border-radius: 12px;
}

.hero h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.hero p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 25px;
}

/* BUTTON */
.btn {
  background: #38bdf8;
  color: #111827;
  padding: 12px 25px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease, background 0.3s;
}

.btn:hover {
  background: #0ea5e9;
  transform: translateY(-2px);
}


</style>
