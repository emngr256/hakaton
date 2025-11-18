<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <!-- Заголовок -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Температура воды</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Мониторинг температурного режима озёр Петропавловска и его влияние на экосистему
        </p>
      </div>

      <!-- Текущие показатели -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Текущие показатели температуры</h2>
        <div class="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <p class="text-gray-600 mb-6">
            Актуальные данные о температуре воды в основных озёрах города (обновлено: {{ currentDate }})
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="lake in lakes" :key="lake.id" class="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 border border-blue-200">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-gray-800">{{ lake.name }}</h3>
                <div class="text-2xl font-bold" :class="getTemperatureColor(lake.temperature)">
                  {{ lake.temperature }}°C
                  <span class="text-lg" :class="lake.trend === 'up' ? 'text-red-500' : 'text-blue-500'">
                    {{ lake.trend === 'up' ? '↑' : '↓' }}
                  </span>
                </div>
              </div>
              
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Норма для сезона:</span>
                  <span class="font-semibold">{{ lake.seasonNorm }}°C</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Отклонение:</span>
                  <span :class="lake.deviation >= 0 ? 'text-red-500 font-bold' : 'text-blue-500 font-bold'">
                    {{ lake.deviation >= 0 ? '+' : '' }}{{ lake.deviation }}°C
                  </span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Статус:</span>
                  <span :class="getStatusColor(lake.status)" class="font-semibold">{{ lake.status }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- График температуры -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Среднемесячная температура воды</h2>
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
            <div v-for="month in monthlyTemperatures" :key="month.name" 
                 class="text-center p-3 rounded-lg bg-gradient-to-b from-blue-50 to-white border border-blue-100">
              <div class="text-sm font-semibold text-gray-600 mb-1">{{ month.name }}</div>
              <div class="text-lg font-bold" :class="getTemperatureColor(month.temperature)">
                {{ month.temperature }}°C
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Влияние температуры -->
      <section>
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Влияние повышенной температуры</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="effect in temperatureEffects" :key="effect.title" 
               class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <span class="text-2xl">{{ effect.icon }}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800">{{ effect.title }}</h3>
            </div>
            <p class="text-gray-600 leading-relaxed">{{ effect.description }}</p>
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

const lakes = ref([
  {
    id: 1,
    name: 'Озеро Пёстрое',
    temperature: 24.5,
    seasonNorm: 18.2,
    deviation: 6.3,
    trend: 'up',
    status: 'Критическое'
  },
  {
    id: 2,
    name: 'Озеро Белое',
    temperature: 22.1,
    seasonNorm: 17.8,
    deviation: 4.3,
    trend: 'up',
    status: 'Высокое'
  },
  {
    id: 3,
    name: 'Озеро Горькое',
    temperature: 26.3,
    seasonNorm: 18.5,
    deviation: 7.8,
    trend: 'up',
    status: 'Критическое'
  },
  {
    id: 4,
    name: 'Озеро Поганка',
    temperature: 20.8,
    seasonNorm: 17.2,
    deviation: 3.6,
    trend: 'up',
    status: 'Повышенное'
  },
  {
    id: 5,
    name: 'Озеро Дикое',
    temperature: 25.1,
    seasonNorm: 18.8,
    deviation: 6.3,
    trend: 'up',
    status: 'Критическое'
  },
  {
    id: 6,
    name: 'Река Ишим',
    temperature: 18.9,
    seasonNorm: 16.5,
    deviation: 2.4,
    trend: 'up',
    status: 'Нормальное'
  }
])

const monthlyTemperatures = ref([
  { name: 'Янв', temperature: 0.4 },
  { name: 'Фев', temperature: 1.8 },
  { name: 'Мар', temperature: 0.9 },
  { name: 'Апр', temperature: 0.9 },
  { name: 'Май', temperature: 14.9 },
  { name: 'Июн', temperature: 19.8 },
  { name: 'Июл', temperature: 21.1 },
  { name: 'Авг', temperature: 24.9 },
  { name: 'Сен', temperature: 18.7 },
  { name: 'Окт', temperature: 12.9 },
  { name: 'Ноя', temperature: 21.9 },
  { name: 'Дек', temperature: 9.9 }
])

const temperatureEffects = ref([
  {
    icon: '🌿',
    title: 'Цветение водорослей',
    description: 'Повышенная температура воды создаёт благоприятные условия для массового размножения сине-зелёных водорослей, что приводит к снижению качества воды и дефициту кислорода.'
  },
  {
    icon: '💧',
    title: 'Ускоренное испарение',
    description: 'Высокая температура воды ускоряет процесс испарения, что ведёт к снижению уровня воды в озёрах и увеличению концентрации загрязняющих веществ.'
  },
  {
    icon: '🐟',
    title: 'Гибель рыбы',
    description: 'При температуре выше 24°C многие виды рыб испытывают стресс; снижается содержание кислорода в воде, что может привести к массовой гибели водных организмов.'
  },
  {
    icon: '⚖️',
    title: 'Нарушение экосистемы',
    description: 'Изменение температурного режима нарушает естественные циклы развития водных организмов и может привести к исчезновению некоторых видов.'
  }
])

const getTemperatureColor = (temp: number) => {
  if (temp < 15) return 'text-blue-500'
  if (temp < 20) return 'text-green-500'
  if (temp < 24) return 'text-yellow-500'
  if (temp < 26) return 'text-orange-500'
  return 'text-red-500'
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Критическое': return 'text-red-500'
    case 'Высокое': return 'text-orange-500'
    case 'Повышенное': return 'text-yellow-500'
    default: return 'text-green-500'
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>