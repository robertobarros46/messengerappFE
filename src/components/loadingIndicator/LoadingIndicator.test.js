import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';


Enzyme.configure({ adapter: new Adapter() });

import LoadingIndicator from './LoadingIndicator';

test('renders correctly', () => {
    const tree = renderer.create(
            <LoadingIndicator />).toJSON();
    expect(tree).toMatchSnapshot();
});