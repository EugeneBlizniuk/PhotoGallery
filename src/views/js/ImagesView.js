import React, { Component } from "react";
import LoadingIndicator  from '../../common/js/LoadingIndicator';
import NothingHere from '../../common/js/NothingHere';
import ServerError from '../../common/js/ServerError';

import GaleryView from "../GaleryView";
import Carousel, { Modal, ModalGateway } from "react-images";
import ImagesContainer from "../../components/js/ImagesContainer";
import { getUserImages } from "../../util/APIUtils";
import { prepareImages } from "./ImagesPreparer";
import { confirmAlert } from 'react-confirm-alert';
import FilerobotImageEditor from "filerobot-image-editor";

class ImagesView extends Component {
    constructor({isOwner, username, albumId, onAction}) {
      super();
        this.state = {
            isOwner: isOwner,
            albumId: albumId,
            username: username,
            onAction: onAction,
            NothingHere: true,
            isLoading: false,
            images: [],
            viewerIsOpen: false,
            currentImage: 0,
            editorIsOpen: false,
            editorSrc: "",
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username, albumId) {
        this.setState({
            isLoading: true
        });

    getUserImages(username, albumId)
        .then(response => {
          const images = prepareImages(response);
            this.setState({
                images: images,
                NothingHere: !(images.length),
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });        
            }
        });        
    }
     
    componentDidMount() {
        this.loadUserProfile(this.state.username, this.state.albumId);
    }

    openLightbox = (event, { photo, index })  => {
      this.setState({
          viewerIsOpen: true,
          currentImage: index
      }); 
    }

    closeLightbox = () => {
      this.setState({
          viewerIsOpen: false,
          currentImage: 0
      });
    }; 

    CloseEdit = ( ) => {
      this.setState({
          editorIsOpen: false,
          editorSrc: "",
      });
    }; 

    ImageEdit = ( view ) => {
      this.setState({
          editorIsOpen: true,
          editorSrc: view.src,
      });
    }; 

    ImageAction = (event, { view }) => {
        confirmAlert({
          title: 'What do you want to do with the image?',
          buttons: [
            {
              label: 'Delete',
              onClick: () => setTimeout( () => { this.state.onAction( view ) }, 100)
            },
            {
              label: 'Edit',
              onClick: () => this.ImageEdit(view)
            },
          ]
        });
    }; 


    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.NothingHere) {
            return <NothingHere />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }
        
          return (
            <div>
              <GaleryView
                views={this.state.images}
                Container={ImagesContainer}
                onClick={this.openLightbox}
                onAction={this.ImageAction}
                isOwner={this.state.isOwner}
              />
              <ModalGateway>
                {this.state.viewerIsOpen ? (
                  <Modal onClose={this.closeLightbox}>
                    <Carousel currentIndex={this.state.currentImage} views={this.state.images} />
                  </Modal>
                ) : null}
              </ModalGateway>
              <FilerobotImageEditor
                show={this.state.editorIsOpen}
                src={this.state.editorSrc}
                onClose={this.CloseEdit}
              />
            </div>
          );

    }
}

export default ImagesView;