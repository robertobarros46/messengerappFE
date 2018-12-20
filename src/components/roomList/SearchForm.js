import React, { Component } from 'react';
import { Button, Input, Icon, Form } from 'antd';
import './RoomList.css';

const FormItem = Form.Item;

export class Search extends Component {
    render() {
        console.log(this.props);
        const AntWrappedSearchForm = Form.create()(SearchForm)
        return (
            <div>
                <AntWrappedSearchForm onSubmit={this.props.onSubmit} onHandleInputChange={this.props.onHandleInputChange} content={this.props.content} />
            </div>
        );
    }
}


export class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emitter: {
                value: ''
            },
            receptor: {
                value: ''
            },
            content: {
                value: ''
            }
        }
    }

    render() {
        return (
            <Form layout="inline" onSubmit={this.props.onSubmit} className="login-form">
                <FormItem>
                    <Input name="emitter" prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Emissor" onChange={(event) => this.props.onHandleInputChange(event)} />
                </FormItem>
                <FormItem>
                    <Input name="receptor" prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Receptor" onChange={(event) => this.props.onHandleInputChange(event)} />
                </FormItem>
                {this.props.content && (
                    <FormItem>
                        <Input name="content" prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Content" onChange={(event) => this.props.onHandleInputChange(event)} />
                    </FormItem>
                )}
                <FormItem>
                    <Button icon="search" type="primary" htmlType="submit" className="login-form-button">
                        Procurar
                        </Button>
                </FormItem>
            </Form>
        )
    }
}