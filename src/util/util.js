let setItem = (key, value) => {
    sessionStorage.setItem(key, value);
}
let getItem = (key) => {
    return sessionStorage.getItem(key);
}
let str = (str) => {
    if (str == undefined || str == 'undefined' || str == '' || str == null || str == 'null') {
        return '';
    } else {
        return str;
    }
}
export default {
    setItem: setItem,
    getItem: getItem,
    str: str
}