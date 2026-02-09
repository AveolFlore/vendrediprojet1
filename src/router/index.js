import AboutView from '@/views/AboutView.vue'
import CartView from '@/views/CartView.vue'
import HomeViews from '@/views/HomeViews.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue'
import ProductsView from '@/views/ProductsView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Home-view',
    component: HomeViews
  },
  {
    path: '/products',
    name: 'products-view',
    component: ProductsView
  },
  {
    path: '/products/:id',
    name: 'product-details-view',
    component: ProductDetailsView
  },
  {
    path: '/cart',
    name: 'cart-view',
    component: CartView
  },
    {
    path: '/about',
    name: 'about-view',
    component: AboutView
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
