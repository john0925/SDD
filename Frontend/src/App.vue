<script setup lang="ts">
import TopNavBar from './components/TopNavBar.vue';
import BottomNavBar from './components/BottomNavBar.vue';
</script>

<template>
  <div class="min-h-screen bg-surface font-body antialiased pb-24 md:pb-0">
    <TopNavBar />
    <router-view />
    <BottomNavBar />
  </div>
</template>
