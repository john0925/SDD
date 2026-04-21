<template>
  <nav class="md:hidden bg-white/70 backdrop-blur-lg docked full-width bottom-0 rounded-t-3xl shadow-[0_-4px_24px_rgba(27,28,23,0.06)] fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 font-body text-[11px] font-semibold tracking-tight">
    <a class="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-2xl px-5 py-2 hover:opacity-80 transition-opacity" href="#">
      <span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 1;">home</span>
      <span>首頁</span>
    </a>
    <a class="flex flex-col items-center justify-center text-on-surface/50 px-5 py-2 hover:opacity-80 transition-opacity" href="#">
      <span class="material-symbols-outlined mb-1">explore</span>
      <span>探索</span>
    </a>
    <a class="flex flex-col items-center justify-center text-on-surface/50 px-5 py-2 hover:opacity-80 transition-opacity" href="#">
      <span class="material-symbols-outlined mb-1">shopping_bag</span>
      <span>訂單</span>
    </a>
    <a class="flex flex-col items-center justify-center text-on-surface/50 px-5 py-2 hover:opacity-80 transition-opacity" href="#">
      <span class="material-symbols-outlined mb-1">person</span>
      <span>個人檔案</span>
    </a>
  </nav>
</template>

<script setup lang="ts">
</script>
