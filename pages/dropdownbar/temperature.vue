<template>
  <div class="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 py-8 relative overflow-hidden">
    <!-- Анимированный фон -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div class="absolute top-1/2 -right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-1/4 left-1/3 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Плавающие элементы температуры -->
    <div class="floating-thermo" style="top: 15%; left: 5%">🌡️</div>
    <div class="floating-thermo" style="top: 25%; right: 8%">🔥</div>
    <div class="floating-thermo" style="bottom: 30%; left: 10%">☀️</div>
    <div class="floating-thermo" style="bottom: 20%; right: 5%">💧</div>

    <div class="container mx-auto px-4 max-w-6xl relative z-10">
      
      <!-- Заголовок -->
      <div class="text-center mb-12 animate-fade-in-down">
        <div class="inline-block mb-4">
          <div class="text-7xl mb-2">🌡️</div>
          <div class="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>
        <h1 class="text-5xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
          Термальный мониторинг
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Актуальные данные о температуре воды в озёрах Петропавловска и оценка температурных аномалий
        </p>
        
        <!-- Индикатор обновления -->
        <div class="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-sm text-gray-600">Обновлено: {{ currentDate }}</span>
        </div>
      </div>

      <!-- Предупреждение -->
      <section class="mb-12">
        <div class="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-500 to-rose-500 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-[1.02] transition-transform duration-300">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          
          <div class="relative flex flex-col md:flex-row items-center gap-6">
            <div class="text-5xl animate-bounce">🌡️</div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <h2 class="text-3xl font-bold">ТЕМПЕРАТУРНАЯ ТРЕВОГА</h2>
                <div class="px-3 py-1 bg-white/20 rounded-full text-sm font-bold">HOT SPOT</div>
              </div>
              <p class="text-xl opacity-95 leading-relaxed">
                Средняя температура воды превышает сезонную норму на 
                <span class="font-bold text-yellow-300">+{{ averageDeviation }}°C</span>.
                Критическая угроза для экосистемы озёр!
              </p>
            </div>
            <div class="px-4 py-2 bg-white/20 rounded-full border border-white/30">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
                <span class="font-mono text-sm">{{ averageTemperature }}°C средняя</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Текущие показатели -->
      <section class="mb-12 animate-fade-in-up">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-3xl font-bold text-gray-800">Текущие температурные показатели</h2>
            <p class="text-gray-600 mt-1">Динамика изменений в реальном времени</p>
          </div>
          <div class="flex gap-2">
            <button 
              @click="toggleViewMode"
              class="p-2 rounded-xl bg-white shadow hover:shadow-md transition-all"
            >
              {{ isListView ? '📊' : '📋' }}
            </button>
            <button 
              @click="refreshData"
              class="p-2 rounded-xl bg-white shadow hover:shadow-md transition-all"
              :class="{'animate-spin': isRefreshing}"
            >
              🔄
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" v-if="!isListView">
          <div 
            v-for="lake in lakes" 
            :key="lake.id" 
            class="lake-card group"
            :class="{'critical-card': lake.status === 'Критическое'}"
            @click="selectLake(lake)"
          >
            <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <!-- Заголовок карточки -->
              <div class="flex justify-between items-start mb-6">
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">{{ lake.name }}</h3>
                  <div class="flex items-center gap-2 text-sm text-gray-500">
                    <span class="flex items-center gap-1">
                      <span class="w-2 h-2 rounded-full" :class="getTempColor(lake.temperature)"></span>
                      {{ lake.location }}
                    </span>
                    <span>•</span>
                    <span>Глубина: {{ lake.depth || '4.5' }}м</span>
                  </div>
                </div>
                
                <!-- Круговой индикатор температуры -->
                <div class="relative">
                  <div class="relative w-20 h-20">
                    <svg class="w-full h-full" viewBox="0 0 100 100">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        fill="none" 
                        stroke="#e5e7eb" 
                        stroke-width="8"
                      />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        fill="none" 
                        :stroke="getTempGradient(lake.temperature)" 
                        stroke-width="8"
                        stroke-linecap="round"
                        :stroke-dasharray="`${getTempPercentage(lake.temperature) * 2.513}, 1000`"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                      <div class="text-2xl font-bold" :class="getTempTextColor(lake.temperature)">
                        {{ lake.temperature }}°
                      </div>
                      <div class="text-xs" :class="getChangeColor(lake.deviation)">
                        {{ lake.deviation >= 0 ? '+' : '' }}{{ lake.deviation }}°
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Линейный термометр -->
              <div class="mb-6">
                <div class="flex justify-between text-sm text-gray-600 mb-3">
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-blue-400"></div>
                    <span>Низкая</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span>Высокая</span>
                    <div class="w-3 h-3 rounded-full bg-red-400"></div>
                  </div>
                </div>
                <div class="relative w-full h-4 bg-gradient-to-r from-blue-400 via-green-400 to-red-500 rounded-2xl overflow-hidden">
                  <!-- Маркеры -->
                  <div class="absolute top-0 left-1/4 w-0.5 h-full bg-white/50"></div>
                  <div class="absolute top-0 left-1/2 w-0.5 h-full bg-white/50"></div>
                  <div class="absolute top-0 left-3/4 w-0.5 h-full bg-white/50"></div>
                  
                  <!-- Текущая температура -->
                  <div 
                    class="absolute top-1/2 transform -translate-y-1/2 w-3 h-8 rounded-full shadow-lg border-2 border-white"
                    :class="getTempColor(lake.temperature)"
                    :style="{ left: getTempPercentage(lake.temperature) + '%' }"
                  >
                    <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-semibold px-2 py-1 rounded-lg bg-white shadow-sm">
                      {{ lake.temperature }}°
                    </div>
                  </div>
                </div>
                <div class="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0°C</span>
                  <span class="text-blue-600 font-semibold">Норма: {{ lake.seasonNorm }}°C</span>
                  <span>30°C</span>
                </div>
              </div>
              
              <!-- Детали -->
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-3 bg-gray-50 rounded-xl">
                  <div class="text-sm text-gray-500 mb-1">Статус</div>
                  <div class="font-semibold flex items-center justify-center gap-2" :class="getStatusColor(lake.status)">
                    <span class="text-lg">{{ getStatusIcon(lake.status) }}</span>
                    {{ lake.status }}
                  </div>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded-xl">
                  <div class="text-sm text-gray-500 mb-1">Отклонение</div>
                  <div class="font-bold text-lg" :class="getChangeColor(lake.deviation)">
                    {{ lake.deviation >= 0 ? '+' : '' }}{{ lake.deviation }}°
                  </div>
                </div>
              </div>
              
              <!-- Дополнительная информация -->
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
        </div>
        
        <!-- Табличный вид -->
        <div v-else class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-blue-50 to-cyan-50">
              <tr>
                <th class="p-4 text-left font-semibold text-gray-700">Озеро</th>
                <th class="p-4 text-left font-semibold text-gray-700">Температура</th>
                <th class="p-4 text-left font-semibold text-gray-700">Норма</th>
                <th class="p-4 text-left font-semibold text-gray-700">Отклонение</th>
                <th class="p-4 text-left font-semibold text-gray-700">Статус</th>
                <th class="p-4 text-left font-semibold text-gray-700">Тенденция</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr 
                v-for="lake in lakes" 
                :key="lake.id"
                class="hover:bg-blue-50/50 transition-colors cursor-pointer"
                @click="selectLake(lake)"
              >
                <td class="p-4 font-medium text-gray-800">{{ lake.name }}</td>
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <div class="text-xl font-bold" :class="getTempTextColor(lake.temperature)">
                      {{ lake.temperature }}°
                    </div>
                    <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        class="h-full rounded-full transition-all duration-500"
                        :style="{ 
                          background: getTempGradient(lake.temperature),
                          width: getTempPercentage(lake.temperature) + '%' 
                        }"
                      ></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-gray-600">{{ lake.seasonNorm }}°</td>
                <td class="p-4">
                  <div class="flex items-center gap-2 font-semibold" :class="getChangeColor(lake.deviation)">
                    <span class="text-lg">{{ lake.deviation >= 0 ? '↗' : '↘' }}</span>
                    <span>{{ Math.abs(lake.deviation) }}°</span>
                  </div>
                </td>
                <td class="p-4">
                  <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium" 
                        :class="getStatusBadge(lake.status)">
                    {{ getStatusIcon(lake.status) }}
                    {{ lake.status }}
                  </span>
                </td>
                <td class="p-4">
                  <div class="text-2xl" :class="getTrendColor(lake.deviation)">
                    {{ lake.deviation >= 0 ? '↗' : '↘' }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Статистика и аналитика -->
      <section class="mb-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Ключевые показатели -->
          <div class="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-6">📈 Температурная динамика</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div 
                v-for="stat in tempStats" 
                :key="stat.title"
                class="stat-card"
                @mouseenter="hoveredStat = stat.title"
              >
                <div class="text-center p-4 rounded-2xl border-2 border-white hover:border-blue-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-300">
                  <div class="text-3xl font-bold mb-2" :class="stat.color">
                    {{ stat.value }}
                  </div>
                  <div class="text-sm font-semibold text-gray-700">{{ stat.title }}</div>
                  <div class="text-xs text-gray-500 mt-1">{{ stat.description }}</div>
                </div>
              </div>
            </div>
            
            <!-- Мини-график температуры -->
            <div class="mt-8 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div class="flex items-center justify-between mb-4">
                <h4 class="font-semibold text-gray-700">Изменение за последние 7 дней</h4>
                <div class="flex gap-2">
                  <span class="text-sm px-2 py-1 rounded-lg bg-blue-100 text-blue-700">↓ Похолодание</span>
                  <span class="text-sm px-2 py-1 rounded-lg bg-red-100 text-red-700">↑ Потепление</span>
                </div>
              </div>
              <div class="h-32 flex items-end justify-between">
                <div 
                  v-for="(day, index) in last7Days" 
                  :key="index"
                  class="flex-1 mx-1"
                >
                  <div 
                    class="w-full rounded-t-lg transition-all duration-500 hover:opacity-100 cursor-pointer"
                    :style="{
                      height: (Math.abs(day.temperature) * 3) + 'px',
                      background: getTempGradient(day.temperature)
                    }"
                    :title="`${day.date}: ${day.temperature}°C`"
                  ></div>
                  <div class="text-xs text-gray-500 text-center mt-2">{{ day.label }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Быстрый анализ -->
          <div class="bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl shadow-xl p-6 text-white">
            <h3 class="text-xl font-bold mb-6">🔥 Горячие точки</h3>
            <div class="space-y-4">
              <div v-for="insight in insights" :key="insight.text" class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div class="flex items-start gap-3">
                  <div class="text-2xl">{{ insight.icon }}</div>
                  <div>
                    <p class="font-medium">{{ insight.text }}</p>
                    <p class="text-sm opacity-80 mt-1">{{ insight.detail }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Рекомендации -->
            <div class="mt-8 pt-6 border-t border-white/20">
              <h4 class="font-bold mb-3">⚠️ Экстренные меры</h4>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-white rounded-full"></div>
                  Запрет на купание в озёрах выше 24°C
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-white rounded-full"></div>
                  Мониторинг кислородного режима
                </li>
                <li class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-white rounded-full"></div>
                  Искусственная аэрация критических зон
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Факторы влияния и прогноз -->
      <section>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Факторы влияния -->
          <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-800">🌡️ Факторы нагрева</h3>
              <div class="text-sm px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                Коэффициент влияния
              </div>
            </div>
            
            <div class="space-y-4">
              <div 
                v-for="factor in tempFactors" 
                :key="factor.title"
                class="factor-card group"
              >
                <div class="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                  <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {{ factor.icon }}
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between items-center mb-1">
                      <h4 class="font-bold text-gray-800">{{ factor.title }}</h4>
                      <span class="text-sm px-2 py-1 rounded-full font-semibold" 
                            :class="getImpactBadge(factor.impact)">
                        {{ getImpactText(factor.impact) }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-600">{{ factor.description }}</p>
                    
                    <!-- Индикатор влияния -->
                    <div class="mt-3">
                      <div class="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Влияние на нагрев</span>
                        <span>{{ getImpactPercentage(factor.impact) }}%</span>
                      </div>
                      <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          class="h-full rounded-full transition-all duration-1000"
                          :style="{
                            background: getImpactColor(factor.impact),
                            width: getImpactPercentage(factor.impact) + '%'
                          }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Прогноз температуры -->
          <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6">
            <h3 class="text-2xl font-bold text-gray-800 mb-6">🔮 Прогноз температуры</h3>
            
            <div class="space-y-4">
              <div 
                v-for="forecast in tempForecast" 
                :key="forecast.period"
                class="forecast-card"
                :class="getForecastCardClass(forecast.trend)"
              >
                <div class="flex items-center justify-between p-4">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" 
                         :class="getForecastIconClass(forecast.trend)">
                      {{ getForecastIcon(forecast.trend) }}
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-800">{{ forecast.period }}</h4>
                      <p class="text-sm text-gray-600">{{ forecast.description }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-3xl font-bold mb-1" :class="getForecastColor(forecast.trend)">
                      {{ forecast.temperature }}°
                    </div>
                    <div class="text-xs text-gray-500">{{ forecast.change }}</div>
                  </div>
                </div>
                
                <!-- Дополнительная информация -->
                <div class="px-4 pb-4 text-sm text-gray-600">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full" :class="getTempDotColor(forecast.temperature)"></div>
                    {{ forecast.detail }}
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Индикатор уверенности прогноза -->
            <div class="mt-8 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Точность прогноза</span>
                <span class="text-sm font-bold text-blue-600">92%</span>
              </div>
              <div class="h-2 bg-white rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full" style="width: 92%"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const currentDate = new Date().toLocaleDateString('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})

const isListView = ref(false)
const isRefreshing = ref(false)
const hoveredStat = ref('')

const lakes = ref([
  {
    id: 1,
    name: 'Озеро Пёстрое',
    location: 'Северный район',
    temperature: 24.5,
    seasonNorm: 18.2,
    deviation: 6.3,
    status: 'Критическое',
    depth: '3.8м'
  },
  {
    id: 2,
    name: 'Озеро Белое',
    location: 'Центральный район',
    temperature: 22.1,
    seasonNorm: 17.8,
    deviation: 4.3,
    status: 'Высокое',
    depth: '5.2м'
  },
  {
    id: 3,
    name: 'Озеро Горькое',
    location: 'Южный район',
    temperature: 26.3,
    seasonNorm: 18.5,
    deviation: 7.8,
    status: 'Критическое',
    depth: '2.9м'
  },
  {
    id: 4,
    name: 'Озеро Поганка',
    location: 'Западный район',
    temperature: 20.8,
    seasonNorm: 17.2,
    deviation: 3.6,
    status: 'Повышенное',
    depth: '4.1м'
  },
  {
    id: 5,
    name: 'Озеро Дикое',
    location: 'Восточный район',
    temperature: 25.1,
    seasonNorm: 18.8,
    deviation: 6.3,
    status: 'Критическое',
    depth: '3.5м'
  },
  {
    id: 6,
    name: 'Река Ишим',
    location: 'Центр города',
    temperature: 18.9,
    seasonNorm: 16.5,
    deviation: 2.4,
    status: 'Нормальное',
    depth: '—'
  }
])

const tempStats = ref([
  {
    title: 'Средняя темп.',
    value: '23.0°',
    description: 'По всем озёрам',
    color: 'text-red-600'
  },
  {
    title: 'Макс. нагрев',
    value: '+7.8°',
    description: 'Оз. Горькое',
    color: 'text-orange-600'
  },
  {
    title: 'Выше нормы',
    value: '6/6',
    description: 'Все озёра',
    color: 'text-rose-600'
  },
  {
    title: 'Тенденция',
    value: '↗',
    description: 'Повышение',
    color: 'text-red-500'
  }
])

const tempFactors = ref([
  {
    icon: '☀️',
    title: 'Солнечная радиация',
    description: 'Прямое воздействие солнечных лучей на поверхность воды',
    impact: 'high'
  },
  {
    icon: '🏙️',
    title: 'Городской эффект',
    description: 'Накопление тепла от городской инфраструктуры',
    impact: 'high'
  },
  {
    icon: '💨',
    title: 'Ветровой режим',
    description: 'Снижение ветровой активности и перемешивания',
    impact: 'medium'
  },
  {
    icon: '🏭',
    title: 'Тепловые сбросы',
    description: 'Сброс нагретых вод промышленными объектами',
    impact: 'low'
  }
])

const tempForecast = ref([
  {
    period: '24 часа',
    temperature: '25°',
    trend: 'increase',
    description: 'Продолжение нагрева',
    change: '+1.2°',
    detail: 'Солнечная погода без осадков'
  },
  {
    period: '3 дня',
    temperature: '26°',
    trend: 'increase',
    description: 'Пиковый нагрев',
    change: '+2.1°',
    detail: 'Антициклон, ясная погода'
  },
  {
    period: 'Неделя',
    temperature: '24°',
    trend: 'stable',
    description: 'Стабилизация',
    change: '-0.5°',
    detail: 'Ожидаются дожди'
  },
  {
    period: 'Месяц',
    temperature: '22°',
    trend: 'decrease',
    description: 'Сезонное похолодание',
    change: '-3.0°',
    detail: 'Переход к осенним температурам'
  }
])

const insights = ref([
  {
    icon: '🔥',
    text: '3 озера в критическом состоянии',
    detail: 'Температура выше 24°C'
  },
  {
    icon: '🌊',
    text: 'Ускоренное испарение воды',
    detail: 'Риск снижения уровня на 15%'
  },
  {
    icon: '🐟',
    text: 'Угроза для рыбных ресурсов',
    detail: 'Кислородное голодание'
  }
])

const last7Days = ref([
  { date: 'Пн', label: 'ПН', temperature: 22.5 },
  { date: 'Вт', label: 'ВТ', temperature: 23.1 },
  { date: 'Ср', label: 'СР', temperature: 24.8 },
  { date: 'Чт', label: 'ЧТ', temperature: 25.3 },
  { date: 'Пт', label: 'ПТ', temperature: 26.1 },
  { date: 'Сб', label: 'СБ', temperature: 25.8 },
  { date: 'Вс', label: 'ВС', temperature: 24.9 }
])

// Computed свойства
const averageTemperature = computed(() => {
  const sum = lakes.value.reduce((acc, lake) => acc + lake.temperature, 0)
  return (sum / lakes.value.length).toFixed(1)
})

const averageDeviation = computed(() => {
  const sum = lakes.value.reduce((acc, lake) => acc + lake.deviation, 0)
  return (sum / lakes.value.length).toFixed(1)
})

// Методы
const selectLake = (lake: any) => {
  console.log('Выбрано озеро:', lake.name)
}

const toggleViewMode = () => {
  isListView.value = !isListView.value
}

const refreshData = () => {
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
  }, 1000)
}

const getTempColor = (temp: number) => {
  if (temp < 15) return 'bg-blue-500'
  if (temp < 20) return 'bg-green-500'
  if (temp < 24) return 'bg-yellow-500'
  if (temp < 26) return 'bg-orange-500'
  return 'bg-red-500'
}

const getTempGradient = (temp: number) => {
  if (temp < 15) return '#3b82f6'
  if (temp < 20) return '#10b981'
  if (temp < 24) return '#f59e0b'
  if (temp < 26) return '#f97316'
  return '#ef4444'
}

const getTempTextColor = (temp: number) => {
  if (temp < 15) return 'text-blue-600'
  if (temp < 20) return 'text-green-600'
  if (temp < 24) return 'text-yellow-600'
  if (temp < 26) return 'text-orange-600'
  return 'text-red-600'
}

const getTempPercentage = (temp: number) => {
  const min = 0
  const max = 30
  return ((temp - min) / (max - min)) * 100
}

const getTempDotColor = (temp: number | string) => {
  const numTemp = typeof temp === 'string' ? parseFloat(temp) : temp
  if (numTemp < 20) return 'bg-blue-400'
  if (numTemp < 24) return 'bg-yellow-400'
  return 'bg-red-400'
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Критическое': return 'text-red-600'
    case 'Высокое': return 'text-orange-500'
    case 'Повышенное': return 'text-yellow-500'
    default: return 'text-green-600'
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Критическое': return 'bg-red-100 text-red-700'
    case 'Высокое': return 'bg-orange-100 text-orange-700'
    case 'Повышенное': return 'bg-yellow-100 text-yellow-700'
    default: return 'bg-green-100 text-green-700'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Критическое': return '🔥'
    case 'Высокое': return '🌡️'
    case 'Повышенное': return '⚠️'
    default: return '✅'
  }
}

const getChangeColor = (change: number) => {
  return change >= 0 ? 'text-red-600' : 'text-blue-600'
}

const getTrendColor = (change: number) => {
  return change >= 0 ? 'text-red-500' : 'text-blue-500'
}

const getImpactBadge = (impact: string) => {
  switch (impact) {
    case 'high': return 'bg-red-100 text-red-700'
    case 'medium': return 'bg-orange-100 text-orange-700'
    case 'low': return 'bg-blue-100 text-blue-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const getImpactText = (impact: string) => {
  switch (impact) {
    case 'high': return 'Высокое'
    case 'medium': return 'Среднее'
    case 'low': return 'Низкое'
    default: return 'Неизвестно'
  }
}

const getImpactPercentage = (impact: string) => {
  switch (impact) {
    case 'high': return 85
    case 'medium': return 60
    case 'low': return 30
    default: return 0
  }
}

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'high': return 'linear-gradient(90deg, #f97316, #ef4444)'
    case 'medium': return 'linear-gradient(90deg, #f59e0b, #f97316)'
    case 'low': return 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
    default: return '#9ca3af'
  }
}

