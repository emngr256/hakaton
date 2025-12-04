<template>
  <div class="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 py-8 overflow-hidden relative">
    <!-- Анимированный фон -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div class="absolute top-1/2 -right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-1/4 left-1/3 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Плавающие элементы воды -->
    <div class="floating-water" style="top: 15%; left: 5%">💧</div>
    <div class="floating-water" style="top: 25%; right: 8%">🌊</div>
    <div class="floating-water" style="bottom: 30%; left: 10%">💦</div>
    <div class="floating-water" style="bottom: 20%; right: 5%">🌀</div>

    <div class="container mx-auto px-4 max-w-6xl relative z-10">
      
      <!-- Заголовок -->
      <div class="text-center mb-12 animate-fade-in-down">
        <div class="inline-block mb-4">
          <div class="text-7xl mb-2">🌊</div>
          <div class="h-1 w-32 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
        </div>
        <h1 class="text-5xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
          Гидрологический мониторинг
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Актуальные данные об уровне воды в озёрах Петропавловска и оценка гидрологической ситуации
        </p>
        
        <!-- Индикатор обновления -->
        <div class="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-sm text-gray-600">Обновлено: {{ currentDate }}</span>
        </div>
      </div>

      <!-- Предупреждение (новая секция в стиле temperature) -->
      <section class="mb-12">
        <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-[1.02] transition-transform duration-300">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          
          <div class="relative flex flex-col md:flex-row items-center gap-6">
            <div class="text-5xl animate-bounce">🌊</div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <h2 class="text-3xl font-bold">ГИДРОЛОГИЧЕСКАЯ ТРЕВОГА</h2>
                <div class="px-3 py-1 bg-white/20 rounded-full text-sm font-bold">DROUGHT ALERT</div>
              </div>
              <p class="text-xl opacity-95 leading-relaxed">
                Уровень воды в {{ criticalLakesCount }} озёрах достиг критической отметки. 
                Общее снижение составило <span class="font-bold text-yellow-300">{{ averageChange }}м</span> за последний месяц!
              </p>
            </div>
            <div class="px-4 py-2 bg-white/20 rounded-full border border-white/30">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
                <span class="font-mono text-sm">Ср. уровень: {{ averageLevel }}м</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Текущие показатели -->
      <section class="mb-12 animate-fade-in-up">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-3xl font-bold text-gray-800">Текущие уровни воды</h2>
            <p class="text-gray-600 mt-1">Динамика изменений в реальном времени</p>
          </div>
          <div class="flex gap-2">
            <button 
              @click="toggleViewMode"
              class="p-2 rounded-xl bg-white shadow hover:shadow-md transition-all"
              :title="isListView ? 'Перейти к карточкам' : 'Перейти к таблице'"
            >
              {{ isListView ? '📊' : '📋' }}
            </button>
            <button 
              @click="refreshData"
              class="p-2 rounded-xl bg-white shadow hover:shadow-md transition-all"
              :class="{'animate-spin': isRefreshing}"
              title="Обновить данные"
            >
              🔄
            </button>
          </div>
        </div>
        
        <!-- Карточный вид -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" v-if="!isListView">
          <div 
            v-for="lake in lakes" 
            :key="lake.id" 
            class="lake-card group"
            :class="{'critical-card': lake.status === 'Критический'}"
            @click="selectLake(lake)"
          >
            <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <!-- Заголовок карточки -->
              <div class="flex justify-between items-start mb-6">
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">{{ lake.name }}</h3>
                  <div class="flex items-center gap-2 text-sm text-gray-500">
                    <span class="flex items-center gap-1">
                      <span class="w-2 h-2 rounded-full" :class="getLevelDotColor(lake.level)"></span>
                      {{ lake.location }}
                    </span>
                    <span>•</span>
                    <span>Глубина: {{ lake.depth || '4.5' }}м</span>
                  </div>
                </div>
                
                <!-- Круговой индикатор -->
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
                        :stroke="getLevelGradient(lake.level)" 
                        stroke-width="8"
                        stroke-linecap="round"
                        :stroke-dasharray="`${getLevelPercentage(lake.level) * 2.513}, 1000`"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                      <div class="text-2xl font-bold" :class="getLevelTextColor(lake.level)">
                        {{ lake.level }}м
                      </div>
                      <div class="text-xs" :class="getChangeColor(lake.change)">
                        {{ lake.change >= 0 ? '↑' : '↓' }} {{ Math.abs(lake.change) }}м
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Линейный индикатор (улучшенный) -->
              <div class="mb-6">
                <div class="flex justify-between text-sm text-gray-600 mb-3">
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-red-400"></div>
                    <span>Минимум</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span>Максимум</span>
                    <div class="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div class="relative w-full h-4 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-2xl overflow-hidden">
                  <!-- Маркеры -->
                  <div class="absolute top-0 left-1/4 w-0.5 h-full bg-gray-300"></div>
                  <div class="absolute top-0 left-1/2 w-0.5 h-full bg-gray-300"></div>
                  <div class="absolute top-0 left-3/4 w-0.5 h-full bg-gray-300"></div>
                  
                  <!-- Нормативный уровень -->
                  <div 
                    class="absolute top-0 bottom-0 w-1 bg-blue-600"
                    :style="{ left: getNormPercentage(lake.seasonNorm) + '%' }"
                  >
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-blue-600 whitespace-nowrap">
                      Норма
                    </div>
                  </div>
                  
                  <!-- Текущий уровень -->
                  <div 
                    class="absolute top-1/2 transform -translate-y-1/2 w-3 h-8 rounded-full shadow-lg border-2 border-white"
                    :style="{
                      left: getLevelPercentage(lake.level) + '%',
                      background: getLevelGradient(lake.level)
                    }"
                  >
                    <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-semibold px-2 py-1 rounded-lg bg-white shadow-sm">
                      {{ lake.level }}м
                    </div>
                  </div>
                </div>
                <div class="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1.0м</span>
                  <span class="text-blue-600 font-semibold">Норма: {{ lake.seasonNorm }}м</span>
                  <span>6.0м</span>
                </div>
              </div>
              
              <!-- Детали -->
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div class="text-sm text-gray-500 mb-1">Статус</div>
                  <div class="font-semibold flex items-center justify-center gap-2" :class="getStatusColor(lake.status)">
                    <span class="text-lg">{{ getStatusIcon(lake.status) }}</span>
                    {{ lake.status }}
                  </div>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div class="text-sm text-gray-500 mb-1">Изменение (30 дн.)</div>
                  <div class="font-bold text-lg" :class="getChangeColor(lake.change)">
                    {{ lake.change >= 0 ? '+' : '' }}{{ lake.change }}м
                  </div>
                </div>
              </div>
              
              <!-- Кнопка деталей -->
              <button 
                @click.stop="showLakeDetails(lake)"
                class="w-full mt-4 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 text-blue-600 font-medium transition-all duration-300 group-hover:shadow-md"
              >
                <div class="flex items-center justify-center gap-2">
                  <span>📊</span>
                  Подробная статистика
                </div>
              </button>
              
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
                <th class="p-4 text-left font-semibold text-gray-700">Уровень</th>
                <th class="p-4 text-left font-semibold text-gray-700">Норма</th>
                <th class="p-4 text-left font-semibold text-gray-700">Изменение</th>
                <th class="p-4 text-left font-semibold text-gray-700">Статус</th>
                <th class="p-4 text-left font-semibold text-gray-700">Тенденция</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr 
                v-for="lake in lakes" 
                :key="lake.id"
                class="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                @click="selectLake(lake)"
              >
                <td class="p-4 font-medium text-gray-800">
                  <div class="flex items-center gap-3">
                    <span class="text-lg">{{ getLakeIcon(lake.status) }}</span>
                    <span>{{ lake.name }}</span>
                  </div>
                </td>
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <div class="text-xl font-bold" :class="getLevelTextColor(lake.level)">
                      {{ lake.level }}м
                    </div>
                    <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        class="h-full rounded-full transition-all duration-500"
                        :style="{
                          background: getLevelGradient(lake.level),
                          width: getLevelPercentage(lake.level) + '%'
                        }"
                      ></div>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-gray-600">{{ lake.seasonNorm }}м</td>
                <td class="p-4">
                  <div class="flex items-center gap-2 font-semibold" :class="getChangeColor(lake.change)">
                    <span class="text-lg">{{ lake.change >= 0 ? '↗' : '↘' }}</span>
                    <span>{{ Math.abs(lake.change) }}м</span>
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
                  <div class="text-2xl" :class="getTrendColor(lake.change)">
                    {{ lake.change >= 0 ? '↗' : '↘' }}
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
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-gray-800">📈 Гидрологическая динамика</h3>
              <div class="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                Последние 30 дней
              </div>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div 
                v-for="stat in waterStats" 
                :key="stat.title"
                class="stat-card"
                @mouseenter="hoveredStat = stat.title"
                @mouseleave="hoveredStat = ''"
              >
                <div class="text-center p-4 rounded-2xl border-2 border-white hover:border-blue-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-300">
                  <div class="text-3xl font-bold mb-2" :class="stat.color">
                    {{ stat.value }}
                  </div>
                  <div class="text-sm font-semibold text-gray-700">{{ stat.title }}</div>
                  <div class="text-xs text-gray-500 mt-1">{{ stat.description }}</div>
                  
                  <!-- Индикатор при наведении -->
                  <div 
                    v-if="hoveredStat === stat.title"
                    class="absolute inset-0 bg-blue-500/5 rounded-2xl border-2 border-blue-200 transition-all duration-300"
                  ></div>
                </div>
              </div>
            </div>
            
            <!-- Мини-график (улучшенный) -->
            <div class="mt-8 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div class="flex items-center justify-between mb-4">
                <h4 class="font-semibold text-gray-700">Изменение уровня за неделю</h4>
                <div class="flex gap-2">
                  <span class="text-sm px-2 py-1 rounded-lg bg-red-100 text-red-700 font-medium">
                    ↓ Понижение
                  </span>
                  <span class="text-sm px-2 py-1 rounded-lg bg-green-100 text-green-700 font-medium">
                    ↑ Повышение
                  </span>
                </div>
              </div>
              <div class="h-32 flex items-end justify-between">
                <div 
                  v-for="(day, index) in last7Days" 
                  :key="index"
                  class="flex-1 mx-1"
                  @mouseenter="hoveredDay = day"
                  @mouseleave="hoveredDay = null"
                >
                  <div 
                    class="w-full rounded-t-lg transition-all duration-500 hover:opacity-100 cursor-pointer"
                    :style="{
                      height: (Math.abs(day.value) * 20) + 'px',
                      background: day.trend === 'up' 
                        ? 'linear-gradient(to top, #10b981, #34d399)' 
                        : 'linear-gradient(to top, #ef4444, #f87171)'
                    }"
                  >
                    <div 
                      v-if="hoveredDay === day"
                      class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                    >
                      {{ day.value >= 0 ? '+' : '' }}{{ day.value }}м
                    </div>
                  </div>
                  <div class="text-xs text-gray-500 text-center mt-2">{{ day.label }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Быстрый анализ -->
          <div class="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl shadow-xl p-6 text-white">
            <h3 class="text-xl font-bold mb-6">📊 Быстрый анализ</h3>
            <div class="space-y-4">
              <div 
                v-for="insight in insights" 
                :key="insight.text" 
                class="insight-card group"
                @click="showInsightDetails(insight)"
              >
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
                  <div class="flex items-start gap-3">
                    <div class="text-2xl group-hover:scale-110 transition-transform duration-300">{{ insight.icon }}</div>
                    <div class="flex-1">
                      <p class="font-medium">{{ insight.text }}</p>
                      <p class="text-sm opacity-80 mt-1">{{ insight.detail }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Рекомендации -->
            <div class="mt-8 pt-6 border-t border-white/20">
              <h4 class="font-bold mb-3 flex items-center gap-2">
                <span>🎯</span>
                Рекомендации
              </h4>
              <ul class="space-y-2 text-sm">
                <li 
                  v-for="(recommendation, index) in recommendations" 
                  :key="index"
                  class="flex items-center gap-2 hover:text-yellow-200 transition-colors cursor-pointer"
                  @click="showRecommendationDetails(recommendation)"
                >
                  <div class="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                  <span>{{ recommendation }}</span>
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
              <h3 class="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <span>🌡️</span>
                Факторы влияния
              </h3>
              <div class="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                Коэффициент влияния
              </div>
            </div>
            
            <div class="space-y-4">
              <div 
                v-for="factor in waterFactors" 
                :key="factor.title"
                class="factor-card group"
                @click="showFactorDetails(factor)"
              >
                <div class="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
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
                        <span>Влияние на уровень</span>
                        <span>{{ getImpactPercentage(factor.impact) }}%</span>
                      </div>
                      <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          class="h-full rounded-full transition-all duration-1000"
                          :style="{
                            background: getImpactGradient(factor.impact),
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
          
          <!-- Прогноз -->
          <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6">
            <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span>🔮</span>
              Гидрологический прогноз
            </h3>
            
            <div class="space-y-4">
              <div 
                v-for="forecast in waterForecast" 
                :key="forecast.period"
                class="forecast-card group"
                :class="getForecastCardClass(forecast.trend)"
                @click="showForecastDetails(forecast)"
              >
                <div class="flex items-center justify-between p-4">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300" 
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
                      {{ getForecastArrow(forecast.trend) }}
                    </div>
                    <div class="text-xs text-gray-500">{{ forecast.change }}</div>
                  </div>
                </div>
                
                <!-- Дополнительная информация -->
                <div class="px-4 pb-4 text-sm text-gray-600">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full" :class="getForecastDotClass(forecast.trend)"></div>
                    {{ forecast.detail }}
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Индикатор уверенности прогноза -->
            <div class="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Точность прогноза</span>
                <span class="text-sm font-bold text-blue-600">88%</span>
              </div>
              <div class="h-2 bg-white rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 rounded-full" style="width: 88%"></div>
              </div>
              <div class="text-xs text-gray-500 mt-2 text-center">
                Основано на метеоданных и исторических показателях
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
const hoveredDay = ref<any>(null)
const selectedLake = ref<any>(null)

const lakes = ref([
  {
    id: 1,
    name: 'Озеро Пёстрое',
    location: 'Северный район',
    level: 3.2,
    seasonNorm: 3.8,
    change: -0.6,
    status: 'Пониженный',
    area: '18.5',
    depth: '3.8'
  },
  {
    id: 2,
    name: 'Озеро Белое',
    location: 'Центральный район',
    level: 4.1,
    seasonNorm: 4.2,
    change: -0.1,
    status: 'Нормальный',
    area: '25.3',
    depth: '5.2'
  },
  {
    id: 3,
    name: 'Озеро Горькое',
    location: 'Южный район',
    level: 2.8,
    seasonNorm: 3.5,
    change: -0.7,
    status: 'Критический',
    area: '12.7',
    depth: '2.9'
  },
  {
    id: 4,
    name: 'Озеро Поганка',
    location: 'Западный район',
    level: 3.9,
    seasonNorm: 3.7,
    change: +0.2,
    status: 'Нормальный',
    area: '9.8',
    depth: '4.1'
  },
  {
    id: 5,
    name: 'Озеро Дикое',
    location: 'Восточный район',
    level: 2.5,
    seasonNorm: 3.2,
    change: -0.7,
    status: 'Критический',
    area: '21.4',
    depth: '3.5'
  },
  {
    id: 6,
    name: 'Река Ишим',
    location: 'Центр города',
    level: 1.8,
    seasonNorm: 1.9,
    change: -0.1,
    status: 'Нормальный',
    area: '—',
    depth: '—'
  }
])

const waterStats = ref([
  {
    title: 'Средний уровень',
    value: '3.4м',
    description: 'По всем озёрам',
    color: 'text-blue-600'
  },
  {
    title: 'Макс. снижение',
    value: '-0.7м',
    description: 'Оз. Горькое',
    color: 'text-red-600'
  },
  {
    title: 'Озёр в норме',
    value: '3/6',
    description: '50% водоёмов',
    color: 'text-green-600'
  },
  {
    title: 'Общая тенденция',
    value: '↘',
    description: 'Снижение уровня',
    color: 'text-orange-500'
  }
])

const waterFactors = ref([
  {
    icon: '☀️',
    title: 'Испарение',
    description: 'Высокие температуры увеличивают испарение с поверхности воды',
    impact: 'high'
  },
  {
    icon: '🌧️',
    title: 'Осадки',
    description: 'Недостаток осадков не компенсирует потери воды',
    impact: 'high'
  },
  {
    icon: '🏭',
    title: 'Водозабор',
    description: 'Промышленный и сельскохозяйственный водозабор',
    impact: 'medium'
  },
  {
    icon: '🌱',
    title: 'Растительность',
    description: 'Прибрежная растительность увеличивает транспирацию',
    impact: 'low'
  }
])

const waterForecast = ref([
  {
    period: 'Неделя',
    trend: 'decrease',
    description: 'Незначительное понижение',
    change: '-0.1м',
    detail: 'Стабильные погодные условия'
  },
  {
    period: 'Месяц',
    trend: 'decrease',
    description: 'Умеренное понижение',
    change: '-0.3м',
    detail: 'Ожидается жаркая погода'
  },
  {
    period: 'Сезон',
    trend: 'stable',
    description: 'Стабилизация уровня',
    change: '±0.0м',
    detail: 'Сезонные осадки'
  },
  {
    period: 'Год',
    trend: 'increase',
    description: 'Восстановление баланса',
    change: '+0.5м',
    detail: 'Реализация мер по сохранению'
  }
])

const insights = ref([
  {
    icon: '⚠️',
    text: '2 озера в критическом состоянии',
    detail: 'Требуют немедленного внимания'
  },
  {
    icon: '📉',
    text: 'Общая тенденция к снижению',
    detail: 'Среднее снижение -0.3м за месяц'
  },
  {
    icon: '💧',
    text: 'Дефицит водных ресурсов',
    detail: 'На 15% ниже сезонной нормы'
  }
])

const recommendations = ref([
  'Увеличить мониторинг критических озёр',
  'Рассмотреть возможность подпитки из Ишима',
  'Ограничить водозабор в засушливые периоды',
  'Создать систему раннего оповещения'
])

const last7Days = ref([
  { date: 'Пн', label: 'ПН', value: -0.2, trend: 'down' },
  { date: 'Вт', label: 'ВТ', value: -0.1, trend: 'down' },
  { date: 'Ср', label: 'СР', value: -0.3, trend: 'down' },
  { date: 'Чт', label: 'ЧТ', value: +0.1, trend: 'up' },
  { date: 'Пт', label: 'ПТ', value: -0.2, trend: 'down' },
  { date: 'Сб', label: 'СБ', value: -0.1, trend: 'down' },
  { date: 'Вс', label: 'ВС', value: +0.0, trend: 'stable' }
])

// Computed свойства
const averageLevel = computed(() => {
  const sum = lakes.value.reduce((acc, lake) => acc + lake.level, 0)
  return (sum / lakes.value.length).toFixed(1)
})

const averageChange = computed(() => {
  const sum = lakes.value.reduce((acc, lake) => acc + Math.abs(lake.change), 0)
  return (sum / lakes.value.length).toFixed(1)
})

const criticalLakesCount = computed(() => {
  return lakes.value.filter(lake => lake.status === 'Критический').length
})

// Методы
const selectLake = (lake: any) => {
  selectedLake.value = lake
  console.log('Выбрано озеро:', lake.name)
}

const showLakeDetails = (lake: any) => {
  alert(`Детальная информация по ${lake.name}:\n\nУровень воды: ${lake.level}м\nНорма: ${lake.seasonNorm}м\nИзменение: ${lake.change >= 0 ? '+' : ''}${lake.change}м\nСтатус: ${lake.status}`)
}

const showInsightDetails = (insight: any) => {
  console.log('Инсайт:', insight)
}

const showRecommendationDetails = (recommendation: string) => {
  console.log('Рекомендация:', recommendation)
}

const showFactorDetails = (factor: any) => {
  console.log('Фактор:', factor)
}

const showForecastDetails = (forecast: any) => {
  console.log('Прогноз:', forecast)
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

const getLevelColor = (level: number) => {
  if (level < 2.5) return 'bg-red-500'
  if (level < 3.0) return 'bg-orange-400'
  if (level < 3.5) return 'bg-yellow-400'
  return 'bg-green-500'
}

const getLevelGradient = (level: number) => {
  if (level < 2.5) return 'linear-gradient(135deg, #ef4444, #dc2626)'
  if (level < 3.0) return 'linear-gradient(135deg, #f97316, #ea580c)'
  if (level < 3.5) return 'linear-gradient(135deg, #f59e0b, #d97706)'
  return 'linear-gradient(135deg, #10b981, #059669)'
}

const getLevelTextColor = (level: number) => {
  if (level < 2.5) return 'text-red-600'
  if (level < 3.0) return 'text-orange-500'
  if (level < 3.5) return 'text-yellow-500'
  return 'text-green-600'
}

const getLevelDotColor = (level: number) => {
  if (level < 2.5) return 'bg-red-500'
  if (level < 3.0) return 'bg-orange-400'
  if (level < 3.5) return 'bg-yellow-400'
  return 'bg-green-500'
}

const getLevelPercentage = (level: number) => {
  const min = 1.0
  const max = 6.0
  return ((level - min) / (max - min)) * 100
}

const getNormPercentage = (norm: number) => {
  const min = 1.0
  const max = 6.0
  return ((norm - min) / (max - min)) * 100
}

const getLakeIcon = (status: string) => {
  switch (status) {
    case 'Критический': return '⚠️'
    case 'Пониженный': return '📉'
    case 'Нормальный': return '✅'
    default: return '🌊'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Критический': return 'text-red-600'
    case 'Пониженный': return 'text-orange-500'
    case 'Нормальный': return 'text-green-600'
    default: return 'text-gray-500'
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Критический': return 'bg-red-100 text-red-700'
    case 'Пониженный': return 'bg-orange-100 text-orange-700'
    case 'Нормальный': return 'bg-green-100 text-green-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Критический': return '⚠️'
    case 'Пониженный': return '📉'
    case 'Нормальный': return '✅'
    default: return '📊'
  }
}

const getChangeColor = (change: number) => {
  return change >= 0 ? 'text-green-600' : 'text-red-600'
}

const getTrendColor = (change: number) => {
  return change >= 0 ? 'text-green-500' : 'text-red-500'
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

const getImpactGradient = (impact: string) => {
  switch (impact) {
    case 'high': return 'linear-gradient(90deg, #ef4444, #f97316)'
    case 'medium': return 'linear-gradient(90deg, #f59e0b, #fbbf24)'
    case 'low': return 'linear-gradient(90deg, #3b82f6, #60a5fa)'
    default: return '#9ca3af'
  }
}

const getForecastColor = (trend: string) => {
  switch (trend) {
    case 'increase': return 'text-green-600'
    case 'decrease': return 'text-red-600'
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

const getForecastArrow = (trend: string) => {
  switch (trend) {
    case 'increase': return '↗'
    case 'decrease': return '↘'
    default: return '→'
  }
}

const getForecastIconClass = (trend: string) => {
  switch (trend) {
    case 'increase': return 'bg-green-100 text-green-600'
    case 'decrease': return 'bg-red-100 text-red-600'
    default: return 'bg-gray-100 text-gray-600'
  }
}

const getForecastCardClass = (trend: string) => {
  switch (trend) {
    case 'increase': return 'border-green-200 hover:border-green-300'
    case 'decrease': return 'border-red-200 hover:border-red-300'
    default: return 'border-gray-200 hover:border-gray-300'
  }
}

const getForecastDotClass = (trend: string) => {
  switch (trend) {
    case 'increase': return 'bg-green-400'
    case 'decrease': return 'bg-red-400'
    default: return 'bg-gray-400'
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

/* Плавающие элементы воды */
.floating-water {
  position: absolute;
  font-size: 2.5rem;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
  z-index: 0;
}

.floating-water:nth-child(2) { animation-delay: 1s; }
.floating-water:nth-child(3) { animation-delay: 2s; }
.floating-water:nth-child(4) { animation-delay: 3s; }

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

.stat-card {
  position: relative;
}

.stat-card:hover {
  transform: translateY(-2px);
  cursor: pointer;
}

.stat-card:hover .border-white {
  border-color: #3b82f6;
}

.insight-card:hover {
  cursor: pointer;
}

.factor-card:hover {
  transform: translateX(4px);
  cursor: pointer;
}

.forecast-card {
  border: 2px solid transparent;
  border-radius: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.forecast-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Гладкие переходы */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
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