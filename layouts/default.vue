<template>
  <div class="min-h-screen">
    <!-- Фиксированный header -->
    <header 
      ref="headerRef"
      class="fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ease-in-out bg-gradient-to-br from-gray-900 via-blue-900 to-emerald-900 shadow-lg"
      :class="[
        headerHidden ? '-translate-y-full' : 'translate-y-0',
        isCompact ? 'py-1' : 'py-2'
      ]"
      style="backdrop-filter: blur(8px);"
    >
      <!-- Индикатор скролла -->
      <div 
        class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300"
        :style="{ transform: `scaleX(${scrollProgress})` }"
      ></div>
      
      <!-- Кнопка меню и логотип -->
      <div class="flex items-center justify-start px-4 gap-4">
        <!-- Кнопка меню -->
        <button 
          @click="toggleMenu"
          class="menu-button group"
          :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'"
          :aria-expanded="menuOpen"
          :style="{
            backgroundColor: isTransparent ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.5)'
          }"
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

        <!-- Логотип рядом с бургером -->
        <NuxtLink 
          to="/" 
          class="logo-link-side"
          @click="closeMenu"
          :style="{
            backgroundColor: isTransparent ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.5)'
          }"
        >
          <span class="logo-text">Clean Waters</span>
        </NuxtLink>
      </div>

      <!-- Выпадающее меню -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 transform -translate-y-4"
        leave-to-class="opacity-0 transform -translate-y-4"
      >
        <div 
          v-show="menuOpen"
          class="dropdown-menu"
        >
          <!-- ... меню остается без изменений ... -->
          <div class="menu-header">
            <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span class="text-white text-lg">🌊</span>
            </div>
            <div>
              <div class="font-semibold text-white">Clean Waters</div>
              <div class="text-xs text-blue-300">Петропавловск</div>
            </div>
          </div>

          <div class="menu-divider"></div>

          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.path"
            :to="item.path" 
            class="menu-item group"
            @click="closeMenu"
            :class="{ 'active': $route.path === item.path }"
          >
            <div class="menu-item-content">
              <span class="menu-icon">{{ item.icon }}</span>
              <span class="menu-label">{{ item.label }}</span>
            </div>
            <div class="menu-arrow">→</div>
          </NuxtLink>

          <div class="menu-divider"></div>

          <!-- Кнопка админ-панели -->
          <div class="px-4 py-3">
            <button 
              v-if="!isAdmin && !isLoading"
              @click="showAdminLogin = true"
              class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
            >
              <span>🔐</span>
              Админ-панель
            </button>
            
            <button 
              v-else-if="isAdmin"
              @click="logout"
              class="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
            >
              <span>🚪</span>
              Выйти
            </button>

            <button 
              v-else
              disabled
              class="w-full flex items-center justify-center gap-2 bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 cursor-not-allowed"
            >
              <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Проверка...
            </button>
          </div>
        </div>
      </transition>

      <!-- Overlay для закрытия меню -->
      <div 
        v-show="menuOpen"
        class="menu-overlay"
        @click="closeMenu"
      ></div>
    </header>

    <!-- Основной контент с отступом под хедер -->
    <main class="min-h-screen pt-16">
      <slot />
    </main>

