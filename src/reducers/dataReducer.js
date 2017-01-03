const initialState = [
    {
        id:1,
        components:'',
        pid:0,
}
];
const initialState1 = {
    components:{
        name:'',
        props:[{name:'',value:''}],
        children:{
            
        }
    }
};
export const DataReducer = (state=initialState, action)=>{
  switch(action.type){
    default:
      return state
  }
}