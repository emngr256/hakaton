<template>
  <div class="min-h-screen">
    <!-- Фиксированный header -->
    <header class="fixed top-0 left-0 right-0 py-2 z-[9999]">
      <!-- Кнопка меню и логотип -->
      <div class="flex items-center justify-start px-4 gap-4">
        <!-- Кнопка меню -->
        <button 
          @click="toggleMenu"
          class="menu-button group"
          :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'"
          :aria-expanded="menuOpen"
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

        <!-- Логотип рядом с бургером - СТАНДАРТНЫЙ РАЗМЕР -->
        <NuxtLink 
          to="/" 
          class="logo-link-side"
          @click="closeMenu"
        >
          <span class="logo-text">Clean Waters</span>
        </NuxtLink>
      </div>

      <!-- Выпадающее меню -->
      <div 
        v-show="menuOpen"
        class="dropdown-menu"
      >
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path" 
          class="menu-item"
          @click="closeMenu"
        >
          <span v-if="item.icon" class="mr-2">{{ item.icon }}</span>
          {{ item.label }}
        </NuxtLink>
      </div>

      <!-- Overlay для закрытия меню -->
      <div 
        v-show="menuOpen"
        class="menu-overlay"
        @click="closeMenu"
      ></div>
    </header>

    <!-- Основной контент -->
    <main class="min-h-screen">
      <slot />
    </main>

    <!-- Footer -->
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
                <div class="font-semibold text-white">Мансур и Алан</div>
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
              © {{ currentYear }} Все права защищены.
            </p>
            <div class="flex gap-6 text-sm">
              <button @click="$router.push('/policy')" class="hover:text-white transition-colors px-4 py-2 hover:bg-blue-500">Политика конфиденциальности</button>
              <button @click="$router.push('/conditions')" class="hover:text-white transition-colors px-4 py-2 hover:bg-blue-500">Условия использования</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Mail, Phone, MapPin, Youtube, Github, Monitor } from 'lucide-vue-next'
import Conditions from '~/pages/conditions.vue'
import Policy from '~/pages/policy.vue'

// Состояние меню
const menuOpen = ref(false)

// Текущая дата и год
const currentDate = ref(new Date().toLocaleDateString('ru-RU'))
const currentYear = ref(new Date().getFullYear())

// Элементы меню (легко добавлять/удалять)
const menuItems = [
  { path: '/', label: 'Главная', icon: '🏠' },
  { path: '/dropdownbar/map', label: 'Карта', icon: '🗺️' },
  { path: '/dropdownbar/temperature', label: 'Температура', icon: '🌡️' },
  { path: '/dropdownbar/water-level', label: 'Уровень воды', icon: '💧' },
  { path: '/dropdownbar/infection', label: 'Заражение', icon: '⚠️' },
  { path: '/suggestions', label: 'Предложения', icon: '📋' },
]

// Функции управления меню
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

// Закрытие меню по Escape
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && menuOpen.value) {
      closeMenu()
    }
  }
  window.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
/* Базовые стили */
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Кнопка меню */
.menu-button {
  @apply p-3 bg-black/30 backdrop-blur-sm rounded-full shadow-lg 
         hover:bg-black/50 active:scale-95
         transition-all duration-300 border border-white/20;
}

/* Выпадающее меню */
.dropdown-menu {
  @apply absolute top-12 left-4 
         bg-black/70 backdrop-blur-md text-white 
         rounded-xl shadow-2xl py-1 min-w-48 
         z-[9999] border border-white/20
         overflow-hidden;
}

/* Элемент меню */
.menu-item {
  @apply block px-4 py-3 
         hover:bg-white/20 active:bg-white/30
         transition-all duration-200 
         border-b border-white/10 last:border-b-0
         flex items-center;
}

/* Overlay */
.menu-overlay {
  @apply fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998];
}

/* Логотип рядом с бургером - СТАНДАРТНЫЙ РАЗМЕР */
.logo-link-side {
  @apply hidden md:flex items-center gap-2 px-4 py-2 
         bg-black/30 backdrop-blur-sm rounded-full 
         border border-white/20 shadow-lg
         hover:bg-black/50 transition-all duration-300;
}

.logo-text {
  @apply text-white font-semibold text-lg tracking-wide;
}

/* Footer heading */
h4 {
  @apply text-lg font-semibold;
}
</style>