<!-- Footer -->
<footer id="contact" class="bg-gradient-to-br from-gray-900 via-blue-900 to-emerald-900 text-white relative overflow-hidden">
  <!-- Декоративный фон -->
  <div class="absolute inset-0 opacity-10">
    <div class="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
    <div class="absolute bottom-10 right-10 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"></div>
  </div>
  
  <div class="relative z-10">
    <!-- Компактный футер -->
    <div class="container mx-auto px-4 py-6 md:py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <!-- Логотип и описание -->
        <div class="md:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center text-xl shadow-lg">
              🌊
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Clean Waters</h3>
              <p class="text-blue-300 text-xs font-medium">ЭКО-ЗАЩИТА ОЗЁР ПЕТРОПАВЛОВСКА</p>
            </div>
          </div>
          <p class="text-blue-100 text-sm leading-relaxed">
            Общественная инициатива по защите и восстановлению озёр города Петропавловска. Мы создаём устойчивое экологическое будущее вместе.
          </p>
          
          <!-- Мини-статистика -->
          <div class="grid grid-cols-3 gap-2 mt-4">
            <div class="text-center p-3 bg-blue-800/20 rounded-lg border border-blue-700/30">
              <div class="text-lg font-bold text-white">24+</div>
              <div class="text-xs text-blue-300">Проектов</div>
            </div>
            <div class="text-center p-3 bg-blue-800/20 rounded-lg border border-blue-700/30">
              <div class="text-lg font-bold text-white">8</div>
              <div class="text-xs text-blue-300">Озёр</div>
            </div>
            <div class="text-center p-3 bg-blue-800/20 rounded-lg border border-blue-700/30">
              <div class="text-lg font-bold text-white">150+</div>
              <div class="text-xs text-blue-300">Волонтёров</div>
            </div>
          </div>
        </div>

        <!-- Контакты -->
        <div>
          <h4 class="text-white font-bold text-base mb-4 pb-2 border-b border-blue-700/30">Контакты</h4>
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <Mail class="w-4 h-4 text-blue-400" />
              <div class="text-sm">
                <div class="text-blue-300 text-xs">Email</div>
                <div class="text-white">mansur@email.com</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <Phone class="w-4 h-4 text-blue-400" />
              <div class="text-sm">
                <div class="text-blue-300 text-xs">Телефон</div>
                <div class="text-white">+7 (XXX) XXX-XXX</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Навигация -->
        <div>
          <h4 class="text-white font-bold text-base mb-4 pb-2 border-b border-blue-700/30">Навигация</h4>
          <nav class="space-y-2">
            <NuxtLink 
              v-for="item in menuItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm group"
            >
              <span class="text-base">{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </NuxtLink>
          </nav>
        </div>
      </div>

      <!-- Соцсети и ссылки -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 border-t border-blue-800/30">
        <!-- Соцсети -->
        <div class="flex gap-2">
          <a 
            href="https://aim-hktn.netlify.app/" 
            class="w-10 h-10 bg-blue-800/20 rounded-lg flex items-center justify-center hover:bg-blue-700/30 transition-colors border border-blue-700/30"
            aria-label="Netlify"
            title="Netlify"
          >
            <Monitor class="w-4 h-4 text-blue-400" />
          </a>
          <a 
            href="https://github.com/emngr256/hakaton/" 
            class="w-10 h-10 bg-blue-800/20 rounded-lg flex items-center justify-center hover:bg-blue-700/30 transition-colors border border-blue-700/30"
            aria-label="Frontend Github"
            title="Frontend"
          >
            <Github class="w-4 h-4 text-blue-400" />
          </a>
          <a 
            href="https://github.com/mansur2286969sgma/hakaton-lakes-back" 
            class="w-10 h-10 bg-blue-800/20 rounded-lg flex items-center justify-center hover:bg-blue-700/30 transition-colors border border-blue-700/30"
            aria-label="Backend Github"
            title="Backend"
          >
            <Github class="w-4 h-4 text-blue-400" />
          </a>
        </div>

        <!-- Копирайт -->
        <div class="text-center">
          <p class="text-blue-300 text-sm">
            © {{ currentYear }} Clean Waters. С любовью к природе ❤️
          </p>
        </div>

        <!-- Юридические ссылки -->
        <div class="flex gap-4">
          <NuxtLink 
            to="/policy" 
            class="text-blue-400 hover:text-white transition-colors text-xs"
          >
            Политика
          </NuxtLink>
          <NuxtLink 
            to="/conditions" 
            class="text-blue-400 hover:text-white transition-colors text-xs"
          >
            Условия
          </NuxtLink>
          <!-- Кнопка наверх -->
          <button 
            @click="scrollToTop"
            class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors text-white ml-2"
            aria-label="Вернуться наверх"
            title="Наверх"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</footer>

    <!-- Модальное окно авторизации -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 scale-95"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="showAdminLogin" 
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[10001] pointer-events-auto"
      >
        <div class="admin-modal">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <span>🔐</span>
            </div>
            Авторизация администратора
          </h2>
          
          <form @submit.prevent="login" class="space-y-5">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-300">Логин</label>
              <input 
                v-model="adminCredentials.login"
                type="text" 
                class="input-admin"
                placeholder="admin"
                required
                :disabled="isLoading"
              >
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-300">Пароль</label>
              <input 
                v-model="adminCredentials.password"
                type="password" 
                class="input-admin"
                placeholder="admin123"
                required
                :disabled="isLoading"
              >
            </div>
            
            <div class="flex gap-3 pt-2">
              <button 
                type="submit"
                :disabled="isLoading"
                class="btn-submit"
              >
                <span v-if="isLoading">
                  <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Вход...
                </span>
                <span v-else>Войти</span>
              </button>
              <button 
                type="button"
                @click="showAdminLogin = false"
                :disabled="isLoading"
                class="btn-cancel"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { Mail, Phone, MapPin, Github, Monitor } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from '#app'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const { isAdmin, isLoading, adminLogin, adminLogout, checkAdminAuth } = useAuth()

// Состояния
const menuOpen = ref(false)
const showAdminLogin = ref(false)
const headerHidden = ref(false)
const isTransparent = ref(true)
const isCompact = ref(false)
const isMobile = ref(false)
const scrollProgress = ref(0)

// Refs
const headerRef = ref<HTMLElement>()
let lastScrollY = ref(0)
let scrollTimeout: NodeJS.Timeout | null = null

// Текущий год
const currentYear = ref(new Date().getFullYear())

// Данные для формы входа
const adminCredentials = ref({
  login: '',
  password: ''
})

// Элементы меню
const menuItems = [
  { path: '/', label: 'Главная', icon: '🏠' },
  { path: '/dropdownbar/map', label: 'Карта', icon: '🗺️' },
  { path: '/dropdownbar/temperature', label: 'Температура', icon: '🌡️' },
  { path: '/dropdownbar/water-level', label: 'Уровень воды', icon: '💧' },
  { path: '/dropdownbar/infection', label: 'Заражение', icon: '⚠️' },
  { path: '/suggestions', label: 'Предложения', icon: '📋' },
]

// Определяем мобильное устройство
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

// Улучшенная обработка скролла
const handleScroll = () => {
  const currentScrollY = window.scrollY
  const headerHeight = headerRef.value?.offsetHeight || 64
  
  // Прогресс скролла для индикатора
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? currentScrollY / docHeight : 0

  // На карте делаем хедер полупрозрачным
  if (route.path.includes('/map')) {
    isTransparent.value = true
    isCompact.value = currentScrollY > 50
  } else {
    // На других страницах - прозрачный вверху, затем фон
    isTransparent.value = currentScrollY < 50
    isCompact.value = currentScrollY > 100
  }

  // Улучшенная логика скрытия/показа
  const scrollDelta = currentScrollY - lastScrollY.value
  
  if (scrollDelta > 0 && currentScrollY > 100 && !menuOpen.value) {
    // Скроллим вниз и не в самом верху - скрываем
    headerHidden.value = true
  } else if (scrollDelta < 0 || currentScrollY < 100 || menuOpen.value) {
    // Скроллим вверх или вверху или меню открыто - показываем
    headerHidden.value = false
  }

  lastScrollY.value = currentScrollY

  // Автоматическое скрытие через 3 секунды бездействия (только на десктопе)
  if (!isMobile.value && currentScrollY > 100 && !headerHidden.value && !menuOpen.value) {
    if (scrollTimeout) clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      if (currentScrollY > 100 && !menuOpen.value) {
        headerHidden.value = true
      }
    }, 3000)
  }
}

