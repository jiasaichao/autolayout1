import { SetElementAction, getData as GetElementData } from './element';
import { getData as GetStyleData } from './style';
import { getData as GetPropsData } from './props';
import { baseComponents } from '../data/defaultStyle'
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
        let allElement = (eleName, id) => {
            let styleList = GetStyleData().find({ elementId: id });
            let propsList = GetPropsData().find({ elementId: id });
            let cp = baseComponents.find((bc) => bc.name == eleName);
            if (!cp) {
                cp = data.find((c) => c.name == eleName);
            }
            let propsString = ``;
            propsList.forEach((props) => {
                propsString += ` ${props.name}='${props.value}'`;
            });
            switch (cp.type) {
                case 'container':
                    let c = elementList.chain().find({ pid: id }).simplesort('sort').data();
                    let child = '';
                    if (c.length > 0) {
                        c.forEach((cv) => {
                            child += allElement(cv.name, cv.$loki);
                        });
                    }
                    return `<${eleName} ${propsString}>\n` +
                        `${child}
                </${eleName}>`;
                    break;
                case 'normal':
                    return `<${eleName} ${propsString} />`;
                    break;
            }
        };

        let text = `import { Common, Global } from '../../utils/common';
import { Wrapped } from '../wrapped';
import React from 'react';
let SL = Global.styles;
let CN = Global.className;
/**
 * style
 */
export class ${value.name} extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create({}).merge(this.props.style)
        }
        return (
            ${allElement(element.name, element.$loki)}
        );
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
}
export const ${value.name}Wrapped = Wrapped(${value.name});`
        fs.writeFile(`./src/components/custom/${value.name}.jsx`, text)
    });
}