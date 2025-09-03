// stores/useItemStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHomepageStore = defineStore('homepage', () => {
  const heroData = ref<any>(null)
  const clientsData = ref<any[]>([])
  const servicesData = ref<any[]>([])
  const processData = ref<any>(null)
  const solutionsData = ref<any[]>([])
  const teamData = ref<any[]>([])
  const projectsData = ref<any[]>([])
  const testimonialsData = ref<any[]>([])
  const faqData = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { $supabase } = useNuxtApp() as any

  function normalize(r: any) {
    heroData.value = r.hero ? {
      title: r.hero.heading,
      subtitle: r.hero.subheading,
      cta: { label: r.hero.cta_label, href: r.hero.cta_href }
    } : null

    clientsData.value = r.clients || []
    servicesData.value = (r.services || []).map((s:any)=>({ ...s, image: s.image_url }))
    processData.value = r.process || null
    solutionsData.value = r.solutions || []
    teamData.value = (r.team || []).map((m:any)=>({ ...m, name: m.full_name, avatar: m.avatar_url }))
    projectsData.value = (r.projects || []).map((p:any)=>({ ...p, image: p.image_url }))
    testimonialsData.value = r.testimonials || []
    faqData.value = (r.faq || []).map((x:any)=>({ title: x.q, description: x.a }))
  }

  async function fetchHomepageSections() {
    loading.value = true; error.value = null
    try {
      if (!$supabase) throw new Error('Supabase client not found')
      const tasks = [
        $supabase.from('hero').select('*').single().then(({data,error}:any)=>({k:'hero',data,error})),
        $supabase.from('clients').select('*').then(({data,error}:any)=>({k:'clients',data,error})),
        $supabase.from('services').select('*').order('order').then(({data,error}:any)=>({k:'services',data,error})),
        $supabase.from('process').select('*').single().then(({data,error}:any)=>({k:'process',data,error})),
        $supabase.from('solutions').select('*').then(({data,error}:any)=>({k:'solutions',data,error})),
        $supabase.from('team').select('*').then(({data,error}:any)=>({k:'team',data,error})),
        $supabase.from('projects').select('*').then(({data,error}:any)=>({k:'projects',data,error})),
        $supabase.from('testimonials').select('*').then(({data,error}:any)=>({k:'testimonials',data,error})),
        $supabase.from('faq').select('q,a').then(({data,error}:any)=>({k:'faq',data,error})),
      ]
      const settled = await Promise.allSettled(tasks)
      const r:any = {}
      for (const s of settled) {
        if (s.status === 'fulfilled') {
          const {k,data,error:e} = s.value as any
          if (!e) r[k] = data
        }
      }
      normalize(r)
      // debug: xem console để chắc là có dữ liệu
      console.log('[homepage] fetched counts', {
        hero: !!r.hero, clients: (r.clients||[]).length, services: (r.services||[]).length,
        team: (r.team||[]).length, projects: (r.projects||[]).length, faq: (r.faq||[]).length
      })
    } catch (e:any) {
      error.value = e?.message || 'fetch error'
      console.error('[homepage] fetch error', e)
    } finally {
      loading.value = false
    }
  }

  return { heroData, clientsData, servicesData, processData, solutionsData, teamData, projectsData, testimonialsData, faqData, loading, error, fetchHomepageSections }
})
