import { Common, Global } from '../../utils/common';
import { Wrapped } from '../wrapped';
import React from 'react';
let SL = Global.styles;
let CN = Global.className;
/**
 * style
 */
export class Bb extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create({}).merge(this.props.style)
        }
        return (
            <Text  content='22222' />
        );
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
}
export const BbWrapped = Wrapped(Bb);