import { connect } from 'react-redux';
import React from 'react';

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
        this.state={
            body:''
        };
    }
    render() {
        let styles = {
        }
        return (
            <div style={{ display: 'flex' }}>
               {this.props.list.map((value)=>{
                   return (
                       <div>
                       <span>{value.name}</span>
                       <span>{value.method}</span>
                       <span>{value.url}</span>
                       <span>{value.param}</span>
                       </div>
                   );
               })}
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        list:state.apiData
    }
}

export default connect(mapStateToProps)(Index);