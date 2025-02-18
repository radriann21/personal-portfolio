// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from "@tailwindcss/vite"

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
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
      })
    },
  },
});