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

        <!-- Логотип рядом с бургером -->
        <NuxtLink 
          to="/" 
          class="logo-link-side"
          @click="closeMenu"
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

    <!-- Основной контент -->
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
        <div class="container mx-auto px-4 py-12">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <!-- About Section -->
            <div>
              <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  🌊
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white">Clean Waters</h3>
                  <p class="text-blue-300 text-sm font-medium">ЭКО-ЗАЩИТА ОЗЁР ПЕТРОПАВЛОВСКА</p>
                </div>
              </div>
              <p class="text-blue-100 text-lg leading-relaxed mb-6">
                Общественная инициатива по защите и восстановлению озёр города Петропавловска.
                Мы создаём устойчивое экологическое будущее вместе.
              </p>
              
              <!-- Статистика -->
              <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="text-center p-4 bg-blue-800/30 rounded-xl border border-blue-700/50">
                  <div class="text-2xl font-bold text-white mb-1">24+</div>
                  <div class="text-xs text-blue-300">Проектов</div>
                </div>
                <div class="text-center p-4 bg-blue-800/30 rounded-xl border border-blue-700/50">
                  <div class="text-2xl font-bold text-white mb-1">8</div>
                  <div class="text-xs text-blue-300">Озёр</div>
                </div>
                <div class="text-center p-4 bg-blue-800/30 rounded-xl border border-blue-700/50">
                  <div class="text-2xl font-bold text-white mb-1">150+</div>
                  <div class="text-xs text-blue-300">Волонтёров</div>
                </div>
              </div>
            </div>

            <!-- Contacts Section -->
            <div>
              <h4 class="text-white font-bold text-lg mb-6 pb-2 border-b border-blue-700/50">Контакты</h4>
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <Mail class="w-5 h-5 text-blue-400" />
                  <div>
                    <div class="text-blue-300 text-sm">Email</div>
                    <div class="text-white">sample@email.com</div>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <Phone class="w-5 h-5 text-blue-400" />
                  <div>
                    <div class="text-blue-300 text-sm">Телефон</div>
                    <div class="text-white">+7 (XXX) XXX-XXX</div>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <MapPin class="w-5 h-5 text-blue-400" />
                  <div>
                    <div class="text-blue-300 text-sm">Адрес</div>
                    <div class="text-white">г. Петропавловск, Казахстан</div>
                  </div>
                </div>
              </div>

              <!-- Соцсети -->
              <div class="mt-6">
                <h5 class="text-white font-semibold mb-4">Мы в соцсетях</h5>
                <div class="flex gap-3">
                  <a 
                    href="https://aim-hktn.netlify.app/" 
                    class="w-12 h-12 bg-blue-800/30 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors border border-blue-700/50"
                    aria-label="Netlify"
                  >
                    <Monitor class="w-5 h-5 text-blue-400" />
                  </a>
                  <a 
                    href="https://github.com/emngr256/hakaton/" 
                    class="w-12 h-12 bg-blue-800/30 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors border border-blue-700/50"
                    aria-label="Github"
                  >
                    <Github class="w-5 h-5 text-blue-400" />
                  </a>
                  <a 
                    href="https://github.com/mansur2286969sgma/hakaton-lakes-back" 
                    class="w-12 h-12 bg-blue-800/30 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors border border-blue-700/50"
                    aria-label="Github"
                  >
                    <Github class="w-5 h-5 text-blue-400" />
                  </a>
                </div>
              </div>
            </div>

            <!-- Навигация -->
            <div>
              <h4 class="text-white font-bold text-lg mb-6 pb-2 border-b border-blue-700/50">Навигация</h4>
              <nav class="space-y-3">
                <NuxtLink 
                  v-for="item in menuItems"
                  :key="item.path"
                  :to="item.path"
                  class="flex items-center gap-3 text-blue-200 hover:text-white transition-colors group"
                >
                  <span class="text-lg">{{ item.icon }}</span>
                  <span>{{ item.label }}</span>
                  <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                </NuxtLink>
              </nav>
            </div>
          </div>

          <!-- Copyright Section -->
          <div class="border-t border-blue-800/50 pt-8">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
              <div class="text-center md:text-left">
                <p class="text-blue-300">
                  © {{ currentYear }} Clean Waters. С любовью к природе ❤️
                </p>
              </div>

              <div class="flex flex-wrap justify-center gap-4">
                <NuxtLink 
                  to="/policy" 
                  class="text-blue-400 hover:text-white transition-colors text-sm"
                >
                  Политика конфиденциальности
                </NuxtLink>
                <NuxtLink 
                  to="/conditions" 
                  class="text-blue-400 hover:text-white transition-colors text-sm"
                >
                  Условия использования
                </NuxtLink>
              </div>

              <!-- Кнопка наверх -->
              <button 
                @click="scrollToTop"
                class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-500 transition-colors text-white"
                aria-label="Вернуться наверх"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
import { Mail, Phone, MapPin, Youtube, Github, Monitor } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from '#app'
import { useAuth } from '@/composables/useAuth'  // Импорт

const route = useRoute()
// Получаем всё из useAuth
const { isAdmin, isLoading, adminLogin, adminLogout, checkAdminAuth } = useAuth()

// Состояния
const menuOpen = ref(false)
const showAdminLogin = ref(false)  // Только для управления модалкой

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

// Функции управления меню
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
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
    // Используем adminLogin из useAuth
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
  // Используем adminLogout из useAuth
  adminLogout()
  alert('👋 Вы вышли из системы')
}

// Закрытие меню по Escape
onMounted(() => {
  // Проверяем авторизацию при загрузке
  checkAdminAuth()
  
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

// Закрытие меню при изменении маршрута
watch(() => route.path, () => {
  closeMenu()
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