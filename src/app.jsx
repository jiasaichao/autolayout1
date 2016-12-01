import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import { Common, Dialog } from './components/index';
import { hashHistory } from 'react-router';
import React from 'react';

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
}

let mapStateToProps = (state) => {
    return {
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         requestAppointmentData: (token) => {
//             dispatch(appointmentActions.requestAppointmentData(token));
//         }
//     }
// }
export default connect(mapStateToProps)(App);




