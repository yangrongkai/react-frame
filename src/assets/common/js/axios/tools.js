/**
 * Created by Roy on 2018/3/15.
 * http通用工具函数
 */

import qs from 'qs'
import axios from 'axios'
import { message } from 'antd'

/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const get = ({url, msg = '接口异常', headers}) =>
    axios.get(url, headers).then(res => res.data).catch(err => {
        console.log(err)
        message.warn(msg)
    })

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const post = ({url, data, msg = '接口异常', headers}) => {
    let request_data = qs.stringify(data)
    return axios.post(url, request_data, headers).then(res => res.data).catch(err => {
        console.log(err)
        message.warn(msg)
    })
}
