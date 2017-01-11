export const APIDATA = 'APIDATA'
function getData(){
    return window.Loki.collections.find((value)=>value.name==='apidata');
}
export const ApiDataAction = (data) => {
    return {
        type: APIDATA,
        data,
    }
}

export const RemoveApiDataAction = (id) => {
    getData().remove(id);
    return GetApiDataAction();
}
export const SetApiDataAction = (data) => {
    getData().update(data);
    return GetApiDataAction();
}
export const AddApiDataAction = (data) => {
    getData().insert(data);
    return GetApiDataAction();
}

export const GetApiDataAction = () => {
    let data=getData().data;
    return ApiDataAction(data);
}