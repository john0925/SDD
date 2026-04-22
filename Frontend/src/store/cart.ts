import { defineStore } from 'pinia';

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

interface CartItem extends Meal {
  quantity: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    pickupTime: '',
    lastOrder: null as {
      orderId: string;
      pickupTime: string;
      aggregatedNutrition: { calories: number; protein: number; carbs: number; fat: number };
      nutritionScore: number;
    } | null
  }),
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    serviceFee: (getters) => Math.round(getters.subtotal * 0.05),
    totalAmount: (getters) => getters.subtotal + getters.serviceFee,
    
    aggregatedNutrition: (state) => {
      return state.items.reduce((acc, item) => {
        acc.calories += item.calories * item.quantity;
        acc.protein += item.nutrition.protein * item.quantity;
        acc.carbs += item.nutrition.carbs * item.quantity;
        acc.fat += item.nutrition.fat * item.quantity;
        return acc;
      }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
    },

    nutritionScore: (getters) => {
      const { calories, protein, carbs, fat } = getters.aggregatedNutrition;
      if (calories === 0) return 0;

      // 1. 三大營養素比例 (60%)
      // 目標比例: P: 30%, C: 40%, F: 30%
      const totalGrams = protein + carbs + fat;
      const pPct = (protein / totalGrams) * 100;
      const cPct = (carbs / totalGrams) * 100;
      const fPct = (fat / totalGrams) * 100;

      const distance = Math.sqrt(
        Math.pow(pPct - 30, 2) + 
        Math.pow(cPct - 40, 2) + 
        Math.pow(fPct - 30, 2)
      );
      const sMacro = Math.max(0, 100 - distance);

      // 2. 熱量目標達成度 (30%)
      // 基準區間: 500 - 800 kcal
      let sCal = 100;
      if (calories < 500) {
        sCal -= Math.floor((500 - calories) / 50) * 5;
      } else if (calories > 800) {
        sCal -= Math.floor((calories - 800) / 50) * 5;
      }
      sCal = Math.max(0, sCal);

      // 3. 食材多樣性獎勵 (10%)
      let sBonus = 0;
      // Check if any item in cart has the attributes
      // Since it's a "bonus", we'll check if the overall selection meets criteria
      const hasNonRefined = getters.cartItems.some((item: any) => item.attributes?.isNonRefinedStarch);
      const hasDiverseVeg = getters.cartItems.some((item: any) => item.attributes?.hasDiverseVeg);
      
      if (hasNonRefined) sBonus += 5;
      if (hasDiverseVeg) sBonus += 5;

      // Final Score
      const finalScore = (sMacro * 0.6) + (sCal * 0.3) + sBonus;
      return Math.round(finalScore);
    },

    cartItems: (state) => state.items
  },
  actions: {
    addToCart(meal: Meal) {
      const existingItem = this.items.find(item => item.id === meal.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...meal, quantity: 1 });
      }
    },
    removeFromCart(mealId: string) {
      this.items = this.items.filter(item => item.id !== mealId);
    },
    updateQuantity(mealId: string, quantity: number) {
      const item = this.items.find(item => item.id === mealId);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },
    clearCart() {
      this.items = [];
    }
  }
});
