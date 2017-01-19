import { AddStyleAction } from './style'
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

export const RemoveElementAction = (id) => {
    getData().remove(id);
    return GetElementAction();
}
export const SetElementAction = (data) => {
    getData().update(data);
    return GetElementAction();
}
export const AddElementAction = (data, style) => (dispatch) => {
    data.sort = getData().maxId + 1;
    let insert = getData().insert(data);

    for (var i in style) {
        dispatch(AddStyleAction({
            name: i,
            value: style[i],
            elementId: insert.$loki
        }));
    }
    return GetElementAction(dispatch);
}

export const GetElementAction = (dispatch) => {
    let data = getData().data;
    dispatch(ElementAction(data));
}