import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/account/login'
import register from '@/views/account/register'
import error from '@/views/account/error'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/error',
            name: 'error',
            component: error
        }
    ]
})