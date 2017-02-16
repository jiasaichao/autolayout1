export const PROPS = 'PROPS'
export function getData() {
    return window.Loki.collections.find((value) => value.name === 'props');
}
export const PropsAction = (data) => (dispatch) => {
    let data1 = JSON.parse(JSON.stringify(data));
    dispatch({
        type: PROPS,
        data: data1,
    });
}
export const GetPropsAction = (dispatch) => {
    let data = getData().data;
    dispatch(PropsAction(data));
}
export const AddPropsAction = (data) => (dispatch) => {
    let {name, elementId, value} = data;
    let lokiData = getData();
    lokiData.insert({
        name,
        value,
        elementId
    });
    return GetPropsAction(dispatch);
}
export const SetPropsAction = (data) => (dispatch) => {
    getData().update(data);
    return GetPropsAction(dispatch);
}

export const RemovePropsAction = (id) => (dispatch) => {
    getData().remove(id);
    return GetPropsAction(dispatch);
}
