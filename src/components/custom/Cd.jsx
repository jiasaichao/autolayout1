import { Common, Global } from '../../utils/common';
import { Wrapped } from '../wrapped';
import { Image,Container,Icon,Text } from '../';
import React from 'react';
let SL = Global.styles;
let CN = Global.className;
/**
 * style
 */
export class Cd extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let styles = {
            root: SL.create({}).merge(this.props.style)
        }
        return (
            <Container >
<Text  content='1234' /><Container >
<Text  content='5678' /><Image  src='image/placeholder.jpg' />
                </Container>
                </Container>
        );
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
}
export const CdWrapped = Wrapped(Cd);