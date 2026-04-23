<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCartStore } from '../store/cart';

const cartStore = useCartStore();

// Use direct access to state for reliability
const order = computed(() => cartStore.lastOrder);

onMounted(() => {
  console.log('SuccessView mounted, lastOrder:', cartStore.lastOrder);
});

const getScoreLabel = (score: number) => {
  if (score >= 90) return '優秀';
  if (score >= 80) return '良好';
  if (score >= 70) return '尚可';
  return '待優化';
};
</script>

<template>
  <main class="flex-grow flex flex-col items-center justify-center px-6 py-12 max-w-7xl mx-auto w-full">
    <!-- Success Visual Feedback (Always visible) -->
    <div class="text-center mb-12">
      <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
        <span class="material-symbols-outlined text-primary text-6xl" style="font-variation-settings: 'wght' 600;">check_circle</span>
      </div>
      <h1 class="text-3xl md:text-4xl font-extrabold text-primary mb-4 tracking-tight">
        太棒了！我們已開始為您準備今日的日常健康。
      </h1>
      <p class="text-on-surface-variant font-medium italic">
        “今天的您們，也往健康的道路邁進了一步！”
      </p>
    </div>

    <!-- Data-driven section -->
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
              </div>
            </div>
            <div class="h-[200px] w-full rounded-xl overflow-hidden grayscale opacity-80 border border-outline-variant/20">
              <img alt="Map location" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwZLuKKSJaXfyKDtfa89zMt57TKtYQOcgyat47ShmoYjBU4DUIyCHFhqNYA0d2bJJZsJooR1BjHfyOcxJ79XjmxLaxKAZW4od8XgXU6ZlkgZE2jCsw1xYXhCj3XsA_iHnIV_QjpC_KW27lx1CRsryVyr6xUZnAhiJYZjYV6Odm_pCsFCs_7KBXbr4RR5refAVz5XVQ9H8fwOkEuQ1KYiBYWBuWBo07RuoPVcMrx4rhd0E-gufpq5uzNQ0cFw7N72MIVkGfPQaJZgHD"/>
            </div>
          </div>
        </div>

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

      <!-- Tray Reports Column -->
      <div class="lg:col-span-5 space-y-6">
        <h3 class="text-lg font-bold text-primary flex items-center gap-2 px-2">
          <span class="material-symbols-outlined">analytics</span>
          餐桌營養夥伴總結
        </h3>

        <div v-for="report in (order.trayReports || [])" :key="report.trayName" class="bg-surface-container-low rounded-2xl p-6 border-l-4 border-primary shadow-sm">
          <div class="flex justify-between items-start mb-4">
            <h4 class="font-bold text-on-surface">{{ report.trayName }}</h4>
            <span class="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
              {{ getScoreLabel(report.score) }} {{ report.score }}%
            </span>
          </div>

          <div class="grid grid-cols-2 gap-3 mb-6">
            <div class="bg-surface-container-lowest p-3 rounded-xl text-center">
              <p class="text-[9px] font-bold text-on-surface-variant uppercase tracking-tighter mb-1">Calories</p>
              <p class="text-lg font-black text-primary">{{ report.nutrition?.calories || 0 }} <span class="text-[10px] font-normal">kcal</span></p>
            </div>
            <div class="bg-surface-container-lowest p-3 rounded-xl text-center">
              <p class="text-[9px] font-bold text-on-surface-variant uppercase tracking-tighter mb-1">Protein</p>
              <p class="text-lg font-black text-tertiary">{{ report.nutrition?.protein || 0 }} <span class="text-[10px] font-normal">g</span></p>
            </div>
          </div>

          <div class="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div class="h-full bg-primary transition-all duration-1000" :style="{ width: (report.score || 0) + '%' }"></div>
          </div>
        </div>

        <div class="pt-6 border-t border-outline-variant/20 px-2 flex justify-between items-center text-on-surface-variant">
           <span class="text-sm">訂單總額</span>
           <span class="text-2xl font-black text-primary">${{ order.totalAmount }}</span>
        </div>
      </div>
    </div>
    
    <!-- Fallback if order data is missing (e.g. page refresh) -->
    <div v-else class="text-center py-20 bg-surface-container-low rounded-3xl w-full max-w-2xl px-6 border-2 border-dashed border-outline-variant/20">
       <span class="material-symbols-outlined text-outline-variant text-5xl mb-4">history_toggle_off</span>
       <p class="text-on-surface-variant font-bold">目前找不到此訂單的即時分析資訊。</p>
       <p class="text-on-surface-variant/60 text-sm mt-2 mb-8">若您剛重新整理過頁面，暫存的營養報告可能已清除。您的訂單仍已成立。</p>
       <router-link to="/" class="bg-primary text-on-primary px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-primary/20 transition-all inline-block">
          回到菜單繼續逛逛
       </router-link>
    </div>
  </main>
</template>
