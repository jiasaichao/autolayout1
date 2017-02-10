import { AddStyleAction } from './style'
import { AddPropsAction } from './props'
export const ELEMENT = 'ELEMENT'
function getData() {
    return window.Loki.collections.find((value) => value.name === 'element');
}
export const ElementAction = (data) => (dispatch) => {
    let data1 = JSON.parse(JSON.stringify(data));
    dispatch({
        type: ELEMENT,
        data: data1,
    });
}

export const RemoveElementAction = (id) => (dispatch) => {
    getData().remove(id);
    return GetElementAction(dispatch);
}
export const RemoveElementAndChildAction = (id) => (dispatch) => {
    getData().remove(id);
    getData().chain().find({pid:id}).remove();
    return GetElementAction(dispatch);
}
export const SetElementAction = (data) => (dispatch) => {
    getData().update(data);
    return GetElementAction(dispatch);
}
/**
 * @param data 如果存在sort则大于等于sort的所有数据的sort+1
 */
export const AddElementAction = (data, style,props) => (dispatch) => {
    if (data.sort) {
        getData().chain().where((value)=>{return value.sort>=data.sort}).update((value)=>{
            value.sort=value.sort+1;
            return value;
        });
    }
    else {
        data.sort = getData().maxId + 1;        
    }

    let insert = getData().insert(data);

    for (var i in style) {
        dispatch(AddStyleAction({
            name: i,
            value: style[i],
            elementId: insert.$loki
        }));
    }

    for (var i of props) {
        dispatch(AddPropsAction({
            name: i.name,
            value: i.defaultValue,
            elementId: insert.$loki
        }));
    }
    return GetElementAction(dispatch);
}

export const GetElementAction = (dispatch) => {
    let data = getData().data;
    dispatch(ElementAction(data));
}