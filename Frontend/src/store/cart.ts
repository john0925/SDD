import { defineStore } from 'pinia';

export interface Nutrition {
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealAttributes {
  isNonRefinedStarch: boolean;
  hasDiverseVeg: boolean;
}

export interface Meal {
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

export interface CartItem extends Meal {
  quantity: number;
}

export interface Tray {
  id: string;
  name: string;
  items: CartItem[];
}

// Helper function for nutrition scoring
export const calculateNutritionScore = (items: CartItem[]) => {
  if (items.length === 0) return 0;

  const aggregated = items.reduce((acc, item) => {
    acc.calories += (item.calories || 0) * (item.quantity || 0);
    acc.protein += (item.nutrition?.protein || 0) * (item.quantity || 0);
    acc.carbs += (item.nutrition?.carbs || 0) * (item.quantity || 0);
    acc.fat += (item.nutrition?.fat || 0) * (item.quantity || 0);
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const { calories, protein, carbs, fat } = aggregated;
  if (calories === 0) return 0;

  const totalGrams = protein + carbs + fat;
  if (totalGrams === 0) return 0;
  
  const pPct = (protein / totalGrams) * 100;
  const cPct = (carbs / totalGrams) * 100;
  const fPct = (fat / totalGrams) * 100;

  const distance = Math.sqrt(
    Math.pow(pPct - 30, 2) + 
    Math.pow(cPct - 40, 2) + 
    Math.pow(fPct - 30, 2)
  );
  const sMacro = Math.max(0, 100 - distance);

  let sCal = 100;
  if (calories < 500) {
    sCal -= Math.floor((500 - calories) / 50) * 5;
  } else if (calories > 800) {
    sCal -= Math.floor((calories - 800) / 50) * 5;
  }
  sCal = Math.max(0, sCal);

  let sBonus = 0;
  const hasNonRefined = items.some(item => item.attributes?.isNonRefinedStarch);
  const hasDiverseVeg = items.some(item => item.attributes?.hasDiverseVeg);
  if (hasNonRefined) sBonus += 5;
  if (hasDiverseVeg) sBonus += 5;

  return Math.round((sMacro * 0.6) + (sCal * 0.3) + sBonus);
};

export const useCartStore = defineStore('cart', {
  state: () => ({
    trays: [] as Tray[],
    activeTrayId: '',
    pickupTime: '',
    lastOrder: null as {
      orderId: string;
      pickupTime: string;
      trayReports: Array<{
        trayName: string;
        nutrition: { calories: number; protein: number; carbs: number; fat: number };
        score: number;
      }>;
      totalAmount: number;
    } | null
  }),
  getters: {
    activeTray: (state) => state.trays.find(t => t.id === state.activeTrayId),
    totalItems: (state) => state.trays.reduce((sum, tray) => 
      sum + (tray.items?.reduce((tSum, item) => tSum + (item.quantity || 0), 0) || 0), 0
    ),
    subtotal: (state) => state.trays.reduce((sum, tray) => 
      sum + (tray.items?.reduce((tSum, item) => tSum + (item.price || 0) * (item.quantity || 0), 0) || 0), 0
    ),
    serviceFee: (getters) => Math.round(getters.subtotal * 0.05),
    totalAmount: (getters) => getters.subtotal + getters.serviceFee,
    trayNutritionData: (state) => {
      return state.trays.map(tray => {
        const nutrition = (tray.items || []).reduce((acc, item) => {
          acc.calories += (item.calories || 0) * (item.quantity || 0);
          acc.protein += (item.nutrition?.protein || 0) * (item.quantity || 0);
          acc.carbs += (item.nutrition?.carbs || 0) * (item.quantity || 0);
          acc.fat += (item.nutrition?.fat || 0) * (item.quantity || 0);
          return acc;
        }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
        return {
          id: tray.id,
          name: tray.name,
          items: tray.items || [],
          nutrition,
          score: calculateNutritionScore(tray.items || [])
        };
      });
    }
  },
  actions: {
    initTrays() {
      if (this.trays.length === 0) {
        this.addTray();
      }
    },
    addTray() {
      const nextNum = this.trays.length + 1;
      const newId = `tray-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      this.trays.push({
        id: newId,
        name: `托盤 ${nextNum}`,
        items: []
      });
      if (!this.activeTrayId) {
        this.activeTrayId = newId;
      }
      return newId;
    },
    removeTray(trayId: string) {
      if (this.trays.length <= 1) return;
      this.trays = this.trays.filter(t => t.id !== trayId);
      if (this.activeTrayId === trayId) {
        this.activeTrayId = this.trays[0].id;
      }
    },
    switchTray(trayId: string) {
      this.activeTrayId = trayId;
    },
    addToCart(meal: Meal) {
      this.initTrays();
      const tray = this.trays.find(t => t.id === this.activeTrayId);
      if (tray) {
        const existingItem = tray.items.find(item => item.id === meal.id);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          tray.items.push({ ...meal, quantity: 1 });
        }
      }
    },
    removeFromCart(trayId: string, mealId: string) {
      const tray = this.trays.find(t => t.id === trayId);
      if (tray) {
        tray.items = tray.items.filter(item => item.id !== mealId);
      }
    },
    updateQuantity(trayId: string, mealId: string, quantity: number) {
      const tray = this.trays.find(t => t.id === trayId);
      if (tray) {
        const item = tray.items.find(item => item.id === mealId);
        if (item) {
          item.quantity = Math.max(1, quantity);
        }
      }
    },
    // New Action: Move item between trays
    moveItemBetweenTrays(fromTrayId: string, toTrayId: string, mealId: string) {
      if (fromTrayId === toTrayId) return;
      
      const fromTray = this.trays.find(t => t.id === fromTrayId);
      const toTray = this.trays.find(t => t.id === toTrayId);
      
      if (fromTray && toTray) {
        const itemIndex = fromTray.items.findIndex(item => item.id === mealId);
        if (itemIndex !== -1) {
          const [item] = fromTray.items.splice(itemIndex, 1);
          
          const existingInToTray = toTray.items.find(i => i.id === mealId);
          if (existingInToTray) {
            existingInToTray.quantity += item.quantity;
          } else {
            toTray.items.push(item);
          }
        }
      }
    },
    clearCart() {
      this.trays = [];
      this.activeTrayId = '';
      this.initTrays();
    }
  }
});