// Показываем хедер при наведении
const handleMouseEnter = () => {
  if (!isMobile.value) {
    headerHidden.value = false
    if (scrollTimeout) clearTimeout(scrollTimeout)
  }
}

// Функции управления меню
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) {
    headerHidden.value = false
    document.body.style.overflow = 'hidden' // Блокируем скролл при открытом меню
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  menuOpen.value = false
  document.body.style.overflow = ''
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  headerHidden.value = false
}

// Вход через форму
const login = async () => {
  try {
    const result = await adminLogin(adminCredentials.value)
    
    if (result.success) {
      showAdminLogin.value = false
      adminCredentials.value = { login: '', password: '' }
      alert('✅ Успешный вход в админ-панель!')
    } else {
      alert(`❌ ${result.error}`)
    }
  } catch (error) {
    console.error('Ошибка авторизации:', error)
    alert('❌ Ошибка при авторизации')
  }
}

// Выход
const logout = () => {
  adminLogout()
  alert('👋 Вы вышли из системы')
}

// Инициализация
onMounted(() => {
  checkMobile()
  checkAdminAuth()
  
  // Добавляем обработчики
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', checkMobile)
  if (headerRef.value) {
    headerRef.value.addEventListener('mouseenter', handleMouseEnter)
  }
  
  // Закрытие меню по Escape
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && menuOpen.value) {
      closeMenu()
    }
    if (e.key === 'Escape' && showAdminLogin.value) {
      showAdminLogin.value = false
    }
  }
  window.addEventListener('keydown', handleEscape)
  
  // Скрываем хедер при начале скролла вниз на мобильных
  if (isMobile.value) {
    let touchStartY = 0
    window.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY
    }, { passive: true })
    
    window.addEventListener('touchmove', (e) => {
      const touchY = e.touches[0].clientY
      const deltaY = touchY - touchStartY
      
      if (deltaY < -20 && window.scrollY > 100) {
        // Скроллим вниз
        headerHidden.value = true
      } else if (deltaY > 20) {
        // Скроллим вверх
        headerHidden.value = false
      }
    }, { passive: true })
  }
  
  // Очистка при размонтировании
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', checkMobile)
    if (headerRef.value) {
      headerRef.value.removeEventListener('mouseenter', handleMouseEnter)
    }
    window.removeEventListener('keydown', handleEscape)
    if (scrollTimeout) clearTimeout(scrollTimeout)
    document.body.style.overflow = '' // Восстанавливаем скролл
  })
})

