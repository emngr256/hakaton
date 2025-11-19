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
          Главная
        </NuxtLink>
        
        <NuxtLink 
          to="/dropdownbar/map" 
          class="block px-4 py-3 hover:bg-white/20 transition-all duration-200 border-b border-white/10"
          @click="menuOpen = false"
        >
          Карта
        </NuxtLink>
        
        <NuxtLink 
          to="/dropdownbar/temperature" 
          class="block px-4 py-3 hover:bg-white/20 transition-all duration-200 border-b border-white/10"
          @click="menuOpen = false"
        >
          Температура
        </NuxtLink>
        
        <NuxtLink 
          to="/dropdownbar/water-level" 
          class="block px-4 py-3 hover:bg-white/20 transition-all duration-200 border-b border-white/10"
          @click="menuOpen = false"
        >
          Уровень воды
        </NuxtLink>
        
        <NuxtLink 
          to="/dropdownbar/infection" 
          class="block px-4 py-3 hover:bg-white/20 transition-all duration-200"
          @click="menuOpen = false"
        >
          Заражение
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
  <footer id="contact" class="bg-gray-900 text-gray-300 py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- About Section -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span class="text-white">🌊</span>
            </div>
            <div>
              <div class="font-semibold text-white">Чистые Озёра</div>
              <div class="text-xs">Петропавловск</div>
            </div>
          </div>
          <p class="text-sm">
            Общественная инициатива по защите и восстановлению озёр города Петропавловска.
          </p>
        </div>

        <!-- Contacts Section -->
        <div>
          <h4 class="text-white mb-4">Контакты</h4>
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <Mail :size="16" />
              <span class="text-sm">sample@email.com</span>
            </div>
            <div class="flex items-center gap-2">
              <Phone :size="16" />
              <span class="text-sm">+7 (XXX) XXX-XXX</span>
            </div>
            <div class="flex items-center gap-2">
              <MapPin :size="16" />
              <span class="text-sm">г. Петропавловск, Казахстан</span>
            </div>
          </div>
        </div>

        <!-- Social Media Section -->
        <div>
          <h4 class="text-white mb-4">Следите за нами</h4>
          <div class="flex gap-4">
            <a 
              href="https://aim-hktn.netlify.app/" 
              class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              aria-label="Netlify"
            >
              <Monitor :size="20" />
            </a>
            <a 
              href="https://github.com/emngr256/hakaton/" 
              class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              aria-label="Github"
            >
              <Github :size="20" />
            </a>
            <a 
              href="https://youtube.com/" 
              class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              aria-label="Youtube"
            >
              <Youtube :size="20" />
            </a>
          </div>
          <div class="mt-6">
            <p class="text-sm text-gray-400">
              Присоединяйтесь к нашему сообществу и получайте новости о природоохранных мероприятиях.
            </p>
          </div>
        </div>
      </div>

      <!-- Copyright Section -->
      <div class="border-t border-gray-800 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-gray-400">
            © 2025 Чистые Озёра. Все права защищены.
          </p>
          <div class="flex gap-6 text-sm">
            <a href="#" class="hover:text-white transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" class="hover:text-white transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Github, Monitor } from 'lucide-vue-next'
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
h4 {
  @apply text-lg font-semibold;
}
</style>