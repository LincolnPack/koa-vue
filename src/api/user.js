/**
 * author：wangqian
 * createTime：2018/04/21
 * modifyTime:''
 */
import http from '../http/http';
/*登录*/
export let _login = (params) => {
        return http.post('/account/api/login', params);
    }
    /*注册*/
export let _register = (params) => {
        return http.post('/account/api/register', params);
    }
    /*文章查询*/
export let _findArticelList = (params) => {
        return http.post('/article/api/findArticleList', params);
    }
    /*文章添加*/
export let _addArticle = (params) => {
    return http.post('/article/api/addArticle', params);
}