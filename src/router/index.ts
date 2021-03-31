import Vue from 'vue'
import VueRouter, { Route } from 'vue-router';
import Home from '../views/Home.vue'

Vue.use(VueRouter)

declare global {
  // 配置每个路由的单独属性title, keepalive, main, desc, icon, hidden, auth等
  interface RouterMeta {
    title?: string;
    role?: string;
    static?: boolean;
  }
  interface Router {
    path: string;
    name?: string;
    icon?: string;
    permission?: string;
    meta?: RouterMeta;
    component?: any;
    children?: Router[];
    redirect?: string;
  }
  interface System {
    import(request: string): Promise<any>;
  }
  var System: System;
}

  const routes: Router[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/double',
    name: 'Double',
    component: () => import('../views/Double.vue')
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/Map.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
