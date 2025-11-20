<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      
      <!-- Заголовок -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Предложения горожан</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Идеи и предложения по сохранению озёр Петропавловска
        </p>
      </div>

      <!-- Панель админа -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-semibold">Панель управления</h2>
            <p class="text-gray-600">Гости могут ставить лайки, админ - управлять предложениями</p>
          </div>
          
          <div v-if="!isAdmin" class="flex gap-4">
            <button 
              @click="showLogin = !showLogin"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {{ showLogin ? 'Скрыть вход' : 'Вход для админа' }}
            </button>
          </div>
          
          <div v-else class="flex gap-4 items-center">
            <span class="text-green-600 font-semibold">Администратор</span>
            <button 
              @click="logout"
              class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>

        <!-- Форма входа (скрытая по умолчанию) -->
        <div v-if="showLogin && !isAdmin" class="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold mb-3">Вход для администратора</h3>
          <form @submit.prevent="login" class="space-y-3">
            <input
              v-model="adminLogin.login"
              type="text"
              placeholder="Логин"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              v-model="adminLogin.password"
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

      <!-- Статистика (видна всем) -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Статистика сообщества</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-4">
            <div class="text-3xl font-bold text-blue-600">{{ suggestions.length }}</div>
            <div class="text-sm text-gray-600">Всего предложений</div>
          </div>
          <div class="text-center p-4">
            <div class="text-3xl font-bold text-green-600">{{ totalLikes }}</div>
            <div class="text-sm text-gray-600">Всего лайков</div>
          </div>
          <div class="text-center p-4">
            <div class="text-3xl font-bold text-purple-600">{{ uniqueAuthors }}</div>
            <div class="text-sm text-gray-600">Участников</div>
          </div>
          <div class="text-center p-4">
            <div class="text-3xl font-bold text-orange-600">{{ todaySuggestions }}</div>
            <div class="text-sm text-gray-600">Сегодня</div>
          </div>
        </div>
      </div>

      <!-- Список предложений (виден всем) -->
      <div class="space-y-6">
        <div 
          v-for="suggestion in sortedSuggestions" 
          :key="suggestion.id"
          class="bg-white rounded-2xl shadow-lg p-6 border-l-4 relative" 
          :class="[getSuggestionBorder(suggestion.status), suggestion.isPinned ? 'ring-2 ring-yellow-400' : '']"
        >
          <!-- Значок закрепления -->
          <div v-if="suggestion.isPinned" class="absolute top-4 right-4">
            <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
              📌 Закреплено
            </span>
          </div>

          <!-- Приоритет -->
          <div v-if="suggestion.priority" class="absolute top-4 left-4">
            <span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
              🔥 {{ getPriorityText(suggestion.priority) }}
            </span>
          </div>

          <div class="flex justify-between items-start mb-4" :class="{'mt-6': suggestion.isPinned || suggestion.priority}">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">{{ suggestion.name }}</h3>
              <p class="text-sm text-gray-500">{{ formatDate(suggestion.date) }}</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-medium" 
                    :class="getStatusBadge(suggestion.status)">
                {{ getStatusText(suggestion.status) }}
              </span>
            </div>
          </div>
          
          <p class="text-gray-700 leading-relaxed mb-4">{{ suggestion.message }}</p>
          
          <div class="flex justify-between items-center">
            <!-- Кнопка лайка (для всех) -->
            <button 
              @click="likeSuggestion(suggestion.id)"
              :disabled="hasLiked(suggestion.id)"
              class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              :class="hasLiked(suggestion.id) 
                ? 'bg-red-100 text-red-700 cursor-not-allowed' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'"
            >
              <span>❤️</span>
              <span>{{ suggestion.likes || 0 }}</span>
              <span v-if="hasLiked(suggestion.id)">✓</span>
            </button>

            <!-- Кнопки админа -->
            <div v-if="isAdmin" class="flex gap-2 flex-wrap">
              <button 
                @click="togglePin(suggestion.id)"
                class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm hover:bg-yellow-200 transition-colors"
              >
                {{ suggestion.isPinned ? '📌 Открепить' : '📌 Закрепить' }}
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
                @click="setPriority(suggestion.id)"
                class="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors"
              >
                🔥 Приоритет
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
        <div v-if="suggestions.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">📝</div>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">Пока нет предложений</h3>
          <p class="text-gray-500">Предложения появятся здесь после отправки с главной страницы</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const suggestions = ref<any[]>([])
const isAdmin = ref(false)
const showLogin = ref(false)
const adminLogin = ref({
  login: '',
  password: ''
})

