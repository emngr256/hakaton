<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section с плавным переходом -->
    <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Фон с плавным переходом -->
      <div class="absolute inset-0 z-0">
        <div
          class="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-blue-800/70 to-gray-50 z-10 transition-all duration-1000"
          :style="{ opacity: 1 - scrollProgress }"
        ></div>
        <img
          src="/assets/images/lake.jpg"
          alt="Petropavlovsk Lake"
          class="w-full h-full object-cover transform transition-all duration-1000 ease-out"
          :style="{
            transform: `scale(${1.1 + parallax * 0.02})`,
            opacity: 1 - scrollProgress
          }"
        >

        <!-- Анимированные волны -->
        <div class="absolute bottom-0 w-full h-32">
          <div class="wave wave1" :style="{ transform: `translateX(${scrollProgress * -100}px)` }"></div>
          <div class="wave wave2" :style="{ transform: `translateX(${scrollProgress * -200}px)` }"></div>
          <div class="wave wave3" :style="{ transform: `translateX(${scrollProgress * -300}px)` }"></div>
        </div>
      </div>

      <!-- Контент -->
      <div class="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center justify-center">
        <div class="text-center text-white w-full max-w-4xl">
          <!-- Alert Badge -->
          <div
            class="inline-flex items-center gap-3 bg-blue-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-8 animate-fade-in"
            :style="{ opacity: 1 - scrollProgress * 2 }"
          >
            <div class="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
            <span class="font-medium">Petropavlovsk Lake Monitoring</span>
          </div>

          <!-- Заголовок -->
          <h1
            class="mb-6 leading-tight transition-all duration-500"
            :style="{
              transform: `translateY(${scrollProgress * -50}px)`,
              opacity: 1 - scrollProgress * 1.5
            }"
          >
            <span class="block text-5xl md:text-6xl lg:text-7xl font-bold mb-4">Let’s Save the Lakes</span>
            <span class="block text-4xl md:text-5xl lg:text-6xl font-bold text-blue-300">of Petropavlovsk</span>
          </h1>

          <!-- Описание -->
          <p
            class="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-4xl mx-auto transition-all duration-500"
            :style="{
              transform: `translateY(${scrollProgress * -30}px)`,
              opacity: 1 - scrollProgress * 2
            }"
          >
            Our lakes need protection from pollution, illegal discharges, and ecosystem destruction.
            Report issues — together we will preserve the city’s water resources!
          </p>

          <!-- Форма для предложений - занимает всё доступное пространство -->
          <div
            class="max-w-2xl mx-auto transition-all duration-500"
            :style="{
              transform: `translateY(${scrollProgress * -20}px) scale(${1 + scrollProgress * 0.1})`,
              opacity: 1 - scrollProgress * 0.5
            }"
          >
            <div
              class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden transition-all duration-500 ease-out"
              :class="[
                isFormCollapsed
                  ? 'max-h-16 hover:bg-white/15 cursor-pointer'
                  : 'max-h-[80vh]'
              ]"
            >
              <!-- Заголовок формы -->
              <div
                class="p-4 flex items-center justify-between cursor-pointer transition-all duration-300"
                @click="toggleForm"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center transition-transform duration-300"
                    :class="isFormCollapsed ? '' : 'rotate-12'"
                  >
                    <Lightbulb :size="20" class="text-blue-300" />
                  </div>
                  <div>
                    <h3 class="text-white text-xl font-bold">Submit an Idea</h3>
                    <p class="text-blue-200 text-xs mt-1">Help protect our lakes</p>
                  </div>
                </div>
                <div
                  class="text-white text-lg transition-transform duration-500"
                  :class="isFormCollapsed ? 'rotate-0' : 'rotate-180'"
                >
                  <ChevronDown :size="24" />
                </div>
              </div>

              <!-- Содержимое формы -->
              <Transition name="slide-down">
                <div
                  v-if="!isFormCollapsed"
                  class="px-4 pb-4 border-t border-white/10 pt-4 h-full max-h-[70vh] overflow-y-auto"
                >
                  <!-- Прогресс бар -->
                  <div class="mb-6">
                    <div class="flex justify-between text-sm text-white mb-1">
                      <span>Goal: 1000 suggestions</span>
                      <span>{{ suggestionStats.total }} / 1000</span>
                    </div>
                    <div class="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full transition-all duration-1000"
                        :style="{ width: `${Math.min((suggestionStats.total / 1000) * 100, 100)}%` }"
                      ></div>
                    </div>
                  </div>

                  <form @submit.prevent="submitSuggestion" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="space-y-2">
                        <label class="text-white text-sm font-medium block">Your name *</label>
                        <input
                          v-model="suggestionForm.name"
                          type="text"
                          placeholder="How should we address you?"
                          class="w-full px-3 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 text-sm"
                          required
                        >
                      </div>

                      <div class="space-y-2">
                        <label class="text-white text-sm font-medium block">Lake (if you know)</label>
                        <select
                          v-model="suggestionForm.lake"
                          class="w-full px-3 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 text-sm"
                        >
                          <option value="" class="text-gray-900">Select a lake</option>
                          <option value="Lake Pestroe" class="text-gray-500">Lake Pestroe</option>
                          <option value="Lake Beloe" class="text-gray-500">Lake Beloe</option>
                          <option value="Lake Krugloe" class="text-gray-500">Lake Krugloe</option>
                          <option value="Other" class="text-gray-500">Other lake</option>
                        </select>
                      </div>
                    </div>

                    <div class="space-y-2">
                      <label class="text-white text-sm font-medium block">Your suggestion *</label>
                      <textarea
                        v-model="suggestionForm.message"
                        placeholder="What can be done to protect Petropavlovsk lakes?"
                        rows="4"
                        class="w-full px-3 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 resize-none text-sm"
                        required
                      ></textarea>
                    </div>

                    <div class="space-y-2">
                      <label class="text-white text-sm font-medium block">Idea category</label>
                      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <button
                          v-for="category in suggestionCategories"
                          :key="category.value"
                          type="button"
                          @click="suggestionForm.category = category.value"
                          :class="[
                            'py-3 px-2 rounded-lg border transition-all duration-200 font-medium text-sm',
                            suggestionForm.category === category.value
                              ? category.selectedClass
                              : category.defaultClass
                          ]"
                        >
                          <span class="flex flex-col items-center gap-1">
                            <span class="text-base">{{ category.emoji }}</span>
                            <span class="text-xs">{{ category.label }}</span>
                          </span>
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      :disabled="isSubmitting"
                      :class="[
                        'w-full py-4 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 mt-4',
                        isSubmitting
                          ? 'bg-gray-500 cursor-not-allowed text-white'
                          : 'bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 transform hover:scale-105 text-white shadow-md'
                      ]"
                    >
                      <span v-if="isSubmitting" class="flex items-center gap-2">
                        <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </span>
                      <span v-else class="flex items-center gap-2">
                        <Send :size="18" />
                        Send suggestion
                      </span>
                    </button>
                  </form>

                  <!-- Уведомления -->
                  <Transition name="fade">
                    <div
                      v-if="showSuccess"
                      class="mt-4 p-3 bg-emerald-500/90 backdrop-blur-sm text-white rounded-lg text-center border border-emerald-300"
                    >
                      <div class="flex items-center justify-center gap-2">
                        <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                          <CheckCircle class="text-emerald-500" :size="14" />
                        </div>
                        <span class="font-medium text-sm">Thank you! Your suggestion has been saved.</span>
                      </div>
                    </div>
                  </Transition>

                  <Transition name="fade">
                    <div
                      v-if="showError"
                      class="mt-4 p-3 bg-red-500/90 backdrop-blur-sm text-white rounded-lg text-center border border-red-300"
                    >
                      <div class="flex items-center justify-center gap-2">
                        <XCircle class="text-white" :size="18" />
                        <span class="font-medium text-sm">Error while sending.</span>
                      </div>
                    </div>
                  </Transition>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Быстрые действия -->
          <div
            class="flex flex-wrap gap-3 justify-center mt-8 transition-all duration-500"
            :style="{
              transform: `translateY(${scrollProgress * -10}px)`,
              opacity: 1 - scrollProgress * 3
            }"
          >
            <button
              v-for="action in quickActions"
              :key="action.label"
              @click="handleQuickAction(action)"
              :class="[
                'group flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm',
                action.class
              ]"
            >
              <component :is="action.icon" :size="16" />
              {{ action.label }}
              <ArrowRight
                v-if="action.hasArrow"
                :size="14"
                class="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce transition-all duration-500"
        :style="{ opacity: 1 - scrollProgress * 3 }"
      >
        <button
          @click="scrollToProblems"
          class="group bg-white/10 backdrop-blur-sm border border-white/30 rounded-full p-3 transition-all duration-300 hover:bg-white/20 hover:scale-110"
        >
          <div class="w-5 h-8 flex justify-center">
            <div class="w-1 h-2 bg-white/80 rounded-full mt-2 animate-pulse"></div>
          </div>
        </button>
      </div>

      <!-- Emergency Alert Button -->
      <div
        class="absolute bottom-6 right-6 z-50 transition-all duration-500"
        :style="{ opacity: 1 - scrollProgress * 2 }"
      >
        <button
          @click="showEmergencyModal = true"
          class="group bg-red-600 hover:bg-red-700 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse"
        >
          <div class="relative">
            <AlertTriangle :size="28" />
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-red-300 rounded-full animate-ping"></div>
          </div>
        </button>
      </div>
    </section>

    <!-- Problems Section с плавным появлением -->
    <section
      id="problems"
      class="py-20 bg-gradient-to-b from-gray-50 to-white min-h-screen transition-all duration-1000"
      :style="{
        transform: `translateY(${scrollProgress * -100}px)`,
        opacity: scrollProgress
      }"
    >
      <div class="container mx-auto px-4 sm:px-6">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
            <AlertTriangle :size="20" />
            <span class="font-medium">Environmental Alert</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Key Environmental Issues</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Petropavlovsk lakes face many threats that require immediate attention and action
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div
            v-for="(problem, index) in problems"
            :key="index"
            class="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
          >
            <div class="flex flex-col items-center text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <component :is="problem.icon" class="text-blue-600" :size="32" />
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">{{ problem.title }}</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">{{ problem.description }}</p>
              <span :class="['inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors', getSeverityColor(problem.severity)]">
                <span class="w-2 h-2 rounded-full" :class="getSeverityDotColor(problem.severity)"></span>
                {{ problem.severity }}
              </span>
            </div>
          </div>
        </div>

        <!-- Примеры озёр Петропавловска -->
        <div class="mb-20">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Lakes Under Threat</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Each of Petropavlovsk’s lakes requires special attention and ecosystem restoration measures
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="lake in lakes"
              :key="lake.name"
              class="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  :src="lake.image"
                  :alt="lake.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div class="absolute top-4 right-4">
                  <span :class="['px-3 py-1 rounded-full text-xs font-semibold', getStatusColor(lake.status)]">
                    {{ lake.status }}
                  </span>
                </div>
                <div class="absolute bottom-4 left-4">
                  <h3 class="text-2xl font-bold text-white">{{ lake.name }}</h3>
                  <div class="flex items-center gap-1 text-white/90 text-sm">
                    <MapPin :size="14" />
                    {{ lake.location }}
                  </div>
                </div>
              </div>
              <div class="p-6">
                <p class="text-gray-600 text-sm leading-relaxed mb-4">{{ lake.description }}</p>
                <div class="grid grid-cols-2 gap-4">
                  <div class="text-center p-3 bg-blue-50 rounded-xl">
                    <div class="text-xs text-blue-600 mb-1">Area</div>
                    <div class="font-bold text-gray-800">{{ lake.area }}</div>
                  </div>
                  <div class="text-center p-3 bg-emerald-50 rounded-xl">
                    <div class="text-xs text-emerald-600 mb-1">Depth</div>
                    <div class="font-bold text-gray-800">{{ lake.depth }}</div>
                  </div>
                </div>
                <div class="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 text-red-600">
                  <TrendingDown :size="16" />
                  <span class="text-sm font-medium">Water quality is deteriorating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Призыв к действию -->
        <div class="text-center">
          <div class="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-12 shadow-2xl border border-blue-100 max-w-4xl mx-auto">
            <div class="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Users class="text-blue-600" :size="40" />
            </div>
            <h3 class="text-4xl font-bold text-gray-800 mb-6">Join the Volunteers!</h3>
            <p class="text-gray-600 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Become part of a team that is already making our lakes cleaner and safer today.
              Together, we can change the situation!
            </p>
            <button
              @click="showVolunteerModal = true"
              class="inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold py-4 px-12 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Users :size="24" />
              Become a volunteer
              <ArrowRight :size="24" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Emergency Alert Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showEmergencyModal"
          class="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
          @click.self="showEmergencyModal = false"
        >
          <div class="bg-white rounded-2xl max-w-md w-full p-6 border-4 border-red-500 shadow-2xl">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle class="text-red-500" :size="32" />
              </div>
              <h3 class="text-2xl font-bold text-red-600 mb-2">ENVIRONMENTAL EMERGENCY</h3>
              <p class="text-gray-600">Report a critical incident</p>
            </div>

            <form @submit.prevent="sendEmergencyAlert" class="space-y-4">
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">What is the issue? *</label>
                <select
                  v-model="emergencyAlert.type"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-200 text-gray-800"
                  required
                >
                  <option value="" class="text-gray-500">Select an issue</option>
                  <option value="Chemical discharge">☣️ Chemical discharge into the lake</option>
                  <option value="Mass fish die-off">🐟 Mass fish die-off</option>
                  <option value="Illegal construction">🏗️ Illegal shoreline construction</option>
                  <option value="Oil spill">🛢️ Oil spill</option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Lake *</label>
                <input
                  v-model="emergencyAlert.lake"
                  type="text"
                  placeholder="Specify the lake"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-200 text-gray-800"
                  required
                >
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Location *</label>
                <input
                  v-model="emergencyAlert.location"
                  type="text"
                  placeholder="Exact location"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-200 text-gray-800"
                  required
                >
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Incident description *</label>
                <textarea
                  v-model="emergencyAlert.details"
                  placeholder="Describe the emergency in detail..."
                  rows="3"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-200 resize-none text-gray-800"
                  required
                ></textarea>
              </div>

              <div class="flex gap-3">
                <button
                  type="submit"
                  class="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  🚨 Send alert
                </button>
                <button
                  @click="showEmergencyModal = false"
                  type="button"
                  class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Volunteer Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showVolunteerModal"
          class="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
          @click.self="showVolunteerModal = false"
        >
          <div class="bg-white rounded-2xl max-w-md w-full p-6 border-4 border-blue-500 shadow-2xl">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users class="text-blue-500" :size="32" />
              </div>
              <h3 class="text-2xl font-bold text-blue-600 mb-2">BECOME A VOLUNTEER</h3>
              <p class="text-gray-600">Join our team!</p>
            </div>

            <form @submit.prevent="registerVolunteer" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Name *</label>
                  <input
                    v-model="volunteerForm.name"
                    type="text"
                    placeholder="Your name"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-gray-800"
                    required
                  >
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700">Phone *</label>
                  <input
                    v-model="volunteerForm.phone"
                    type="tel"
                    placeholder="+7 ___ ___ __ __"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-gray-800"
                    required
                  >
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Email</label>
                <input
                  v-model="volunteerForm.email"
                  type="email"
                  placeholder="email@example.com"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-gray-800"
                >
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700">Interests</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="interest in volunteerInterests"
                    :key="interest"
                    type="button"
                    @click="toggleInterest(interest)"
                    :class="[
                      'px-3 py-1 rounded-full text-sm transition-all duration-200',
                      selectedInterests.includes(interest)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    ]"
                  >
                    {{ interest }}
                  </button>
                </div>
              </div>

              <div class="flex gap-3 mt-6">
                <button
                  type="submit"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  ✅ Register
                </button>
                <button
                  @click="showVolunteerModal = false"
                  type="button"
                  class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Later
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
// Импорты
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import {
  AlertTriangle, Factory, Trash2, Droplet, Thermometer, Fish,
  ArrowRight, ChevronDown, Lightbulb, Send, CheckCircle, XCircle,
  Users, MapPin, TrendingDown, Share2, Bell, Clipboard, Heart
} from 'lucide-vue-next'

