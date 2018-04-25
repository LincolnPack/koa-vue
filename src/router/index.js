import Vue from 'vue'
import Router from 'vue-router'

/** user **/
import login from '@/views/account/login'
import register from '@/views/account/register'
import forgetpsw from '@/views/account/forgetpsw'

/** artical **/
import index from '@/views/home/index'

/** error **/
import error_404 from '@/views/account/404'
import error_403 from '@/views/account/403'

/** 用户头像上传 **/
import upload from '@/components/upload'

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
            path: '*',
            name: 'error_404',
            component: error_404
        },
        {
            path: '/403',
            name: 'error_403',
            component: error_403
        },
        {
            path: '/index',
            name: 'index',
            component: index
        },
        {
            path: '/upload',
            name: 'upload',
            component: upload
        }
    ]
})