import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { getUsers, deleteOneUser } from '../../store/actions/userActions'
import { connect } from 'react-redux';


export class UserList extends Component {
    constructor(props) {
        super(props);
        this.loadAllUsers = this.loadAllUsers.bind(this);
        this.onChange = this.onChange.bind(this);
        this.remove = this.remove.bind(this);
    }

    loadAllUsers(page, size) {
        this.props.getUsers(page, size);
    }

    remove(id, email) {
        this.props.deleteUser(email, id)
    }

    onChange(page, pageSize) {
        this.props.getUsers(page-1, pageSize);
    }

    componentWillMount() {
        let page = 0;
        let size = 10;
        this.loadAllUsers(page, size);
    }

    render() {
        const data = [];
        let users = [];
        if(this.props.reducerState.users){
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
        getUsers: (page, size) => dispatch(getUsers(page, size)),
        deleteUser: (email, id) => dispatch(deleteOneUser(email, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);