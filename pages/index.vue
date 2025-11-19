<template>
  <div>
    <!-- Hero Section -->
    <section id="home" class="relative pt-20 min-h-screen flex items-center">
      <div class="absolute inset-0 z-0">
        <img src="/assets/images/lake.jpg" alt="Озеро Петропавловска" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-black/30"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 bg-red-500/90 text-white px-4 py-2 rounded-full mb-6">
            <AlertCircle :size="20" />
            <span class="font-medium">Экологическая тревога</span>
          </div>
          
          <h1 class="text-5xl font-bold text-white mb-6 leading-tight">
            Защитим озёра<br>Петропавловска
          </h1>
          
          <p class="text-xl text-gray-200 mb-8 leading-relaxed">
            Наши озёра находятся под угрозой загрязнения и разрушения. 
            Присоединяйтесь к движению за сохранение водных ресурсов нашего города.
          </p>

          <!-- Форма для предложений -->
          <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <h3 class="text-white text-xl font-bold mb-4">💡 Ваши предложения</h3>
            <p class="text-gray-200 mb-4">Поделитесь идеями по сохранению наших озёр:</p>
            
            <form @submit.prevent="submitSuggestion" class="space-y-4">
              <div>
                <input 
                  v-model="suggestionForm.name"
                  type="text" 
                  placeholder="Ваше имя"
                  class="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all placeholder-gray-500"
                  required
                >
              </div>
              
              <div>
                <textarea 
                  v-model="suggestionForm.message"
                  placeholder="Что можно сделать для сохранения озёр Петропавловска?"
                  rows="4"
                  class="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none placeholder-gray-500"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit"
                class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                📝 Отправить предложение
              </button>
            </form>

            <!-- Успешное сообщение -->
            <div v-if="showSuccess" class="mt-4 p-4 bg-green-500/90 text-white rounded-lg text-center border border-green-400">
              ✅ Спасибо! Ваше предложение сохранено.
            </div>

            <!-- Ссылка на просмотр предложений -->
            <div class="mt-6 text-center">
              <NuxtLink 
                to="/suggestions" 
                class="inline-flex items-center gap-2 text-white hover:text-blue-200 transition-colors font-medium"
              >
                👀 Посмотреть все предложения
                <ArrowRight :size="16" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problems Section -->
    <section id="problems" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Основные экологические проблемы</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Озёра Петропавловска сталкиваются с множеством экологических угроз, 
            требующих немедленного внимания и действий.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(problem, index) in problems" 
            :key="index" 
            class="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <component :is="problem.icon" class="text-blue-600" :size="24" />
              </div>
              <div class="flex-1">
                <div class="flex items-start justify-between mb-2">
                  <h3 class="text-lg font-semibold text-gray-800">{{ problem.title }}</h3>
                </div>
                <p class="text-gray-600 mb-3 leading-relaxed">{{ problem.description }}</p>
                <span :class="['inline-block px-3 py-1 rounded-full text-xs font-medium', getSeverityColor(problem.severity)]">
                  {{ problem.severity }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lakes Section -->
    <section id="lakes" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Озёра под угрозой</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Каждое из озёр Петропавловска требует особого внимания и мер по восстановлению экосистемы.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div 
            v-for="(lake, index) in lakes" 
            :key="index" 
            class="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div class="relative h-48">
              <img
                :src="lake.image"
                :alt="lake.name"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-4 right-4">
                <span :class="['px-3 py-1 rounded-full text-xs font-medium shadow-lg', getStatusBadge(lake.status)]">
                  {{ lake.status }}
                </span>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ lake.name }}</h3>
              
              <div class="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin :size="16" />
                <span class="text-sm">{{ lake.location }}</span>
              </div>

              <p class="text-gray-600 mb-4 leading-relaxed">{{ lake.description }}</p>

              <div class="flex gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div class="text-sm text-gray-500">Площадь</div>
                  <div class="font-semibold text-gray-800">{{ lake.area }}</div>
                </div>
                <div>
                  <div class="text-sm text-gray-500">Глубина</div>
                  <div class="font-semibold text-gray-800">{{ lake.depth }}</div>
                </div>
              </div>

              <div class="mt-4 flex items-center gap-2 text-red-600">
                <TrendingDown :size="16" />
                <span class="text-sm font-medium">Качество воды ухудшается</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Присоединяйтесь к движению!</h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Каждое предложение важно для сохранения наших водных ресурсов. 
          Вместе мы можем изменить ситуацию к лучшему.
        </p>
        <NuxtLink 
          to="/suggestions"
          class="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          📋 Посмотреть все предложения
          <ArrowRight :size="20" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { 
  AlertCircle, 
  Droplet, 
  Factory, 
  Trash2, 
  Thermometer, 
  Fish, 
  AlertTriangle,
  MapPin,
  TrendingDown,
  ArrowRight
} from 'lucide-vue-next'

