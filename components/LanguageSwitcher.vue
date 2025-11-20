<template>
  <div class="language-switcher">
    <button 
      v-for="lang in languages" 
      :key="lang.code"
      @click="setLanguage(lang.code)"
      :class="{ 'active': currentLang === lang.code }"
      class="px-4 py-2 border rounded-lg transition-all hover:bg-gray-100"
    >
      {{ lang.flag }} {{ lang.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
const currentLang = ref('ru')

const languages = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'kk', name: 'Қазақша', flag: '🇰🇿' }
]

const setLanguage = (lang: string) => {
  currentLang.value = lang
  // Здесь позже добавим логику переводов
  console.log('Язык изменен на:', lang)
}

// Экспортируем для использования в родительских компонентах
defineExpose({
  currentLang,
  setLanguage
})
</script>

<style scoped>
.active {
  background-color: #3b82f6;
  color: white;
}
</style>