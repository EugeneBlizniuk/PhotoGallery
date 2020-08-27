import React, { Component } from 'react';
import { createAlbum } from '../../../util/APIUtils';
import { ALBUM_DSCRIPTION_MAX_LENGTH, ALBUM_NAME_MAX_LENGTH } from '../../../constants';
import './../css/CreateAlbum.css';  
import { Form, Input, Button, notification, Checkbox } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input

class CreateAlbum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                text: ''
            },
            description: {
                text: ''
            },
            isPrivate: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIsPrivateChange = this.handleIsPrivateChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const albumData = {
            name: this.state.name.text,
            description: this.state.description.text,
            isPrivate: this.state.isPrivate
        };

        createAlbum(albumData)
        .then(response => {
            this.props.history.push("/users/" + this.props.currentUser.username);
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login to add contenct');    
            } else {
                notification.error({
                    message: 'Photo Gallery App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });              
            }
        });
    }

    validateDescription = (descriptionText) => {
        if(descriptionText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter album description!'
            }
        } else if (descriptionText.length > ALBUM_DSCRIPTION_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Description is too long (Maximum ${ALBUM_DSCRIPTION_MAX_LENGTH} characters allowed)`
            }    
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({
            description: {
                text: value,
                ...this.validateDescription(value)
            }
        });
    }

    validateName = (nameText) => {
        if(nameText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter album name!'
            }
        } else if (nameText.length > ALBUM_NAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too long (Maximum ${ALBUM_NAME_MAX_LENGTH} characters allowed)`
            }    
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({
            name: {
                text: value,
                ...this.validateName(value)
            }
        });
    }


    handleIsPrivateChange(event) {
        const value = event.target.checked;
        this.setState({
            isPrivate: value
        });
    }


    isFormInvalid() {
        if(this.state.description.validateStatus !== 'success') {
            return true;
        }
        if(this.state.name.validateStatus !== 'success') {
            return true;
        }
        return false;
    }

    render() {
        return (
            <div className="new-album-container">
                <h1 className="page-title">Create Album</h1>
                <div className="new-image-content">
                    <Form onSubmit={this.handleSubmit} className="create-album-form">

                        <FormItem validateStatus={this.state.name.validateStatus}
                        help={this.state.name.errorMsg} className="album-form-row">
                            <Input 
                                placeholder = {'Name'}
                                size="large"
                                value={this.state.name.text} 
                                onChange = {this.handleNameChange} />   
                        </FormItem>

                        <FormItem validateStatus={this.state.description.validateStatus}
                            help={this.state.description.errorMsg} className="album-form-row">
                            <TextArea 
                                placeholder="Enter your description"
                                style = {{ fontSize: '16px' }} 
                                autosize={{ minRows: 3, maxRows: 6 }} 
                                name = "description"
                                value = {this.state.description.text}
                                onChange = {this.handleDescriptionChange} />
                        </FormItem>

                        <FormItem className="album-form-row">
                            <Checkbox onChange={this.handleIsPrivateChange}>Make private</Checkbox>
                        </FormItem>

                        <FormItem className="album-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-album-form-button">Create Album</Button>
                        </FormItem>
                    </Form>
                </div>    
            </div>
        );
    }
    
}

export default CreateAlbum;