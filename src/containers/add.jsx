import { connect } from 'react-redux';
import React from 'react';
import { AddApiDataAction } from '../actions/apiData'

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
            <div>
                <InputItem label='接口名称' name='namne' />
                <InputItem label='method' name='method' />
                <InputItem label='调用地址' name='url' />
                <InputItem label='请求参数' name='param' />
                <InputItem label='返回参数' name='returnParam' />
                <a href='javascript:;' onClick={() => {
                    this.props.onAdd({
                        name:document.getElementById("namne").value,
                        method:document.getElementById("method").value,
                        url:document.getElementById("url").value,
                        param:document.getElementById("param").value,
                        returnParam:document.getElementById("returnParam").value,
                    });
                } }>添加</a>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        list: state.apiData
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (data) => { dispatch(AddApiDataAction(data)) }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Index);