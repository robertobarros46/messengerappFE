import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { LoginForm } from './Signin'
import { Form } from 'antd';
configure({ adapter: new Adapter() });

describe('<Signin />', () => {
    const WrapperLoginForm = Form.create()(LoginForm)

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<WrapperLoginForm />);
    });

    // Create 'snapshot'
    it('+++ render LoginPage correctly, snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    // Check render component without errors
    it('+++ render the DUMB component', () => {
        expect(wrapper.length).toEqual(1);
    });
});