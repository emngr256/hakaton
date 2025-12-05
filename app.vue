<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Глобальный зум 80% для всего сайта */
html, body {
  zoom: 90%;
  /* Альтернатива если zoom не работает: */
  /* transform: scale(0.8); */
  /* transform-origin: top left; */
  /* width: 125%; */
}
</style>