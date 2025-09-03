import * as UI from '~/utils/ui'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      ui: UI
    }
  }
})
