import Loki from 'lokijs';
import LokiElectronAdapter from '../utils/LokiElectronAdapter'

export const GET_DATA = 'GET_DATA'
export const GetDataAction = (callback) => {
    return function () {
        if (window.Loki === undefined) {
            //初始化
            window.Loki = new Loki('loki.json', { adapter: new LokiElectronAdapter() });
            window.Loki.loadDatabase({}, () => {
                if (!window.Loki.collections.find((v) => v.name == 'apidata')) {
                    //默认表
                    window.Loki.addCollection('apidata');
                    //元素
                    /**
                     * id: 1,
                     * name: '',//组建名称
                     * pid: 0,//父级id，0为顶级，-1为组件
                     * sort
                     * type:base,custom//类型base基础，custom自定义从component表中找
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
                     * elementId//元素id
                     * type:container,normal
                     * containerId//容器id，type不是container为0
                     * sort
                     */
                    window.Loki.addCollection('component');
                }
                if (callback) {
                    callback();
                }
            });

        }
    }
}