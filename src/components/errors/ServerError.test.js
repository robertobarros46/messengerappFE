import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

Enzyme.configure({ adapter: new Adapter() });

import ServerError from './ServerError';
describe('<ServerError />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ServerError />);
    });

    it('renders', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should have one Link and one Button components', () => {
        expect(wrapper.find(Button, Link)).toHaveLength(1);
    });

    it('test whole content', () => {
        expect(wrapper.contains(
            <div className="server-error-page">
                <h1 className="server-error-title">
                    500
                </h1>
                <div className="server-error-desc">
                    Oops! Algo de inesperado occoreu em nosso servidor. Tente voltar!
                </div>
                <Link to="/"><Button className="server-error-go-back-btn" type="primary" size="large">Go Back</Button></Link>
            </div>
        )).toEqual(true);
    });
});