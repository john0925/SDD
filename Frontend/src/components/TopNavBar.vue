<template>
  <nav class="hidden md:flex bg-surface/70 backdrop-blur-md docked full-width top-0 sticky z-50 shadow-sm font-headline font-medium text-sm flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
    <div class="flex items-center gap-8">
      <router-link to="/" class="text-2xl font-bold text-primary">健康日常</router-link>
      <div class="flex gap-6">
        <router-link to="/" class="text-primary font-bold border-b-2 border-primary pb-1">菜單</router-link>
        <a class="text-on-surface/60 hover:text-primary transition-colors" href="#">關於我們</a>
        <a class="text-on-surface/60 hover:text-primary transition-colors" href="#">我的訂單</a>
      </div>
    </div>
    <div class="flex items-center gap-6">
      <div class="flex items-center space-x-2 text-primary font-semibold bg-surface-container-low px-4 py-1.5 rounded-full">
        <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
        <span class="text-sm">會員點數: 120pt</span>
      </div>
      
      <router-link to="/checkout" class="relative group p-2 hover:bg-black/5 rounded-lg transition-all">
        <span class="material-symbols-outlined text-primary">shopping_basket</span>
        <span v-if="cartStore.totalItems > 0" class="absolute -top-1 -right-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
          {{ cartStore.totalItems }}
        </span>
      </router-link>

      <div class="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border-2 border-primary/10">
        <img alt="Member Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxMB5pAo_HN2bbDrUleGdxISwXZ_2xZ-RMZPuo5iY-ODcHTxx2n91w8r2EPLI4hwHDe1jcRpdCXk6gcIYnWMZJpAssQkUKxpQfK2DdaQWJa1g8HaeDrvGYxYDU5dzWff2H9Z8BGmNmQ6boyEIleqsGZayaDcWbT4-3r7v1nxvqFJzEDi1xkt3OTaJSCtduH-D8VsG-qEEx-JSNv6eWC3CxZr82yVbLvHQ2ImAy5H8KByuO79YWsWf0XxxtPwkmD-Yv8bN4ZIDLvIhb"/>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '../store/cart';

const cartStore = useCartStore();
</script>
