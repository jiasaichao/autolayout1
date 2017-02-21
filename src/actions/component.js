import { SetElementAction, getData as GetElementData } from './element';
import { getData as GetStyleData } from './style';
import { getData as GetPropsData } from './props';
import { baseComponents } from '../data/defaultStyle';
import { componentText,importComponentText } from '../data/template';

export const COMPONENT = 'COMPONENT';
function getData() {
    return window.Loki.collections.find((value) => value.name === 'component');
}
export const ComponentAction = (data) => (dispatch) => {
    let data1 = JSON.parse(JSON.stringify(data));
    dispatch({
        type: COMPONENT,
        data: data1,
    });
}

export const RemoveComponentAction = (id) => (dispatch) => {
    getData().remove(id);
    return GetComponentAction(dispatch);
}
export const RemoveComponentAndChildAction = (id) => (dispatch) => {
    getData().remove(id);
    return GetComponentAction(dispatch);
}
export const SetComponentAction = (data) => (dispatch) => {
    getData().update(data);
    return GetComponentAction(dispatch);
}
/**
 * @param data 如果存在sort则大于等于sort的所有数据的sort+1
 */
export const AddComponentAction = (data) => (dispatch) => {

    data.sort = getData().maxId + 1;
    let insert = getData().insert(data);
    // let el = GetElementData().get(data.elementId);
    // el.pid = -1;
    // dispatch(SetElementAction(el));
    return GetComponentAction(dispatch);
}

export const GetComponentAction = (dispatch) => {
    let data = getData().data;
    dispatch(ComponentAction(data));
}

export const BuildComponentAction = () => (dispatch) => {
    let fs = window.nodeRequire('fs');
    let data = getData().data;
    let elementList = GetElementData();
    data.forEach((value) => {
        let element = elementList.get(value.elementId);//根元素        
        let text = componentText(value, element, GetStyleData(), GetPropsData(), baseComponents, elementList);
        fs.writeFile(`./src/components/custom/${value.name}.jsx`, text);
    });
    let indexText=importComponentText(data);
    fs.writeFile(`./src/components/custom/index.js`, indexText);
}