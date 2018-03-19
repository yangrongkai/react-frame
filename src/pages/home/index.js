/**
 * Created by Roy on 2018/3/14.
 */

import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import wrapper from 'components/base/wrapper'

class Home extends React.Component {

    constructor(){
        super()
    }

    componentWillMount() {
    }

    componentDidMount(){
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return ( <div> hello Roy!!!! </div> )
    }

}

export default wrapper({
    id: 'home',
    url: undefined,  // 如果页面初始化需要从服务端获取数据，可以在此配置接口
    data: {},
    subscribeState: {
        'auth': [ 'httpData', 'auth'] 
    },
    subscribeActions: ['receiveData', 'fetchData'],
    component: Home
})
