<template>
  <section class="wrapper bg-light">
    <div class="container pt-10 pt-md-14 pb-14 pb-md-16 text-center">
      <div class="row gx-lg-8 gx-xl-12 gy-10 gy-xl-0 mb-14 align-items-center">
        <div class="col-lg-7 order-lg-2">
          <figure>
            <img class="img-auto" :src="i21" :srcset="i21x2 + ' 2x'" alt="Illustration">
          </figure>
        </div>

        <div class="col-md-10 offset-md-1 offset-lg-0 col-lg-5 text-center text-lg-start">
          <h1 class="display-1 fs-54 mb-5 mx-md-n5 mx-lg-0 mt-7">
          <span class="d-block">A digital agency</span>
          <span class="d-block">specializing on</span>
          <span ref="rotatorEl" class="rotator-fade text-primary d-block"></span>
        </h1>
          <p class="lead fs-lg mb-7">
            We are an award winning design agency that strongly believes in the power of creative ideas.
          </p>
          <span><a class="btn btn-lg btn-primary rounded-pill me-2">Get Started</a></span>
        </div>
      </div>
      </div>
  </section>
</template>

<script setup>
import i21   from '../assets/img/illustrations/i21.png'
import i21x2 from '../assets/img/illustrations/i21@2x.png'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { startTextRotator } from '@/utils/ui'

const modules = import.meta.glob('../assets/img/brands/*.png', { eager: true, import: 'default' })
const brands = Object.values(modules)

// rotator
const rotatorEl = ref(null)
let stopRotator = () => {}

onMounted(() => {
  if (rotatorEl.value) {
    stopRotator = startTextRotator(
      rotatorEl.value,
      ['mobile design', 'web design', '3D animation'],
      2500
    )
  }
})

onBeforeUnmount(() => {
  stopRotator && stopRotator()
})
</script>
