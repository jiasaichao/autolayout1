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
             * type:container，normal//类型---未启用
             */
            window.Loki.addCollection('element');
            /**
             * name//不能重复
             * value
             * sort
             * elementId
             */
            window.Loki.addCollection('style');
            /**
             * name//不能重复
             * value
             * elementId
             */
            window.Loki.addCollection('props');
            
            /**
             * name//不能重复
             */
            window.Loki.addCollection('component');
            //元素
            /**
             * componentId: '',//组建属于的id
             * pid: 0,//父级id
             * sort
             */
            window.Loki.addCollection('componentElement');
        }
    }
}