import { Common, Global } from '../utils/common';
import { Icon, Placeholder } from './index';
import { Wrapped } from './wrapped';
import React from 'react';
let SL = Global.styles;
let CN = Global.className;
/**
 * image
 */
export class Image extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create({}).merge(this.props.style)
        }
        return (
            <img style={styles.root.o} src={this.props.src} onClick={this.props.onClick} />
        );
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
}
export const ImageWrapped = Wrapped(Image);