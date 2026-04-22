<template>
  <article class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_-4px_24px_rgba(27,28,23,0.06)] flex flex-col group h-full">
    <div class="relative h-56 overflow-hidden">
      <img 
        :alt="meal.imageAlt" 
        :src="meal.imageUrl"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
      />
      <div class="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
        <span class="material-symbols-outlined text-[14px]">local_fire_department</span>
        {{ meal.calories }} kcal
      </div>
    </div>
    <div class="p-6 flex flex-col flex-grow">
      <h3 class="font-headline text-xl font-bold text-on-surface mb-2">{{ meal.name }}</h3>
      <p class="font-body text-sm text-on-surface-variant mb-4 line-clamp-2">{{ meal.description }}</p>
      
      <div class="flex flex-wrap gap-2 mb-6 mt-auto">
        <span class="px-2 py-1 rounded-sm bg-tertiary-container text-on-tertiary-container font-label text-xs font-semibold">
          蛋白質: {{ meal.nutrition.protein }}g
        </span>
        <span class="px-2 py-1 rounded-sm bg-surface-container-high text-on-surface font-label text-xs font-semibold">
          碳水: {{ meal.nutrition.carbs }}g
        </span>
        <span class="px-2 py-1 rounded-sm bg-surface-container-high text-on-surface font-label text-xs font-semibold">
          脂肪: {{ meal.nutrition.fat }}g
        </span>
      </div>

      <button 
        @click="cartStore.addToCart(meal)"
        class="w-full bg-primary text-on-primary hover:bg-primary-container rounded-full py-3 px-4 font-label font-semibold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        <span class="material-symbols-outlined text-[18px]">shopping_cart</span>
        加入購物車
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useCartStore } from '../store/cart';

interface Nutrition {
  protein: number;
  carbs: number;
  fat: number;
}

interface MealAttributes {
  isNonRefinedStarch: boolean;
  hasDiverseVeg: boolean;
}

interface Meal {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  carbCategory: string;
  calories: number;
  nutrition: Nutrition;
  price: number;
  attributes?: MealAttributes;
}

defineProps<{
  meal: Meal;
}>();

const cartStore = useCartStore();
</script>
