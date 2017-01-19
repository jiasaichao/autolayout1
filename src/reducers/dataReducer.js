const initialState = [];
const initialState1 = [{
    id: 1,
    name: '',//组建名称
    pid: 0,//父级id
    sort: 1,//排序
    styles: new Map(),
    props: new Map(),
    content: '',//内容
}];
export const DataReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}