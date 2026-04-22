<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '../store/cart';

const cartStore = useCartStore();
const order = computed(() => cartStore.lastOrder);

const scoreLabel = computed(() => {
  const score = order.value?.nutritionScore || 0;
  if (score >= 90) return '優秀';
  if (score >= 80) return '良好';
  if (score >= 70) return '尚可';
  return '待優化';
});
</script>

<template>
  <main class="flex-grow flex flex-col items-center justify-center px-6 py-12 max-w-7xl mx-auto w-full">
    <!-- Success Visual Feedback -->
    <div class="text-center mb-12">
      <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
        <span class="material-symbols-outlined text-primary text-6xl" style="font-variation-settings: 'wght' 600;">check_circle</span>
      </div>
      <h1 class="text-3xl md:text-4xl font-extrabold text-primary mb-4 tracking-tight">
        太棒了！我們已開始為您準備今日的日常健康。
      </h1>
      <p class="text-on-surface-variant font-medium italic">
        “今天的您，也往健康的道路邁進了一步！”
      </p>
    </div>

    <div v-if="order" class="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
      <!-- Core Information Card -->
      <div class="lg:col-span-7 flex flex-col gap-6">
        <div class="bg-surface-container-lowest rounded-xl p-8 shadow-[0_24px_32px_-4px_rgba(27,28,23,0.06)] relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8"></div>
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <p class="text-on-surface-variant uppercase tracking-widest font-semibold text-xs mb-1">Order ID</p>
              <h3 class="text-xl font-bold text-on-surface">{{ order.orderId }}</h3>
            </div>
            <div class="bg-primary-container text-on-primary-container px-6 py-3 rounded-xl text-center">
              <p class="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">預計取餐時間</p>
              <p class="text-2xl font-black">{{ order.pickupTime }}</p>
            </div>
          </div>
          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-primary">location_on</span>
              </div>
              <div>
                <p class="text-sm font-bold text-on-surface mb-1">健康日常 - 台北信義店</p>
                <p class="text-sm text-on-surface-variant leading-relaxed">台北市信義區信義路五段7號</p>
                <p class="text-xs text-primary font-medium mt-1">距離您約 0.8 km</p>
              </div>
            </div>
            <!-- Static Map Placeholder -->
            <div class="h-[200px] w-full rounded-xl overflow-hidden grayscale opacity-80 border border-outline-variant/20">
              <img alt="Map location" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwZLuKKSJaXfyKDtfa89zMt57TKtYQOcgyat47ShmoYjBU4DUIyCHFhqNYA0d2bJJZsJooR1BjHfyOcxJ79XjmxLaxKAZW4od8XgXU6ZlkgZE2jCsw1xYXhCj3XsA_iHnIV_QjpC_KW27lx1CRsryVyr6xUZnAhiJYZjYV6Odm_pCsFCs_7KBXbr4RR5refAVz5XVQ9H8fwOkEuQ1KYiBYWBuWBo07RuoPVcMrx4rhd0E-gufpq5uzNQ0cFw7N72MIVkGfPQaJZgHD"/>
            </div>
          </div>
        </div>
      </div>

      <!-- Nutrition Summary & CTA -->
      <div class="lg:col-span-5 flex flex-col gap-6">
        <!-- Nutrition Summary -->
        <div class="bg-surface-container-low rounded-xl p-8 border-l-4 border-primary">
          <h3 class="text-lg font-bold text-primary mb-6 flex items-center gap-2">
            <span class="material-symbols-outlined">analytics</span>
            營養夥伴總結
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-surface-container-lowest p-5 rounded-lg text-center">
              <p class="text-xs font-bold text-on-surface-variant uppercase tracking-tighter mb-2">Total Calories</p>
              <p class="text-3xl font-black text-primary tracking-tight">{{ order.aggregatedNutrition.calories }} <span class="text-sm font-normal">kcal</span></p>
            </div>
            <div class="bg-surface-container-lowest p-5 rounded-lg text-center">
              <p class="text-xs font-bold text-on-surface-variant uppercase tracking-tighter mb-2">Total Protein</p>
              <p class="text-3xl font-black text-tertiary tracking-tight">{{ order.aggregatedNutrition.protein }} <span class="text-sm font-normal">g</span></p>
            </div>
          </div>
          <div class="mt-8 pt-6 border-t border-outline-variant/20">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm text-on-surface-variant">飲食均衡度</span>
              <span class="text-sm font-bold text-primary">{{ scoreLabel }} {{ order.nutritionScore }}%</span>
            </div>
            <div class="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
              <div class="h-full bg-primary transition-all duration-1000" :style="{ width: order.nutritionScore + '%' }"></div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="flex flex-col sm:flex-row gap-4 mt-auto">
          <button class="flex-1 bg-primary text-on-primary font-bold py-4 px-6 rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2">
            <span>查看訂單詳情</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
          <router-link to="/" class="flex-1 border-2 border-primary text-primary font-bold py-4 px-6 rounded-full hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-center">
            <span class="material-symbols-outlined text-sm">restaurant_menu</span>
            <span>回到菜單繼續逛逛</span>
          </router-link>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-20">
       <p class="text-on-surface-variant">找不到訂單資訊。</p>
       <router-link to="/" class="text-primary font-bold underline mt-4 block">回到首頁</router-link>
    </div>
  </main>
</template>
