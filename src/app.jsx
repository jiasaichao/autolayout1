import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import { Common, Dialog } from './components/index';
import { hashHistory } from 'react-router';
import React from 'react';
import {GetDataAction} from './actions/apiData'

class App extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }    
    componentDidMount() {
        this.props.getDataAction();
    }
}

let mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDataAction: () => {
            dispatch(GetDataAction());
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);




