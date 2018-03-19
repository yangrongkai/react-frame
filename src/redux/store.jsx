/**
 * Created by Roy on 2018/3/14.
 */

import { createStore , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '@/reducers'

// 创建 Redux 的 store 对象
export const store = createStore(
    reducers,
    applyMiddleware(thunk)
)
