import Vue from 'vue'

import VueRouter from 'vue-router'

import Show from './components/Show.vue'
import Dashboard from './components/Dashboard.vue'
import New from './components/New.vue'
import Edit from './components/Edit.vue'
import Login from './components/auth/Login.vue'

Vue.use(VueRouter);


const routes = [
    {
        path: '/',
        name: 'home',
        component: Dashboard
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/show',
        name: 'show',
        component: Show
    },
    {
        path: '/new',
        name: 'new',
        component: New
    },
    {
        path: '/edit/:eitId',
        name: 'edit',
        component: Edit
    },
    {
        path: '/auth',
        name: 'login',
        component: Login
    },

];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router
