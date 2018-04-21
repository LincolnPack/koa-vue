import axios from 'axios'
import util from '../util/util.js'

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
instance.interceptors.response.use((result) => {
    /* 假设当status为200时代表响应成功 */
    if (result.data.status != 200) {
        return Promise.reject(result)
    }
    console.log('过滤响应=', result.data);
    return result.data
}, result => {
    return Promise.reject(result)
})

export default instance