import React from 'react';
import  { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router'
import { Link } from 'react-router-dom';
import { Button } from 'antd';


configure({ adapter: new Adapter() });

import NotFound from './NotFound';
describe('<NotFound />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NotFound />);
    });

    it('renders', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should render Not found component', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should have one Link and one Button components', () => {
        expect(wrapper.find(Button, Link)).toHaveLength(1);
    });

    it('test whole content', () => {
        expect(wrapper.contains(
            <div className="page-not-found">
                <h1 className="title">
                    404
                </h1>
                <div className="desc">
                    A página que você esta procurando não existe.
                </div>
                <Link to="/"><Button className="go-back-btn" type="primary" size="large">Go Back</Button></Link>
            </div>
        )).toEqual(true);
    });
})