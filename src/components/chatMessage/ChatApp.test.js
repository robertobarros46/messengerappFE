import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Chat } from './ChatApp'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';



configure({ adapter: new Adapter() });

describe('<ChatApp />', () => {
    let wrapper;
    const chatReducerState = {
        currentChatName: 'test',
        messages:[]
    }
    const authReducerState = {
        currentUser:{
            id:'sad45ada7das1a6d4'
        }
    }

    beforeAll(() => {
        Chat.prototype.componentDidMount = () => {
        };

        Chat.prototype.componentDidUpdate = () => {
        };
    });

    beforeEach(() => {
        wrapper = shallow(<Chat chatReducerState={chatReducerState} authReducerState={authReducerState}/>);
    });

    it('renders', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('text field is acts on change', () => {
        wrapper.find("TextField").simulate("change",  {
            target: {value: "Olá"}
        });
        expect(wrapper.find("TextField").props().value).toEqual("Olá");
    })

    it('there should be one TextField', () => {
        expect(wrapper.find("TextField")).toHaveLength(1);
    });

    it('There should be one button to send message', () => {
        expect(wrapper.find(Button)).toHaveLength(1);
    });

    it('There should be one list to show message', () => {
        expect(wrapper.find(List)).toHaveLength(1);
    });

    it('There should be one AppBar to show with who user is messaging', () => {
        expect(wrapper.find(AppBar)).toHaveLength(1);
    });
 
});
