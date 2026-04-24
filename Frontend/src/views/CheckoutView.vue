<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../store/cart';

const cartStore = useCartStore();
const router = useRouter();

// Drag and Drop state
const draggingMealId = ref<string | null>(null);
const draggingFromTrayId = ref<string | null>(null);

const memberPhoneInput = ref(cartStore.memberPhone);

onMounted(() => {
  cartStore.initTrays();
  if (!cartStore.pickupTime) {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    cartStore.pickupTime = `${hours}:${minutes}`;
  }
});

const onDragStart = (trayId: string, mealId: string) => {
  draggingMealId.value = mealId;
  draggingFromTrayId.value = trayId;
};

const onDrop = (toTrayId: string) => {
  if (draggingMealId.value && draggingFromTrayId.value) {
    cartStore.moveItemBetweenTrays(draggingFromTrayId.value, toTrayId, draggingMealId.value);
  }
  draggingMealId.value = null;
  draggingFromTrayId.value = null;
};

const getTraySubtotal = (trayId: string) => {
  const data = cartStore.traySubtotals.find(t => t.id === trayId);
  return data ? data.subtotal : 0;
};

const updateMember = () => {
  cartStore.setMemberPhone(memberPhoneInput.value);
};

const submitOrder = async () => {
  if (cartStore.totalItems === 0) return;

  try {
    const trayData = cartStore.trays.map(tray => ({
      name: tray.name,
      items: tray.items.map(i => ({ mealId: i.id, quantity: i.quantity }))
    }));

    const response = await fetch('http://localhost:5059/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trays: trayData,
        pickupTime: cartStore.pickupTime
      })
    });

    if (response.ok) {
      const data = await response.json();
      cartStore.completeOrder(data.orderId);
      router.push({ name: 'success', params: { orderId: data.orderId } });
    }
  } catch (error) {
    console.error('Order submission failed', error);
  }
};
</script>

