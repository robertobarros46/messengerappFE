import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UserList } from './UserList'
configure({ adapter: new Adapter() });


describe('<UserList />', () => {
    let wrapper;

    const props = {
         getUsers: () => {},
         reducerState: {
            users: []
         }
    };

    beforeEach(() => {
        wrapper = shallow(<UserList {...props}/>);
    });

    it('renders', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('Tehre should be a table with users', () => {
        expect(wrapper.find("Table")).toHaveLength(1);
    });
});