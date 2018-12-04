import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Profile } from './Profile'
configure({ adapter: new Adapter() });

describe('<Profile />', () => {
    let wrapper;
    const reducerState = {
        user: {
            user: {
                name: 'Test',
                email: 'test.test@gmail.com.br'
            },
            isLoading: false,
            notFound: false,
            serverError: false

        }
    }

    beforeAll(() => {
        Profile.prototype.componentWillMount = () => {
        };

        Profile.prototype.componentDidUpdate = () => {
        };
    });

    beforeEach(() => {
        wrapper = shallow(<Profile reducerState={reducerState} />);
    });

    it('renders', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('Should show LoadingIndicator if is loading state is true', () => {
        wrapper.setProps({
            reducerState: {
                user: {
                    user: null,
                    isLoading: true,
                    notFound: false,
                    serverError: false

                }
            }
        });
        expect(wrapper.find("LoadingIndicator")).toHaveLength(1);
    });

    it('Should show NotFound if is notFound state is true', () => {
        wrapper.setProps({
            reducerState: {
                user: {
                    user: null,
                    isLoading: false,
                    notFound: true,
                    serverError: false

                }
            }
        });
        expect(wrapper.find("NotFound")).toHaveLength(1);
    });

    it('Should show NotFound if is ServerError state is true', () => {
        wrapper.setProps({
            reducerState: {
                user: {
                    user: null,
                    isLoading: false,
                    notFound: false,
                    serverError: true

                }
            }
        });
        expect(wrapper.find("ServerError")).toHaveLength(1);
    });

    it('Should show user profile when loaded correctly', () => {
        wrapper.setProps({
            reducerState: {
                user: {
                    user: {
                        name: 'Test',
                        email: 'test.test@gmail.com.br'
                    },
                    isLoading: false,
                    notFound: false,
                    serverError: false
                }
            }
        });
        expect(wrapper.find('.user-profile')).toHaveLength(1);
        expect(wrapper.find("Avatar")).toHaveLength(1);
    });
});
