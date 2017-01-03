import {combineReducers} from 'redux';
/**
 * 将路由跳转注定到全局
 */
//import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
// import sidebar from './sidebarReducer';
// import router from './routerReducer';
// import {ConfigReducer} from './configReducer';
import {DataReducer} from './dataReducer';
import {apiDataReducer} from './apiDataReducer';
/**
 * 合并reducers
 */
const index = combineReducers({
  //sidebar,
  // router,
  // routing: routerReducer
    data:DataReducer,
    apiData:apiDataReducer
  // config:ConfigReducer
})

export default index;