// Форма для предложений
const suggestionForm = ref({
  name: '',
  message: ''
})

const showSuccess = ref(false)

const submitSuggestion = () => {
  // Получаем текущие предложения из localStorage
  const existingSuggestions = JSON.parse(localStorage.getItem('lakeSuggestions') || '[]')
  
  // Добавляем новое предложение
  const newSuggestion = {
    id: Date.now().toString(),
    name: suggestionForm.value.name,
    message: suggestionForm.value.message,
    date: new Date().toISOString(),
    likes: 0
  }
  
  existingSuggestions.push(newSuggestion)
  
  // Сохраняем обратно в localStorage
  localStorage.setItem('lakeSuggestions', JSON.stringify(existingSuggestions))
  
  // Показываем успешное сообщение
  showSuccess.value = true
  
  // Очищаем форму
  suggestionForm.value = { name: '', message: '' }
  
  // Скрываем сообщение через 3 секунды
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}

const problems = [
  {
    icon: Factory,
    title: "Промышленные сбросы",
    description: "Незаконные выбросы отходов от промышленных предприятий загрязняют водоёмы тяжелыми металлами и химикатами.",
    severity: "Критично",
  },
  {
    icon: Trash2,
    title: "Бытовой мусор",
    description: "Накопление пластика и бытовых отходов на берегах и в воде озёр угрожает экосистеме.",
    severity: "Высокая",
  },
  {
    icon: Droplet,
    title: "Загрязнение воды",
    description: "Качество воды ухудшается из-за сточных вод, пестицидов и удобрений с полей.",
    severity: "Критично",
  },
  {
    icon: Thermometer,
    title: "Изменение климата",
    description: "Повышение температуры воды приводит к цветению водорослей и нарушению экологического баланса.",
    severity: "Средняя",
  },
  {
    icon: Fish,
    title: "Сокращение биоразнообразия",
    description: "Исчезновение редких видов рыб и водных растений из-за ухудшения условий обитания.",
    severity: "Высокая",
  },
  {
    icon: AlertTriangle,
    title: "Браконьерство",
    description: "Незаконная рыбная ловля и разрушение прибрежных экосистем.",
    severity: "Средняя",
  },
]

const lakes = [
  {
    name: "Озеро Пестрое",
    location: "Северный район",
    status: "Загрязнено",
    description: "Одно из крупнейших озёр города, страдающее от промышленных сбросов и бытовых отходов.",
    area: "12 км²",
    depth: "3.5 м",
    image: "https://images.unsplash.com/photo-1569165003050-6c42600d9c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwcG9sbHV0aW9uJTIwZW52aXJvbm1lbnR8ZW58MXx8fHwxNzYzNDc4ODg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Озеро Белое",
    location: "Центральный район",
    status: "Под угрозой",
    description: "Популярное место отдыха горожан, качество воды которого ухудшается из-за антропогенного воздействия.",
    area: "8.3 км²",
    depth: "2.8 м",
    image: "https://images.unsplash.com/photo-1637681316418-dd7a4b6e545e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBvbGx1dGlvbnxlbnwxfHx8fDE3NjM0Njc2OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Озеро Круглое",
    location: "Южный район",
    status: "Критическое",
    description: "Небольшое озеро, находящееся в критическом состоянии из-за высокого уровня загрязнения.",
    area: "4.5 км²",
    depth: "1.9 м",
    image: "https://images.unsplash.com/photo-1699078109661-0269200668ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwcHJvdGVjdGlvbnxlbnwxfHx8fDE3NjM0MjEwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
]

const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case "Критично":
      return "bg-red-100 text-red-800"
    case "Высокая":
      return "bg-orange-100 text-orange-800"
    case "Средняя":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusBadge = (status: string): string => {
  switch (status) {
    case "Критическое":
      return "bg-red-500 text-white"
    case "Загрязнено":
      return "bg-gray-500 text-white"
    case "Под угрозой":
      return "bg-yellow-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}
</script>