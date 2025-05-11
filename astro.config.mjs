// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from "@tailwindcss/vite"
import react from "@astrojs/react";
import vercel from "@astrojs/vercel"

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
  },
  integrations: [react()],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  env: {
    schema: {
      SPOTIFY_CLIENT_ID: envField.string({
        context: 'server',
        access: 'secret',
        default: ""
      }),
      SPOTIFY_CLIENT_SECRET: envField.string({
        context: 'server',
        access: 'secret',
        default: ""
      }),
      SPOTIFY_REFRESH_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        default: ""
      }),
    },
  },
});