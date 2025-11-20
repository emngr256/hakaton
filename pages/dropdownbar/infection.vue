<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 to-red-100 py-8">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <!-- Заголовок -->
      <div class="text-center mb-12">
        <h1 class="text-transparent" >.</h1>
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Патогенная инфекция</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Мониторинг микробиологического загрязнения водоёмов и его влияние на здоровье населения
        </p>
      </div>

      <!-- Предупреждение -->
      <section class="mb-12">
        <div class="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
          <div class="flex items-center mb-4">
            <div class="text-3xl mr-4">⚠️</div>
            <div>
              <h2 class="text-2xl font-bold mb-2">Критический уровень угрозы</h2>
              <p class="text-lg opacity-90">
                Купание в водоёмах представляет серьёзную угрозу здоровью из-за высокого уровня бактериального загрязнения
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Текущие показатели -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Текущие показатели загрязнения</h2>
        <div class="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <p class="text-gray-600 mb-6">
            Результаты последних микробиологических исследований (обновлено: {{ currentDate }})
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="lake in contaminatedLakes" :key="lake.id" 
                 class="bg-white rounded-2xl shadow-lg p-6 border border-rose-200 hover:shadow-xl transition-shadow">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-gray-800">{{ lake.name }}</h3>
                <div class="text-lg font-bold text-white rounded-2xl px-4 py-3 min-h-[64px] flex items-center justify-center" :class="getLevelBadgeColor(lake.contaminationLevel)">
                <div class="text-center leading-tight"></div>
                  {{ lake.level }} КОЕ/100мл
                </div>
              </div>
              
              <!-- Визуальный индикатор загрязнения -->
              <div class="mb-4">
                <div class="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Норма</span>
                  <span>Критично</span>
                </div>
                <div class="w-full bg-gray-200 rounded-2xl h-4">
                  <div 
                    class="h-4 rounded-2xl transition-all duration-500" 
                    :class="getProgressBarColor(lake.contaminationLevel)"
                    :style="{ width: getContaminationPercentage(lake.level, lake.norm) + '%' }"
                  ></div>
                </div>
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{{ lake.norm }} КОЕ</span>
                  <span>{{ lake.critical }} КОЕ</span>
                </div>
              </div>
              
              <div class="space-y-3">
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600">Базовый уровень:</span>
                  <span class="font-semibold text-gray-800">{{ lake.norm }} КОЕ/100мл</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600">Превышение:</span>
                  <span class="text-red-600 font-bold">
                    в {{ (lake.level / lake.norm).toFixed(0) }} раз
                  </span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600">Статус:</span>
                  <span :class="getStatusColor(lake.contaminationLevel)" class="font-semibold">
                    {{ lake.contaminationLevel }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Опасные патогены -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Опасные патогены в водоёмах</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="pathogen in pathogens" :key="pathogen.name" 
               class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <span class="text-2xl">🦠</span>
              </div>
              <h3 class="text-lg font-bold text-gray-800">{{ pathogen.name }}</h3>
            </div>
            <p class="text-sm text-gray-600 mb-3">{{ pathogen.description }}</p>
            <div class="space-y-2 text-sm">
              <div>
                <span class="font-semibold text-gray-700">Симптомы:</span>
                <p class="text-gray-600 mt-1">{{ pathogen.symptoms }}</p>
              </div>
              <div>
                <span class="font-semibold text-gray-700">Профилактика:</span>
                <p class="text-gray-600 mt-1">{{ pathogen.prevention }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Риски для здоровья -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Риски для здоровья</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Немедленные последствия -->
          <div class="bg-white rounded-2xl shadow-lg p-6 border border-red-100">
            <h3 class="text-xl font-bold text-red-600 mb-4">Немедленные последствия</h3>
            <div class="space-y-3">
              <div v-for="effect in immediateEffects" :key="effect" 
                   class="flex items-center text-gray-700">
                <div class="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                <span class="text-sm">{{ effect }}</span>
              </div>
            </div>
          </div>
          
          <!-- Долгосрочные последствия -->
          <div class="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
            <h3 class="text-xl font-bold text-orange-600 mb-4">Долгосрочные последствия</h3>
            <div class="space-y-3">
              <div v-for="effect in longTermEffects" :key="effect" 
                   class="flex items-center text-gray-700">
                <div class="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                <span class="text-sm">{{ effect }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Рекомендации -->
      <section>
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Рекомендации по безопасности</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="recommendation in safetyRecommendations" :key="recommendation.title" 
               class="bg-white rounded-2xl shadow-lg p-6 border border-blue-200 text-center hover:shadow-xl transition-shadow">
            <div class="text-3xl mb-4">{{ recommendation.icon }}</div>
            <h3 class="text-lg font-bold text-gray-800 mb-3">{{ recommendation.title }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ recommendation.description }}</p>
          </div>
        </div>
      </section>

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
    symptoms: 'Диарея, боли в животе, рвота',
    prevention: 'Не купаться в загрязнённых водоёмах'
  },
  {
    name: 'Кампилобактерия',
    description: 'Бактерия, поражающая ЖКТ и слизистые оболочки',
    symptoms: 'Кишечные инфекции, лихорадка',
    prevention: 'Не плавать с открытыми ранами'
  },
  {
    name: 'Сальмонелла',
    description: 'Патогенная бактерия, вызывающая кишечные инфекции',
    symptoms: 'Высокая температура, диарея, обезвоживание',
    prevention: 'Избегать контакта с водой, кипятить воду'
  },
  {
    name: 'Лямблии',
    description: 'Простейшие паразиты, вызывающие лямблиоз',
    symptoms: 'Расстройство ЖКТ, потеря веса, слабость',
    prevention: 'Использовать только кипячёную воду'
  }
])

const immediateEffects = ref([
  'Кишечные инфекции и расстройства ЖКТ',
  'Кожные заболевания и сыпь',
  'Инфекции глаз и ушей',
  'Респираторные заболевания',
  'Острая аллергическая реакция'
])

const longTermEffects = ref([
  'Хронические заболевания печени и почек',
  'Нарушения иммунной системы',
  'Повышенный риск онкологических заболеваний',
  'Паразитарные инвазии',
  'Гормональные нарушения'
])

const safetyRecommendations = ref([
  {
    icon: '🚫',
    title: 'Избегайте контакта',
    description: 'Не купайтесь в водоёмах и избегайте любого контакта с водой до улучшения экологической ситуации'
  },
  {
    icon: '💧',
    title: 'Обрабатывайте воду',
    description: 'Если используете воду из водоёмов для хозяйственных нужд, обязательно кипятите её не менее 10 минут'
  },
  {
    icon: '🏥',
    title: 'Обращайтесь к врачу',
    description: 'При появлении симптомов заболевания после контакта с водой немедленно обратитесь к врачу'
  }
])

const getLevelBadgeColor = (level: string) => {
  switch (level) {
    case 'Критический': return 'bg-red-600'
    case 'Высокий': return 'bg-orange-500'
    default: return 'bg-yellow-500'
  }
}

const getProgressBarColor = (level: string) => {
  switch (level) {
    case 'Критический': return 'bg-red-600'
    case 'Высокий': return 'bg-orange-500'
    default: return 'bg-yellow-500'
  }
}

const getContaminationPercentage = (level: number, norm: number) => {
  const maxLevel = norm * 20
  return Math.min((level / maxLevel) * 100, 100)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Критический': return 'text-red-600'
    case 'Высокий': return 'text-orange-500'
    case 'Средний': return 'text-yellow-500'
    default: return 'text-green-500'
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>