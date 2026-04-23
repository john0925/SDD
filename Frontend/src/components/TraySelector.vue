<template>
  <div class="flex items-center gap-4 bg-surface/80 backdrop-blur-md py-4 px-6 rounded-2xl shadow-sm border border-outline-variant/10">
    <div class="flex flex-col">
      <label class="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">正在操作的托盤</label>
      <div class="relative group">
        <select 
          :value="cartStore.activeTrayId" 
          @change="e => cartStore.switchTray((e.target as HTMLSelectElement).value)"
          class="appearance-none bg-surface-container-lowest border-none rounded-lg py-2 pl-4 pr-10 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all shadow-sm min-w-[140px]"
        >
          <option v-for="tray in cartStore.trays" :key="tray.id" :value="tray.id">
            {{ tray.name }} ({{ tray.items.length }} 件)
          </option>
        </select>
        <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-xl">
          expand_more
        </span>
      </div>
    </div>

    <!-- Modified: Changed "+" icon button to "加入托盤" text button -->
    <button 
      @click="cartStore.addTray"
      class="mt-5 px-6 py-2 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary transition-all shadow-sm active:scale-95 text-sm font-bold flex items-center gap-2 whitespace-nowrap"
    >
      <span class="material-symbols-outlined text-sm">add</span>
      加入托盤
    </button>
    
    <div v-if="cartStore.activeTray" class="ml-auto hidden md:flex items-center gap-6">
       <div class="text-right">
         <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">目前托盤預估均衡度</p>
         <p class="text-lg font-black text-primary">{{ currentTrayScore }}%</p>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore, calculateNutritionScore } from '../store/cart';

const cartStore = useCartStore();

const currentTrayScore = computed(() => {
  if (!cartStore.activeTray) return 0;
  return calculateNutritionScore(cartStore.activeTray.items);
});
</script>
