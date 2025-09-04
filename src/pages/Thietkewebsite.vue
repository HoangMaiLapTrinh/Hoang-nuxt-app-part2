<script setup lang="ts">
import { useHead } from '#imports'


useHead({
  title: 'Thiết kế Website Chuyên Nghiệp | {Brand}',
  meta: [
    { name: 'description', content: 'Dịch vụ thiết kế website chuẩn SEO, tốc độ cao, giao diện đẹp và tối ưu trải nghiệm người dùng. Liên hệ {Brand} để bắt đầu ngay!' },
    { name: 'keywords', content: 'thiết kế website, thiết kế web chuẩn SEO, dịch vụ web, làm web chuyên nghiệp' },
    { property: 'og:title', content: 'Thiết kế Website Chuyên Nghiệp | {Brand}' },
    { property: 'og:description', content: 'Dịch vụ thiết kế web tối ưu SEO, giao diện hiện đại và thân thiện với Google.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://yourdomain.com/thiet-ke-website' },
    { property: 'og:image', content: 'https://yourdomain.com/images/og-thiet-ke-web.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'canonical', href: 'https://yourdomain.com/thiet-ke-website' }
  ]
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "{Brand} - Thiết kế Website",
        "image": "https://yourdomain.com/images/logo.png",
        "@id": "https://yourdomain.com/",
        "url": "https://yourdomain.com/thiet-ke-website",
        "telephone": "+84-912345678",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Đường ABC",
          "addressLocality": "Hà Nội",
          "addressRegion": "HN",
          "postalCode": "100000",
          "addressCountry": "VN"
        },
        "priceRange": "$$",
        "description": "Dịch vụ thiết kế website chuẩn SEO, responsive, tốc độ cao và tối ưu chuyển đổi.",
        "areaServed": {
          "@type": "Place",
          "name": "Việt Nam"
        },
        "sameAs": [
          "https://www.facebook.com/yourbrand",
          "https://www.linkedin.com/company/yourbrand"
        ]
      })
    }
  ]
})

</script>
<template>
    <main class="content-wrapper">
        <NuxtLink to="/" class="btn btn-link p-0 mb-3">← Quay lại</NuxtLink>
        <section class="container py-5">
            <h1 class="mb-4">FREE</h1>
            <div class="row g-3">
            <div  class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 p-3">
                <h5 class="mb-2">Thiết kế Website Chuyên Nghiệp</h5>
                <p class="mb-3 text-muted">Dịch vụ thiết kế website chuẩn SEO, tốc độ cao, giao diện đẹp và tối ưu trải nghiệm người dùng. Liên hệ để bắt đầu ngay!</p>
                <NuxtLink :to="`/`" class="btn btn-primary btn-sm">Xem chi tiết</NuxtLink>
                </div>
            </div>
            </div>
        </section>
        <section class="container py-5">
            <h1 class="mb-4">PLUS</h1>
            <div class="row g-3">
            <div  class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 p-3">
                <h5 class="mb-2">Thiết kế Website Chuyên Nghiệp</h5>
                <p class="mb-3 text-muted">Dịch vụ thiết kế website chuẩn SEO, tốc độ cao, giao diện đẹp và tối ưu trải nghiệm người dùng. Liên hệ để bắt đầu ngay!</p>
                <NuxtLink :to="`/`" class="btn btn-primary btn-sm">Xem chi tiết</NuxtLink>
                </div>
            </div>
            </div>
        </section>
        <section class="container py-5">
            <h1 class="mb-4">PRO</h1>
            <div class="row g-3">
            <div  class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 p-3">
                <h5 class="mb-2">Thiết kế Website Chuyên Nghiệp</h5>
                <p class="mb-3 text-muted">Dịch vụ thiết kế website chuẩn SEO, tốc độ cao, giao diện đẹp và tối ưu trải nghiệm người dùng. Liên hệ để bắt đầu ngay!</p>
                <NuxtLink :to="`/`" class="btn btn-primary btn-sm">Xem chi tiết</NuxtLink>
                </div>
            </div>
            </div>
        </section>
    </main>
</template>