<template>
  <main class="pt-12 pb-20 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
    <!-- Left Column: Tray List -->
    <div class="lg:col-span-8 space-y-12">
      <header>
        <h1 class="font-headline text-4xl font-extrabold text-primary tracking-tight">您的健康餐桌</h1>
        <p class="text-on-surface-variant mt-2">提示：您可以拖曳餐點來更換托盤分配</p>
      </header>

      <div v-if="cartStore.totalItems === 0" class="bg-surface-container-lowest rounded-2xl p-12 text-center shadow-sm">
        <span class="material-symbols-outlined text-6xl text-outline-variant mb-4">shopping_basket</span>
        <p class="text-on-surface-variant">目前餐桌上沒有任何餐點。</p>
        <router-link to="/" class="text-primary font-bold block mt-4 underline">立即前往點餐</router-link>
      </div>

      <!-- Iterate through Trays -->
      <section 
        v-for="(tray, index) in cartStore.trayNutritionData" 
        :key="tray.id"
        @dragover.prevent
        @drop="onDrop(tray.id)"
        :class="[
          'bg-surface-container-low rounded-[2rem] p-1 overflow-hidden transition-all duration-300 shadow-sm border-2',
          draggingMealId && draggingFromTrayId !== tray.id ? 'border-primary/40 scale-[1.01] bg-primary/5' : 'border-transparent'
        ]"
      >
        <div class="bg-surface-container-lowest rounded-[1.9rem] p-8">
          <div class="flex justify-between items-start mb-8">
            <h2 class="font-headline text-2xl font-bold flex items-center gap-3 text-primary">
              <span class="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center text-sm font-black">
                {{ index + 1 }}
              </span>
              {{ tray.name }}
            </h2>
            <div class="text-right">
              <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">托盤小計</p>
              <p class="text-xl font-bold text-primary">NT$ {{ getTraySubtotal(tray.id) }}</p>
              <button 
                v-if="cartStore.trays.length > 1"
                @click="cartStore.removeTray(tray.id)"
                class="text-error text-[10px] font-bold hover:underline mt-1"
              >
                移除托盤
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
            <!-- Meal List -->
            <div class="md:col-span-7 space-y-4 divide-y divide-outline-variant/10">
              <div v-if="tray.items.length === 0" class="py-10 text-center border-2 border-dashed border-outline-variant/20 rounded-2xl">
                <p class="text-sm text-on-surface-variant">拖曳餐點至此處</p>
              </div>
              
              <div 
                v-for="item in tray.items" 
                :key="item.id"
                draggable="true"
                @dragstart="onDragStart(tray.id, item.id)"
                class="pt-4 first:pt-0 flex justify-between items-center group cursor-grab active:cursor-grabbing hover:bg-surface/50 rounded-xl px-2 -mx-2 transition-colors"
              >
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 rounded-xl bg-surface-container overflow-hidden shrink-0">
                    <img :src="item.imageUrl" class="w-full h-full object-cover pointer-events-none" />
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                       <span class="material-symbols-outlined text-xs text-outline-variant group-hover:text-primary">drag_indicator</span>
                       <h3 class="font-bold text-on-surface text-sm md:text-base">{{ item.name }}</h3>
                    </div>
                    <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter ml-5">{{ item.carbCategory }} carb</p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="text-right mr-2">
                    <p v-if="item.isFree" class="text-[10px] font-bold text-tertiary italic">免費兌換</p>
                    <p class="text-sm font-bold" :class="{'line-through text-outline-variant opacity-50': item.isFree}">
                      ${{ item.price }}
                    </p>
                  </div>
                  <div class="flex items-center bg-surface-container-high rounded-lg p-0.5">
                    <button @click="cartStore.updateQuantity(tray.id, item.id, item.quantity - 1)" class="w-6 h-6 flex items-center justify-center hover:bg-white rounded transition-all text-xs">-</button>
                    <span class="w-8 text-center text-sm font-bold">{{ item.quantity }}</span>
                    <button @click="cartStore.updateQuantity(tray.id, item.id, item.quantity + 1)" class="w-6 h-6 flex items-center justify-center hover:bg-white rounded transition-all text-xs">+</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tray Analytics -->
            <div class="md:col-span-5">
              <div class="bg-primary p-6 rounded-2xl text-on-primary relative overflow-hidden h-full min-h-[160px]">
                <div class="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                
                <div class="flex justify-between items-start mb-6 relative z-10">
                  <span class="text-[10px] font-bold uppercase tracking-widest opacity-70">托盤營養估算</span>
                  <div class="text-right">
                    <p class="text-3xl font-black">{{ tray.score }}%</p>
                    <p class="text-[10px] font-bold opacity-70">均衡度評分</p>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3 relative z-10">
                  <div class="bg-white/10 p-2 rounded-xl">
                    <p class="text-[9px] font-bold opacity-60 uppercase">熱量</p>
                    <p class="text-base font-bold">{{ tray.nutrition.calories }} <span class="text-[10px] font-normal">kcal</span></p>
                  </div>
                  <div class="bg-white/10 p-2 rounded-xl">
                    <p class="text-[9px] font-bold opacity-60 uppercase">蛋白質</p>
                    <p class="text-base font-bold">{{ tray.nutrition.protein }} <span class="text-[10px] font-normal">g</span></p>
                  </div>
                  <div class="bg-white/10 p-2 rounded-xl">
                    <p class="text-[9px] font-bold opacity-60 uppercase">碳水</p>
                    <p class="text-base font-bold">{{ tray.nutrition.carbs }} <span class="text-[10px] font-normal">g</span></p>
                  </div>
                  <div class="bg-white/10 p-2 rounded-xl">
                    <p class="text-[9px] font-bold opacity-60 uppercase">脂肪</p>
                    <p class="text-base font-bold">{{ tray.nutrition.fat }} <span class="text-[10px] font-normal">g</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Right Column: Order Summary & Member -->
    <div class="lg:col-span-4 space-y-6">
      <!-- Member Section -->
      <section class="bg-surface-container-lowest rounded-[2rem] p-8 shadow-sm border border-outline-variant/10">
        <h2 class="font-headline text-xl font-bold mb-6 text-primary flex items-center gap-2">
          <span class="material-symbols-outlined">card_membership</span>
          會員專區
        </h2>
        
        <div class="space-y-4">
          <div>
            <label class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-2">會員手機號碼</label>
            <div class="flex gap-2">
              <input 
                v-model="memberPhoneInput" 
                placeholder="09xx-xxx-xxx"
                class="flex-grow bg-surface-container-low border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20 shadow-inner"
                type="tel"
              />
              <button 
                @click="updateMember"
                class="bg-secondary text-on-secondary px-4 py-2 rounded-xl text-xs font-bold hover:bg-secondary/90 active:scale-95 transition-all"
              >
                確認
              </button>
            </div>
          </div>

          <div v-if="cartStore.memberPhone" class="bg-tertiary-container/30 p-4 rounded-2xl">
            <div class="flex justify-between items-center mb-1">
              <span class="text-xs font-bold text-on-tertiary-container">累積點數</span>
              <span class="text-xl font-black text-tertiary">{{ cartStore.loyaltyPoints }} PT</span>
            </div>
            <p class="text-[10px] text-on-tertiary-container/70">每滿 150 元可累積 1 點</p>
            
            <div v-if="cartStore.loyaltyPoints >= 10" class="mt-4">
              <button 
                v-if="!cartStore.isRewardApplied"
                @click="cartStore.redeemReward"
                class="w-full bg-tertiary text-on-tertiary py-3 rounded-full text-sm font-black shadow-lg shadow-tertiary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span class="material-symbols-outlined text-lg">redeem</span>
                使用 10 點換購餐點
              </button>
              <button 
                v-else
                @click="cartStore.cancelReward"
                class="w-full border-2 border-tertiary text-tertiary py-2 rounded-full text-sm font-black hover:bg-tertiary/5 transition-all"
              >
                取消兌換
              </button>
            </div>
            <p v-else class="mt-4 text-[10px] font-bold text-on-tertiary-container/60 text-center italic">
              還差 {{ 10 - cartStore.loyaltyPoints }} 點即可兌換免費餐點
            </p>
          </div>
        </div>
      </section>

      <!-- Order Summary -->
      <section class="bg-surface-container-low rounded-[2rem] p-8 shadow-sm sticky top-32">
        <h2 class="font-headline text-xl font-bold mb-6 text-primary">訂單摘要</h2>
        <div class="space-y-6">
          <div class="space-y-3 pb-6 border-b border-outline-variant/20">
            <div class="flex justify-between text-sm text-on-surface-variant">
              <span>總件數</span>
              <span class="font-bold text-on-surface">{{ cartStore.totalItems }} 件</span>
            </div>
            <div v-if="cartStore.isRewardApplied" class="flex justify-between text-sm text-tertiary font-bold">
              <span>點數兌換折扣</span>
              <span>- 100%</span>
            </div>
            <div class="flex justify-between text-sm text-on-surface-variant">
              <span>服務費 (5%)</span>
              <span class="font-bold text-on-surface">${{ cartStore.serviceFee }}</span>
            </div>
          </div>
          
          <div v-if="cartStore.memberPhone" class="bg-primary/5 p-4 rounded-xl border border-primary/10">
            <div class="flex justify-between items-center text-xs">
              <span class="text-on-surface-variant">本次預計獲得點數</span>
              <span class="font-black text-primary text-base">+ {{ cartStore.estimatedPoints }} PT</span>
            </div>
          </div>

          <div>
             <label class="text-[10px] font-bold text-primary uppercase tracking-widest block mb-3">預定取餐時間</label>
             <input v-model="cartStore.pickupTime" class="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface font-bold focus:ring-2 focus:ring-primary/20 shadow-inner" type="time" />
          </div>
          <div class="pt-2 flex justify-between items-end">
            <span class="font-bold text-lg">全單總計</span>
            <span class="text-4xl font-black text-primary">${{ cartStore.totalAmount }}</span>
          </div>
          <button @click="submitOrder" :disabled="cartStore.totalItems === 0" class="w-full bg-primary text-on-primary hover:bg-primary-container font-black py-5 rounded-full shadow-xl shadow-primary/10 transition-all transform hover:-translate-y-1 active:scale-95 flex justify-center items-center gap-3 disabled:opacity-30 disabled:transform-none">
            <span class="material-symbols-outlined">verified_user</span>
            確認下單
          </button>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.cursor-grab {
  cursor: grab;
}
.cursor-grabbing {
  cursor: grabbing;
}
</style>
