//import {Header, Sidebar,  NavigationBar, NavigationBarItem,NavBar,List,Container} from "../components/index";
import { connect } from 'react-redux';
import React from 'react';
import {ContainerWrapped, Text } from '../components/index';
import { AddElementAction } from '../actions/element';
import { AddStyleAction } from '../actions/style';
import { defaultStyle } from '../data/defaultStyle';

let loadComponent = function (id, name, style, props, content, children) {
    switch (name) {
        case 'Container':
            return <ContainerWrapped key={id} style={style} {...props}>{children}</ContainerWrapped>;
        case 'Text':
            return <Text key={id} style={style} {...props}>{content}</Text>;
    }
}

function ComponentType({ active, text, onClick }) {
    let styles = {
        componentsItem: {
            display: 'flex',
            width: '33.333%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
        }
    }
    if (active) {
        styles.componentsItem.border = '1px solid #11b6f5';
    }
    else {
        styles.componentsItem.border = '1px solid #2d2323';
    }
    return <div style={styles.componentsItem} onClick={onClick}>{text}</div>;
}
function ActiveElement({ top,left,height,width }) {
    let styles = {
        root:{
            position:'absolute',
            top,
            left,
            height,
            width,
            border:'1px solid #2d2323'
        }
    }
    return <div style={styles.root}></div>;
}

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: '',
            activeElement:0,
        };
    }
    render() {
        let styles = {
            add: { cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '26px', paddingLeft: '8px', paddingRight: '8px' }
        }
        return (
            <div>
            {this.state.activeElement?<ActiveElement />:null}
                <div style={{ display: 'flex', height: 50 }}></div>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: 315 }}>
                        <h2>Components</h2>
                        <div style={{ display: 'flex' }}>
                            <ComponentType active={this.state.active == 'Container'} text='容器' onClick={() => { this.setState({ active: 'Container' }) } } />
                            <ComponentType active={this.state.active == 'Text'} text='文字' onClick={() => { this.setState({ active: 'Text' }) } } />
                            <ComponentType active={this.state.active == 'Image'} text='图片' onClick={() => { this.setState({ active: 'Image' }) } } />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div onClick={this.add} style={styles.add}>add</div>
                        </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <div style={{ position: 'relative', width: 375, height: 667, border: '1px solid #11b6f5' }}>
                            {this.components()}
                        </div>
                        {/*<iframe src="index.html"></iframe>*/}
                    </div>
                    <div style={{ width: 315 }}></div>
                </div>
            </div>
        )
    }
    add = () => {
        if (!!this.state.active) {
            this.props.Add({
                name: this.state.active,
                pid: 0,
                props: new Map(),
                content: ''
            },defaultStyle[this.state.active]);

        }
    }
    components = () => {
        let {elementList, styleList} = this.props;
        let allComponents = (data) => {
            return data.map((value) => {
                let children = null;
                let childrenList = elementList.filter(childrenVal => childrenVal.pid == value.$loki);
                let currentStyleList = styleList.filter(currentStyleVal => currentStyleVal.elementId == value.$loki);
                let style = {};
                currentStyleList.forEach((currentStyle) => {
                    style[currentStyle.name] = currentStyle.value;
                });
                if (childrenList.length != 0) {
                    children = childrenList.map((childrenValue) => {
                        allComponents(childrenValue);
                    });
                }
                return loadComponent(value.$loki, value.name, style, value.props, value.content, children);
            });
        }
        return allComponents(elementList.filter(value => value.pid == 0));
    }
}
let mapStateToProps = (state) => {
    return {
        elementList: state.elementList,
        styleList: state.styleList
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        Add: (data,style) => { dispatch(AddElementAction(data,style)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);