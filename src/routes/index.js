/**
 * Created by Roy on 2018/3/14.
 * Updated by Roy on 2018/3/18.
 */

import 'babel-polyfill'
import React, { Component } from 'react'
import { 
    BrowserRouter as Router,
    Link
} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import asyncComponent from 'components/codesplitting/AsyncComponent'
import layout from 'layout'
import Home from 'pages/home'

// 合并路由
const routes = [
    {
        path: '/login',
        component: asyncComponent(() => import('pages/login'))
    },
    {
        component: layout,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            },
        ]
    }
    // ...require('pages/user/router')
]

export default class CRouter extends Component {

    constructor(props, context) {
        super(props, context)
    }

    requireAuth(permission, component){
        /*
        const { auth } = this.props;
        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        return component;
        */
    }
 
    render() {
        return (
            <Router>
                {renderRoutes(routes)}
            </Router>
        )
    }   

} 
