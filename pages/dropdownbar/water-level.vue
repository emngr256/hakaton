<template>
  <div class="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-8">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <!-- Заголовок -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Уровень воды</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Мониторинг изменений уровня воды в озёрах Петропавловска и оценка гидрологической ситуации
        </p>
      </div>

      <!-- Текущие показатели -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Текущие уровни воды</h2>
        <div class="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <p class="text-gray-600 mb-6">
            Актуальные данные об уровне воды в основных озёрах города (обновлено: {{ currentDate }})
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="lake in lakes" :key="lake.id" class="bg-white rounded-2xl shadow-lg p-6 border border-cyan-200 hover:shadow-xl transition-shadow">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-gray-800">{{ lake.name }}</h3>
                <div class="text-lg font-bold text-white rounded-2xl px-4 py-3 min-h-[64px] flex items-center justify-center" :class="getLevelBadgeColor(lake.level)">
                  {{ lake.level }}м
                </div>
              </div>
              
              <!-- Визуальный индикатор уровня -->
              <div class="mb-4">
                <div class="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Минимум</span>
                  <span>Максимум</span>
                </div>
                <div class="w-full bg-gray-200 rounded-2xl h-4">
                  <div 
                    class="h-4 rounded-2xl transition-all duration-500" 
                    :class="getProgressBarColor(lake.level)"
                    :style="{ width: getLevelPercentage(lake.level) + '%' }"
                  ></div>
                </div>
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1.0м</span>
                  <span>6.0м</span>
                </div>
              </div>
              
              <div class="space-y-3">
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600">Норма для сезона:</span>
                  <span class="font-semibold text-gray-800">{{ lake.seasonNorm }}м</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600">Изменение:</span>
                  <span :class="lake.change >= 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'">
                    {{ lake.change >= 0 ? '+' : '' }}{{ lake.change }}м
                  </span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600">Статус:</span>
                  <span :class="getStatusColor(lake.status)" class="font-semibold">{{ lake.status }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Статистика изменений -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Динамика уровня воды</h2>
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div v-for="stat in waterStats" :key="stat.title" 
                 class="text-center p-4 rounded-2xl bg-white border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
              <div class="text-3xl font-bold text-blue-600 mb-2">{{ stat.value }}</div>
              <div class="text-sm font-semibold text-gray-700">{{ stat.title }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ stat.description }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Причины изменений -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Факторы влияния на уровень воды</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="factor in waterFactors" :key="factor.title" 
               class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span class="text-2xl">{{ factor.icon }}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800">{{ factor.title }}</h3>
            </div>
            <p class="text-gray-600 leading-relaxed mb-3">{{ factor.description }}</p>
            <div class="flex items-center text-sm text-gray-500">
              <span class="font-semibold" :class="factor.impact === 'high' ? 'text-red-600' : factor.impact === 'medium' ? 'text-orange-500' : 'text-yellow-500'">
                Влияние: {{ factor.impact === 'high' ? 'Высокое' : factor.impact === 'medium' ? 'Среднее' : 'Низкое' }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Прогноз -->
      <section>
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Прогноз уровня воды</h2>
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="forecast in waterForecast" :key="forecast.period" 
                 class="text-center p-4 rounded-2xl border-2" 
                 :class="getForecastBorder(forecast.trend)">
              <div class="text-sm font-semibold text-gray-600 mb-2">{{ forecast.period }}</div>
              <div class="text-lg font-bold mb-1" :class="getForecastColor(forecast.trend)">
                {{ forecast.trend === 'increase' ? '↑' : forecast.trend === 'decrease' ? '↓' : '→' }}
              </div>
              <div class="text-xs text-gray-500">{{ forecast.description }}</div>
            </div>
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
    level: 3.2,
    seasonNorm: 3.8,
    change: -0.6,
    status: 'Пониженный'
  },
  {
    id: 2,
    name: 'Озеро Белое',
    level: 4.1,
    seasonNorm: 4.2,
    change: -0.1,
    status: 'Нормальный'
  },
  {
    id: 3,
    name: 'Озеро Горькое',
    level: 2.8,
    seasonNorm: 3.5,
    change: -0.7,
    status: 'Критический'
  },
  {
    id: 4,
    name: 'Озеро Поганка',
    level: 3.9,
    seasonNorm: 3.7,
    change: +0.2,
    status: 'Нормальный'
  },
  {
    id: 5,
    name: 'Озеро Дикое',
    level: 2.5,
    seasonNorm: 3.2,
    change: -0.7,
    status: 'Критический'
  },
  {
    id: 6,
    name: 'Река Ишим',
    level: 1.8,
    seasonNorm: 1.9,
    change: -0.1,
    status: 'Нормальный'
  }
])

const waterStats = ref([
  {
    title: 'Средний уровень',
    value: '3.4м',
    description: 'По всем озёрам'
  },
  {
    title: 'Макс. снижение',
    value: '-0.7м',
    description: 'Оз. Горькое'
  },
  {
    title: 'Озёр в норме',
    value: '3',
    description: 'из 6'
  },
  {
    title: 'Тенденция',
    value: '↓',
    description: 'Понижение'
  }
])

const waterFactors = ref([
  {
    icon: '☀️',
    title: 'Испарение',
    description: 'Высокие температуры увеличивают испарение с поверхности воды, приводя к снижению уровня.',
    impact: 'high'
  },
  {
    icon: '🌧️',
    title: 'Осадки',
    description: 'Недостаточное количество осадков не компенсирует потери воды от испарения.',
    impact: 'high'
  },
  {
    icon: '🏭',
    title: 'Водозабор',
    description: 'Промышленный и сельскохозяйственный водозабор влияет на уровень воды.',
    impact: 'medium'
  },
  {
    icon: '🌱',
    title: 'Растительность',
    description: 'Прибрежная растительность увеличивает транспирацию и влияет на водный баланс.',
    impact: 'low'
  }
])

const waterForecast = ref([
  {
    period: 'Неделя',
    trend: 'decrease',
    description: 'Незначительное понижение'
  },
  {
    period: 'Месяц',
    trend: 'decrease',
    description: 'Умеренное понижение'
  },
  {
    period: 'Сезон',
    trend: 'stable',
    description: 'Стабилизация'
  },
  {
    period: 'Год',
    trend: 'increase',
    description: 'Восстановление'
  }
])

const getLevelBadgeColor = (level: number) => {
  if (level < 2.5) return 'bg-red-600'
  if (level < 3.0) return 'bg-orange-500'
  if (level < 3.5) return 'bg-yellow-500'
  return 'bg-green-500'
}

const getProgressBarColor = (level: number) => {
  if (level < 2.5) return 'bg-red-600'
  if (level < 3.0) return 'bg-orange-500'
  if (level < 3.5) return 'bg-yellow-500'
  return 'bg-green-500'
}

const getLevelPercentage = (level: number) => {
  const min = 1.0
  const max = 6.0
  return ((level - min) / (max - min)) * 100
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Критический': return 'text-red-600'
    case 'Пониженный': return 'text-orange-500'
    case 'Нормальный': return 'text-green-600'
    default: return 'text-gray-500'
  }
}

const getForecastColor = (trend: string) => {
  switch (trend) {
    case 'increase': return 'text-green-600'
    case 'decrease': return 'text-red-600'
    default: return 'text-gray-500'
  }
}

const getForecastBorder = (trend: string) => {
  switch (trend) {
    case 'increase': return 'border-green-200 bg-green-50'
    case 'decrease': return 'border-red-200 bg-red-50'
    default: return 'border-gray-200 bg-gray-50'
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>