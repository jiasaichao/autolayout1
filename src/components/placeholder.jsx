import { Common, Global } from '../utils/common';
import { Icon } from './index';
import { Wrapped } from './wrapped';
import React from 'react';
let SL = Global.styles;
let CN = Global.className;
/**
 * image
 */
export class Placeholder extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create({flex:1}).merge(this.props.style)
        }
        return (
            <div style={styles.root.o}  onClick={this.props.onClick}></div>
        );
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
}
export const PlaceholderWrapped = Wrapped(Placeholder);