// Храним лайки пользователя в localStorage
const userLikes = ref<number[]>([])

const API_BASE = 'http://localhost:3001/api'

// Загружаем предложения при загрузке страницы
onMounted(() => {
  loadSuggestions()
  loadUserLikes()
})

// Загрузка лайков пользователя
const loadUserLikes = () => {
  const saved = localStorage.getItem('userLikes')
  userLikes.value = saved ? JSON.parse(saved) : []
}

// Сохранение лайков пользователя
const saveUserLikes = () => {
  localStorage.setItem('userLikes', JSON.stringify(userLikes.value))
}

// Проверка, лайкал ли пользователь это предложение
const hasLiked = (suggestionId: number) => {
  return userLikes.value.includes(suggestionId)
}

// Загрузка предложений из бекенда
const loadSuggestions = async () => {
  try {
    const response = await fetch(`${API_BASE}/suggestions`)
    if (response.ok) {
      suggestions.value = await response.json()
    }
  } catch (error) {
    console.error('Error loading suggestions:', error)
  }
}

// Вход админа
const login = async () => {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminLogin.value)
    })

    const result = await response.json()
    
    if (result.success) {
      isAdmin.value = true
      showLogin.value = false
      adminLogin.value = { login: '', password: '' }
    } else {
      alert('Неверный логин или пароль')
    }
  } catch (error) {
    console.error('Login error:', error)
    alert('Ошибка при входе')
  }
}

// Выход
const logout = () => {
  isAdmin.value = false
}

// Лайк предложения
const likeSuggestion = async (id: number) => {
  if (hasLiked(id)) return // Не даем лайкнуть второй раз
  
  try {
    const response = await fetch(`${API_BASE}/suggestions/${id}/like`, {
      method: 'POST'
    })
    
    if (response.ok) {
      // Добавляем в список лайков пользователя
      userLikes.value.push(id)
      saveUserLikes()
      await loadSuggestions()
    }
  } catch (error) {
    console.error('Error liking suggestion:', error)
  }
}

// Закрепить/открепить предложение
const togglePin = async (id: number) => {
  try {
    const suggestion = suggestions.value.find(s => s.id === id)
    const newPinStatus = !suggestion.isPinned
    
    const response = await fetch(`${API_BASE}/suggestions/${id}/pin`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isPinned: newPinStatus })
    })

    if (response.ok) {
      await loadSuggestions()
    }
  } catch (error) {
    console.error('Error toggling pin:', error)
  }
}

// Установить приоритет
const setPriority = async (id: number) => {
  try {
    const suggestion = suggestions.value.find(s => s.id === id)
    const newPriority = suggestion.priority === 'high' ? null : 'high'
    
    const response = await fetch(`${API_BASE}/suggestions/${id}/priority`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priority: newPriority })
    })

    if (response.ok) {
      await loadSuggestions()
    }
  } catch (error) {
    console.error('Error setting priority:', error)
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
  const today = new Date().toLocaleDateString('ru-RU')
  return suggestions.value.filter(s => {
    const suggestionDate = new Date(s.date).toLocaleDateString('ru-RU')
    return suggestionDate === today
  }).length
})

// Сортировка: сначала закрепленные, потом по приоритету, потом по дате
const sortedSuggestions = computed(() => {
  return [...suggestions.value].sort((a, b) => {
    // Закрепленные выше
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    
    // Высокий приоритет выше
    if (a.priority === 'high' && b.priority !== 'high') return -1
    if (a.priority !== 'high' && b.priority === 'high') return 1
    
    // Новые выше
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
})

// Функции для статусов
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

const getPriorityText = (priority: string) => {
  switch (priority) {
    case 'high': return 'Высокий приоритет'
    default: return priority
  }
}

// Изменение статуса
const changeStatus = async (id: number, newStatus: string) => {
  try {
    const response = await fetch(`${API_BASE}/suggestions/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus })
    })

    if (response.ok) {
      await loadSuggestions()
    } else {
      alert('Ошибка при изменении статуса')
    }
  } catch (error) {
    console.error('Error changing status:', error)
    alert('Ошибка при изменении статуса')
  }
}

// Удаление предложения
const deleteSuggestion = async (id: number) => {
  if (!confirm('Удалить это предложение?')) return

  try {
    const response = await fetch(`${API_BASE}/suggestions/${id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      await loadSuggestions()
    } else {
      alert('Ошибка при удалении')
    }
  } catch (error) {
    console.error('Error deleting suggestion:', error)
    alert('Ошибка при удалении')
  }
}

// Форматирование даты
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>