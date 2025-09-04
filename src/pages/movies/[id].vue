<script setup>
import { useHead } from '#imports'
import { useRoute } from 'vue-router'

const route = useRoute()
const movie = {
  title: 'Avengers: Endgame',
  id: 1,
  year: 2019,
  description: 'Xem Avengers Endgame full HD online'
}

useHead({
  title: `${movie.title} (${movie.year}) | My Movie Site`,
  meta: [
    { name: 'description', content: movie.description },
    { property: 'og:title', content: movie.title },
    { property: 'og:description', content: movie.description },
    { property: 'og:type', content: 'video.movie' },
  ]
})
</script>

<template>
  <div>
    <NuxtLink to="/movies" class="btn btn-link p-0 mb-3">← Quay lại</NuxtLink>
    <h1>{{ movie.title }} ({{ movie.year }})</h1>
    <p>{{ movie.description }}</p>
  </div>
</template>