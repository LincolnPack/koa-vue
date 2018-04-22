import axios from 'axios'
import util from '../util/util.js'
import { Message } from 'element-ui';

let token = util.str(util.getItem('token'));
/* 创建一个新的 AXIOS 对象，确保原有的对象不变 */
let instance = axios.create({
    baseURL: '/api' /* 服务器的根路径 */
})
instance.defaults.headers.common['token'] = token;
/* 过滤请求 */
instance.interceptors.request.use((config) => {
        return config
    })
    /* 过滤响应 */
instance.interceptors.response.use((res) => {
    /* 假设当status为200时代表响应成功 */
    if (res.data.status != 200) {
        Message({
            message: res.data.msg,
            type: 'error'
        })
        if (res.data.status == 401) {
            window.location.hash = "/";
            return Promise.reject(res);
        }
        if (res.data.status == 403) {
            window.location.hash = "/403";
            return Promise.reject(res);
        }
        if (res.data.status == 404) {
            window.location.hash = "/404";
            return Promise.reject(res);
        }
        return Promise.reject(res);
    } else {
        console.log('过滤响应=', res.data);
        return Promise.resolve(res.data);
    }
}, res => {
    Message({
        message: '服务器访问失败!',
        type: 'error',
        duration: 1000
    })
    return Promise.reject(res)
})

export default instance