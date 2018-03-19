/**
 * Created by Roy on 2018/3/14.
 */
import axios from 'axios'
import { get, post } from './tools'

const get_api_params = (params) => {
    let data = Object.assign({}, params, {
        flag: 'user',
        api: 'user.customer.login',
        timestamp: 1,
        sign: 'aaaaaa',
    })
    return data
}

export const crm = (params) => {
    let data = get_api_params(params)
    return post({
        url: window.config.baseApi,
        data 
    })
}
