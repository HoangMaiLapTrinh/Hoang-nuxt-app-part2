<script setup>
import { useHead } from '@vueuse/head'

const movie = {
  title: 'Avengers: Endgame',
  id: 1,
  year: 2019,
  description: 'Xem Avengers Endgame full HD online'
}

useHead({
  title: `My Movie Site`,
  meta: [
    { name: 'description', content: movie.description },
    { property: 'og:title', content: movie.title },
    { property: 'og:description', content: movie.description },
    { property: 'og:type', content: 'video.movie' },
  ]
})
</script>

<template>
  <main class="content-wrapper">
  <NuxtLink to="/" class="btn btn-link p-0 mb-3">← Quay lại</NuxtLink>
    <section class="container py-1">
      <h1 class="mb-4">Movies</h1>
      <div class="row g-3">
        <div  class="col-12 col-md-4 col-lg-2">
          <div class="card h-100 p-3">
            <img src="@/assets/img/movies/Avengers_Endgame_bia_teaser.jpg" alt="" style="">
            <h5 class="mb-2">{{ movie.title }}</h5>
            <p class="mb-3 text-muted">{{ movie.description || '—' }}</p>
            <NuxtLink :to="`/movies/${id}`" class="btn btn-primary btn-sm">Xem chi tiết</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>