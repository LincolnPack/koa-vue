// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './http/http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.use(ElementUI)

const NProgres = NProgress.configure({ ease: 'ease', speed: 500, showSpinner: false });

// register global progress.
const whiteList = ['/login', '/forgetpsw', '/register', '/sendpwd']; // 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgres.start(); // 开启Progress
    next();
    // if (store.getters.token) { // 判断是否有token
    //   if (to.path === '/login') {
    //     next({ path: '/' });
    //   } else {
    //       next();
    //   }
    // } else {
    // if (whiteList.indexOf(to.path) !== -1) { // 在免登入白名单，直接进入
    //     next()
    // } else {
    //     next('/login'); // 否则全部重定向到登录页
    //     NProgres.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    // }
    // }
});

router.afterEach(() => {
    NProgres.done(); // 结束Progress
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})