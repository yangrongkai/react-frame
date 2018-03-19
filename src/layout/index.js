/**
 * Created by Roy on 2018/3/18.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { renderRoutes } from 'react-router-config'
import { Layout, notification, Icon } from 'antd'
import wrapper from 'components/base/wrapper'
import HeaderCustom from 'layout/header-custom'
import SiderCustom from 'layout/sider-custom'
import { fetchData, receiveData } from '@/actions'

const { Content, Footer } = Layout

class App extends Component {

    constructor(props){
        super(props)

        // init state
        this.state = {
            collapsed: false,
        }

        // bind this
        this.toggle = this.toggle.bind(this)
    }

    componentWillMount() {
        const { receiveData } = this.props
        const user = JSON.parse(localStorage.getItem('user'))
        user && receiveData(user, 'auth')
        // receiveData({a: 213}, 'auth')
        // fetchData({funcName: 'admin', stateName: 'auth'})
        this.getClientWidth()
        window.onresize = () => {
            console.log('屏幕变化了')
            this.getClientWidth()
            // console.log(document.body.clientWidth)
        }
    }

    componentDidMount() {
        const openNotification = () => {
            notification.open({
                message: '博主-Roy',
                description: (
                    <div>
                        <p>
                            GitHub地址： <a href="https://github.com/yangrongkai" target="_blank" rel="noopener noreferrer">https://github.com/yezihaohao</a>
                        </p>
                        <p>
                            博客地址： <a href="https://yangrongkai.github.io/" target="_blank" rel="noopener noreferrer">https://yezihaohao.github.io/</a>
                        </p>
                    </div>
                ),
                icon: <Icon type="smile-circle" style={{ color: 'red' }} />,
                duration: 0,
            })
            localStorage.setItem('isFirst', JSON.stringify(true))
        }
        const isFirst = JSON.parse(localStorage.getItem('isFirst'))
        !isFirst && openNotification()
    }

    getClientWidth() {    // 获取当前浏览器宽度并设置responsive管理响应式
        const { receiveData } = this.props
        const clientWidth = document.body.clientWidth
        console.log(clientWidth)
        receiveData({isMobile: clientWidth <= 992}, 'responsive')
    }

    toggle() {
        console.log(this)
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    render() {
        // console.log(this.props.auth)
        // console.log(this.props.responsive)
        const { auth, responsive, route} = this.props
        console.log(this.props)
        return (
            <Layout>
                {!responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed} />}
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}} />
                    <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                        {renderRoutes(route.routes)}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                    React-Crm ©2018 Created by XXXXXXXX
                    </Footer>
                </Layout>
                
                {
                    responsive.data.isMobile && (   // 手机端对滚动很慢的处理
                        <style>
                            {`
                                #root{
                                    height: auto
                                }
                            `}
                        </style>
                    )
                }
            </Layout>
        )
    }
}

export default wrapper({
    id: 'app',
    url: undefined,
    data: {},
    subscribeState: {
        'responsive': 'httpData',
        'auth': 'httpData'
    },
    subscribeActions: ['receiveData', 'fetchData'],
    component: App 
})
