import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL ?? 'https://dolphindream.cn';

export default defineConfig({
  site,
  base: process.env.BASE_PATH ?? '/',
});
