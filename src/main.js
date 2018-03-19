/**
 * Created by Roy on 2018/3/14.
 */

// @flow
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from '@/store'
import CRouter from 'routes'

//公用样式文件
require('./index.css') 
require('common/css/lib/animate.css')
require('common/css/index.less') 
 
// 添加静态文件
import config from 'common/js/config'

// 挂载window信息
window.config 	= config

// 渲染组件
render(
    <Provider store={store} >  
        <CRouter /> 
    </Provider>,
    document.getElementById('app')
)