const API_BASE = 'https://hakaton-lakes-back.onrender.com/api'

// Реактивные данные
const scrollProgress = ref(0)
const parallax = ref(0)
const isFormCollapsed = ref(false)
const showEmergencyModal = ref(false)
const showVolunteerModal = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const isSubmitting = ref(false)

// Формы
const suggestionForm = ref({
  name: '',
  lake: '',
  message: '',
  category: 'cleaning'
})

const emergencyAlert = ref({
  type: '',
  lake: '',
  location: '',
  details: '',
  reporter_name: ''
})

const volunteerForm = ref({
  name: '',
  phone: '',
  email: ''
})

// Данные
const suggestionStats = reactive({
  total: 0,
  today: 0,
  implemented: 0
})

const selectedInterests = ref(['Cleaning'])
const intervalId = ref(null)

// Константы
const quickActions = [
  { label: 'Share', icon: Share2, action: 'share', hasArrow: true, class: 'hover:bg-blue-500/20' },
  { label: 'Subscribe', icon: Bell, action: 'subscribe', hasArrow: false, class: 'hover:bg-emerald-500/20' },
  { label: 'Donate', icon: Heart, action: 'donate', hasArrow: true, class: 'hover:bg-red-500/20' }
]

const suggestionCategories = [
  { value: 'cleaning', label: 'Cleaning', emoji: '🧹', defaultClass: 'bg-white/10 border-white/30 text-white hover:bg-white/20', selectedClass: 'bg-blue-500 border-blue-500 text-white' },
  { value: 'monitoring', label: 'Monitoring', emoji: '📊', defaultClass: 'bg-white/10 border-white/30 text-white hover:bg-white/20', selectedClass: 'bg-emerald-500 border-emerald-500 text-white' },
  { value: 'education', label: 'Education', emoji: '🎓', defaultClass: 'bg-white/10 border-white/30 text-white hover:bg-white/20', selectedClass: 'bg-purple-500 border-purple-500 text-white' },
  { value: 'infrastructure', label: 'Infrastructure', emoji: '🏗️', defaultClass: 'bg-white/10 border-white/30 text-white hover:bg-white/20', selectedClass: 'bg-orange-500 border-orange-500 text-white' }
]

