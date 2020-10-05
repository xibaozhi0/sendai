/*
redux最も中心的な管理オブジェクトstore
 */
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import reducer from './reducer'

//デフォルトでストアを公開する
export default createStore(reducer, applyMiddleware(thunk, logger))