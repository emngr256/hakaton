<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-rose-50 py-8 relative overflow-hidden">
    <!-- Фоновые элементы -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 left-10 w-64 h-64 bg-red-400 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-80 h-80 bg-rose-400 rounded-full blur-3xl"></div>
    </div>
    
    <!-- Вирусные частицы -->
    <div v-for="i in 15" :key="i" 
         class="absolute w-6 h-6 animate-pulse"
         :style="{
           left: `${Math.random() * 100}%`,
           top: `${Math.random() * 100}%`,
           animationDelay: `${i * 0.2}s`
         }">
      <div class="w-full h-full bg-red-400/20 rounded-full"></div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl relative z-10">
      
      <!-- Заголовок с улучшенной графикой -->
      <div class="text-center mb-12 pt-8">
        <div class="inline-flex items-center gap-3 mb-4 px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-red-200">
          <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-semibold text-red-600 uppercase tracking-wider">Live Monitoring</span>
          <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </div>
        
        <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
          Патогенная инфекция
        </h1>
        <div class="w-24 h-1.5 bg-gradient-to-r from-red-500 to-rose-500 rounded-full mx-auto mb-4"></div>
        <p class="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Реальная угроза здоровью: мониторинг микробиологического загрязнения водоёмов Петропавловска
        </p>
      </div>

      <!-- Предупреждение с анимацией -->
      <section class="mb-12">
        <div class="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-[1.02] transition-transform duration-300">
          <!-- Анимированная граница -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          
          <div class="relative flex flex-col md:flex-row items-center gap-6">
            <div class="text-5xl animate-bounce">⚠️</div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <h2 class="text-3xl font-bold">КРИТИЧЕСКАЯ УГРОЗА</h2>
                <div class="px-3 py-1 bg-white/20 rounded-full text-sm font-bold">ALERT</div>
              </div>
              <p class="text-xl opacity-95 leading-relaxed">
                Уровень бактериального загрязнения превышает безопасные нормы в <span class="font-bold text-yellow-300">18-22 раза</span>. 
                Купание представляет серьёзную опасность для здоровья!
              </p>
            </div>
            <div class="px-4 py-2 bg-white/20 rounded-full border border-white/30">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
                <span class="font-mono text-sm">Обновлено: {{ currentDate }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Текущие показатели с улучшенными карточками -->
      <section class="mb-16">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-3xl font-bold text-gray-800">Текущие показатели загрязнения</h2>
            <p class="text-gray-600 mt-2">Результаты последних микробиологических исследований</p>
          </div>
          <div class="px-4 py-2 bg-white rounded-full shadow-lg border border-gray-200">
            <div class="flex items-center gap-2 text-sm">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-gray-600">Норма</span>
              <div class="w-2 h-2 bg-yellow-500 rounded-full ml-4"></div>
              <span class="text-gray-600">Повышенный</span>
              <div class="w-2 h-2 bg-red-500 rounded-full ml-4"></div>
              <span class="text-gray-600">Критический</span>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="lake in contaminatedLakes" :key="lake.id" 
               class="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 hover:border-red-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <!-- Фоновая графика -->
            <div class="absolute -top-3 -right-3 w-16 h-16 bg-red-100 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
            
            <div class="relative">
              <div class="flex justify-between items-start mb-6">
                <div>
                  <h3 class="text-xl font-bold text-gray-800 mb-1">{{ lake.name }}</h3>
                  <p class="text-sm text-gray-500">Петропавловск, водохранилище</p>
                </div>
                <div class="relative">
                  <div class="absolute inset-0 bg-red-500 rounded-full blur group-hover:blur-lg transition-all opacity-20"></div>
                  <div class="relative text-lg font-bold text-white rounded-xl px-4 py-3 min-h-[64px] flex flex-col items-center justify-center shadow-lg" 
                       :class="getLevelBadgeColor(lake.contaminationLevel)">
                    <div class="text-2xl font-bold">{{ lake.level }}</div>
                    <div class="text-xs opacity-90">КОЕ/100мл</div>
                  </div>
                </div>
              </div>
              
              <!-- Интерактивный индикатор -->
              <div class="mb-6">
                <div class="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Норма: {{ lake.norm }} КОЕ</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span>Критично: {{ lake.critical }} КОЕ</span>
                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                </div>
                
                <div class="relative w-full h-4 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-2xl overflow-hidden">
                  <div 
                    class="absolute top-0 left-0 h-4 rounded-2xl transition-all duration-1000 ease-out" 
                    :class="getProgressBarColor(lake.contaminationLevel)"
                    :style="{ width: getContaminationPercentage(lake.level, lake.norm) + '%' }"
                  >
                    <div class="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/50 rounded-full"></div>
                  </div>
                  <div class="absolute left-1/2 top-0 bottom-0 w-px bg-gray-400/50"></div>
                </div>
                
                <div class="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0%</span>
                  <span class="font-semibold">{{ getContaminationPercentage(lake.level, lake.norm) }}% загрязнения</span>
                  <span>100%</span>
                </div>
              </div>
              
              <!-- Статистика -->
              <div class="space-y-4">
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span class="text-blue-600">📊</span>
                    </div>
                    <div>
                      <div class="text-xs text-gray-500">Базовый уровень</div>
                      <div class="font-semibold text-gray-800">{{ lake.norm }} КОЕ</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-xs text-gray-500">Превышение</div>
                    <div class="text-red-600 font-bold text-lg">
                      ×{{ (lake.level / lake.norm).toFixed(0) }}
                    </div>
                  </div>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full" :class="getStatusDotColor(lake.contaminationLevel)"></div>
                    <span class="text-sm text-gray-600">Статус загрязнения:</span>
                  </div>
                  <span :class="getStatusColor(lake.contaminationLevel)" class="font-bold text-sm px-3 py-1 rounded-full bg-opacity-10" 
                        :style="{ backgroundColor: getStatusBgColor(lake.contaminationLevel) }">
                    {{ lake.contaminationLevel }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Опасные патогены с улучшенными карточками -->
      <section class="mb-16">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-gray-800 mb-3">Опасные патогены в водоёмах</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Микроорганизмы, представляющие непосредственную угрозу для здоровья человека</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(pathogen, index) in pathogens" :key="pathogen.name" 
               class="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-red-100">
            <!-- Нумерация и иконка -->
            <div class="absolute -top-3 -left-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
              {{ index + 1 }}
            </div>
            
            <div class="flex flex-col items-center text-center mb-5">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center mb-4 shadow-inner">
                <span class="text-3xl">🦠</span>
              </div>
              <h3 class="text-lg font-bold text-gray-800 mb-2">{{ pathogen.name }}</h3>
              <p class="text-sm text-gray-600 px-2">{{ pathogen.description }}</p>
            </div>
            
            <!-- Подробности в аккордеоне-стиле -->
            <div class="space-y-4">
              <div class="bg-red-50 rounded-xl p-3">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center">
                    <span class="text-red-600 text-sm">🤒</span>
                  </div>
                  <span class="font-semibold text-gray-700 text-sm">Симптомы</span>
                </div>
                <p class="text-xs text-gray-600">{{ pathogen.symptoms }}</p>
              </div>
              
              <div class="bg-rose-50 rounded-xl p-3">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-6 h-6 bg-rose-100 rounded-lg flex items-center justify-center">
                    <span class="text-rose-600 text-sm">🛡️</span>
                  </div>
                  <span class="font-semibold text-gray-700 text-sm">Профилактика</span>
                </div>
                <p class="text-xs text-gray-600">{{ pathogen.prevention }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Риски для здоровья с визуализацией -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Риски для здоровья</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Немедленные последствия -->
          <div class="relative bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-xl p-8 border border-red-100">
            <div class="absolute -top-4 left-1/2 -translate-x-1/2">
              <div class="px-6 py-2 bg-red-500 text-white rounded-full font-bold shadow-lg">
                ⚡ Немедленные
              </div>
            </div>
            
            <h3 class="text-2xl font-bold text-red-600 mb-6 flex items-center gap-3">
              <div class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <span class="text-red-600 text-xl">🩺</span>
              </div>
              Последствия в течение 24 часов
            </h3>
            
            <div class="space-y-4">
              <div v-for="(effect, index) in immediateEffects" :key="effect" 
                   class="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                <div class="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span class="text-red-600 font-bold">{{ index + 1 }}</span>
                </div>
                <div>
                  <div class="text-gray-800 font-medium">{{ effect }}</div>
                  <div class="text-xs text-gray-500 mt-1">Проявляется в первые часы после контакта</div>
                </div>
                <div class="ml-auto w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <!-- Долгосрочные последствия -->
          <div class="relative bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-xl p-8 border border-orange-100">
            <div class="absolute -top-4 left-1/2 -translate-x-1/2">
              <div class="px-6 py-2 bg-orange-500 text-white rounded-full font-bold shadow-lg">
                📅 Долгосрочные
              </div>
            </div>
            
            <h3 class="text-2xl font-bold text-orange-600 mb-6 flex items-center gap-3">
              <div class="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <span class="text-orange-600 text-xl">⏳</span>
              </div>
              Отложенные последствия
            </h3>
            
            <div class="space-y-4">
              <div v-for="(effect, index) in longTermEffects" :key="effect" 
                   class="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                <div class="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span class="text-orange-600 font-bold">{{ index + 1 }}</span>
                </div>
                <div>
                  <div class="text-gray-800 font-medium">{{ effect }}</div>
                  <div class="text-xs text-gray-500 mt-1">Развивается в течение недель или месяцев</div>
                </div>
                <div class="ml-auto text-orange-400 text-sm font-bold">⚠️</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Рекомендации -->
      <section>
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-gray-800 mb-3">Рекомендации по безопасности</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Простые меры предосторожности для защиты вашего здоровья</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="recommendation in safetyRecommendations" :key="recommendation.title" 
               class="group relative bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-blue-100">
            <!-- Декоративный элемент -->
            <div class="absolute -top-4 left-1/2 -translate-x-1/2">
              <div class="w-12 h-12 rounded-full bg-blue-500 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span class="text-2xl">{{ recommendation.icon }}</span>
              </div>
            </div>
            
            <div class="pt-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">{{ recommendation.title }}</h3>
              <p class="text-gray-600 leading-relaxed mb-6">{{ recommendation.description }}</p>
              
              <div class="px-4 py-2 bg-blue-50 rounded-full inline-flex items-center gap-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span class="text-sm font-medium text-blue-600">Важно соблюдать</span>
              </div>
            </div>
            
            <!-- Индикатор приоритета -->
            <div class="absolute bottom-4 right-4">
              <div class="text-xs px-2 py-1 rounded bg-blue-100 text-blue-600 font-medium">
                Приоритет: {{ recommendation.priority }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Футер секция -->
      <div class="mt-16 pt-8 border-t border-gray-200">
        <div class="text-center">
          <p class="text-gray-600 mb-4">
            Данные обновляются ежедневно на основе лабораторных исследований Роспотребнадзора
          </p>
          <div class="flex items-center justify-center gap-6">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <span class="text-sm text-gray-600">Безопасно</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span class="text-sm text-gray-600">Требует осторожности</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <span class="text-sm text-gray-600">Опасно для здоровья</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const currentDate = new Date().toLocaleDateString('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})

const contaminatedLakes = ref([
  {
    id: 1,
    name: 'Озеро Пёстрое',
    level: 1800,
    norm: 100,
    critical: 2000,
    contaminationLevel: 'Высокий'
  },
  {
    id: 2,
    name: 'Озеро Белое',
    level: 950,
    norm: 100,
    critical: 2000,
    contaminationLevel: 'Высокий'
  },
  {
    id: 3,
    name: 'Озеро Култучное',
    level: 2200,
    norm: 200,
    critical: 4000,
    contaminationLevel: 'Критический'
  }
])

const pathogens = ref([
  {
    name: 'E. coli',
    description: 'Бактерия, указывающая на фекальное загрязнение воды',
    symptoms: 'Диарея, боли в животе, рвота, температура',
    prevention: 'Полностью избегать контакта с загрязнённой водой'
  },
  {
    name: 'Кампилобактерия',
    description: 'Бактерия, поражающая желудочно-кишечный тракт',
    symptoms: 'Кишечные инфекции, лихорадка, сильные боли',
    prevention: 'Не плавать с открытыми ранами и повреждениями кожи'
  },
  {
    name: 'Сальмонелла',
    description: 'Патогенная бактерия, вызывающая тяжёлые кишечные инфекции',
    symptoms: 'Высокая температура, диарея, обезвоживание, слабость',
    prevention: 'Избегать попадания воды в рот, тщательно мыть руки'
  },
  {
    name: 'Лямблии',
    description: 'Простейшие паразиты, вызывающие лямблиоз',
    symptoms: 'Расстройство ЖКТ, потеря веса, хроническая слабость',
    prevention: 'Использовать только кипячёную или бутилированную воду'
  }
])

const immediateEffects = ref([
  'Острые кишечные инфекции и расстройства ЖКТ',
  'Кожные заболевания, сыпь и дерматиты',
  'Инфекции глаз, ушей и носоглотки',
  'Респираторные заболевания от ингаляции',
  'Острая аллергическая реакция и анафилаксия'
])

const longTermEffects = ref([
  'Хронические заболевания печени и почек',
  'Нарушения иммунной системы и аутоиммунные реакции',
  'Повышенный риск онкологических заболеваний',
  'Хронические паразитарные инвазии',
  'Гормональные нарушения и проблемы с фертильностью'
])

const safetyRecommendations = ref([
  {
    icon: '🚫',
    title: 'Полное избегание контакта',
    description: 'Воздержитесь от купания и любого контакта с водой в загрязнённых водоёмах до стабилизации ситуации',
    priority: 'Высокий'
  },
  {
    icon: '💧',
    title: 'Обработка воды',
    description: 'Для хозяйственных нужд воду необходимо кипятить не менее 15 минут или использовать профессиональные фильтры',
    priority: 'Средний'
  },
  {
    icon: '🏥',
    title: 'Медицинская помощь',
    description: 'При первых симптомах заболевания после контакта с водой немедленно обратитесь за медицинской помощью',
    priority: 'Критический'
  }
])

const getLevelBadgeColor = (level: string) => {
  switch (level) {
    case 'Критический': return 'bg-gradient-to-br from-red-600 to-rose-700'
    case 'Высокий': return 'bg-gradient-to-br from-orange-500 to-red-500'
    default: return 'bg-gradient-to-br from-yellow-500 to-orange-400'
  }
}

const getProgressBarColor = (level: string) => {
  switch (level) {
    case 'Критический': return 'bg-gradient-to-r from-red-500 to-rose-600'
    case 'Высокий': return 'bg-gradient-to-r from-orange-400 to-red-500'
    default: return 'bg-gradient-to-r from-yellow-400 to-orange-400'
  }
}

const getContaminationPercentage = (level: number, norm: number) => {
  const maxLevel = norm * 20
  const percentage = (level / maxLevel) * 100
  return Math.min(Math.max(percentage, 5), 100)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Критический': return 'text-red-600'
    case 'Высокий': return 'text-orange-500'
    case 'Средний': return 'text-yellow-500'
    default: return 'text-green-500'
  }
}

const getStatusBgColor = (status: string) => {
  switch (status) {
    case 'Критический': return '#fee2e2'
    case 'Высокий': return '#ffedd5'
    case 'Средний': return '#fef3c7'
    default: return '#dcfce7'
  }
}

const getStatusDotColor = (status: string) => {
  switch (status) {
    case 'Критический': return 'bg-red-500'
    case 'Высокий': return 'bg-orange-500'
    case 'Средний': return 'bg-yellow-500'
    default: return 'bg-green-500'
  }
}
</script>

<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.container {
  max-width: 1280px;
}
</style>