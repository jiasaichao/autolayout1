export const STYLE = 'STYLE'
export function getData() {
    return window.Loki.collections.find((value) => value.name === 'style');
}
export const StyleAction = (data) => (dispatch) => {
    let data1 = JSON.parse(JSON.stringify(data));
    dispatch({
        type: STYLE,
        data: data1,
    });
}

export const RemoveStyleAction = (id) => (dispatch) =>{
    getData().remove(id);
    return GetStyleAction(dispatch);
}
export const SetStyleAction = (data) =>(dispatch) => {
    getData().update(data);
    return GetStyleAction(dispatch);
}
export const AddStyleAction = (data) =>(dispatch) => {
    let {name, elementId, value} = data;
    let lokiData = getData();
    data.sort = lokiData.maxId + 1;
    let style = lokiData.findObject({ elementId, name });
    if (style == null) {
        lokiData.insert({
            name,
            value,
            elementId
        });
    }
    else {
        style.name=name,
        style.value=value
        lokiData.update(style);
    }
    return GetStyleAction(dispatch);
}

export const GetStyleAction = (dispatch) => {
    let data = getData().data;
    dispatch(StyleAction(data));
}