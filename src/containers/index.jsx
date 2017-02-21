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
import Creator from './creator';
import {hashHistory, browserHistory} from 'react-router';

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
        console.log('33333333',this.props.children);
        return (
            <div>
                <div style={{ display: 'flex', height: 50 }}>
                    <div>
                        <a onClick={()=>{
                        hashHistory.push('/creator');
                        }} href='javascript:;'>page</a>
                        <a onClick={()=>{
                        hashHistory.push('/component');
                        }} href='javascript:;'>组件管理</a>
                        </div>
                </div>
                <div>
                    {this.props.children || <Creator />}
                </div>
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return {
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);