// Закрытие меню при изменении маршрута
watch(() => route.path, () => {
  closeMenu()
  
  // Сбрасываем состояние хедера при переходе
  setTimeout(() => {
    const currentScrollY = window.scrollY
    isTransparent.value = currentScrollY < 50
    isCompact.value = currentScrollY > 100
    headerHidden.value = false
  }, 100)
})

// Отслеживаем открытие/закрытие меню для блокировки скролла
watch(menuOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
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
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.menu-button:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.menu-button:active {
  transform: scale(0.95);
}

/* Выпадающее меню */
.dropdown-menu {
  position: absolute;
  top: 72px;
  left: 16px;
  background-color: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  color: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  padding: 12px 0;
  min-width: 280px;
  z-index: 10001;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

/* Заголовок меню */
.menu-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
}

.menu-divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 8px 16px;
}

/* Элемент меню */
.menu-item {
  display: block;
  margin: 4px 8px;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-item:active {
  background-color: rgba(255, 255, 255, 0.15);
}

.menu-item.active {
  background-color: rgba(59, 130, 246, 0.3);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.menu-item-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.menu-label {
  font-weight: 500;
}

.menu-arrow {
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.2s ease;
  color: rgb(59, 130, 246);
}

.menu-item:hover .menu-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Overlay */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 9998;
}

/* Логотип рядом с бургером */
.logo-link-side {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.logo-link-side:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.logo-text {
  color: white;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.025em;
}

/* Модальное окно */
.admin-modal {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 32px;
  max-width: 400px;
  width: calc(100% - 2rem);
  margin: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.input-admin {
  width: 100%;
  padding: 14px;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-admin:focus {
  outline: none;
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-submit,
.btn-cancel {
  flex: 1;
  padding: 14px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-submit {
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
  color: white;
  border: none;
}

.btn-submit:hover:not(:disabled) {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  transform: translateY(-1px);
}

.btn-cancel {
  background: rgba(71, 85, 105, 0.8);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-cancel:hover:not(:disabled) {
  background: rgba(100, 116, 139, 0.8);
}

/* Адаптивность */
@media (max-width: 640px) {
  .dropdown-menu {
    left: 8px;
    right: 8px;
  }
  
  .logo-link-side {
    display: flex;
  }
}
</style>