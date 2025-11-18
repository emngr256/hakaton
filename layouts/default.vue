<template>
  <div class="min-h-screen">
    <!-- Фиксированный header -->
    <header class="fixed top-0 left-0 right-0 bg-transparent py-2 z-[9999]">
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
        class="absolute top-12 left-4 bg-black/70 backdrop-blur-md text-white rounded-xl shadow-2xl py-3 min-w-48 z-[9999] border border-white/20"
      >
        <NuxtLink 
          to="/" 
          class="block px-4 py-3 hover:bg-white/20 transition-all duration-200 border-b border-white/10"
          @click="menuOpen = false"
        >
          🏠 Home
        </NuxtLink>
        
        <NuxtLink 
          to="/dropdownbar/map" 
          class="block px-4 py-3 hover:bg-white/20 transition-all duration-200 border-b border-white/10"
          @click="menuOpen = false"
        >
          🗺️ Map
        </NuxtLink>
        
        <NuxtLink 
          to="/dropdownbar/temperature" 
          class="block px-4 py-3 hover:bg-white/20 transition-all duration-200 border-b border-white/10"
          @click="menuOpen = false"
        >
          🌡️ Temperature
        </NuxtLink>
        
        <NuxtLink 
          to="/dropdownbar/water-level" 
          class="block px-4 py-3 hover:bg-white/20 transition-all duration-200 border-b border-white/10"
          @click="menuOpen = false"
        >
          💧 Water Level
        </NuxtLink>
        
        <NuxtLink 
          to="/dropdownbar/infection" 
          class="block px-4 py-3 hover:bg-white/20 transition-all duration-200"
          @click="menuOpen = false"
        >
          🦠 Infection
        </NuxtLink>
      </div>

      <!-- Overlay для закрытия меню -->
      <div 
        v-show="menuOpen"
        class="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
        @click="menuOpen = false"
      ></div>
    </header>

    <!-- Основной контент БЕЗ отступов -->
    <main class="min-h-screen">
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

<style>
/* Убираем стандартные отступы браузера */
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Убираем скроллбар если не нужен */
body {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

body::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>