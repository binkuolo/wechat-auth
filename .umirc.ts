import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/admin/login', component: '@/pages/admin/login' },
  ],
  fastRefresh: {},
  hash: true
});
