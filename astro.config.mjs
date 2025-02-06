// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://leonardtarigan.dev",
  integrations: [tailwind(), icon(), vue(), sitemap()],
});
