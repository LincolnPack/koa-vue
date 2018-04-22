import Vue from 'vue'
import Router from 'vue-router'

/** user **/
import login from '@/views/account/login'
import register from '@/views/account/register'
import forgetpsw from '@/views/account/forgetpsw'

/** artical **/
import index from '@/views/home/index'

/** error **/
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
            path: '/forgetpsw',
            name: 'forgetpsw',
            component: forgetpsw
        },
        {
            path: '/error',
            name: 'error',
            component: error
        },
        {
            path: '/index',
            name: 'index',
            component: index
        }
    ]
})