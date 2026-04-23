<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCartStore } from '../store/cart';
import EditorialHeader from '../components/EditorialHeader.vue';
import FilterBar from '../components/FilterBar.vue';
import MealCard from '../components/MealCard.vue';
import TraySelector from '../components/TraySelector.vue';

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

const cartStore = useCartStore();
const meals = ref<Meal[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchMeals = async (category = 'all') => {
  loading.value = true;
  try {
    const url = `http://localhost:5059/api/meals?category=${category}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch meals');
    meals.value = await response.json();
  } catch (err: any) {
    error.value = err.message;
    console.warn(`API fetch failed, check if backend is running at http://localhost:5059`);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  cartStore.initTrays();
  fetchMeals();
});

const handleFilterChanged = (id: string) => {
  fetchMeals(id);
};
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
    <EditorialHeader />
    
    <!-- Tray Context Bar -->
    <div class="mb-10 sticky top-20 z-50">
      <TraySelector />
    </div>
    
    <FilterBar @filterChanged="handleFilterChanged" />
    
    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
    
    <div v-else-if="error" class="text-center py-20 text-error">
      <p>無法載入菜單: {{ error }}</p>
      <p class="text-sm mt-2">請確保後端伺服器已啟動。</p>
    </div>
    
    <section v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-12">
      <MealCard v-for="meal in meals" :key="meal.id" :meal="meal" />
    </section>
  </main>
</template>
