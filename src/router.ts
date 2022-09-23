import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

import TransformsObjects from './components/TransformsObjects.vue'
import SimpleShape from './components/SimpleShape.vue'
import HelloWorld from './components/HelloWorld.vue'
import NotFound from './components/NotFound.vue'
import House from './components/House.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'TransformsObjects', component: TransformsObjects },
  { path: '/shape', name: 'SimpleShape', component: SimpleShape },
  { path: '/hello', name: 'Hello', component: HelloWorld },
  { path: '/house', name: 'House', component: House },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router