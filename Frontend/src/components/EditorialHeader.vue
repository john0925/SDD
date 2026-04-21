<template>
  <header class="mb-16 relative">
    <div class="py-16 px-8 md:px-16 flex flex-col md:flex-row items-center gap-12 bg-surface-container-low rounded-[2rem] overflow-visible relative">
      <!-- Signature Texture Gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-container/5 rounded-[2rem] -z-10"></div>
      
      <div class="flex-1 space-y-6 z-10">
        <h1 class="font-headline text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary tracking-tight leading-[1.1]">
          每一口，都是<br/><span class="text-primary-container">精準計算</span>的健康
        </h1>
        <p class="font-body text-on-surface-variant text-xl md:text-2xl max-w-xl leading-relaxed">
          與專業營養師合作，為您的健康旅程精心設計每一份營養餐點。
        </p>
      </div>
      
      <!-- Intentional Asymmetry: Image breaking bounds -->
      <div class="w-full md:w-2/5 aspect-square md:aspect-auto md:h-[400px] relative mt-8 md:mt-0">
        <div class="absolute inset-0 bg-white/20 backdrop-blur-3xl rounded-3xl -rotate-6 scale-105"></div>
        <img 
          alt="Healthy Meal Display" 
          class="w-full h-full object-cover rounded-3xl shadow-2xl relative z-10 md:-translate-y-8 md:translate-x-8 hover:translate-y-0 hover:translate-x-0 transition-transform duration-700" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2H2WYDkX9rbB9nPoIwqABh9lzqMb97P2tguh3ASCedtO5aurt9UCS_6i4H_aSGQ9jxQ1Akou9UzBxLddqcnCZNmsE0FO7prz2Qp1BFeCjo5aF5nYFHr_1m5q37-JOmeAzSPsl0y6SxKgKTw2JsLScCdvy6wStYKVb3B_Ph2cpXIsz3vOTZ0cKULu9MoCBhDTUXS51eoWADw73ycTUuu9l-ilDhKy6n6LWYeGWHm7co2KjhPWJZTSlcdIUtrlflhF2eetg76BEGo03"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>
