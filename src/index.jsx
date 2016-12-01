
import ReactDom from 'react-dom';

import appRootComponent from "./routers";
ReactDOM.render(appRootComponent, document.getElementById('app'));

//interface IAppProps extends React.Props<App1> {
//}
//class App1 extends React.Component<IAppProps, {}>{
//    render() {
//        return (<div style={{ height: '100%' }}>{this.props.children}</div>);
//    }

//}
//ReactDOM.render(<App1></App1>, document.getElementById('app'));