const volunteerInterests = ['Cleaning', 'Monitoring', 'Education', 'Organization']

const problems = [
  {
    icon: Factory,
    title: "Industrial Discharges",
    description: "Illegal waste emissions from industrial facilities pollute water bodies with heavy metals and chemicals.",
    severity: "Critical",
  },
  {
    icon: Trash2,
    title: "Household Waste",
    description: "Plastic and household waste accumulating on shores and in lake water threatens the ecosystem.",
    severity: "High",
  },
  {
    icon: Droplet,
    title: "Water Pollution",
    description: "Water quality is degrading due to wastewater, pesticides, and fertilizers from fields.",
    severity: "Critical",
  },
  {
    icon: Thermometer,
    title: "Climate Change",
    description: "Rising water temperatures lead to algal blooms and disrupt ecological balance.",
    severity: "Medium",
  },
  {
    icon: Fish,
    title: "Declining Biodiversity",
    description: "Disappearance of rare fish species and aquatic plants due to worsening habitat conditions.",
    severity: "High",
  },
  {
    icon: AlertTriangle,
    title: "Poaching",
    description: "Illegal fishing and destruction of coastal ecosystems.",
    severity: "Medium",
  },
]

const lakes = [
  {
    name: "Lake Pestroe",
    location: "Northern District",
    status: "Polluted",
    description: "One of the largest lakes in the city, suffering from industrial discharges and household waste.",
    area: "12 km²",
    depth: "3.5 m",
    image: "https://images.unsplash.com/photo-1569165003050-6c42600d9c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwcG9sbHV0aW9uJTIwZW52aXJvbm1lbnR8ZW58MXx8fHwxNzYzNDc4ODg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Lake Beloe",
    location: "Central District",
    status: "At Risk",
    description: "A popular recreation spot, where water quality is deteriorating due to human impact.",
    area: "8.3 km²",
    depth: "2.8 m",
    image: "https://images.unsplash.com/photo-1637681316418-dd7a4b6e545e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBvbGx1dGlvbnxlbnwxfHx8fDE3NjM0Njc2OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Lake Krugloe",
    location: "Southern District",
    status: "Critical",
    description: "A small lake in critical condition due to a high level of pollution.",
    area: "4.5 km²",
    depth: "1.9 m",
    image: "https://images.unsplash.com/photo-1699078109661-0269200668ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwcHJvdGVjdGlvbnxlbnwxfHx8fDE3NjM0MjEwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
]

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  loadSuggestionStats() // Загружаем статистику при монтировании

  // Обновляем статистику каждые 30 секунд
  intervalId.value = setInterval(loadSuggestionStats, 30000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (intervalId.value) clearInterval(intervalId.value)
})

