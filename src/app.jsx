import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import { Common, Dialog } from './components/index';
import { hashHistory } from 'react-router';
import React from 'react';
import {GetDataAction} from './actions/data'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state={show:false};
    }
    render() {
        return (
            <div id='app'>
                {this.state.show?this.props.children:null}
            </div>
        );
    }    
    componentDidMount() {
        this.props.getDataAction();
        this.setState({show:true});
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




