<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative py-12 bg-gradient-to-br from-blue-900 to-cyan-900">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="text-center text-white mb-8">
          <div class="inline-flex items-center gap-3 bg-blue-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-6">
            <div class="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
            <span class="font-medium">Interactive Water Map</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Water Bodies of Petropavlovsk</h1>
          <p class="text-xl text-gray-200 max-w-2xl mx-auto">
            Monitoring water bodies: temperature, water level, methane content, and infection rate
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-8 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Sidebar -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Statistics -->
            <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                Overall Statistics
              </h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span class="text-sm font-medium text-gray-700">Total water bodies</span>
                  <span class="font-bold text-blue-600">{{ waterbodies.length }}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
                  <span class="text-sm font-medium text-gray-700">Lakes / Rivers</span>
                  <span class="font-bold text-cyan-600">{{ lakesCount }} / {{ riversCount }}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span class="text-sm font-medium text-gray-700">Avg. temperature</span>
                  <span class="font-bold text-purple-600">{{ avgTemperature.toFixed(1) }}°C</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span class="text-sm font-medium text-gray-700">Max infection</span>
                  <span class="font-bold text-red-600">{{ maxInfection }}%</span>
                </div>
              </div>
            </div>

            <!-- Filters -->
            <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
                </svg>
                Filters
              </h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Water body type</label>
                  <select
                    v-model="filters.type"
                    class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200"
                  >
                    <option value="all">All types</option>
                    <option value="lake">Lake</option>
                    <option value="river">River</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Infection: up to {{ filters.maxInfection }}%
                  </label>
                  <input
                    v-model="filters.maxInfection"
                    type="range"
                    min="0"
                    max="100"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  >
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Methane from</label>
                    <input
                      v-model.number="filters.methaneMin"
                      type="number"
                      placeholder="0"
                      class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Methane to</label>
                    <input
                      v-model.number="filters.methaneMax"
                      type="number"
                      placeholder="20"
                      class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200"
                    >
                  </div>
                </div>

                <button
                  @click="resetFilters"
                  class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Reset filters
                </button>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 class="text-xl font-bold text-gray-800 mb-4">Quick actions</h3>
              <div class="space-y-3">
                <button
                  @click="resetView"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Reset map view
                </button>
                <button
                  @click="showAllWaterbodies"
                  class="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
                  </svg>
                  Show all water bodies
                </button>
              </div>
            </div>
          </div>

          <!-- Map & Info -->
          <div class="lg:col-span-3">
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 mb-6">
              <!-- Map Header -->
              <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 class="text-2xl font-bold text-gray-800">Interactive Map</h2>
                <div class="flex items-center gap-3">
                  <!-- Map Style Switch -->
                  <div class="flex bg-gray-100 rounded-lg p-1">
                    <button
                      v-for="style in mapStyles"
                      :key="style.id"
                      @click="setActiveLayer(style.id)"
                      :class="[
                        'px-3 py-1 rounded-md text-sm font-medium transition-all duration-200',
                        activeLayer === style.id
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      ]"
                      :title="style.name"
                    >
                      {{ style.shortName }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Map Container -->
              <div class="relative h-96 lg:h-[500px]">
                <LMap
                  ref="map"
                  :zoom="zoom"
                  :center="center"
                  :use-global-leaflet="false"
                  class="h-full w-full rounded-b-2xl"
                  :options="{
                    zoomControl: false,
                    attributionControl: false
                  }"
                  @click="clearSelection"
                >
                  <!-- OSM Layer -->
                  <LTileLayer
                    v-if="activeLayer === 'osm'"
                    :url="osmUrl"
                    layer-type="base"
                    name="OpenStreetMap"
                    :attribution="osmAttribution"
                  />

                  <!-- Satellite Layer -->
                  <LTileLayer
                    v-if="activeLayer === 'satellite'"
                    :url="satelliteUrl"
                    layer-type="base"
                    name="Satellite"
                    :attribution="satelliteAttribution"
                    :max-zoom="19"
                  />

                  <!-- Topo Layer -->
                  <LTileLayer
                    v-if="activeLayer === 'topo'"
                    :url="topoUrl"
                    layer-type="base"
                    name="Topography"
                    :attribution="topoAttribution"
                  />

                  <!-- Markers -->
                  <LMarker
                    v-for="waterbody in filteredWaterbodies"
                    :key="waterbody.id"
                    :lat-lng="waterbody.coordinates"
                    @click="selectWaterbody(waterbody)"
                  >
                    <LIcon
                      :icon-url="getMarkerIcon(waterbody)"
                      :icon-size="[32, 48]"
                      :icon-anchor="[16, 48]"
                      class="cursor-pointer transition-transform duration-200 hover:scale-110"
                    />

                    <LPopup :options="{ maxWidth: 300 }">
                      <div class="p-4">
                        <div class="flex items-start justify-between mb-3">
                          <div>
                            <h3 class="font-bold text-lg mb-1">{{ waterbody.name }}</h3>
                            <div class="flex items-center gap-2">
                              <div class="w-3 h-3 rounded-full" :class="getWaterbodyTypeColor(waterbody.type)"></div>
                              <span class="text-sm text-gray-600">
                                {{ waterbody.type === 'lake' ? 'Lake' : 'River' }}
                              </span>
                            </div>
                          </div>
                          <div class="px-2 py-1 rounded text-xs font-bold" :class="getInfectionBadgeClass(waterbody.infection)">
                            {{ waterbody.infection }}% infection
                          </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3 mb-3">
                          <div class="bg-blue-50 p-3 rounded-lg">
                            <div class="text-xs text-blue-600 font-semibold mb-1">TEMPERATURE</div>
                            <div class="font-bold text-gray-800">{{ waterbody.temperature }}°C</div>
                          </div>
                          <div class="bg-cyan-50 p-3 rounded-lg">
                            <div class="text-xs text-cyan-600 font-semibold mb-1">WATER LEVEL</div>
                            <div class="font-bold text-gray-800">{{ waterbody.waterLevel }} m</div>
                          </div>
                          <div class="bg-purple-50 p-3 rounded-lg">
                            <div class="text-xs text-purple-600 font-semibold mb-1">METHANE</div>
                            <div class="font-bold text-gray-800">{{ waterbody.methane }} ppm</div>
                          </div>
                          <div class="bg-red-50 p-3 rounded-lg">
                            <div class="text-xs text-red-600 font-semibold mb-1">INFECTION</div>
                            <div class="font-bold text-gray-800">{{ waterbody.infection }}%</div>
                          </div>
                        </div>

                        <button
                          @click="selectWaterbody(waterbody)"
                          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm"
                        >
                          Details
                        </button>
                      </div>
                    </LPopup>
                  </LMarker>

                  <!-- Legend -->
                  <LControl position="bottomright" class="custom-control">
                    <div class="bg-white rounded-lg shadow-xl p-4 min-w-48 border border-gray-200">
                      <h3 class="font-bold text-gray-800 mb-3 text-sm flex items-center">
                        <svg class="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        Map Legend
                      </h3>
                      <div class="space-y-2">
                        <div class="flex items-center justify-between group">
                          <div class="flex items-center">
                            <div class="w-4 h-4 bg-[#00009C] rounded-full mr-2"></div>
                            <span class="text-sm text-gray-700">Low infection (0–10%)</span>
                          </div>
                          <span class="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded">{{ lowInfectionCount }}</span>
                        </div>
                        <div class="flex items-center justify-between group">
                          <div class="flex items-center">
                            <div class="w-4 h-4 bg-blue-300 rounded-full mr-2"></div>
                            <span class="text-sm text-gray-700">Moderate (10–20%)</span>
                          </div>
                          <span class="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded">{{ moderateInfectionCount }}</span>
                        </div>
                        <div class="flex items-center justify-between group">
                          <div class="flex items-center">
                            <div class="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                            <span class="text-sm text-gray-700">Medium (20–50%)</span>
                          </div>
                          <span class="text-xs text-gray-500 bg-yellow-50 px-2 py-1 rounded">{{ mediumInfectionCount }}</span>
                        </div>
                        <div class="flex items-center justify-between group">
                          <div class="flex items-center">
                            <div class="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                            <span class="text-sm text-gray-700">High (50%+)</span>
                          </div>
                          <span class="text-xs text-gray-500 bg-red-50 px-2 py-1 rounded">{{ highInfectionCount }}</span>
                        </div>
                        <div class="pt-2 border-t">
                          <div class="flex items-center">
                            <div class="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                            <span class="text-sm text-gray-700">Ishim River</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </LControl>

                  <!-- Zoom controls -->
                  <LControlZoom position="topleft" />

                  <!-- Scale -->
                  <LControlScale position="bottomleft" :imperial="false" :metric="true" />
                </LMap>

                <!-- Loading overlay -->
                <Transition name="fade">
                  <div
                    v-if="isLoading"
                    class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-b-2xl"
                  >
                    <div class="bg-white rounded-lg p-6 shadow-xl">
                      <div class="flex items-center space-x-3">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span class="text-gray-700 font-semibold">Loading map...</span>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- Selected water body -->
            <Transition name="panel">
              <div
                v-if="selectedWaterbody"
                class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
              >
                <div class="flex justify-between items-start mb-6">
                  <div>
                    <h3 class="text-2xl font-bold text-gray-800">{{ selectedWaterbody.name }}</h3>
                    <div class="flex items-center mt-2 gap-4">
                      <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full mr-2" :class="getWaterbodyTypeColor(selectedWaterbody.type)"></div>
                        <span class="text-sm text-gray-600">
                          {{ selectedWaterbody.type === 'lake' ? 'Lake' : 'River' }}
                        </span>
                      </div>
                      <div class="flex items-center">
                        <svg class="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span class="text-sm text-gray-600">
                          {{ selectedWaterbody.coordinates[0].toFixed(4) }}, {{ selectedWaterbody.coordinates[1].toFixed(4) }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    @click="clearSelection"
                    class="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div class="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <div class="text-xs text-blue-600 font-semibold mb-1">WATER TEMPERATURE</div>
                    <div class="font-bold text-gray-800 text-xl">{{ selectedWaterbody.temperature }}°C</div>
                    <div class="text-xs text-gray-500 mt-1">Current temperature</div>
                  </div>
                  <div class="bg-cyan-50 p-4 rounded-xl border border-cyan-200">
                    <div class="text-xs text-cyan-600 font-semibold mb-1">WATER LEVEL</div>
                    <div class="font-bold text-gray-800 text-xl">{{ selectedWaterbody.waterLevel }} m</div>
                    <div class="text-xs text-gray-500 mt-1">Relative height</div>
                  </div>
                  <div class="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <div class="text-xs text-purple-600 font-semibold mb-1">METHANE</div>
                    <div class="font-bold text-gray-800 text-xl">{{ selectedWaterbody.methane }} ppm</div>
                    <div class="text-xs text-gray-500 mt-1">In the air above water</div>
                  </div>
                  <div class="bg-red-50 p-4 rounded-xl border border-red-200">
                    <div class="text-xs text-red-600 font-semibold mb-1">INFECTION LEVEL</div>
                    <div class="font-bold text-gray-800 text-xl">{{ selectedWaterbody.infection }}%</div>
                    <div class="text-xs text-gray-500 mt-1">Water contamination</div>
                  </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <!-- Infection indicator -->
                  <div class="bg-white p-4 rounded-xl border border-gray-200">
                    <div class="flex justify-between items-center mb-3">
                      <span class="text-sm font-semibold text-gray-700">Infection level</span>
                      <span class="text-sm font-bold" :class="getInfectionTextColor(selectedWaterbody.infection)">
                        {{ selectedWaterbody.infection }}%
                      </span>
                    </div>
                    <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        class="h-full rounded-full transition-all duration-1000"
                        :class="getInfectionColor(selectedWaterbody.infection)"
                        :style="{ width: selectedWaterbody.infection + '%' }"
                      ></div>
                    </div>
                    <div class="text-xs text-gray-500 mt-2">
                      <span v-if="selectedWaterbody.infection < 10">Safe level</span>
                      <span v-else-if="selectedWaterbody.infection < 20">Moderate risk</span>
                      <span v-else-if="selectedWaterbody.infection < 50">Increased risk</span>
                      <span v-else>Dangerous level</span>
                    </div>
                  </div>

                  <!-- Status -->
                  <div class="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-xl text-white">
                    <div class="text-xs font-semibold text-blue-100 mb-1">WATER BODY STATUS</div>
                    <div class="font-bold text-2xl">{{ getWaterbodyStatus(selectedWaterbody) }}</div>
                    <div class="text-blue-100 text-xs mt-1">Usage recommendation</div>
                  </div>
                </div>

                <!-- Details -->
                <div class="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 class="font-semibold text-gray-800 mb-3">Detailed information</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div class="flex justify-between py-2 border-b border-gray-200">
                      <span>Type:</span>
                      <span class="font-semibold text-gray-800">{{ selectedWaterbody.type === 'lake' ? 'Lake' : 'River' }}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b border-gray-200">
                      <span>Coordinates:</span>
                      <span class="font-semibold text-gray-800">{{ selectedWaterbody.coordinates[0].toFixed(4) }}, {{ selectedWaterbody.coordinates[1].toFixed(4) }}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b border-gray-200">
                      <span>Last measurement:</span>
                      <span class="font-semibold text-gray-800">{{ new Date().toLocaleDateString() }}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b border-gray-200">
                      <span>Recommendation:</span>
                      <span class="font-semibold text-gray-800">{{ getRecommendation(selectedWaterbody) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Empty state -->
            <div
              v-if="!selectedWaterbody"
              class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 text-center"
            >
              <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Select a water body on the map</h3>
              <p class="text-gray-600">Click any marker to view detailed information about its condition</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { ref, reactive, computed, onMounted } from 'vue'

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const map = ref()
const zoom = ref(11)
const center = ref<[number, number]>([54.89, 69.10])
const activeLayer = ref<'osm' | 'satellite' | 'topo'>('osm')
const selectedWaterbody = ref<any>(null)
const isLoading = ref(false)

// URLs & attribution for layers
const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const osmAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const satelliteUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
const satelliteAttribution = '&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics, USDA FSA, USGS, Aerogrid, IGN, IGP, and the GIS User Community'

const topoUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
const topoAttribution = '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'

// Map styles
const mapStyles = ref([
  { id: 'osm', name: 'Standard map', shortName: 'Std' },
  { id: 'satellite', name: 'Satellite view', shortName: 'Sat' },
  { id: 'topo', name: 'Topographic map', shortName: 'Topo' }
])

// Filters
const filters = reactive({
  type: 'all',
  maxInfection: 100,
  methaneMin: null as number | null,
  methaneMax: null as number | null
})

// Water bodies data
const waterbodies = ref([
  {
    id: 1,
    name: 'Lake Pestroe',
    coordinates: [54.836699, 69.111328] as [number, number],
    type: 'lake',
    temperature: 18.5,
    waterLevel: 3.8,
    methane: 12.3,
    infection: 15
  },
  {
    id: 2,
    name: 'Lake Beloe',
    coordinates: [54.927154, 69.254322] as [number, number],
    type: 'lake',
    temperature: 16.8,
    waterLevel: 4.2,
    methane: 8.7,
    infection: 25
  },
  {
    id: 3,
    name: 'Lake Gorkoe',
    coordinates: [54.947573, 68.951122] as [number, number],
    type: 'lake',
    temperature: 17.2,
    waterLevel: 5.9,
    methane: 15.8,
    infection: 45
  },
  {
    id: 4,
    name: 'Lake Poganka',
    coordinates: [54.921209, 69.053476] as [number, number],
    type: 'lake',
    temperature: 19.1,
    waterLevel: 3.1,
    methane: 10.2,
    infection: 5
  },
  {
    id: 5,
    name: 'Lake Dikoe',
    coordinates: [54.840156, 69.131957] as [number, number],
    type: 'lake',
    temperature: 20.3,
    waterLevel: 2.5,
    methane: 18.9,
    infection: 62
  },
  {
    id: 6,
    name: 'Ishim River',
    coordinates: [54.893110, 69.127836] as [number, number],
    type: 'river',
    temperature: 15.6,
    waterLevel: 1.8,
    methane: 5.4,
    infection: 12
  }
])

// Computed
const lakesCount = computed(() => waterbodies.value.filter(w => w.type === 'lake').length)
const riversCount = computed(() => waterbodies.value.filter(w => w.type === 'river').length)

const avgTemperature = computed(() => {
  const sum = waterbodies.value.reduce((acc, w) => acc + w.temperature, 0)
  return sum / waterbodies.value.length
})

const maxInfection = computed(() => Math.max(...waterbodies.value.map(w => w.infection)))

const lowInfectionCount = computed(() => waterbodies.value.filter(w => w.infection < 10).length)
const moderateInfectionCount = computed(() => waterbodies.value.filter(w => w.infection >= 10 && w.infection < 20).length)
const mediumInfectionCount = computed(() => waterbodies.value.filter(w => w.infection >= 20 && w.infection < 50).length)
const highInfectionCount = computed(() => waterbodies.value.filter(w => w.infection >= 50).length)

const filteredWaterbodies = computed(() => {
  return waterbodies.value.filter(waterbody => {
    const typeMatch = filters.type === 'all' || waterbody.type === filters.type
    const infectionMatch = waterbody.infection <= filters.maxInfection
    const methaneMinMatch = filters.methaneMin === null || waterbody.methane >= filters.methaneMin
    const methaneMaxMatch = filters.methaneMax === null || waterbody.methane <= filters.methaneMax
    return typeMatch && infectionMatch && methaneMinMatch && methaneMaxMatch
  })
})

// Methods
const setActiveLayer = (layer: 'osm' | 'satellite' | 'topo') => {
  activeLayer.value = layer
}

const getMarkerColor = (waterbody: any) => {
  if (waterbody.type === 'river') return '#10B981' // green
  return getInfectionColorHex(waterbody.infection)
}

const getInfectionColorHex = (infection: number) => {
  if (infection < 10) return '#00009C'
  if (infection < 20) return '#60A5FA'
  if (infection < 50) return '#EAB308'
  return '#EF4444'
}

const getMarkerIcon = (waterbody: any) => {
  const color = getMarkerColor(waterbody)
  const svg = `
    <svg width="32" height="48" viewBox="0 0 32 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16C0 27 16 48 16 48S32 27 32 16C32 7.163 24.837 0 16 0Z"
            fill="${color}"
            stroke="#ffffff"
            stroke-width="2"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/>
      <circle cx="16" cy="16" r="5" fill="#ffffff"/>
      <circle cx="16" cy="16" r="3" fill="${color}"/>
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

const getWaterbodyTypeColor = (type: string) => {
  return type === 'river' ? 'bg-green-500' : 'bg-blue-500'
}

const getInfectionColor = (infection: number) => {
  if (infection < 10) return 'bg-blue-500'
  if (infection < 20) return 'bg-blue-300'
  if (infection < 50) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getInfectionTextColor = (infection: number) => {
  if (infection < 10) return 'text-blue-600'
  if (infection < 20) return 'text-blue-400'
  if (infection < 50) return 'text-yellow-600'
  return 'text-red-600'
}

const getInfectionBadgeClass = (infection: number) => {
  if (infection < 20) return 'bg-blue-100 text-blue-800'
  if (infection < 50) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}

const selectWaterbody = (waterbody: any) => {
  selectedWaterbody.value = waterbody
  if (map.value) {
    const leafletMap = map.value.leafletObject
    leafletMap.setView(waterbody.coordinates, 14)
  }
}

const clearSelection = () => {
  selectedWaterbody.value = null
}

const resetView = () => {
  if (map.value) {
    const leafletMap = map.value.leafletObject
    leafletMap.setView(center.value, zoom.value)
    clearSelection()
  }
}

const showAllWaterbodies = () => {
  if (map.value && waterbodies.value.length > 0) {
    const leafletMap = map.value.leafletObject
    const bounds = new L.LatLngBounds([])
    waterbodies.value.forEach(w => bounds.extend(w.coordinates))
    leafletMap.fitBounds(bounds, { padding: [50, 50] })
    clearSelection()
  }
}

const resetFilters = () => {
  filters.type = 'all'
  filters.maxInfection = 100
  filters.methaneMin = null
  filters.methaneMax = null
}

const getWaterbodyStatus = (waterbody: any) => {
  if (waterbody.infection < 10) return 'Safe'
  if (waterbody.infection < 20) return 'Conditionally safe'
  if (waterbody.infection < 50) return 'Needs attention'
  return 'Dangerous'
}

const getRecommendation = (waterbody: any) => {
  if (waterbody.infection < 10) return 'Safe for swimming'
  if (waterbody.infection < 20) return 'Technical use only'
  if (waterbody.infection < 50) return 'Cleaning required'
  return 'Use prohibited'
}

// Init loading state
onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 800)
})
</script>

<style scoped>
:deep(.leaflet-container) {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: inherit;
  border-radius: 0 0 1rem 1rem;
}

:deep(.custom-control) {
  background: transparent !important;
  border: none !important;
  z-index: 10;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.panel-enter-active,
.panel-leave-active {
  transition: all 0.3s ease;
}

.panel-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.panel-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
