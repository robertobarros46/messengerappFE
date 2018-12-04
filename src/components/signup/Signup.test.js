import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { Signup } from './Signup'
configure({ adapter: new Adapter() });

describe('<Signup />', () => {
    let wrapper;
    const history = {
        push: () => {}
    }
    beforeEach(() => {
        wrapper = shallow(<Signup createUser={() => {}} history={history}/>);
    });

    it('+++ render LoginPage correctly, snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    // Check render component without errors
    it('+++ render the DUMB component', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('+++ Form should have 5 children and view should have 1 Header, 4 input fields and 1 Button', () => {
        expect(wrapper.find('Form').children()).toHaveLength(5);
        expect(wrapper.find("h1")).toHaveLength(1);
        expect(wrapper.find("h1").hasClass('page-title')).toEqual(true)
        const singupText = wrapper.find("h1").map(node => node.text());
        expect((singupText)).toEqual(["Sign Up"]);
        expect(wrapper.find("Input")).toHaveLength(4);
        expect(wrapper.find("Button")).toHaveLength(1);
    });

    it('+++ simulate change nome, sobrenome, email, password input', () => {
        const FirstName = {
            target: { name: 'nome', value: 'test' }
        };
        const SecondName = {
            target: { name: 'sobrenome', value: 'test' }
        };
        const eventEmail = {
            target: { name: 'email', value: 'test@test.com' }
        };
        const eventPassword = {
            target: { name: 'password', value: '123456' }
        };

        wrapper.find('[name="nome"]').simulate('change', FirstName);
        wrapper.find('[name="sobrenome"]').simulate('change', SecondName);
        wrapper.find('[name="email"]').simulate('change', eventEmail);
        wrapper.find('[name="password"]').simulate('change', eventPassword);

        expect(wrapper.state('nome')).toEqual({ "errorMsg": null, "validateStatus": "success", "value": "test" });

        expect(wrapper.state('sobrenome')).toEqual({ "errorMsg": null, "validateStatus": "success", "value": "test" });

        expect(wrapper.state('email')).toEqual({ "errorMsg": null, "validateStatus": null, "value": "test@test.com" });

        expect(wrapper.state('password')).toEqual({ "errorMsg": null, "validateStatus": "success", "value": "123456" });

        expect(wrapper.find('[name="nome"]').prop('value')).toEqual('test');

        expect(wrapper.find('[name="sobrenome"]').prop('value')).toEqual('test');

        expect(wrapper.find('[name="email"]').prop('value')).toEqual('test@test.com');

        expect(wrapper.find('[name="password"]').prop('value')).toEqual('123456');
    });

    it('+++ simulate fail in change nome, sobrenome, email, password input', () => {
        const FirstName = {
            target: { name: 'nome', value: 'tes' }
        };
        const SecondName = {
            target: { name: 'sobrenome', value: 'ts' }
        };
        const eventEmail = {
            target: { name: 'email', value: 'testetst.com.br' }
        };
        const eventPassword = {
            target: { name: 'password', value: '21' }
        };

        wrapper.find('[name="nome"]').simulate('change', FirstName);
        wrapper.find('[name="sobrenome"]').simulate('change', SecondName);
        wrapper.find('[name="email"]').simulate('change', eventEmail);
        wrapper.find('[name="password"]').simulate('change', eventPassword);

        expect(wrapper.state('nome')).toEqual({ "errorMsg": "Nome é muito curto (Mínimo 4 caractéres necessarios.)", "validateStatus": "error", "value": "tes" });

        expect(wrapper.state('sobrenome')).toEqual({ "errorMsg": "Sobrenome é muito curto (Mínimo 3 caractéres necessarios.)", "validateStatus": "error", "value": "ts" });

        expect(wrapper.state('email')).toEqual({ "errorMsg": "Email não é válido", "validateStatus": "error", "value": "testetst.com.br" });

        expect(wrapper.state('password')).toEqual({ "errorMsg": "Senha é muito curta (Mínimo 6 caractéres necessarios.)", "validateStatus": "error", "value": "21" });
    });

    it('+++ triggers submit handler with valid form data', () => {
        wrapper.find("Form").simulate('submit', { preventDefault: jest.fn() });
    });
});