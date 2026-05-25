import { defineConfig } from 'astro/config';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserPage = repoName?.endsWith('.github.io');
const site = process.env.SITE_URL ?? 'https://dolphindream.cn';

export default defineConfig({
  site,
  base: process.env.BASE_PATH ?? (site === 'https://dolphindream.cn' ? '/' : repoName && !isUserPage ? `/${repoName}` : '/'),
});
