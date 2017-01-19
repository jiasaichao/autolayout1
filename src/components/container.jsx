import { Common, Global } from '../utils/common';
// import { Icon, Placeholder } from './index';
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
            <div style={styles.root.o}>
                {this.props.children}
            </div>
        );
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
}