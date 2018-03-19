/**
 * Created by Roy on 2018/3/14.
 */

import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import wrapper from 'components/base/wrapper'

const FormItem = Form.Item

@Form.create({
    onFieldsChange(props, items) {
        // console.log(items)
        // props.cacheSearch(items);
    },
})
class Login extends React.Component {

    constructor(){
        super()
        this.state = {
            error: ''
        }
    }

    componentWillMount() {
        const { receiveData } = this.props
        receiveData(null, 'auth')
    }

    componentDidMount(){
    }

    componentWillReceiveProps(nextProps) {
        const { auth: nextAuth = {} } = nextProps
        const { history } = this.props
        if (nextAuth.data && nextAuth.data.uid) {   // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data))
            history.push('/')
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                let { fetchData } = this.props
                fetchData({
                    funcName: 'crm',
                    params: {
                        username: values.userName,
                        password: values.password,
                    },
                    stateName: 'auth'
                })
            }
        })
    }
    
    gitHub = () => {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin'
    }

    render() {
        const { getFieldDecorator } = this.props.form
        try{
            this.setState({error:this.props.httpData.auth.data.msg})
        } catch(err) {
            console.log('is not error')
        }
        console.log('---->', this.props)
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>React CRM</span>
                    </div>
                    <span>{this.state.error}</span>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="管理员输入admin, 游客输入guest" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="管理员输入admin, 游客输入guest" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <a href="">或 现在就去注册!</a>
                                <a onClick={this.gitHub} ><Icon type="github" />(第三方登录)</a>
                            </p>
                        </FormItem>
                    </Form>
                </div>
            </div>

        )
    }
}

export default wrapper({
    id: 'index',
    url: undefined,  // 如果页面初始化需要从服务端获取数据，可以在此配置接口
    data: {},
    subscribeState: {
        'auth': [ 'httpData', 'auth'] 
    },
    subscribeActions: ['receiveData', 'fetchData'],
    component: Login
})
