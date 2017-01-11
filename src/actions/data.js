import Loki from 'lokijs';

export const GET_DATA = 'GET_DATA'
export const GetDataAction = (data) => {
    return function () {
        if (window.Loki === undefined) {
            //初始化
            window.Loki = new Loki('loki.json');
            //默认表
            window.Loki.addCollection('apidata');
        }
    }
}