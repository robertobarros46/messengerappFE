import React, { Component } from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import './AppHeader.css';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import { doLogout } from '../../store/actions/authActions'
const Header = Layout.Header;

export class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick({ key }) {
    if (key === "logout") {
      this.props.doLogout(this.props.currentUser.email);
      this.props.history.push("/");
    }
  }

  render() {
    let menuItems;
    if (this.props.currentUser) {
      if (this.props.currentUser.authorities[0].authority === "ROLE_ADMIN") {
        menuItems = [
          <Menu.Item key="/">
            <Link title="Página principal" to="/">
              <Icon type="home" className="nav-icon" />
            </Link>
          </Menu.Item>,
          <Menu.Item key="/users">
            <Link title="Listar usuários" to="/users">
              <Icon type="table" className="nav-icon" />
            </Link>
          </Menu.Item>,
          <Menu.Item key="/profile" className="profile-menu">
            <ProfileDropdownMenu
              handleMenuClick={this.handleMenuClick} />
          </Menu.Item>
        ];
      }else if(this.props.currentUser.authorities[0].authority === "ROLE_AUDITOR"){
        menuItems = [
          <Menu.Item key="/">
            <Link title="Página principal" to="/">
              <Icon type="home" className="nav-icon" />
            </Link>
          </Menu.Item>,
          <Menu.Item key="/rooms">
            <Link title="Listar salas" to="/rooms">
              <Icon type="table" className="nav-icon" />
            </Link>
          </Menu.Item>,
          <Menu.Item key="/profile" className="profile-menu">
            <ProfileDropdownMenu
              handleMenuClick={this.handleMenuClick} />
          </Menu.Item>
        ];
      } else {
        menuItems = [
          <Menu.Item key="/">
            <Link to="/">
              <Icon type="home" className="nav-icon" />
            </Link>
          </Menu.Item>,
          <Menu.Item key="/profile" className="profile-menu">
            <ProfileDropdownMenu
              handleMenuClick={this.handleMenuClick} />
          </Menu.Item>
        ];
      }
    } else {
      menuItems = [
        <Menu.Item key="/login">
          <Link to="/login">Login</Link>
        </Menu.Item>,
        <Menu.Item key="/signup">
          <Link to="/signup">Signup</Link>
        </Menu.Item>
      ];
    }

    return (
      <Header className="app-header">
        <div className="header-container">
          <div className="app-title" >
            <Link to="/">Messenger App</Link>
          </div>
          <Menu
            className="app-menu"
            mode="horizontal"
            selectedKeys={[this.props.location.pathname]}
            style={{ lineHeight: '64px' }} >
            {menuItems}
          </Menu>
        </div>
      </Header>
    );
  }
}

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="user-info" className="dropdown-item" disabled>
        <div className="user-full-name-info">
          {localStorage.getItem("NAME")}
        </div>
        <div className="username-info">
          {localStorage.getItem("CurrentUser")}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" className="dropdown-item">
        <Link to={`/user/${localStorage.getItem("CurrentUser")}`}>Conta</Link>
      </Menu.Item>
      <Menu.Item key="logout" className="dropdown-item">
        Sair
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={dropdownMenu}
      trigger={['click']}
      getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
      <a href="/" className="ant-dropdown-link">
        <Icon type="user" className="nav-icon" style={{ marginRight: 0 }} /> <Icon type="down" />
      </a>
    </Dropdown>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doLogout: (email, id) => dispatch(doLogout(email, id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppHeader));