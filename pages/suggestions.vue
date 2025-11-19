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
            <span class="px-3 py-1 rounded-full text-xs font-medium" 
                  :class="getStatusBadge(suggestion.status)">
              {{ getStatusText(suggestion.status) }}
            </span>
          </div>
          
          <p class="text-gray-700 leading-relaxed mb-4">{{ suggestion.message }}</p>
          
          <div class="flex gap-2">
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
              class="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors ml-auto"
            >
              🗑️ Удалить
            </button>
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
const suggestions = ref<any[]>([])

// Загружаем предложения при загрузке страницы
onMounted(() => {
  loadSuggestions()
})

// Загрузка предложений из localStorage
const loadSuggestions = () => {
  const saved = localStorage.getItem('lakeSuggestions')
  suggestions.value = saved ? JSON.parse(saved) : []
}

// Статистика
const newSuggestionsCount = computed(() => {
  return suggestions.value.filter(s => s.status === 'new').length
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

// Сортировка по дате (новые сначала)
const sortedSuggestions = computed(() => {
  return [...suggestions.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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

// Изменение статуса
const changeStatus = (id: number, newStatus: string) => {
  const index = suggestions.value.findIndex(s => s.id === id)
  if (index !== -1) {
    suggestions.value[index].status = newStatus
    localStorage.setItem('lakeSuggestions', JSON.stringify(suggestions.value))
  }
}

// Удаление предложения
const deleteSuggestion = (id: number) => {
  if (confirm('Удалить это предложение?')) {
    suggestions.value = suggestions.value.filter(s => s.id !== id)
    localStorage.setItem('lakeSuggestions', JSON.stringify(suggestions.value))
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

// Экспорт в JSON
const exportToJSON = () => {
  const dataStr = JSON.stringify(suggestions.value, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
  
  const exportFileDefaultName = `suggestions_${new Date().toISOString().split('T')[0]}.json`
  
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>