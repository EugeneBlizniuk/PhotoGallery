import React, { Component } from 'react';
import './../css/Login.css';
import { Link } from 'react-router-dom';

import { Form, Input, Button, Icon } from 'antd';
import { _login } from '../../../redux/actions/auth';
import { connect } from 'react-redux';

class Login extends Component {
    
    state = {
        usernameOrEmail: '',
        password: ''
    };

    componentDidUpdate(prevProps) {        
        if (!this.props.auth.isLoading) {
            if (this.props.auth.currentUser != prevProps.auth.currentUser) {
                this.props.history.push('/');
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const loginRequest = {
            usernameOrEmail: this.state.usernameOrEmail,
            password: this.state.password
        };
        this.props.login(loginRequest);
    }

    handleChange = (event, title) => {
        this.setState(
            {
                [title]: event.target.value,
                message: ''
            }
        )
    };

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleSubmit;
        }
    }

    render() {
        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">

                <Form onSubmit={this.handleSubmit} className='login-form'>
                    <Form.Item>
                        <Input 
                            prefix={<Icon type="user" />}
                            size="large"
                            name="usernameOrEmail" 
                            type='usernameOrEmail'
                            placeholder="Username or Email"
                            value={this.state.usernameOrEmail}
                            onChange={event => this.handleChange(event, 'usernameOrEmail')}
                            onKeyPress={this.onKeyPress}
                        />    
                    </Form.Item>
                    <Form.Item>
                        <Input 
                            prefix={<Icon type="lock" />}
                            size="large"
                            name="password" 
                            type="password" 
                            placeholder="Password"
                            value={this.state.password}
                            onChange={event => this.handleChange(event, 'password')}
                            onKeyPress={this.onKeyPress}
                        />   
                    </Form.Item>

                    <Button type="primary" htmlType="submit" size="large" className="login-form-button" >Log in</Button>
                     Or <Link to="/signup">register!</Link>
                </Form>
                </div>
            </div>
        );
    }

}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => (
    {
        login: (loginRequest) => dispatch(_login(loginRequest))
    }
);


export default connect(mapStateToProps, mapDispatchToProps)(Login);