const getForecastColor = (trend: string) => {
  switch (trend) {
    case 'increase': return 'text-red-600'
    case 'decrease': return 'text-blue-600'
    default: return 'text-gray-600'
  }
}

const getForecastIcon = (trend: string) => {
  switch (trend) {
    case 'increase': return '↗'
    case 'decrease': return '↘'
    default: return '→'
  }
}

const getForecastIconClass = (trend: string) => {
  switch (trend) {
    case 'increase': return 'bg-red-100 text-red-600'
    case 'decrease': return 'bg-blue-100 text-blue-600'
    default: return 'bg-gray-100 text-gray-600'
  }
}

const getForecastCardClass = (trend: string) => {
  switch (trend) {
    case 'increase': return 'border-red-200 hover:border-red-300'
    case 'decrease': return 'border-blue-200 hover:border-blue-300'
    default: return 'border-gray-200 hover:border-gray-300'
  }
}
</script>

<style scoped>
/* Анимации */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Применение анимаций */
.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-fade-in-down {
  animation: fade-in-down 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out 0.2s both;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* Плавающие элементы температуры */
.floating-thermo {
  position: absolute;
  font-size: 2.5rem;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
  z-index: 0;
}

.floating-thermo:nth-child(2) { animation-delay: 1s; }
.floating-thermo:nth-child(3) { animation-delay: 2s; }
.floating-thermo:nth-child(4) { animation-delay: 3s; }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}

/* Специальные стили карточек */
.lake-card {
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.lake-card:hover {
  transform: translateY(-4px);
}

.lake-card.critical-card .bg-white {
  background: linear-gradient(135deg, #fff 0%, #fff5f5 100%);
}

.stat-card:hover {
  transform: translateY(-2px);
  cursor: pointer;
}

.stat-card:hover .border-white {
  border-color: #3b82f6;
}

.factor-card:hover {
  transform: translateX(4px);
}

.forecast-card {
  border: 2px solid transparent;
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.forecast-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Эффекты стекла */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Градиентные тени */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>