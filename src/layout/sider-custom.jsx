/**
 * Created by Roy on 2018/3/18.
 */

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import wrapper from 'components/base/wrapper'
import SiderMenu from 'layout/sider-menu'
import { menus } from '../constants/menus'

const { Sider } = Layout

class SiderCustom extends Component {

    constructor(props){
        super(props)

        // init state
        this.state = {
            collapsed: false,
            mode: 'inline',
            openKey: '',
            selectedKey: '',
            firstHide: true,        // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
        }

        // bind this
        // this.setMenuOpen = this.setMenuOpen.bind(this)
        this.menuClick = this.menuClick.bind(this)
        this.openMenu = this.openMenu.bind(this)
    }

    componentDidMount() {
        this.setMenuOpen(this.props)
    }
    
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.onCollapse(nextProps.collapsed)
        this.setMenuOpen(nextProps)
    }

    setMenuOpen(props){
        const { pathname } = props.location
        this.setState({
            openKey: pathname.substr(0, pathname.lastIndexOf('/')),
            selectedKey: pathname
        })
    }
    
    onCollapse(collapsed){
        console.log(collapsed)
        this.setState({
            collapsed,
            firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        })
    }

    menuClick(e){
        this.setState({
            selectedKey: e.key
        })
        console.log(this.state)
        const { popoverHide } = this.props     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide()
    }

    openMenu(v){
        console.log(v)
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    }

    render() {
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={this.props.collapsed}
                style={{ overflowY: 'auto' }}
            >
                <div className="logo" />
                <SiderMenu
                    menus={menus}
                    onClick={this.menuClick}
                    theme="dark"
                    mode="inline"
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={this.state.firstHide ? null : [this.state.openKey]}
                    onOpenChange={this.openMenu}
                />
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${this.state.collapsed ? '70px' : '206px'}
                        right: 0 !important
                    }
                    `}
                </style>
            </Sider>
        )
    }

}

export default withRouter(wrapper({
    id: 'SiderCustom',
    url: undefined,
    data: {},
    subscribeState: {
    },
    subscribeActions: ['receiveData', 'fetchData'],
    component: SiderCustom 
}))
