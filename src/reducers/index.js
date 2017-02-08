import {combineReducers} from 'redux';
/**
 * 将路由跳转注定到全局
 */
//import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
// import sidebar from './sidebarReducer';
// import router from './routerReducer';
// import {ConfigReducer} from './configReducer';
import {ElementReducer,StyleReducer,PropsReducer} from './elementReducer';
import {apiDataReducer} from './apiDataReducer';
/**
 * 合并reducers
 */
const index = combineReducers({
  //sidebar,
  // router,
  // routing: routerReducer
    elementList:ElementReducer,
    styleList:StyleReducer,
    apiData:apiDataReducer,
    propsList:PropsReducer
  // config:ConfigReducer
})

export default index;