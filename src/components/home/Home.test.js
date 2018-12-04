import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';
import { Home } from './Home'
configure({ adapter: new Adapter() });

describe('<Home />', () => {

    let wrapper;
    const reducerState = {
        user: {
            users: []
        },
        chat: {
            chats: []
        },
        auth: {
            currentUser: null
        }

    }
    beforeAll(() => {
        Home.prototype.componentWillMount = () => {
        };

        Home.prototype.componentDidUpdate = () => {
        };
    });

    beforeEach(() => {
        wrapper = shallow(<Home reducerState={reducerState} />);
    });


    it('renders', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('Should show header and link if user is not authenticated', () => {
        wrapper.setProps({
            reducerState: {
                user: {
                    users: []
                },
                chat: {
                    chats: []
                },
                auth: {
                    currentUser: null
                }
            }
        });
        expect(wrapper.contains(
            <div className="home-container">
                <h1>Messenger App</h1>
                <div className="signup">Vire Membro
                    <Link to="/signup"> agora!</Link>
                </div>
            </div>
        )).toEqual(true);
    });

    it('Should contain on button, Table and Drawer, with table inside it, if user is authenticated', () => {
        wrapper.setProps({
            reducerState: {
                user: {
                    users: []
                },
                chat: {
                    chats: []
                },
                auth: {
                    currentUser: {
                        id: "dsa3d4a65d4a65d1a65s1f65",
                        email: "teste@gmail.com.br",
                        name: "test",
                        authorities: [{
                            authority: "ROLE_ADMIN"
                        }]
                    }
                }
            }
        });
        expect(wrapper.find("Button")).toHaveLength(1);
        expect(wrapper.find("Drawer")).toHaveLength(1);
        expect(wrapper.find("Table")).toHaveLength(2);
    });
});

