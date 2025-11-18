<template>
  <div>
    <!-- Hero Section -->
    <section id="home" class="relative pt-20 min-h-screen flex items-center">
      <div class="absolute inset-0 z-0">
        <img src="" alt="">
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl">
          <div class="inline-flex items-start gap-2 bg-red-500/90 text-white px-4 py-2 rounded-full mb-6">
            <AlertCircle :size="20" />
            <span>Экологическая тревога</span>
          </div>
          
          <h1 class="text-white mb-6">
            Защитим озёра Петропавловска
          </h1>
          
          <p class="text-xl text-gray-200 mb-8 leading-relaxed">
            Наши озёра находятся под угрозой загрязнения и разрушения. 
            Присоединяйтесь к движению за сохранение водных ресурсов нашего города.
          </p>
        </div>
      </div>
    </section>

    <!-- Problems Section -->
    <section id="problems" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="mb-4">Основные экологические проблемы</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Озёра Петропавловска сталкиваются с множеством экологических угроз, 
            требующих немедленного внимания и действий.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard 
            v-for="(problem, index) in problems" 
            :key="index" 
            class="p-6 hover:shadow-lg transition-shadow"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <component :is="problem.icon" class="text-blue-600" :size="24" />
              </div>
              <div class="flex-1">
                <div class="flex items-start justify-between mb-2">
                  <h3 class="text-lg">{{ problem.title }}</h3>
                </div>
                <p class="text-gray-600 mb-3">{{ problem.description }}</p>
                <span :class="['inline-block px-3 py-1 rounded-full text-xs', getSeverityColor(problem.severity)]">
                  {{ problem.severity }}
                </span>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Lakes Section -->
    <section id="lakes" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="mb-4">Озёра под угрозой</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Каждое из озёр Петропавловска требует особого внимания и мер по восстановлению экосистемы.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <UCard 
            v-for="(lake, index) in lakes" 
            :key="index" 
            class="overflow-hidden hover:shadow-xl transition-shadow"
          >
            <template #header>
              <div class="relative h-48">
                <ImageWithFallback
                  :src="lake.image"
                  :alt="lake.name"
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-4 right-4">
                  <UBadge :color="getStatusColor(lake.status)" class="shadow-lg">
                    {{ lake.status }}
                  </UBadge>
                </div>
              </div>
            </template>
            
            <div class="p-6">
              <h3 class="text-xl mb-2">{{ lake.name }}</h3>
              
              <div class="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin :size="16" />
                <span>{{ lake.location }}</span>
              </div>

              <p class="text-gray-600 mb-4">{{ lake.description }}</p>

              <div class="flex gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div class="text-sm text-gray-500">Площадь</div>
                  <div class="font-semibold">{{ lake.area }}</div>
                </div>
                <div>
                  <div class="text-sm text-gray-500">Глубина</div>
                  <div class="font-semibold">{{ lake.depth }}</div>
                </div>
              </div>

              <div class="mt-4 flex items-center gap-2 text-red-600">
                <TrendingDown :size="16" />
                <span class="text-sm">Качество воды ухудшается</span>
              </div>
            </div>
          </UCard>
        </div>
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
  TrendingDown
} from 'lucide-vue-next'

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

const getStatusColor = (status: string): string => {
  switch (status) {
    case "Критическое":
      return "red"
    case "Загрязнено":
      return "gray"
    case "Под угрозой":
      return "yellow"
    default:
      return "gray"
  }
}
</script>

<style scoped>
h1 {
  @apply text-5xl font-bold;
}

h2 {
  @apply text-4xl font-bold;
}

h3 {
  @apply text-xl font-semibold;
}
</style>