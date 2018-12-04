import React, { Component } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { createUser } from '../../store/actions/userActions'
import axios from '../../utils/axios/axios'
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

export class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: {
                value: ''
            },
            sobrenome: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const signupRequest = {
            nome: this.state.nome.value,
            sobrenome: this.state.sobrenome.value,
            email: this.state.email.value,
            password: this.state.password.value,
            role: "USER"
        };
        this.props.createUser(signupRequest);
        this.props.history.push('/login');
    }

    isFormInvalid() {
        return !(this.state.nome.validateStatus === 'success' &&
            this.state.sobrenome.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Sign Up</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem 
                            label="Nome"
                            validateStatus={this.state.nome.validateStatus}
                            help={this.state.nome.errorMsg}>
                            <Input 
                                size="large"
                                name="nome"
                                autoComplete="off"
                                placeholder="Seu primeiro nome"
                                value={this.state.nome.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />    
                        </FormItem>
                        <FormItem 
                            label="Sobrenome"
                            validateStatus={this.state.sobrenome.validateStatus}
                            help={this.state.sobrenome.errorMsg}>
                            <Input 
                                size="large"
                                name="sobrenome" 
                                autoComplete="off"
                                placeholder="Seu segundo nome"
                                value={this.state.sobrenome.value}
                                onChange={(event) => this.handleInputChange(event, this.validateSobrenome)} />    
                        </FormItem>
                        <FormItem 
                            label="Email"
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input 
                                size="large"
                                name="email" 
                                type="email" 
                                autoComplete="off"
                                placeholder="Seu email"
                                value={this.state.email.value} 
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)} />    
                        </FormItem>
                        <FormItem 
                            label="Senha"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input 
                                size="large"
                                name="password" 
                                type="password"
                                autoComplete="off"
                                placeholder="Um senha entre 6 e 20 caractéres" 
                                value={this.state.password.value} 
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)} />    
                        </FormItem>
                        <FormItem>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-form-button"
                                disabled={this.isFormInvalid()}>Sign up</Button>
                            Já é membro? <Link to="/login">Faça login!</Link>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    // Validation Functions

    validateName(nome) {
        if(nome.length < 4) {
            return {
                validateStatus: 'error',
                errorMsg: `Nome é muito curto (Mínimo ${4} caractéres necessarios.)`
            }
        } else if (nome.length > 40) {
            return {
                validationStatus: 'error',
                errorMsg: `Nome é muito longo (Máximo ${40} caractéres permitidos.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    validateEmail (email) {
        if(!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email não pode estar vazio'                
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email não é válido'
            }
        }

        if(email.length > 40) {
            return {
                validateStatus: 'error',
                errorMsg: `Email é muito longo (Máximo ${40} caractéres permitidos)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validateSobrenome (sobrenome) {
        if(sobrenome.length < 3) {
            return {
                validateStatus: 'error',
                errorMsg: `Sobrenome é muito curto (Mínimo ${3} caractéres necessarios.)`
            }
        } else if (sobrenome.length > 20) {
            return {
                validationStatus: 'error',
                errorMsg: `Sobrenome é muito longo (Máximo ${20} caractéres permitidos.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if(emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });    
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        axios({
            method: 'get',
            url: "/api/v1/users/emailavailability?email=" + emailValue
        })
        .then(response => {
            if(response.data.available) {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'error',
                        errorMsg: 'Email indisponível'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: error.message
                }
            });
        });
    }

    validatePassword (password) {
        if(password.length < 6) {
            return {
                validateStatus: 'error',
                errorMsg: `Senha é muito curta (Mínimo ${6} caractéres necessarios.)`
            }
        } else if (password.length > 20) {
            return {
                validationStatus: 'error',
                errorMsg: `Senha é muito longa (Máximo ${20} caractéres permitidos.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (user) => dispatch(createUser(user))
    }
}

export default connect(null, mapDispatchToProps)(Signup);