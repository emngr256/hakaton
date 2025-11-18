<template>
  <div>
    <header class="relative w-full bg-transparent py-2 z-50">
      <!-- Полупрозрачная кнопка меню -->
      <div class="flex items-center justify-start px-4">
        <button 
          @click="toggleMenu"
          class="p-3 bg-black/30 backdrop-blur-sm rounded-full shadow-lg hover:bg-black/50 transition-all duration-300 border border-white/20"
          aria-label="Открыть меню"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              v-if="!menuOpen"
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path 
              v-else
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Выпадающее меню -->
      <div 
        v-show="menuOpen"
        class="absolute top-12 left-4 bg-black/70 backdrop-blur-md text-white rounded-xl shadow-2xl py-3 min-w-48 z-50 border border-white/20"
      >
        <NuxtLink 
          to="/" 
          class="block px-4 py-3 hover:bg-white/20 transition-all duration-200 border-b border-white/10"
          @click="menuOpen = false"
        >
          Home
        </NuxtLink>
        
        <NuxtLink 
          to="/map" 
          class="block px-4 py-3 hover:bg-white/20 transition-all duration-200 border-b border-white/10"
          @click="menuOpen = false"
        >
          Map
        </NuxtLink>
        
        <NuxtLink 
          to="/temperature" 
          class="block px-4 py-3 hover:bg-white/20 transition-all duration-200 border-b border-white/10"
          @click="menuOpen = false"
        >
          Temperature
        </NuxtLink>
        
        <NuxtLink 
          to="/water-level" 
          class="block px-4 py-3 hover:bg-white/20 transition-all duration-200 border-b border-white/10"
          @click="menuOpen = false"
        >
          Water Level
        </NuxtLink>
        
        <NuxtLink 
          to="/infection" 
          class="block px-4 py-3 hover:bg-white/20 transition-all duration-200 border-b border-white/10"
          @click="menuOpen = false"
        >
          Methane Infection
        </NuxtLink>
      </div>

      <!-- Overlay для закрытия меню -->
      <div 
        v-show="menuOpen"
        class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        @click="menuOpen = false"
      ></div>
    </header>

    <main class="p-5 w-full min-h-screen relative overflow-hidden">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>