/**
 * @param {Object} component 组件
 * @param {Object} element 根元素
 * @param {Array} styleListAll
 * @param {Array} propsListAll
 */
export function componentText(component, element, styleListAll, propsListAll, baseComponents, elementList) {
    let allElement = (eleName, id) => {
        let styleList = styleListAll.find({ elementId: id });
        let propsList = propsListAll.find({ elementId: id });
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
import { Image,Container,Icon,Text } from '../';
import React from 'react';
let SL = Global.styles;
let CN = Global.className;
/**
 * style
 */
export class ${component.name} extends React.Component {
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
export const ${component.name}Wrapped = Wrapped(${component.name});`
    return text;
}

export function importComponentText(componentList) {
    let importComponent = ``;
    componentList.forEach((value) => {
        importComponent += `import { ${value.name}, ${value.name}Wrapped } from './${value.name}';\n`
    });
    let exportComponent = ``;
    componentList.forEach((value) => {
        exportComponent += `${value.name}, ${value.name}Wrapped, `
    });
    let text = `${importComponent}
export {
    ${exportComponent}
}`
return text;
}