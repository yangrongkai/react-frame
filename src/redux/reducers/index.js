/**
 * Created by Roy on 2018/3/14.
 */

import { combineReducers } from 'redux'
import * as type from '@/actions/types'

const handleData = (state = {isFetching: true, data: {}}, action) => {
    switch (action.type) {
    case type.REQUEST_DATA:
        return {...state, isFetching: true}
    case type.RECEIVE_DATA:
        return {...state, isFetching: false, data: action.data}
    default:
        return {...state}
    }
}

const httpData = (state = {}, action) => {
    switch (action.type) {
    case type.RECEIVE_DATA:
    case type.REQUEST_DATA:
        return {
            ...state,
            [action.category]: handleData(state[action.category], action)
        }
    default:
        return {...state}
    }
}

export default combineReducers({
    httpData,
})
