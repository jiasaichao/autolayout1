//import {Header, Sidebar,  NavigationBar, NavigationBarItem,NavBar,List,Container} from "../components/index";
import { connect } from 'react-redux';
import React from 'react';
import ReactDom from 'react-dom';
import { ContainerWrapped, TextWrapped, IconWrapped, ImageWrapped } from '../components/index';
import { AddElementAction, RemoveElementAndChildAction, GetElementAction } from '../actions/element';
import { AddStyleAction, SetStyleAction, RemoveStyleAction, GetStyleAction } from '../actions/style';
import { AddComponentAction, SetComponentAction, RemoveComponentAction, GetComponentAction, BuildComponentAction } from '../actions/component';
import { SetPropsAction, GetPropsAction } from '../actions/props';
import { defaultStyle, defaultProps, commonContainerStyle } from '../data/defaultStyle';
import { Common } from '../utils/common';
import { renderToStaticMarkup } from 'react-dom/server';
import { htmlFormat } from '../utils/htmlformat';

let loadComponent = function (id, name, style, props, children) {
    switch (name) {
        case 'Container':
            return <ContainerWrapped key={id} style={style} {...props}>{children}</ContainerWrapped>;
        case 'Text':
            return <TextWrapped key={id} style={style} {...props} />;
        case 'Image':
            return <ImageWrapped key={id} style={style} {...props} />;
        case 'Icon':
            return <IconWrapped key={id} style={style} {...props} />;
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
            {NavContent(0)}
        </div>
    );
}
/**
 * 选中元素的遮罩
 * onDelete 删除这个元素
 */
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
            },
            del: {
                position: 'absolute',
                top: -7,
                right: 0,
                border: '1px solid #ff6666',
                width: 15,
                height: 15,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#f66'
            }
        }
        return (
            <div
                style={styles.root}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {this.props.onDelete ? <div style={styles.del} onClick={this.props.onDelete}>x</div> : null}
            </div>
        );
    }
}

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            /** 选中的要添加类型名称 */
            active: 'Container',
            /** 选中的元素的id */
            activeElement: 0,
        };
    }
    render() {
        if (this.state.activeElement == 0) {
            return <div></div>;
        }
        let {styleList, elementList, propsList} = this.props;
        let activeElement = elementList.find((val) => val.$loki == this.state.activeElement);
        propsList = propsList.filter((value) => value.elementId == this.state.activeElement);//选中元素的属性
        let defalutPropsList = defaultProps[activeElement.name];
        let styles = {
            add: { cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '26px', paddingLeft: '8px', paddingRight: '8px' },
            nav: { paddingLeft: 10 }
        }
        return (
            <div>
                <div style={{ display: 'flex', height: 50 }}></div>
                <div style={{ display: 'flex', overflow: 'auto' }}>
                    <div style={{ width: 315 }}>
                        <div>
                            <h2>Nav</h2>
                            <div style={{ display: 'flex' }}>
                                <Nav elementList={elementList} active={this.state.activeElement} setActive={(id) => { this.setState({ activeElement: id }) }} />
                            </div>
                        </div>
                        <div>
                            <h2>Base Components</h2>
                            <div style={{ display: 'flex' }}>
                                <ComponentType active={this.state.active == 'Container'} text='容器' onClick={() => { this.setState({ active: 'Container' }) }} />
                                <ComponentType active={this.state.active == 'Text'} text='文字' onClick={() => { this.setState({ active: 'Text' }) }} />
                                <ComponentType active={this.state.active == 'Image'} text='图片' onClick={() => { this.setState({ active: 'Image' }) }} />
                                <ComponentType active={this.state.active == 'Icon'} text='Icon' onClick={() => { this.setState({ active: 'Icon' }) }} />
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
                            {this.state.activeElement ? <ActiveElement ref={e => this.activeElement = e} onDelete={activeElement.pid == 0 ? false : () => {
                                this.delElementAndChild();
                            }} /> : null}
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
                                {styleList.filter(style => style.elementId == this.state.activeElement).map((style) => <div key={style.$loki}><label htmlFor="">{style.name}</label>
                                    <input ref={(node) => this['inputStyl' + style.$loki] = node}
                                        onBlur={() => { style.value = this['inputStyl' + style.$loki].value; this.editStyle(style) }}
                                        type="text"
                                        defaultValue={style.value} />
                                    <a href="javascript:;" onClick={() => { this.props.DelStyle(style.$loki) }}>del</a>
                                </div>)}
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
                        <div>
                            <div>common style</div>
                            <div>
                                {commonContainerStyle.map((style, index) => <div key={style.name}>
                                    <label htmlFor="">{style.name}:</label>
                                    <label htmlFor="">{style.defaultValue}</label>
                                    <a href="javascript:;" onClick={() => {
                                        if (!!this.state.activeElement) {
                                            this.props.AddStyle({
                                                name: style.name,
                                                value: style.defaultValue,
                                                elementId: this.state.activeElement
                                            });
                                        }
                                    }}>add</a>
                                </div>)}
                            </div>
                        </div>
                        <div>
                            <div>props</div>
                            <div>
                                {defalutPropsList.map((val) => {
                                    let lokiData = propsList.find((props) => props.name == val.name);
                                    return (
                                        <div key={val.name}>
                                            <label htmlFor="">{val.name}</label>
                                            <input type="text"
                                                ref={(node) => this['inputProps' + val.$loki] = node}
                                                onBlur={() => { lokiData.value = this['inputProps' + val.$loki].value; this.editProps(lokiData) }}
                                                defaultValue={lokiData.value} />
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        </div>
                        <div>
                            <div>set to component</div>
                            <div>
                                <div><label htmlFor="">name</label><input ref={node => this.componentName = node} type="text" /></div>
                                <div><a href='javascript:;' onClick={() => {
                                    this.props.AddComponent({ name: this.componentName.value, elementId: activeElement.$loki, type: 'normal', containerId: 0 });
                                }}>set</a>
                                    <a href="javascript:;" onClick={() => {
                                        this.props.BuildComponentAction();
                                    }}>BuildComponent</a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>code</div>
                            <div>
                                <div><a href='javascript:;' onClick={this.addStyle}>code</a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <pre>
                        <code>
                            {htmlFormat(renderToStaticMarkup(<div>{this.components()}</div>))}
                        </code>
                    </pre>
                </div>
            </div>
        )
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.activeElement == 0) {
            this.setState({ activeElement: this.props.elementList[0].$loki });
        }
        if (this.state.activeElement) {
            let activeElement = ReactDOM.findDOMNode(this.refs[this.state.activeElement]);
            let point = Common.getAbsPoint(activeElement);
            let appContainerPoint = Common.getAbsPoint(ReactDOM.findDOMNode(this.appContainer));
            point.x -= appContainerPoint.x;
            point.y -= appContainerPoint.y;
            this.activeElement.setState({ top: point.y, left: point.x, width: activeElement.offsetWidth, height: activeElement.offsetHeight });
        }
    }
    componentDidMount() {
        this.props.GetAllData();
        //this.children();
    }
    getActiveElement = () => {
        return this.props.elementList.find((val) => val.$loki == this.state.activeElement);
    }
    next = () => {
        if (!!this.state.active) {
            let el = this.getActiveElement();
            this.props.Add({
                name: this.state.active,
                pid: el.pid,
                sort: el.sort + 1,
            }, defaultStyle[this.state.active], defaultProps[this.state.active]);

        }
    }
    children = () => {
        if (!!this.state.active) {
            this.props.Add({
                name: this.state.active,
                pid: this.state.activeElement,
            }, defaultStyle[this.state.active], defaultProps[this.state.active]);
        }
    }
    delElementAndChild = () => {
        this.props.DelElementAndChild(this.state.activeElement);
        this.setState({ activeElement: this.props.elementList[0].$loki });
    }
    prev = () => {
        if (!!this.state.active) {
            let el = this.getActiveElement();
            this.props.Add({
                name: this.state.active,
                pid: el.pid,
                sort: el.sort,
            }, defaultStyle[this.state.active], defaultProps[this.state.active]);
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

    editStyle = (style) => {
        this.props.SetStyle(style)
    }
    editProps = (props) => {
        this.props.SetProps(props)
    }
    components = () => {
        let {elementList, styleList, propsList} = this.props;
        let allComponents = (data) => {
            if (!(data instanceof Array)) {
                data = [data];
            }
            return data.map((value) => {
                let children = null;
                let childrenList = elementList.filter(childrenVal => childrenVal.pid == value.$loki);
                let currentStyleList = styleList.filter(currentStyleVal => currentStyleVal.elementId == value.$loki);
                let style = {};
                let props = {};
                propsList.filter((vp) => vp.elementId == value.$loki).forEach((vp) => {
                    props[vp.name] = vp.value;
                });
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
                return loadComponent(value.$loki, value.name, style, props, children);
            });
        }
        return allComponents(elementList.filter(value => value.pid == 0));
    }
}
let mapStateToProps = (state) => {
    return {
        elementList: state.elementList,
        styleList: state.styleList,
        propsList: state.propsList,
        componentList: state.componentList
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        Add: (data, style, props) => { dispatch(AddElementAction(data, style, props)) },
        DelElementAndChild: (data) => { dispatch(RemoveElementAndChildAction(data)) },
        AddStyle: (data) => { dispatch(AddStyleAction(data)) },
        SetStyle: (data) => { dispatch(SetStyleAction(data)) },
        SetProps: (data) => { dispatch(SetPropsAction(data)) },
        DelStyle: (id) => { dispatch(RemoveStyleAction(id)) },
        AddComponent: (data) => { dispatch(AddComponentAction(data)) },
        BuildComponentAction: (data) => { dispatch(BuildComponentAction()) },
        GetAllData: (data) => { GetComponentAction(dispatch), GetElementAction(dispatch), GetStyleAction(dispatch), GetPropsAction(dispatch) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);