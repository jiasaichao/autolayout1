//import {Header, Sidebar,  NavigationBar, NavigationBarItem,NavBar,List,Container} from "../components/index";
import { connect } from 'react-redux';
import React from 'react';
import { ContainerWrapped, Text } from '../components/index';
import { AddElementAction } from '../actions/element';
import { AddStyleAction, SetStyleAction } from '../actions/style';
import { defaultStyle } from '../data/defaultStyle';
import { Common } from '../utils/common';
import ReactDom from 'react-dom';

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
/**内容位置导航 */
function Nav({elementList, active, setActive}) {
    let style = { paddingLeft: 10 }
    function NavContent(pid) {
        let els = elementList.filter((el) => el.pid == pid);
        return (
            <div style={style}>
                {els.map((el) => <div key={el.$loki} style={style}>
                    <a href="javascript:;" onClick={() => { setActive(el.$loki) }} style={{ textDecoration: 'none', color: active == el.$loki ? 'blue' : '#000' }}>{el.name}</a>
                    {NavContent(el.$loki)}
                </div>)}
            </div>
        )
    }
    return (
        <div>
            <a href='javascript:;' onClick={() => { setActive(0) }} style={{ textDecoration: 'none', color: active == 0 ? 'blue' : '#000' }}>Container</a>
            {NavContent(0)}
        </div>
    );
}
/**选中元素的遮罩 */
class ActiveElement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            top: 0,
            left: 0,
            height: 0,
            width: 0,
        };
    }
    render() {
        let {top, left, height, width} = this.state;
        let styles = {
            root: {
                position: 'absolute',
                top: this.state.top,
                left: this.state.left,
                height: this.state.height,
                width: this.state.width,
                border: '1px solid #2d2323',
                boxSizing: 'border-box'
            }
        }
        return <div style={styles.root}></div>;
    }
}

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            /** 选中的要添加类型名称 */
            active: '',
            /** 选中的元素的id */
            activeElement: 0,
        };
    }
    render() {
        let {styleList, elementList} = this.props;
        let styles = {
            add: { cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '26px', paddingLeft: '8px', paddingRight: '8px' },
            nav: { paddingLeft: 10 }
        }
        return (
            <div>
                <div style={{ display: 'flex', height: 50 }}></div>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: 315 }}>
                        <div>
                            <h2>Nav</h2>
                            <div style={{ display: 'flex' }}>
                                <Nav elementList={elementList} active={this.state.activeElement} setActive={(id) => { this.setState({ activeElement: id }) }} />
                            </div>
                        </div>
                        <div>
                            <h2>Components</h2>
                            <div style={{ display: 'flex' }}>
                                <ComponentType active={this.state.active == 'Container'} text='容器' onClick={() => { this.setState({ active: 'Container' }) }} />
                                <ComponentType active={this.state.active == 'Text'} text='文字' onClick={() => { this.setState({ active: 'Text' }) }} />
                                <ComponentType active={this.state.active == 'Image'} text='图片' onClick={() => { this.setState({ active: 'Image' }) }} />
                            </div>
                            <h2>Add</h2>
                            <div style={{ display: 'flex' }}>
                                <div onClick={this.children} style={styles.add}>children</div>
                                <div onClick={this.next} style={styles.add}>next</div>
                                <div onClick={this.prev} style={styles.add}>prev</div>
                            </div>
                        </div>

                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <div ref={r => this.appContainer = r} style={{ position: 'relative', width: 375, height: 667, border: '1px solid #11b6f5' }}>
                            {this.state.activeElement ? <ActiveElement ref={e => this.activeElement = e} /> : null}
                            {this.components()}
                        </div>
                        {/*<iframe src="index.html"></iframe>*/}
                    </div>
                    <div style={{ width: 315 }}>
                        <div>

                        </div>
                        <div>
                            <div>style</div>
                            <div>
                                {styleList.filter(style => style.elementId == this.state.activeElement).map((style) => <div key={style.$loki}><label htmlFor="">{style.name}</label><input type="text" defaultValue={style.value} /></div>)}

                            </div>
                        </div>
                        <div>
                            <div>add</div>
                            <div>
                                <div><label htmlFor="">name</label><input ref={node => this.styleName = node} type="text" /></div>
                                <div><label htmlFor="">value</label><input ref={node => this.styleValue = node} type="text" /></div>
                                <div><a href='javascript:;' onClick={this.addStyle}>add</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.activeElement) {
            let activeElement = ReactDOM.findDOMNode(this.refs[this.state.activeElement]);
            let point = Common.getAbsPoint(activeElement);
            let appContainerPoint = Common.getAbsPoint(ReactDOM.findDOMNode(this.appContainer));
            point.x -= appContainerPoint.x;
            point.y -= appContainerPoint.y;
            this.activeElement.setState({ top: point.y, left: point.x, width: activeElement.offsetWidth, height: activeElement.offsetHeight });
        }
    }
    getActiveElement=()=>{
        return this.props.elementList.get(this.state.activeElement);
    }
    next = () => {
        if (!!this.state.active) {
            let el=this.getActiveElement();
            this.props.Add({
                name: this.state.active,
                pid: el.pid,
                sort:el.sort+1,
                props: new Map(),
                content: ''
            }, defaultStyle[this.state.active]);

        }
    }
    children = () => {
        if (!!this.state.active) {
            this.props.Add({
                name: this.state.active,
                pid: this.state.activeElement,
                props: new Map(),
                content: ''
            }, defaultStyle[this.state.active]);
        }
    }
    prev=()=>{
        if (!!this.state.active) {
            let el=this.getActiveElement();
            this.props.Add({
                name: this.state.active,
                pid: el.pid,
                sort:el.sort,
                props: new Map(),
                content: ''
            }, defaultStyle[this.state.active]);
        }
    }

    addStyle = () => {
        let name = this.styleName.value;
        let value = this.styleValue.value;
        if (!!this.state.activeElement) {
            this.props.AddStyle({
                name,
                value,
                elementId: this.state.activeElement
            });
        }
    }
    editStyle = () => {
        this.props.SetStyleAction({

        })
    }
    components = () => {
        let {elementList, styleList} = this.props;
        let allComponents = (data) => {
            if(!(data instanceof Array))
            {
                data=[data];
            }
            return data.map((value) => {
                let children = null;
                let childrenList = elementList.filter(childrenVal => childrenVal.pid == value.$loki);
                let currentStyleList = styleList.filter(currentStyleVal => currentStyleVal.elementId == value.$loki);
                let style = {};
                let props = {};
                props.ref = value.$loki;
                props.onClick = () => {
                    this.setState({ activeElement: value.$loki });
                }
                currentStyleList.forEach((currentStyle) => {
                    style[currentStyle.name] = currentStyle.value;
                });
                if (childrenList.length != 0) {
                    children = childrenList.map((childrenValue) => {
                        return allComponents(childrenValue);
                    });
                }
                return loadComponent(value.$loki, value.name, style, props, value.content, children);
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
        Add: (data, style) => { dispatch(AddElementAction(data, style)) },
        AddStyle: (data) => { dispatch(AddStyleAction(data)) },
        SetStyle: (data) => { dispatch(SetStyleAction(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);