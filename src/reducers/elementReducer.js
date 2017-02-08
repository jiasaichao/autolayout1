import {ELEMENT} from '../actions/element'
import {STYLE} from '../actions/style'
import {PROPS} from '../actions/props'
const initialState = [];
const initialState1 = [{
    id: 1,
    name: '',//组建名称
    pid: 0,//父级id
    sort:1,
    props: new Map(),
    content: '',//内容
}];
export const ElementReducer = (state = initialState, action) => {
    switch (action.type) {
        case ELEMENT:
            return action.data;
        break;
        default:
            return state;
    }
}
export const StyleReducer = (state = [], action) => {
    switch (action.type) {
        case STYLE:
            return action.data;
        break;
        default:
            return state;
    }
}
export const PropsReducer = (state = [], action) => {
    switch (action.type) {
        case PROPS:
            return action.data;
        break;
        default:
            return state;
    }
}