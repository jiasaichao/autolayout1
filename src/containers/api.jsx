//import {Header, Sidebar,  NavigationBar, NavigationBarItem,NavBar,List,Container} from "../components/index";
import { connect } from 'react-redux';
import React from 'react';
import List from "./list";
import { hashHistory, browserHistory } from 'react-router';

const path = window.require('http');
function InputItem({ name, label }) {
    return (
        <div style={{ display: 'flex' }}>
            <label>{label}</label>
            <input id={name} type="text" />
        </div>
    );
}
class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: ''
        };
    }
    render() {
        let styles = {
        }
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ width: 200 }}>
                    <a style={{ display: 'flex' }} href='javascript:;' onClick={() => {
                        hashHistory.push('/');
                    } }>接口列表</a>
                    <a style={{ display: 'flex' }} href='javascript:;' onClick={() => {
                        hashHistory.push('add');
                    } }>添加接口</a>
                </div>
                <div style={{ flex: 1 }}>
                    {this.props.children || <List />}
                </div>
            </div>
        )
    }
}
let Index1 = React.createClass({
    render: function () {
        let styles = {
            inputItem: {
                display: 'flex'
            }
        }
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ width: 700 }}>
                    <InputItem label='接口名称' name='name' />
                    <InputItem label='method' name='method' />
                    <InputItem label='调用地址' name='url' />
                    <InputItem label='请求参数' name='param' />
                    <a href='javascript:;' onClick={() => {
                        let vvv = path;
                        let options = {
                            hostname: 'www.baidu.com',
                            //port: 80,
                            //path: '/pay/pay_callback?' + content,
                            method: 'GET'
                        };
                        let req = vvv.request(options, function (res) {
                            //debugger;
                            console.log('res', res);
                            // console.log('STATUS: ' + res.statusCode);
                            // console.log('HEADERS: ' + JSON.stringify(res.headers));
                            res.setEncoding('utf8');
                            res.on('data', function (chunk) {
                                console.log('BODY: ' + chunk);
                            });
                        });
                        req.on('error', function (e) {
                            //debugger;
                            console.log('problem with request: ' + e.message);
                        });
                        req.end();
                        debugger;
                    } }>发送</a>
                </div>
                <div style={{ flex: 1 }}>
                    <h2>Response Header</h2>
                    <pre></pre>
                    <h2>Response Body</h2>
                    <pre></pre>
                </div>
            </div>
        )
    }
})
let mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Index);