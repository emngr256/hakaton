<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      
      <!-- Заголовок и вход для админа -->
      <div class="flex justify-between items-start mb-12">
        <div>
          <h1 class="text-4xl font-bold text-gray-800 mb-4">Предложения горожан</h1>
          <p class="text-xl text-gray-600">
            Идеи и предложения по сохранению озёр Петропавловска
          </p>
        </div>
        
        <!-- Вход только для админа -->
        <div v-if="!user" class="bg-white rounded-2xl shadow-lg p-6 min-w-80">
          <h3 class="text-lg font-semibold mb-4">Вход для администратора</h3>
          <div class="space-y-3">
            <input 
              v-model="loginData.username"
              type="text" 
              placeholder="Логин"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <input 
              v-model="loginData.password"
              type="password" 
              placeholder="Пароль"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <button 
              @click="login"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Войти как администратор
            </button>
          </div>
          <p class="text-sm text-gray-500 mt-3">
            * Гости могут просматривать и добавлять предложения без входа
          </p>
        </div>

        <!-- Информация об админе -->
        <div v-else class="bg-white rounded-2xl shadow-lg p-6 min-w-80">
          <div class="flex items-center space-x-3 mb-3">
            <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div>
              <p class="font-semibold">Администратор</p>
              <p class="text-sm text-gray-500">👑 Модератор</p>
            </div>
          </div>
          <button 
            @click="logout"
            class="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
          >
            Выйти
          </button>
        </div>
      </div>

      <!-- Статистика -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-4">
            <div class="text-3xl font-bold text-blue-600">{{ suggestions.length }}</div>
            <div class="text-sm text-gray-600">Всего предложений</div>
          </div>
          <div class="text-center p-4">
            <div class="text-3xl font-bold text-green-600">{{ newSuggestionsCount }}</div>
            <div class="text-sm text-gray-600">Новых</div>
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

      <!-- Список предложений -->
      <div class="space-y-6">
        <div 
          v-for="suggestion in sortedSuggestions" 
          :key="suggestion.id"
          class="bg-white rounded-2xl shadow-lg p-6 border-l-4" 
          :class="getSuggestionBorder(suggestion.status)"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">{{ suggestion.name }}</h3>
              <p class="text-sm text-gray-500">{{ formatDate(suggestion.date) }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <!-- Лайки -->
              <button 
                @click="likeSuggestion(suggestion.id)"
                class="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors"
              >
                <span>❤️</span>
                <span>{{ suggestion.likes || 0 }}</span>
              </button>
              
              <span class="px-3 py-1 rounded-full text-xs font-medium" 
                    :class="getStatusBadge(suggestion.status)">
                {{ getStatusText(suggestion.status) }}
              </span>
            </div>
          </div>
          
          <p class="text-gray-700 leading-relaxed mb-4">{{ suggestion.message }}</p>
          
          <!-- Действия админа -->
          <div v-if="user" class="flex gap-2 flex-wrap">
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
              @click="changeStatus(suggestion.id, 'new')"
              class="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
            >
              🔄 Вернуть в новые
            </button>
            <button 
              @click="deleteSuggestion(suggestion.id)"
              class="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors ml-auto"
            >
              🗑️ Удалить
            </button>
          </div>

          <!-- Подсказка для гостей -->
          <div v-else class="text-sm text-gray-500">
            🔒 Войдите как администратор для управления предложениями
          </div>
        </div>

        <!-- Если предложений нет -->
        <div v-if="suggestions.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">📝</div>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">Пока нет предложений</h3>
          <p class="text-gray-500">Предложения появятся здесь после отправки с главной страницы</p>
        </div>
      </div>

      <!-- Кнопка экспорта -->
      <div class="mt-8 text-center">
        <button 
          @click="exportToJSON"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          :disabled="suggestions.length === 0"
        >
          📥 Экспорт в JSON
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  username: string;
  role: string;
}

interface Suggestion {
  id: string;
  name: string;
  message: string;
  date: string;
  status: 'new' | 'reviewed' | 'planned';
  likes: number;
  likedBy: string[];
}

const suggestions = ref<Suggestion[]>([]);
const user = ref<User | null>(null);

const loginData = ref({
  username: '',
  password: ''
});

const API_BASE = 'http://localhost:3001/api';

// Загрузка при монтировании
onMounted(() => {
  loadSuggestions();
});

const loadSuggestions = () => {
  const saved = localStorage.getItem('lakeSuggestions');
  suggestions.value = saved ? JSON.parse(saved) : [];
}

// 🔐 Вход для админа
const login = async () => {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData.value),
    });

    const data = await response.json();
    
    if (response.ok) {
      user.value = data.user;
      loginData.value = { username: '', password: '' };
    } else {
      alert(data.error || 'Ошибка входа');
    }
  } catch (error) {
    console.error('Ошибка входа:', error);
    alert('Ошибка соединения с сервером');
  }
};

const logout = () => {
  user.value = null;
};

// 👍 Лайки (доступно всем)
const likeSuggestion = async (suggestionId: string) => {
  try {
    const response = await fetch(`${API_BASE}/suggestions/${suggestionId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      // Обновляем локальное состояние
      const suggestion = suggestions.value.find(s => s.id === suggestionId);
      if (suggestion) {
        suggestion.likes = data.likes;
      }
    }
  } catch (error) {
    console.error('Ошибка лайка:', error);
  }
};

// ✅ Изменение статуса (только для админа)
const changeStatus = async (id: string, newStatus: string) => {
  if (!user.value) return;
  
  try {
    const response = await fetch(`${API_BASE}/suggestions/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      const data = await response.json();
      const index = suggestions.value.findIndex(s => s.id === id);
      if (index !== -1) {
        suggestions.value[index] = data.suggestion;
      }
    }
  } catch (error) {
    console.error('Ошибка изменения статуса:', error);
  }
};

// 🗑️ Удаление (только для админа)
const deleteSuggestion = async (id: string) => {
  if (!user.value) return;
  
  if (confirm('Удалить это предложение?')) {
    try {
      const response = await fetch(`${API_BASE}/suggestions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        suggestions.value = suggestions.value.filter(s => s.id !== id);
      }
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  }
};

// Статистика
const newSuggestionsCount = computed(() => {
  return suggestions.value.filter(s => s.status === 'new').length;
});

const uniqueAuthors = computed(() => {
  const authors = new Set(suggestions.value.map(s => s.name));
  return authors.size;
});

const todaySuggestions = computed(() => {
  const today = new Date().toLocaleDateString('ru-RU');
  return suggestions.value.filter(s => {
    const suggestionDate = new Date(s.date).toLocaleDateString('ru-RU');
    return suggestionDate === today;
  }).length;
});

// Сортировка по дате (новые сначала)
const sortedSuggestions = computed(() => {
  return [...suggestions.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

// Функции для статусов
const getSuggestionBorder = (status: string) => {
  switch (status) {
    case 'new': return 'border-l-blue-500'
    case 'reviewed': return 'border-l-green-500'
    case 'planned': return 'border-l-purple-500'
    default: return 'border-l-gray-500'
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'new': return 'bg-blue-100 text-blue-800'
    case 'reviewed': return 'bg-green-100 text-green-800'
    case 'planned': return 'bg-purple-100 text-purple-800'
    default: return 'bg-gray-100 text-gray-800'
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'new': return 'Новое'
    case 'reviewed': return 'Рассмотрено'
    case 'planned': return 'В планах'
    default: return status
  }
};

// Форматирование даты
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Экспорт в JSON
const exportToJSON = () => {
  const dataStr = JSON.stringify(suggestions.value, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `suggestions_${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};
</script>