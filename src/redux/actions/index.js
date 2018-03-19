/**
 * Created by Roy on 2018/3/14.
 */

import { message } from 'antd'
import * as type from '@/actions/types'
import * as http from 'common/js/axios/index'

const HIDDEN_STATUS = new Set(['sys', 'pro', 'api'])

const requestData = category => ({
    type: type.REQUEST_DATA,
    category
})

export const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    data,
    category
})

/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
export const fetchData = ({funcName, params, stateName}) => dispatch => {
    !stateName && (stateName = funcName)
    dispatch(requestData(stateName))
    return http[funcName](params).then(res => {
        if(res.code && res.msg && HIDDEN_STATUS.has(res.status)){
            message.warn(res.msg)
            console.log(' api error : ' + res.msg)
        }
        dispatch(receiveData(res, stateName))
    })
}