// Методы
const handleScroll = () => {
  const scrollY = window.scrollY
  const windowHeight = window.innerHeight

  // Прогресс скролла от 0 до 1
  scrollProgress.value = Math.min(scrollY / (windowHeight * 0.8), 1)
  parallax.value = scrollY / 1000
}

// Функция для загрузки статистики предложений
const loadSuggestionStats = async () => {
  try {
    // Пробуем новый endpoint /stats
    const response = await fetch(`${API_BASE}/stats`)

    if (!response.ok) {
      // Если /stats не работает, пробуем загрузить все предложения и посчитать
      const suggestionsResponse = await fetch(`${API_BASE}/suggestions`)
      if (suggestionsResponse.ok) {
        const suggestions = await suggestionsResponse.json()

        // Считаем статистику на клиенте
        const today = new Date().toDateString()
        const todayCount = suggestions.filter(s => {
          const suggestionDate = new Date(s.date).toDateString()
          return suggestionDate === today
        }).length

        const implementedCount = suggestions.filter(s =>
          s.status === 'implemented' || s.status === 'completed'
        ).length

        suggestionStats.total = suggestions.length
        suggestionStats.today = todayCount
        suggestionStats.implemented = implementedCount
      }
    } else {
      // Если /stats работает, используем его
      const data = await response.json()

      // Адаптируем под разные форматы ответа
      if (data.total !== undefined) {
        // Формат: { total: 11, today: 1, implemented: 0 }
        suggestionStats.total = data.total || 0
        suggestionStats.today = data.today || 0
        suggestionStats.implemented = data.implemented || 0
      } else if (data.count !== undefined) {
        // Формат: { count: 11 }
        suggestionStats.total = data.count
        suggestionStats.today = 1 // Временное значение
        suggestionStats.implemented = 0 // Временное значение
      }
    }
  } catch (error) {
    console.error('Failed to load stats:', error)

    // Fallback values in case of error
    suggestionStats.total = 11 // Your current amount
    suggestionStats.today = 1
    suggestionStats.implemented = 0
  }
}

