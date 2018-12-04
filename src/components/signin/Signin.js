import React, { Component } from 'react';
import './Signin.css';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Button, Icon } from 'antd';
import { doLogin } from '../../store/actions/authActions'
import { connect } from 'react-redux';
const FormItem = Form.Item;

export class Signin extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} {...this.props}/>
                </div>
            </div>
        );
    }
}

export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();   
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                this.props.doLogin(loginRequest, this.props.onLogin)
                this.props.history.push("/");
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: 'Por favor coloque o seu email!' }],
                    })(
                    <Input 
                        prefix={<Icon type="user" />}
                        size="large"
                        name="usernameOrEmail" 
                        placeholder="Email" />    
                    )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Por favor coloque uma senha!' }],
                })(
                    <Input 
                        prefix={<Icon type="lock" />}
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="Senha"  />                        
                )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                    Ou <Link to="/signup">registre agora!</Link>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      reducerState: state
    }
  }
  
const mapDispatchToProps = (dispatch) => {
   return {
       doLogin: (loginRequest, onLogin) => dispatch(doLogin(loginRequest, onLogin)),
   }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));