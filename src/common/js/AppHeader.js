import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './../css/AppHeader.css';
import albumIcon from '../../picture/album.svg';
import { Layout, Menu, Dropdown, Icon, notification } from 'antd';
import { _logout } from '../../redux/actions/auth';
import { connect } from 'react-redux';

const Header = Layout.Header;

class AppHeader extends Component {

  componentDidUpdate(prevProps) {
    const actualAuth = this.props.auth;

    if (actualAuth.currentUser !== prevProps.auth.currentUser) {

      if (actualAuth.currentUser === null && 
          actualAuth.isLoading === false &&
          actualAuth.isAuthenticated === false) {

            notification.success({
              message: 'Photo Gallery App',
              description: "Eh.. You're logged out.."
            });
         }
    }
  }

  handleMenuClick = ({ key }) => {
    if (key === "logout") {
      this.props.logout();
      this.props.history.push('/');
    }
  }

  render() {
      let menuItems;
      const currentUser = this.props.auth.currentUser;

      if (currentUser) {
         menuItems = [
          <Menu.Item key="/images/friends">
            <Link to="/images/friends">
              <Icon type='heart' className='heart-icon'/>
            </Link>
          </Menu.Item>,

          <Menu.Item key="/">
            <Link to="/">
              <Icon type="home" className="nav-icon" /> 
            </Link>
          </Menu.Item>,
          
          <Menu.Item key="/upload">
          <Link to="/upload">
            <img src={albumIcon} alt="album" className="album-icon" />
          </Link>
          </Menu.Item>,

          <Menu.Item key="/profile" className="profile-menu">
              <ProfileDropdownMenu 
                currentUser={currentUser} 
                handleMenuClick={this.handleMenuClick}/>
          </Menu.Item>
        ];
      } else {
        menuItems = [
          <Menu.Item key="/login">
            <div className="lmenuButton">
            <Link to="/login">Log in</Link>
            </div>
          </Menu.Item>,
          <Menu.Item key="/signup">
            <Link to="/signup">Sign Up</Link>
          </Menu.Item>                  
        ];
      }

      return (
          <Header className="app-header">
          <div className="container">
            <div className="app-title">
              <Link to="/">Photo Gallery</Link>
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
        {props.currentUser.name}
      </div>
      <div className="username-info">
        @{props.currentUser.username}
      </div>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="profile" className="dropdown-item">
      <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
    </Menu.Item>
    <Menu.Item key="logout" className="dropdown-item">
      Log out
    </Menu.Item>
  </Menu>
);

  return (
    <Dropdown 
      overlay={dropdownMenu} 
      trigger={['click']}
      getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
      <a className="ant-dropdown-link">
        <Icon type="user" className="nav-icon" style={{marginRight: 0}} /> <Icon type="down" />
      </a>
    </Dropdown>
  );
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => (
  {
    logout: () => dispatch(_logout())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppHeader));