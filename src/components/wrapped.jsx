import React from 'react';
const Wrapped = (ElementComponent) => {
    return class extends React.Component {
        constructor(props) {
            super();
        }
        render() {
            return <ElementComponent {...this.props}>{this.props.children}</ElementComponent>
        }
    }
}
const Wrapped1=function(){
    console.log('22')
}
export { Wrapped }