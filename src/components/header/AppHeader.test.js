import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AppHeader } from './AppHeader'
import { Menu } from 'antd';

configure({ adapter: new Adapter() });

describe('<AppHeader />', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<AppHeader location={() => { }} />);
    });

    it('renders', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should have Login and Signup buttons if user is not authenticated', () => {
        wrapper.setProps({
            currentUser: null
        })
        expect(wrapper.find(Menu.Item)).toHaveLength(2);
    })

    it('should have 3 menu itens if user authenticated and has ROLE_ADMIN', () => {
        wrapper.setProps({
            currentUser: {
                id: "dsa3d4a65d4a65d1a65s1f65",
                email: "teste@gmail.com.br",
                name: "test",
                authorities: [{
                    authority: "ROLE_ADMIN"
                }]
            }
        })
        expect(wrapper.find(Menu.Item)).toHaveLength(3);
    })

    it('should have 2 menu itens if user authenticated and has ROLE_USER', () => {
        wrapper.setProps({
            currentUser: {
                id: "dsa3d4a65d4a65d1a65s1f65",
                email: "teste@gmail.com.br",
                name: "test",
                authorities: [{
                    authority: "ROLE_USER"
                }]
            }
        })
        expect(wrapper.find(Menu.Item)).toHaveLength(2);
    });
})
