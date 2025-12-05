<template>
  <div class="min-h-screen">
    <!-- Минималистичный хедер только с кнопками -->
    <div class="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      <!-- Контейнер для кнопок - видимый и кликабельный -->
      <div class="relative h-0">
        <!-- Кнопка меню и логотип -->
        <div class="absolute top-2 left-2 flex items-center gap-2 pointer-events-auto">
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

          <!-- Логотип рядом с бургером -->
          <NuxtLink 
            to="/" 
            class="logo-link-side"
            @click="closeMenu"
          >
            <span class="logo-text">Clean Waters</span>
          </NuxtLink>
        </div>
      </div>
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
        class="fixed top-16 left-4 z-[10001]"
      >
        <div 
          class="dropdown-menu"
        >
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
              class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 pointer-events-auto"
            >
              <span>🔐</span>
              Админ-панель
            </button>
            
            <button 
              v-else-if="isAdmin"
              @click="logout"
              class="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 pointer-events-auto"
            >
              <span>🚪</span>
              Выйти
            </button>

            <button 
              v-else
              disabled
              class="w-full flex items-center justify-center gap-2 bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 cursor-not-allowed pointer-events-auto"
            >
              <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Проверка...
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Overlay для закрытия меню -->
    <div 
      v-show="menuOpen"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]"
      @click="closeMenu"
    ></div>

    <!-- Основной контент без отступа под хедер -->
    <main class="min-h-screen">
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
const isMobile = ref(false)

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

// Функции управления меню
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) {
    document.body.style.overflow = 'hidden'
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
  
  window.addEventListener('resize', checkMobile)
  
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
  
  // Очистка при размонтировании
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
    window.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = ''
  })
})

// Закрытие меню при изменении маршрута
watch(() => route.path, () => {
  closeMenu()
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

/* Хедер полностью скрыт, только кнопки видны */
.fixed.top-0 {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
}

/* Кнопка меню */
.menu-button {
  padding: 12px;
  background-color: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.menu-button:hover {
  background-color: rgba(30, 41, 59, 0.9);
  transform: translateY(-1px);
  box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.4);
}

.menu-button:active {
  transform: scale(0.95);
}

/* Логотип рядом с бургером */
.logo-link-side {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.logo-link-side:hover {
  background-color: rgba(30, 41, 59, 0.9);
  transform: translateY(-1px);
  box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.4);
}

.logo-text {
  color: white;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.025em;
}

/* Выпадающее меню */
.dropdown-menu {
  background-color: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  color: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  padding: 12px 0;
  min-width: 280px;
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
  cursor: pointer;
  text-decoration: none;
  color: inherit;
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
  cursor: pointer;
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