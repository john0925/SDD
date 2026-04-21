<template>
  <section class="mb-10 sticky top-20 z-40 bg-surface/90 backdrop-blur-md py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
    <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
      <button 
        v-for="category in categories" 
        :key="category.id"
        @click="selectCategory(category.id)"
        :class="[
          'snap-start shrink-0 px-6 py-2.5 rounded-full font-label text-sm font-semibold transition-all',
          selectedId === category.id 
            ? 'bg-primary text-on-primary shadow-[0_-4px_24px_rgba(27,28,23,0.06)]' 
            : 'bg-surface-container-highest text-on-surface-variant hover:bg-secondary-container'
        ]"
      >
        {{ category.label }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const categories = [
  { id: 'all', label: '全部' },
  { id: 'none', label: '無碳' },
  { id: 'low', label: '低碳' },
  { id: 'high', label: '高碳' }
];

const selectedId = ref('all');
const emit = defineEmits(['filterChanged']);

const selectCategory = (id: string) => {
  selectedId.value = id;
  emit('filterChanged', id);
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
