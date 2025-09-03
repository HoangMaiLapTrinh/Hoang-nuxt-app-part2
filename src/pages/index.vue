<!-- pages/index.vue -->
<script setup lang="ts">
import { useHomepageStore } from '@/stores/useItemStore'
const homepageStore = useHomepageStore()

onMounted(() => {
  homepageStore.fetchHomepageSections()
})

</script>

<template>
  <div class="content-wrapper">
    <NavCollapse />

    <HeroSection v-if="homepageStore.heroData" :my_hero="homepageStore.heroData" />
    <ClientsSection v-if="homepageStore.clientsData?.length" :my_client="homepageStore.clientsData" />
    <ServicesSection v-if="homepageStore.servicesData?.length" :my_services="homepageStore.servicesData" />
    <ProcessSection v-if="homepageStore.processData" :my_process="homepageStore.processData" />
    <SolutionsSection v-if="homepageStore.solutionsData?.length" :my_solution="homepageStore.solutionsData" />
    <TeamSection v-if="homepageStore.teamData?.length" :my_team="homepageStore.teamData" />
    <ProjectsSection v-if="homepageStore.projectsData?.length" :my_project="homepageStore.projectsData" />
    <TestimonialsSection v-if="homepageStore.testimonialsData?.length" :my_testimonials="homepageStore.testimonialsData" />
    <FaqSection v-if="homepageStore.faqData?.length" :my_faq="homepageStore.faqData" />

    <FooterSection />
  </div>
</template>
