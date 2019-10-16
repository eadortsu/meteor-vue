import Vue from 'vue'

import VueRouter from 'vue-router'

import Index from './components/Index.vue'

Vue.use(VueRouter);


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Index
    },

];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router