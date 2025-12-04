<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Заголовок -->
      <div class="text-center mb-10">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="text-5xl">🏞️</span>
          <h1 class="text-4xl font-bold text-gray-800">Озёрные Инициативы</h1>
          <span class="text-5xl">💧</span>
        </div>
        <p class="text-lg text-gray-600">Ваши идеи по сохранению озер Петропавловска</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-6">
        <!-- ЛЕВАЯ КОЛОНКА: Список предложений -->
        <div class="lg:w-2/3 space-y-6">
          <!-- Статистика -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold mb-4">📊 Статистика сообщества</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <div class="text-3xl font-bold text-blue-600">{{ suggestions.length }}</div>
                <div class="text-sm text-gray-600">Всего предложений</div>
              </div>
              <div class="text-center p-4 bg-cyan-50 rounded-lg">
                <div class="text-3xl font-bold text-cyan-600">{{ totalLikes }}</div>
                <div class="text-sm text-gray-600">Всего голосов</div>
              </div>
              <div class="text-center p-4 bg-teal-50 rounded-lg">
                <div class="text-3xl font-bold text-teal-600">{{ uniqueAuthors }}</div>
                <div class="text-sm text-gray-600">Участников</div>
              </div>
              <div class="text-center p-4 bg-sky-50 rounded-lg">
                <div class="text-3xl font-bold text-sky-600">{{ todaySuggestions }}</div>
                <div class="text-sm text-gray-600">Сегодня</div>
              </div>
            </div>
          </div>

          <!-- Категории -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold flex items-center gap-2">
                <span class="text-2xl">🌊</span>
                Категории предложений
              </h2>
              <button 
                v-if="activeCategory !== 'all'"
                @click="activeCategory = 'all'"
                class="text-sm text-blue-500 hover:text-blue-700 font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Сбросить фильтр
              </button>
            </div>
            
            <!-- Категории как горизонтальный список -->
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="category in categories" 
                :key="category.id"
                @click="selectCategory(category.id)"
                class="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300"
                :class="activeCategory === category.id 
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm scale-105' 
                  : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-50/50'"
              >
                <span class="text-lg">{{ category.icon }}</span>
                <div class="text-left">
                  <div class="font-medium text-sm whitespace-nowrap">{{ category.name }}</div>
                  <div class="text-xs text-gray-500">{{ category.count }}</div>
                </div>
              </button>
            </div>
            
            <!-- Активная категория -->
            <div v-if="activeCategory !== 'all'" class="mt-4 p-3 bg-blue-50 rounded-lg">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-xl">{{ getCategoryIcon(activeCategory) }}</span>
                  <span class="font-semibold text-blue-800">
                    {{ getCategoryName(activeCategory) }}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm text-blue-600 bg-white px-2 py-1 rounded-full">
                    {{ filteredSuggestions.length }} предложений
                  </span>
                  <button 
                    @click="activeCategory = 'all'"
                    class="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Список предложений -->
          <div class="space-y-6">
            <div 
              v-for="suggestion in filteredSuggestions" 
              :key="suggestion.id"
              class="bg-white rounded-2xl shadow-lg p-6 relative hover:shadow-xl transition-all duration-300 border-l-4"
              :class="[
                getSuggestionBorder(suggestion.status),
                suggestion.is_pinned ? 'ring-2 ring-yellow-400 bg-yellow-50' : '',
                suggestion.priority === 'high' ? 'bg-red-50' : ''
              ]"
            >
              <!-- Верхняя панель с метками -->
              <div class="flex flex-wrap gap-2 mb-3">
                <span v-if="suggestion.is_pinned" class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                  📌 Закреплено
                </span>
                
                <span v-if="suggestion.priority === 'high'" class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                  🔥 Высокий приоритет
                </span>
                
                <span v-if="suggestion.category" class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {{ getCategoryIcon(suggestion.category) }} {{ getCategoryName(suggestion.category) }}
                </span>
                
                <span class="px-2 py-1 rounded-full text-xs font-medium ml-auto" 
                      :class="getStatusBadge(suggestion.status)">
                  {{ getStatusText(suggestion.status) }}
                </span>
              </div>

              <!-- Контент предложения -->
              <div class="mb-4">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    {{ suggestion.name.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800">{{ suggestion.name }}</h3>
                    <p class="text-sm text-gray-500">{{ formatDate(suggestion.date) }}</p>
                  </div>
                </div>
                <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ suggestion.message }}</p>
              </div>

              <!-- Комментарии -->
              <div v-if="suggestion.comments && suggestion.comments.length > 0" class="mb-4">
                <div class="border-t pt-3">
                  <h4 class="text-sm font-semibold text-gray-700 mb-2">💬 Комментарии ({{ suggestion.comments.length }}):</h4>
                  <div v-for="comment in suggestion.comments" :key="comment.id" class="bg-gray-50 rounded-lg p-3 mb-2">
                    <div class="flex justify-between items-start mb-1">
                      <span class="font-medium text-sm">{{ comment.author }}</span>
                      <span class="text-xs text-gray-500">{{ formatDate(comment.date) }}</span>
                    </div>
                    <p class="text-sm text-gray-700">{{ comment.text }}</p>
                  </div>
                </div>
              </div>

              <!-- Форма комментария -->
              <div v-if="user" class="mb-4">
                <div class="flex gap-2">
                  <input
                    v-model="commentTexts[suggestion.id]"
                    type="text"
                    :placeholder="`Написать комментарий как ${user.name}...`"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    @keypress.enter="addComment(suggestion.id)"
                  />
                  <button
                    @click="addComment(suggestion.id)"
                    class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
                    :disabled="!commentTexts[suggestion.id]?.trim()"
                    :class="!commentTexts[suggestion.id]?.trim() ? 'opacity-50 cursor-not-allowed' : ''"
                  >
                    💬 Отправить
                  </button>
                </div>
              </div>

              <!-- Сообщение для неавторизованных -->
              <div v-else class="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                <p class="text-yellow-800 text-sm">
                  🔒 Чтобы оставить комментарий, 
                  <button @click="showLoginModal = true" class="text-blue-600 hover:text-blue-700 font-medium underline">
                    войдите в систему
                  </button>
                </p>
              </div>

              <!-- Нижняя панель действий -->
              <div class="flex justify-between items-center pt-3 border-t">
                <!-- Лайки -->
                <button 
                  @click="likeSuggestion(suggestion.id)"
                  :disabled="hasLiked(suggestion.id)"
                  class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                  :class="hasLiked(suggestion.id) 
                    ? 'bg-red-100 text-red-700 cursor-not-allowed' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'"
                >
                  <span>💧</span>
                  <span>{{ suggestion.likes || 0 }}</span>
                  <span v-if="hasLiked(suggestion.id)">✓</span>
                </button>

                <!-- Кнопки админа -->
                <div v-if="isAdmin" class="flex gap-2 flex-wrap">
                  <button 
                    @click="togglePin(suggestion.id)"
                    class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm hover:bg-yellow-200 transition-colors"
                  >
                    {{ suggestion.is_pinned ? '📌 Открепить' : '📌 Закрепить' }}
                  </button>
                  <button 
                    @click="setPriority(suggestion.id)"
                    class="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors"
                  >
                    {{ suggestion.priority === 'high' ? '🚫 Снять приоритет' : '🔥 Приоритет' }}
                  </button>
                  <button 
                    @click="changeStatus(suggestion.id, 'reviewed')"
                    class="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                  >
                    📋 Рассмотрено
                  </button>
                  <button 
                    @click="changeStatus(suggestion.id, 'planned')"
                    class="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                  >
                    📅 В планах
                  </button>
                  <button 
                    @click="deleteSuggestion(suggestion.id)"
                    class="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors"
                  >
                    🗑️ Удалить
                  </button>
                </div>
              </div>
            </div>

            <!-- Если предложений нет -->
            <div v-if="filteredSuggestions.length === 0" class="text-center py-12 bg-white rounded-2xl shadow-lg">
              <div class="text-6xl mb-4">🏞️</div>
              <h3 class="text-xl font-semibold text-gray-600 mb-2">Пока нет предложений</h3>
              <p class="text-gray-500 mb-4">
                <span v-if="activeCategory !== 'all'">
                  В категории "{{ getCategoryName(activeCategory) }}" пока нет предложений
                </span>
                <span v-else>Будьте первым, кто предложит идею по сохранению озер!</span>
              </p>
              <button 
                @click="scrollToSuggestionForm"
                class="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                <span>💧</span>
                <span>Создать первое предложение</span>
              </button>
            </div>
          </div>
        </div>

        <!-- ПРАВАЯ КОЛОНКА: Формы и управление -->
        <!-- ВСЕ БЛОКИ В ОДНОМ STICKY-КОНТЕЙНЕРЕ -->
        <div class="lg:w-1/3">
          <div class="lg:sticky lg:top-6 space-y-6">
            <!-- Пользовательская панель -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <div class="flex flex-col items-center gap-4">
                <div v-if="user" class="flex items-center gap-3 w-full">
                  <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {{ user.name.charAt(0).toUpperCase() }}
                  </div>
                  <div class="flex-1">
                    <span class="text-gray-700 font-medium block">{{ user.name }}</span>
                    <span class="text-sm text-gray-500">{{ user.email }}</span>
                  </div>
                  <button 
                    @click="logout"
                    class="text-gray-500 hover:text-red-500 transition-colors p-2"
                    title="Выйти"
                  >
                    🚪
                  </button>
                </div>
                
                <div v-else class="text-center w-full">
                  <div class="text-lg font-semibold text-gray-700 mb-3">Участвуйте в обсуждении!</div>
                  <button 
                    @click="showLoginModal = true"
                    class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>💧</span>
                    <span>Войти для участия</span>
                  </button>
                  <p class="text-sm text-gray-500 mt-3">
                    Войдите, чтобы голосовать, комментировать и предлагать идеи
                  </p>
                </div>
              </div>
            </div>

            <!-- Форма для создания предложения -->
            <div class="bg-white rounded-2xl shadow-lg p-6" id="suggestion-form">
              <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
                <span class="text-2xl">🌊</span>
                Новое предложение
              </h2>
              <form @submit.prevent="submitSuggestion" class="space-y-4">
                <div>
                  <label class="text-gray-700 text-sm font-medium mb-2 block">Ваше имя *</label>
                  <input 
                    v-model="newSuggestion.name"
                    type="text" 
                    placeholder="Как к вам обращаться?"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    :readonly="!!user"
                    required
                  >
                </div>
                
                <div>
                  <label class="text-gray-700 text-sm font-medium mb-2 block">Категория *</label>
                  <select 
                    v-model="newSuggestion.category"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    required
                  >
                    <option value="">Выберите категорию</option>
                    <option value="cleaning">🧹 Уборка берегов</option>
                    <option value="protection">🛡️ Защита экологии</option>
                    <option value="monitoring">📊 Мониторинг качества воды</option>
                    <option value="infrastructure">🏗️ Инфраструктура</option>
                    <option value="education">📚 Просвещение</option>
                    <option value="fishing">🎣 Рыболовство</option>
                    <option value="recreation">🏕️ Отдых и туризм</option>
                    <option value="other">💡 Другое</option>
                  </select>
                </div>

                <div>
                  <label class="text-gray-700 text-sm font-medium mb-2 block">Ваше предложение *</label>
                  <textarea 
                    v-model="newSuggestion.message"
                    placeholder="Опишите вашу идею по улучшению озер Петропавловска..."
                    rows="4"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 resize-none"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="isSubmitting">⏳ Отправка предложения...</span>
                  <span v-else>💧 Опубликовать предложение</span>
                </button>
              </form>

              <!-- Уведомления -->
              <div v-if="showSuccess" class="mt-4 p-3 bg-green-500/90 text-white rounded-lg text-center">
                ✅ Спасибо! Ваше предложение опубликовано.
              </div>
              <div v-if="showError" class="mt-4 p-3 bg-red-500/90 text-white rounded-lg text-center">
                ❌ Ошибка при отправке. Попробуйте еще раз.
              </div>
            </div>

            <!-- Панель админа -->
            <div v-if="!isAdmin || suggestions.length > 0" class="bg-white rounded-2xl shadow-lg p-6">
              <div class="flex flex-col gap-4">
                <div>
                  <h2 class="text-xl font-semibold">Панель управления</h2>
                  <p class="text-gray-600 text-sm">Все голосуют, админ управляет</p>
                </div>
                
                <div v-if="!isAdmin" class="space-y-4">
                  <button 
                    @click="showAdminLogin = !showAdminLogin"
                    class="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <span>👑</span>
                    <span>{{ showAdminLogin ? 'Скрыть вход' : 'Вход для админа' }}</span>
                  </button>
                  
                  <!-- Форма входа админа -->
                  <div v-if="showAdminLogin" class="p-4 bg-gray-50 rounded-lg">
                    <h3 class="font-semibold mb-3">Вход для администратора</h3>
                    <form @submit.prevent="handleAdminLogin" class="space-y-3">
                      <input
                        v-model="adminLoginForm.login"
                        type="text"
                        placeholder="Логин"
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <input
                        v-model="adminLoginForm.password"
                        type="password"
                        placeholder="Пароль"
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <button
                        type="submit"
                        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                      >
                        Войти
                      </button>
                    </form>
                  </div>
                </div>
                
                <div v-else class="space-y-4">
                  <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span class="text-blue-600 font-semibold">👑 Администратор</span>
                    <button 
                      @click="handleAdminLogout"
                      class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
                    >
                      Выйти
                    </button>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-2">
                    <div class="text-center p-2 bg-green-50 rounded-lg">
                      <div class="text-lg font-bold text-green-600">{{ suggestions.length }}</div>
                      <div class="text-xs text-gray-600">Предложений</div>
                    </div>
                    <div class="text-center p-2 bg-yellow-50 rounded-lg">
                      <div class="text-lg font-bold text-yellow-600">{{ newSuggestionsCount }}</div>
                      <div class="text-xs text-gray-600">Новых</div>
                    </div>
                    <div class="text-center p-2 bg-blue-50 rounded-lg">
                      <div class="text-lg font-bold text-blue-600">{{ totalLikes }}</div>
                      <div class="text-xs text-gray-600">Голосов</div>
                    </div>
                    <div class="text-center p-2 bg-purple-50 rounded-lg">
                      <div class="text-lg font-bold text-purple-600">{{ uniqueAuthors }}</div>
                      <div class="text-xs text-gray-600">Участников</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Модальное окно входа -->
      <div v-if="showLoginModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl p-6 w-full max-w-md">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Вход в сообщество</h2>
            <button 
              @click="showLoginModal = false"
              class="text-gray-500 hover:text-gray-700 p-1"
            >
              ✕
            </button>
          </div>
          
          <form @submit.prevent="login" class="space-y-4">
            <div>
              <label class="text-gray-700 text-sm font-medium mb-2 block">Ваше имя *</label>
              <input 
                v-model="loginForm.name"
                type="text" 
                placeholder="Как к вам обращаться?"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                required
              >
            </div>
            
            <div>
              <label class="text-gray-700 text-sm font-medium mb-2 block">Email *</label>
              <input 
                v-model="loginForm.email"
                type="email" 
                placeholder="your@email.com"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                required
              >
            </div>

            <div class="flex gap-3 pt-2">
              <button 
                type="button"
                @click="showLoginModal = false"
                class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Отмена
              </button>
              <button 
                type="submit"
                :disabled="isLoggingIn"
                class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {{ isLoggingIn ? 'Вход...' : 'Войти' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Импорты
import { useAuth } from '/composables/useAuth'

const { isAdmin, adminLogin, adminLogout, checkAdminAuth } = useAuth()

// Типы
interface Comment {
  id: number
  author: string
  text: string
  date: string
}

interface Suggestion {
  id: number
  name: string
  message: string
  category: string
  date: string
  likes: number
  status: string
  is_pinned: boolean
  priority?: string
  comments?: Comment[]
}

interface Category {
  id: string
  name: string
  icon: string
  count: number
}

interface User {
  id: number
  email: string
  name: string
}

// Реактивные данные
const suggestions = ref<Suggestion[]>([])
const user = ref<User | null>(null)
const authToken = ref<string>('')
const showLoginModal = ref(false)
const showAdminLogin = ref(false)
const isLoggingIn = ref(false)
const activeCategory = ref<string>('all')
const commentTexts = ref<Record<number, string>>({})

// Формы
const loginForm = ref({
  name: '',
  email: ''
})

const adminLoginForm = ref({
  login: '',
  password: ''
})

const newSuggestion = ref({
  name: '',
  message: '',
  category: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const userLikes = ref<number[]>([])

const API_BASE = 'https://hakaton-lakes-back.onrender.com/api'

// Категории
const categories = ref<Category[]>([
  { id: 'all', name: 'Все предложения', icon: '🌊', count: 0 },
  { id: 'cleaning', name: 'Уборка берегов', icon: '🧹', count: 0 },
  { id: 'protection', name: 'Защита экологии', icon: '🛡️', count: 0 },
  { id: 'monitoring', name: 'Мониторинг воды', icon: '📊', count: 0 },
  { id: 'infrastructure', name: 'Инфраструктура', icon: '🏗️', count: 0 },
  { id: 'education', name: 'Просвещение', icon: '📚', count: 0 },
  { id: 'fishing', name: 'Рыболовство', icon: '🎣', count: 0 },
  { id: 'recreation', name: 'Отдых и туризм', icon: '🏕️', count: 0 },
  { id: 'other', name: 'Другое', icon: '💡', count: 0 }
])

// Загрузка при старте
onMounted(async () => {
  await checkAuth()
  await loadSuggestions()
  loadUserLikes()
  await checkAdminAuth()
})

// Проверка аутентификации
const checkAuth = async () => {
  try {
    if (process.client) {
      const token = localStorage.getItem('authToken')
      if (token) {
        authToken.value = token
        const data = await $fetch(`${API_BASE}/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        user.value = data.user
        newSuggestion.value.name = user.value.name
      }
    }
  } catch (error) {
    console.log('Auth check failed:', error)
    user.value = null
    authToken.value = ''
    if (process.client) {
      localStorage.removeItem('authToken')
    }
  }
}

// Вход пользователя
const login = async () => {
  if (isLoggingIn.value) return
  
  isLoggingIn.value = true
  try {
    const data = await $fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      body: loginForm.value
    })
    
    user.value = data.user
    authToken.value = data.token
    
    if (process.client) {
      localStorage.setItem('authToken', data.token)
    }
    
    newSuggestion.value.name = user.value.name
    
    showLoginModal.value = false
    loginForm.value = { name: '', email: '' }
    
    showSuccess.value = true
    setTimeout(() => showSuccess.value = false, 3000)
  } catch (error: any) {
    console.error('Login error:', error)
    alert('Ошибка входа: ' + (error.data?.error || error.message))
    showError.value = true
    setTimeout(() => showError.value = false, 3000)
  } finally {
    isLoggingIn.value = false
  }
}

// Выход пользователя
const logout = async () => {
  try {
    if (authToken.value) {
      await $fetch(`${API_BASE}/auth/logout`, { 
        method: 'POST',
        body: { token: authToken.value }
      })
    }
  } catch (error) {
    console.log('Logout error (ignored):', error)
  } finally {
    user.value = null
    authToken.value = ''
    if (process.client) {
      localStorage.removeItem('authToken')
    }
    newSuggestion.value.name = ''
  }
}

// Вход админа
const handleAdminLogin = async () => {
  const result = await adminLogin(adminLoginForm.value)
  if (result.success) {
    showAdminLogin.value = false
    adminLoginForm.value = { login: '', password: '' }
    showSuccess.value = true
    setTimeout(() => showSuccess.value = false, 2000)
  } else {
    alert(result.error)
  }
}

// Выход админа
const handleAdminLogout = () => {
  adminLogout()
  showSuccess.value = true
  setTimeout(() => showSuccess.value = false, 2000)
}

// Загрузка предложений
const loadSuggestions = async () => {
  try {
    const data = await $fetch<Suggestion[]>(`${API_BASE}/suggestions`)
    suggestions.value = data
    updateCategoryCounts()
    console.log('Loaded suggestions:', data.length)
  } catch (error) {
    console.error('Error loading suggestions:', error)
    // Тестовые данные
    if (process.env.NODE_ENV === 'development') {
      console.log('Using mock data for development')
      suggestions.value = [
        {
          id: 1,
          name: 'Алексей Петров',
          message: 'Предлагаю организовать субботники по уборке берегов озера Бузовое.',
          category: 'cleaning',
          date: new Date('2024-01-15T10:30:00').toISOString(),
          likes: 12,
          status: 'new',
          is_pinned: false,
          comments: [
            {
              id: 1,
              author: 'Мария Иванова',
              text: 'Отличная идея! Я готова помочь с организацией.',
              date: new Date('2024-01-15T14:20:00').toISOString()
            }
          ]
        },
        {
          id: 2,
          name: 'Екатерина Сидорова',
          message: 'Необходимо установить информационные стенды о правилах поведения у озер.',
          category: 'education',
          date: new Date('2024-01-14T09:15:00').toISOString(),
          likes: 8,
          status: 'reviewed',
          is_pinned: true
        },
        {
          id: 3,
          name: 'Иван Козлов',
          message: 'Предлагаю создать систему мониторинга качества воды в озерах.',
          category: 'monitoring',
          date: new Date('2024-01-13T16:45:00').toISOString(),
          likes: 15,
          status: 'planned',
          is_pinned: false,
          priority: 'high'
        }
      ]
      updateCategoryCounts()
    }
  }
}

// Обновление счетчиков категорий
const updateCategoryCounts = () => {
  if (!suggestions.value || !suggestions.value.length) {
    categories.value.forEach(category => {
      category.count = 0
    })
    return
  }
  
  categories.value.forEach(category => {
    if (category.id === 'all') {
      category.count = suggestions.value.length
    } else {
      category.count = suggestions.value.filter(s => s.category === category.id).length
    }
  })
}

// Выбор категории
const selectCategory = (categoryId: string) => {
  activeCategory.value = categoryId
}

// Фильтрация предложений по категории
const filteredSuggestions = computed(() => {
  if (!suggestions.value || !suggestions.value.length) return []
  
  let filtered = [...suggestions.value]
  
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(s => s.category === activeCategory.value)
  }
  
  return filtered.sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1
    if (!a.is_pinned && b.is_pinned) return 1
    
    if (a.priority === 'high' && b.priority !== 'high') return -1
    if (a.priority !== 'high' && b.priority === 'high') return 1
    
    if ((b.likes || 0) !== (a.likes || 0)) return (b.likes || 0) - (a.likes || 0)
    
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
})

// Отправка предложения
const submitSuggestion = async () => {
  if (isSubmitting.value) return
  
  isSubmitting.value = true
  showError.value = false
  showSuccess.value = false

  try {
    const suggestionData = {
      ...newSuggestion.value,
      status: 'new',
      likes: 0,
      date: new Date().toISOString()
    }

    const response = await $fetch(`${API_BASE}/suggestions`, {
      method: 'POST',
      body: suggestionData
    })

    showSuccess.value = true
    newSuggestion.value = { 
      name: user.value ? user.value.name : '', 
      message: '', 
      category: '' 
    }
    
    await loadSuggestions()
    
    setTimeout(() => {
      const element = document.getElementById('suggestion-form')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
    
    setTimeout(() => showSuccess.value = false, 5000)
  } catch (error: any) {
    console.error('❌ Ошибка при отправке:', error)
    showError.value = true
    setTimeout(() => showError.value = false, 3000)
  } finally {
    isSubmitting.value = false
  }
}

// Лайки
const loadUserLikes = () => {
  if (process.client) {
    const saved = localStorage.getItem('userLikes')
    userLikes.value = saved ? JSON.parse(saved) : []
  }
}

const saveUserLikes = () => {
  if (process.client) {
    localStorage.setItem('userLikes', JSON.stringify(userLikes.value))
  }
}

const hasLiked = (suggestionId: number) => {
  return userLikes.value.includes(suggestionId)
}

const likeSuggestion = async (id: number) => {
  if (hasLiked(id)) return
  
  try {
    await $fetch(`${API_BASE}/suggestions/${id}/like`, {
      method: 'POST'
    })
    
    userLikes.value.push(id)
    saveUserLikes()
    await loadSuggestions()
  } catch (error) {
    console.error('Error liking suggestion:', error)
  }
}

// Комментарии
const addComment = async (suggestionId: number) => {
  if (!user.value) {
    showLoginModal.value = true
    return
  }

  const text = commentTexts.value[suggestionId]?.trim()
  if (!text) return

  try {
    await $fetch(`${API_BASE}/suggestions/${suggestionId}/comments`, {
      method: 'POST',
      body: { 
        text,
        author: user.value.name 
      },
      headers: {
        'Authorization': `Bearer ${authToken.value}`
      }
    })

    commentTexts.value[suggestionId] = ''
    await loadSuggestions()
  } catch (error: any) {
    console.error('❌ Ошибка комментария:', error)
    alert('Ошибка при добавлении комментария')
  }
}

// Админские функции
const togglePin = async (id: number) => {
  try {
    const suggestion = suggestions.value.find(s => s.id === id)
    const newPinStatus = !suggestion?.is_pinned
    
    await $fetch(`${API_BASE}/suggestions/${id}/pin`, {
      method: 'PUT',
      body: { isPinned: newPinStatus }
    })

    await loadSuggestions()
  } catch (error: any) {
    console.error('❌ Ошибка закрепления:', error)
    alert('Ошибка при закреплении')
  }
}

const setPriority = async (id: number) => {
  try {
    const suggestion = suggestions.value.find(s => s.id === id)
    const newPriority = suggestion?.priority === 'high' ? null : 'high'
    
    await $fetch(`${API_BASE}/suggestions/${id}/priority`, {
      method: 'PUT',
      body: { priority: newPriority }
    })

    await loadSuggestions()
  } catch (error: any) {
    console.error('Error setting priority:', error)
    alert('Ошибка при установке приоритета')
  }
}

const changeStatus = async (id: number, newStatus: string) => {
  try {
    await $fetch(`${API_BASE}/suggestions/${id}/status`, {
      method: 'PUT',
      body: { status: newStatus }
    })

    await loadSuggestions()
  } catch (error: any) {
    console.error('Error changing status:', error)
    alert('Ошибка при изменении статуса')
  }
}

const deleteSuggestion = async (id: number) => {
  if (!confirm('Удалить это предложение? Это действие нельзя отменить.')) return

  try {
    await $fetch(`${API_BASE}/suggestions/${id}`, {
      method: 'DELETE'
    })

    await loadSuggestions()
  } catch (error: any) {
    console.error('Error deleting suggestion:', error)
    alert('Ошибка при удалении предложения')
  }
}

// Статистика
const totalLikes = computed(() => {
  return suggestions.value.reduce((sum, s) => sum + (s.likes || 0), 0)
})

const uniqueAuthors = computed(() => {
  const authors = new Set(suggestions.value.map(s => s.name))
  return authors.size
})

const todaySuggestions = computed(() => {
  const today = new Date().toDateString()
  return suggestions.value.filter(s => {
    const suggestionDate = new Date(s.date).toDateString()
    return suggestionDate === today
  }).length
})

const newSuggestionsCount = computed(() => {
  return suggestions.value.filter(s => s.status === 'new').length
})

// Вспомогательные функции
const getSuggestionBorder = (status: string) => {
  switch (status) {
    case 'new': return 'border-l-blue-500'
    case 'reviewed': return 'border-l-green-500'
    case 'planned': return 'border-l-purple-500'
    default: return 'border-l-gray-500'
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'new': return 'bg-blue-100 text-blue-800'
    case 'reviewed': return 'bg-green-100 text-green-800'
    case 'planned': return 'bg-purple-100 text-purple-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'new': return 'Новое'
    case 'reviewed': return 'Рассмотрено'
    case 'planned': return 'В планах'
    default: return status
  }
}

const getCategoryIcon = (categoryId: string) => {
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.icon : '💡'
}

const getCategoryName = (categoryId: string) => {
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.name : 'Другое'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  
  if (diffMins < 1) return 'только что'
  if (diffMins < 60) return `${diffMins} мин. назад`
  if (diffHours < 24) return `${diffHours} ч. назад`
  if (diffDays < 7) return `${diffDays} дн. назад`
  
  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// Прокрутка к форме предложения
const scrollToSuggestionForm = () => {
  const element = document.getElementById('suggestion-form')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* Водная тематика в стилях */
.bg-gradient-to-br {
  background-image: linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%);
}

/* Плавные переходы */
.transition-all {
  transition: all 0.3s ease;
}

/* Эффект при наведении на карточки */
.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

/* Стили для статусов */
.border-l-blue-500 {
  border-left-color: #3b82f6;
}

.border-l-green-500 {
  border-left-color: #10b981;
}

.border-l-purple-500 {
  border-left-color: #8b5cf6;
}

/* Sticky контейнер для правой колонки */
.lg\:sticky {
  position: -webkit-sticky;
  position: sticky;
  align-self: flex-start;
}

/* Анимации */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.bg-white.rounded-2xl {
  animation: fadeIn 0.3s ease-out;
}

/* Стили для категорий */
.category-button {
  transition: all 0.2s ease;
}

.category-button:hover {
  transform: translateY(-1px);
}

.category-button.active {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  border-width: 3px;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .lg\:sticky {
    position: static;
  }
}

/* Кастомный скроллбар */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Для мобильных устройств */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .category-button {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
}
</style>