const toggleForm = () => {
  isFormCollapsed.value = !isFormCollapsed.value
}

const scrollToProblems = () => {
  const problemsSection = document.getElementById('problems')
  if (problemsSection) {
    problemsSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const handleQuickAction = (action) => {
  switch (action.action) {
    case 'share':
      if (navigator.share) {
        navigator.share({
          title: 'Let’s Protect Petropavlovsk Lakes',
          text: 'Join the movement to protect our city’s water resources',
          url: window.location.href
        })
      } else {
        // Fallback for browsers without Web Share API support
        navigator.clipboard.writeText(window.location.href)
          .then(() => alert('Link copied to clipboard!'))
          .catch(() => alert('Link: ' + window.location.href))
      }
      break
    case 'subscribe':
      alert('Subscription feature is in development')
      break
    case 'donate':
      alert('Donation feature is in development')
      break
  }
}

// Функция отправки предложения
const submitSuggestion = async () => {
  if (isSubmitting.value) return

  // Валидация формы
  if (!suggestionForm.value.name.trim() || !suggestionForm.value.message.trim()) {
    showError.value = true
    setTimeout(() => showError.value = false, 3000)
    return
  }

  isSubmitting.value = true
  showError.value = false
  showSuccess.value = false

  try {
    const response = await fetch(`${API_BASE}/suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: suggestionForm.value.name.trim(),
        message: suggestionForm.value.message.trim(),
        lake: suggestionForm.value.lake || 'Not specified',
        category: suggestionForm.value.category,
        status: 'new',
        likes: 0,
        date: new Date().toISOString()
      })
    })

    if (response.ok) {
      showSuccess.value = true
      suggestionForm.value = { name: '', lake: '', message: '', category: 'cleaning' }

      // Обновляем статистику после успешной отправки
      await loadSuggestionStats()

      // Сворачиваем форму через 3 секунды
      setTimeout(() => {
        showSuccess.value = false
        isFormCollapsed.value = true
      }, 3000)
    } else {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Server error')
    }
  } catch (error) {
    console.error('Error submitting suggestion:', error)
    showError.value = true

    setTimeout(() => {
      showError.value = false
    }, 3000)
  } finally {
    isSubmitting.value = false
  }
}

const sendEmergencyAlert = async () => {
  try {
    // Валидация
    if (!emergencyAlert.value.type || !emergencyAlert.value.lake ||
        !emergencyAlert.value.location || !emergencyAlert.value.details) {
      alert('Please fill in all required fields')
      return
    }

    console.log('🚨 Sending emergency alert:', emergencyAlert.value)

    const response = await fetch(`${API_BASE}/emergency-alerts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({
        ...emergencyAlert.value,
        reporter_name: emergencyAlert.value.reporter_name || 'Anonymous',
        timestamp: new Date().toISOString(),
        status: 'new'
      })
    })

    if (response.ok) {
      showEmergencyModal.value = false
      emergencyAlert.value = {
        type: '',
        lake: '',
        location: '',
        details: '',
        reporter_name: ''
      }

      alert('🚨 Emergency alert sent! Services have been notified!')
    } else {
      throw new Error('Failed to send alert')
    }
  } catch (error) {
    console.error('❌ Error sending emergency alert:', error)
    alert('❌ Error sending emergency alert')
  }
}

const registerVolunteer = async () => {
  try {
    // Валидация
    if (!volunteerForm.value.name.trim() || !volunteerForm.value.phone.trim()) {
      alert('Please fill in the required fields')
      return
    }

    const response = await fetch(`${API_BASE}/volunteers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...volunteerForm.value,
        interests: selectedInterests.value,
        registration_date: new Date().toISOString(),
        status: 'new'
      })
    })

    if (response.ok) {
      showVolunteerModal.value = false
      volunteerForm.value = { name: '', phone: '', email: '' }
      selectedInterests.value = ['Cleaning']
      alert('🎉 Thank you for registering! We will contact you soon.')
    } else {
      throw new Error('Failed to register volunteer')
    }
  } catch (error) {
    console.error('Error registering volunteer:', error)
    alert('Registration error. Please try again.')
  }
}

const toggleInterest = (interest) => {
  const index = selectedInterests.value.indexOf(interest)
  if (index > -1) {
    selectedInterests.value.splice(index, 1)
  } else {
    selectedInterests.value.push(interest)
  }
}

// Вспомогательные функции для цветов
const getSeverityColor = (severity) => {
  switch (severity) {
    case "Critical":
      return "bg-red-50 text-red-700 border border-red-200"
    case "High":
      return "bg-orange-50 text-orange-700 border border-orange-200"
    case "Medium":
      return "bg-yellow-50 text-yellow-700 border border-yellow-200"
    default:
      return "bg-gray-50 text-gray-700 border border-gray-200"
  }
}

const getSeverityDotColor = (severity) => {
  switch (severity) {
    case "Critical":
      return "bg-red-500"
    case "High":
      return "bg-orange-500"
    case "Medium":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case "Critical":
      return "bg-red-100 text-red-800"
    case "Polluted":
      return "bg-gray-100 text-gray-800"
    case "At Risk":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Вычисляемые свойства
const progressPercentage = computed(() => {
  const percentage = (suggestionStats.total / 1000) * 100
  return Math.min(percentage, 100)
})
</script>

<style scoped>
/* Анимации */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

/* Волны */
.wave {
  position: absolute;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg,
    rgba(255,255,255,0.1) 0%,
    rgba(255,255,255,0.2) 50%,
    rgba(255,255,255,0.1) 100%);
  animation: wave 20s linear infinite;
}

.wave1 {
  opacity: 0.5;
  animation-delay: 0s;
  bottom: 0;
}

.wave2 {
  opacity: 0.3;
  animation-delay: -5s;
  bottom: 10px;
}

.wave3 {
  opacity: 0.1;
  animation-delay: -10s;
  bottom: 20px;
}

@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Transition для формы */
.slide-down-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 80vh;
}

/* Плавное появление уведомлений */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Модальное окно */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Кастомные стили */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
