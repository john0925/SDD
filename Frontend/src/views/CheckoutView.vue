<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../store/cart';

const cartStore = useCartStore();
const router = useRouter();

// Set default pickup time if not set (30 mins from now)
onMounted(() => {
  if (!cartStore.pickupTime) {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    cartStore.pickupTime = `${hours}:${minutes}`;
  }
});

const submitOrder = async () => {
  if (cartStore.items.length === 0) return;

  try {
    const response = await fetch('http://localhost:5059/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: cartStore.items.map(i => ({ mealId: i.id, quantity: i.quantity })),
        pickupTime: cartStore.pickupTime
      })
    });

    if (response.ok) {
      const data = await response.json();
      cartStore.lastOrder = {
        orderId: data.orderId,
        pickupTime: cartStore.pickupTime,
        aggregatedNutrition: { ...cartStore.aggregatedNutrition },
        nutritionScore: cartStore.nutritionScore
      };
      cartStore.clearCart();
      router.push({ name: 'success', params: { orderId: data.orderId } });
    }
  } catch (error) {
    console.error('Order submission failed', error);
  }
};
</script>

<template>
  <main class="pt-12 pb-20 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
    <!-- Left Column: Checkout Details -->
    <div class="lg:col-span-8 space-y-8">
      <header>
        <h1 class="font-headline text-4xl font-extrabold text-primary tracking-tight">您的訂單</h1>
        <p class="text-on-surface-variant mt-2">請確認您的餐點與取餐資訊</p>
      </header>

      <!-- Order List -->
      <section class="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
        <h2 class="font-headline text-xl font-bold mb-6 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">restaurant_menu</span>
          餐點清單
        </h2>
        
        <div v-if="cartStore.items.length === 0" class="py-12 text-center text-on-surface-variant">
          您的購物車目前是空的。
          <router-link to="/" class="text-primary font-bold block mt-4 underline">回到菜單選購</router-link>
        </div>

        <div v-else class="divide-y divide-outline-variant/20">
          <div v-for="item in cartStore.items" :key="item.id" class="py-4 flex justify-between items-center group">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-lg bg-surface-container overflow-hidden">
                <img :alt="item.name" :src="item.imageUrl" class="w-full h-full object-cover" />
              </div>
              <div>
                <h3 class="font-semibold text-lg text-on-surface">{{ item.name }}</h3>
                <p class="text-sm text-on-surface-variant">{{ item.carbCategory.toUpperCase() }} CARB</p>
              </div>
            </div>
            <div class="flex items-center gap-6">
              <div class="flex items-center bg-surface-container rounded-lg p-1">
                <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-all">-</button>
                <span class="w-10 text-center font-bold">{{ item.quantity }}</span>
                <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-all">+</button>
              </div>
              <div class="text-right w-20">
                <p class="font-bold text-primary">${{ item.price * item.quantity }}</p>
                <button @click="cartStore.removeFromCart(item.id)" class="text-[10px] text-error hover:underline">移除</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pickup and Points Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface-container-low rounded-xl p-6">
          <h2 class="font-headline text-lg font-bold mb-4 flex items-center gap-2 text-primary">
            <span class="material-symbols-outlined">schedule</span>
            預定取餐時間
          </h2>
          <input 
            v-model="cartStore.pickupTime"
            class="w-full bg-surface-container-lowest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-primary-fixed-dim shadow-sm" 
            type="time"
          />
          <p class="mt-3 text-xs text-on-surface-variant">建議預留 30 分鐘準備時間</p>
        </div>

        <div class="bg-surface-container-low rounded-xl p-6">
          <h2 class="font-headline text-lg font-bold mb-4 flex items-center gap-2 text-primary">
            <span class="material-symbols-outlined">payments</span>
            點數折抵
          </h2>
          <div class="flex items-center p-4 bg-surface-container-highest/30 rounded-lg border border-outline-variant/20">
            <input disabled class="w-5 h-5 rounded border-outline text-primary bg-surface-container-high cursor-not-allowed" type="checkbox"/>
            <label class="ml-3 text-on-surface font-medium opacity-60">
              使用點數折抵 <span class="text-primary text-sm font-bold ml-1">(目前點數：120)</span>
            </label>
          </div>
          <p class="mt-3 text-xs text-on-surface-variant">點數功能開發中</p>
        </div>
      </div>
    </div>

    <!-- Right Column: Nutrition & Payment Summary -->
    <div class="lg:col-span-4 space-y-6">
      <section class="bg-primary text-on-primary rounded-xl p-8 shadow-xl relative overflow-hidden">
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-primary-container/20 rounded-full blur-3xl"></div>
        <h2 class="font-headline text-xl font-bold mb-6 relative z-10 flex items-center gap-2">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">analytics</span>
          預計營養攝取
        </h2>
        <div class="grid grid-cols-2 gap-4 relative z-10">
          <div class="bg-primary-container/20 p-3 rounded-lg border border-primary-fixed-dim/20">
            <p class="text-primary-fixed-dim text-[10px] uppercase tracking-wider font-bold">蛋白質</p>
            <p class="text-2xl font-extrabold">{{ cartStore.aggregatedNutrition.protein }} <span class="text-sm font-normal">g</span></p>
          </div>
          <div class="bg-primary-container/20 p-3 rounded-lg border border-primary-fixed-dim/20">
            <p class="text-primary-fixed-dim text-[10px] uppercase tracking-wider font-bold">總熱量</p>
            <p class="text-2xl font-extrabold">{{ cartStore.aggregatedNutrition.calories }} <span class="text-sm font-normal">kcal</span></p>
          </div>
          <div class="bg-primary-container/20 p-3 rounded-lg border border-primary-fixed-dim/20">
            <p class="text-primary-fixed-dim text-[10px] uppercase tracking-wider font-bold">碳水化合物</p>
            <p class="text-2xl font-extrabold">{{ cartStore.aggregatedNutrition.carbs }} <span class="text-sm font-normal">g</span></p>
          </div>
          <div class="bg-primary-container/20 p-3 rounded-lg border border-primary-fixed-dim/20">
            <p class="text-primary-fixed-dim text-[10px] uppercase tracking-wider font-bold">總脂肪</p>
            <p class="text-2xl font-extrabold">{{ cartStore.aggregatedNutrition.fat }} <span class="text-sm font-normal">g</span></p>
          </div>
        </div>
        <!-- Preview Score -->
        <div class="mt-6 pt-4 border-t border-white/10 relative z-10">
           <div class="flex justify-between items-center">
             <span class="text-xs opacity-80">預估飲食均衡度</span>
             <span class="font-bold">{{ cartStore.nutritionScore }}%</span>
           </div>
        </div>
      </section>

      <section class="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-surface-container-high">
        <h2 class="font-headline text-xl font-bold mb-6 text-on-surface">訂單摘要</h2>
        <div class="space-y-4 mb-8">
          <div class="flex justify-between text-on-surface-variant">
            <span>商品小計</span>
            <span>${{ cartStore.subtotal }}</span>
          </div>
          <div class="flex justify-between text-on-surface-variant">
            <span>服務費 (5%)</span>
            <span>${{ cartStore.serviceFee }}</span>
          </div>
          <div class="pt-4 border-t border-outline-variant/30 flex justify-between items-end">
            <span class="font-bold text-lg">總計</span>
            <span class="text-3xl font-extrabold text-primary">${{ cartStore.totalAmount }}</span>
          </div>
        </div>
        <button 
          @click="submitOrder"
          :disabled="cartStore.items.length === 0"
          class="w-full bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-bold py-5 rounded-full shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 flex justify-center items-center gap-3 disabled:opacity-50 disabled:transform-none"
        >
          <span class="material-symbols-outlined">verified_user</span>
          確認下單
        </button>
      </section>
    </div>
  </main>
</template>
