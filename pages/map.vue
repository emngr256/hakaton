<template>
  <div class="h-screen w-full relative overflow-hidden">
    <!-- Кнопка информации на карте - перемещена ниже -->
    <div class="absolute top-20 left-4 z-[1000]">
      <button 
        @click="showInfo = !showInfo"
        class="p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all duration-300 border border-gray-300"
      >
        ℹ️ Информация
      </button>
    </div>

    <!-- Компактная информационная панель -->
    <div 
      v-if="showInfo"
      class="absolute top-32 left-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-4 max-w-xs max-h-[80vh] overflow-y-auto border border-gray-200"
    >
      <h2 class="text-lg font-bold mb-3">Водоемы Петропавловска</h2>
      <div class="space-y-2">
        <div v-for="waterbody in waterbodies" :key="waterbody.id" class="border-b pb-2 last:border-b-0">
          <h3 class="font-semibold text-sm">{{ waterbody.name }}</h3>
          <div class="text-xs text-gray-600 grid grid-cols-2 gap-1">
            <div>Температура: {{ waterbody.temperature }}°C</div>
            <div>Уровень: {{ waterbody.waterLevel }}м</div>
            <div>Метан: {{ waterbody.methane }}ppm</div>
            <div>Инфекция: {{ waterbody.infection }}%</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Карта -->
    <div class="h-full w-full">
      <LMap 
        ref="map"
        :zoom="zoom" 
        :center="center" 
        :use-global-leaflet="false"
        class="h-full w-full"
        :options="{
          zoomControl: false,
          attributionControl: false,
        }"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        />
        
        <!-- Маркеры для водоемов -->
        <LMarker
          v-for="waterbody in waterbodies"
          :key="waterbody.id"
          :lat-lng="waterbody.coordinates"
        >
          <LPopup>
            <div class="p-2 max-w-xs">
              <h3 class="font-bold text-lg mb-1">{{ waterbody.name }}</h3>
              <div class="text-sm space-y-1">
                <p><strong>Тип:</strong> {{ waterbody.type === 'lake' ? 'Озеро' : 'Река' }}</p>
                <p><strong>Температура:</strong> {{ waterbody.temperature }}°C</p>
                <p><strong>Уровень воды:</strong> {{ waterbody.waterLevel }} м</p>
                <p><strong>Метан:</strong> {{ waterbody.methane }} ppm</p>
                <p><strong>Инфекция:</strong> {{ waterbody.infection }}%</p>
              </div>
            </div>
          </LPopup>
          
          <LIcon
            :icon-url="getMarkerIcon(waterbody)"
            :icon-size="[25, 41]"
            :icon-anchor="[12, 41]"
          />
        </LMarker>
      </LMap>
    </div>

    <!-- Легенда -->
    <div class="absolute bottom-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-gray-200">
      <h3 class="font-bold mb-2">Легенда</h3>
      <div class="space-y-2 text-sm">
        <div class="flex items-center">
          <div class="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
          <span>Озера</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
          <span>Река Ишим</span>
        </div>
        <div class="flex items-center mt-2">
          <div class="w-4 h-4 bg-blue-300 rounded-full mr-2"></div>
          <span>Озеро Пестрое</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
          <span>Озеро Белое</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
          <span>Озеро Горькое</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span>Озеро Дикое</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Импорты для leaflet
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Фикс для маркеров в Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const map = ref()
const zoom = ref(11)
const center = ref<[number, number]>([54.89, 69.10])
const showInfo = ref(false)

// Данные по водоемам
const waterbodies = ref([
  {
    id: 1,
    name: 'Озеро Пестрое',
    coordinates: [54.836699, 69.111328] as [number, number],
    type: 'lake',
    temperature: 18.5,
    waterLevel: 3.8,
    methane: 12.3,
    infection: 15
  },
  {
    id: 2,
    name: 'Озеро Белое',
    coordinates: [54.927154, 69.254322] as [number, number],
    type: 'lake',
    temperature: 16.8,
    waterLevel: 4.2,
    methane: 8.7,
    infection: 25
  },
  {
    id: 3,
    name: 'Озеро Горькое',
    coordinates: [54.947573, 68.951122] as [number, number],
    type: 'lake',
    temperature: 17.2,
    waterLevel: 5.9,
    methane: 15.8,
    infection: 45
  },
  {
    id: 4,
    name: 'Озеро Поганка',
    coordinates: [54.921209, 69.053476] as [number, number],
    type: 'lake',
    temperature: 19.1,
    waterLevel: 3.1,
    methane: 10.2,
    infection: 8
  },
  {
    id: 5,
    name: 'Озеро Дикое',
    coordinates: [54.840156, 69.131957] as [number, number],
    type: 'lake',
    temperature: 20.3,
    waterLevel: 2.5,
    methane: 18.9,
    infection: 62
  },
  {
    id: 6,
    name: 'Река Ишим',
    coordinates: [54.893110, 69.127836] as [number, number],
    type: 'river',
    temperature: 15.6,
    waterLevel: 1.8,
    methane: 5.4,
    infection: 12
  }
])

// Функция для получения цвета маркера
const getMarkerColor = (waterbody: any) => {
  if (waterbody.type === 'river') return '#10B981' // green for river
  if (waterbody.name === 'Озеро Горькое') return '#F97316' // orange for Горькое
  return getInfectionColor(waterbody.infection)
}

// Функция для получения цвета маркера в зависимости от уровня инфекции
const getInfectionColor = (infection: number) => {
  if (infection < 20) return '#60A5FA' // light blue
  if (infection < 50) return '#EAB308' // yellow
  return '#EF4444' // red
}

// Функция для создания кастомных маркеров
const getMarkerIcon = (waterbody: any) => {
  const color = getMarkerColor(waterbody)
  const svg = `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.596 0 0 5.596 0 12.5C0 21.5 12.5 41 12.5 41S25 21.5 25 12.5C25 5.596 19.404 0 12.5 0Z" fill="${color}" stroke="#ffffff" stroke-width="1"/>
      <circle cx="12.5" cy="12.5" r="4" fill="#ffffff"/>
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg)}`
}
</script>

<style scoped>
/* Убираем скролл и отступы */
:deep(.leaflet-container) {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

/* Убираем контролы leaflet */
:deep(.leaflet-control-container) {
  display: none;
}

/* Убираем аттрибуцию в углу */
:deep(.leaflet-control-attribution) {
  display: none;
}
</style>