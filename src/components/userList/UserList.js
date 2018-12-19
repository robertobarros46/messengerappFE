import React, { Component } from 'react';
import { Table, Button, Input, Icon, Form } from 'antd';
import { getUsers, deleteOneUser } from '../../store/actions/userActions'
import { connect } from 'react-redux';
import './UserList.css';

const FormItem = Form.Item;



export class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            lastName: {
                value: ''
            }
        }
        this.loadAllUsers = this.loadAllUsers.bind(this);
        this.onChange = this.onChange.bind(this);
        this.remove = this.remove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    loadAllUsers(name, lastName, page, size) {
        this.props.getUsers(name, lastName, page, size);
    }

    remove(id, email) {
        this.props.deleteUser(email, id)
    }

    onChange(page, pageSize) {
        this.props.getUsers(this.state.name.value, this.state.lastName.value, page - 1, pageSize);
    }

    componentWillMount() {
        let page = 0;
        let size = 8;
        this.loadAllUsers("", "", page, size);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue
            }
        });
    }

    handleSubmit = (e) => {
        let page = 0;
        let size = 8;
        e.preventDefault();
        console.log(this.state);
        this.loadAllUsers(this.state.name.value, this.state.lastName.value, page, size);
    }

    render() {
        const data = [];
        let users = [];
        if (this.props.reducerState.users) {
            users = this.props.reducerState.users;
        }

        for (let i = 0; i < users.length; i++) {
            data.push({
                key: users[i].id,
                name: users[i].name,
                email: users[i].email,
                role: users[i].role
            })
        }

        const columns = [{
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: 'Privilégio',
            dataIndex: 'role',
            key: 'role',
        }, {
            title: '',
            dataIndex: '',
            key: 'delete',
            render: (record) => {
                if (record.role === "ADMIN") {
                    return (
                        <Button type="danger" onClick={() => this.remove(record.key, record.email)} disabled>delete</Button>
                    )
                } else {
                    return (
                        <Button type="danger" onClick={() => this.remove(record.key, record.email)}>delete</Button>
                    )
                }
            }
        }];

        // if(isLoading) {
        //     return <LoadingIndicator />;
        // }

        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        <Input name="name" prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nome" onChange={(event) => this.handleInputChange(event)} />
                    </FormItem>
                    <FormItem>
                        <Input name="lastName" prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Sobrenome" onChange={(event) => this.handleInputChange(event)} />
                    </FormItem>
                    <FormItem>
                        <Button  icon="search" type="primary" htmlType="submit" className="login-form-button">
                            Procurar
                        </Button>
                    </FormItem>
                </Form>



                <Table dataSource={data} columns={columns} pagination={
                    {
                        pageSize: this.props.reducerState.size,
                        onChange: this.onChange,
                        total: this.props.reducerState.totalElements
                    }
                } />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reducerState: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: (name, lastName, page, size) => dispatch(getUsers(name, lastName, page, size)),
        deleteUser: (email, id) => dispatch(deleteOneUser(email, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);