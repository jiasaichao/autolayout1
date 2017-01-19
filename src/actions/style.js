export const STYLE = 'STYLE'
function getData() {
    return window.Loki.collections.find((value) => value.name === 'style');
}
export const StyleAction = (data) => (dispatch)=>{
    let data1=JSON.parse(JSON.stringify(data));
    dispatch({
        type: STYLE,
        data:data1,
    });
}

export const RemoveStyleAction = (id) => {
    getData().remove(id);
    return GetStyleAction();
}
export const SetStyleAction = (data) => {
    getData().update(data);
    return GetStyleAction();
}
export const AddStyleAction = (data) => {
    data.sort = getData().maxId+1;
    getData().insert(data);
    return GetStyleAction();
}

export const GetStyleAction = () => {
    let data = getData().data;
    return StyleAction(data);
}