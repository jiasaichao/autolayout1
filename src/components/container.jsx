import { Common, Global } from '../utils/common';
import { Wrapped } from './wrapped';
import React from 'react';
let SL = Global.styles;
let CN = Global.className;
/**
 * 页面容器
 * style
 */
export class Container extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create({}).merge(this.props.style)
        }
        return (
            <div style={styles.root.o} onClick={this.click}>
                {this.props.children}
            </div>
        );
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    click = (e) => {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }
}
export const ContainerWrapped = Wrapped(Container);