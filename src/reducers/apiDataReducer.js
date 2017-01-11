import {APIDATA} from '../actions/apiData'

const initialState = [];
const initialState1 = [
    {
        id: 1,
        name:'',
        method:'',
        url:'',
        param:'',
        returnParam:'',        
    }
];
export const apiDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case APIDATA:
            return action.data;
        break;
        default:
            return state;
    }
}