import { Common, Global } from '../utils/common';
import { Icon, Placeholder } from './index';
import React from 'react';
let SL = Global.styles;
let CN = Global.className;
/**
 * text
 */
export class Text extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create({}).merge(this.props.style)
        }
        return (
            <span style={styles.root.o} onClick={this.props.onClick}>
                {this.props.children}
            </span>
        );
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
}