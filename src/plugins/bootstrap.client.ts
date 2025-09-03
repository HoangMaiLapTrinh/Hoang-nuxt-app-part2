// src/plugins/bootstrap.client.ts
export default defineNuxtPlugin(async () => {
  if (import.meta.client) {
    await import('bootstrap');
  }
});
