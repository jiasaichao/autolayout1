import Loki from 'lokijs';

export const GET_DATA = 'GET_DATA'
export const GetDataAction = (data) => {
    return function () {
        if (window.Loki === undefined) {
            //初始化
            window.Loki = new Loki('loki.json');
            //默认表
            window.Loki.addCollection('apidata');
            //元素
            /**
             * id: 1,
             * name: '',//组建名称
             * pid: 0,//父级id
             * sort
             * styles: new Map(),
             * props: new Map(),
             * content: '',//内容
             */
            window.Loki.addCollection('element');
            /**
             * name
             * value
             * sort
             * elementId
             */
            window.Loki.addCollection('style');
        }
    }
}