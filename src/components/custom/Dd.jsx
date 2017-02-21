import { Common, Global } from '../../utils/common';
import { Wrapped } from '../wrapped';
import React from 'react';
let SL = Global.styles;
let CN = Global.className;
/**
 * style
 */
export class Dd extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create({}).merge(this.props.style)
        }
        return (
            <Container >
<Text  content='5678' /><Image  src='image/placeholder.jpg' />
                </Container>
        );
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
}
export const DdWrapped = Wrapped(Dd);