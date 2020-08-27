import React, { Component } from "react";
import LoadingIndicator  from '../../common/js/LoadingIndicator';
import NothingHere from '../../common/js/NothingHere';
import ServerError from '../../common/js/ServerError';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GaleryView from "../GaleryView";
import Carousel, { Modal, ModalGateway } from "react-images";
import LastContainer from "../../components/js/LastContainer";
import { getLastImagesAmount } from "../../util/APIUtils";
import { prepareLast } from "./LastPreparer";
import FilerobotImageEditor from 'filerobot-image-editor';

class LastView extends Component {
    constructor({onAction}) {
      super();
        this.state = {
            onAction: onAction,
            NothingHere: true,
            isLoading: false,
            last: [],
            viewerIsOpen: false,
            currentImage: 0,
            editorIsOpen: false,
            editorSrc: "",
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile() {
        this.setState({
            isLoading: true
        });

    getLastImagesAmount(20)
        .then(response => {
          const last = prepareLast(response);
          console.log();
          this.setState({
                last: last,
                NothingHere: !(last.length),
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
        this.loadUserProfile();
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
    } 

    CloseEdit = ( ) => {
      this.setState({
          editorIsOpen: false,
          editorSrc: "",
      });
    }

    ImageEdit = ( event, { view } ) => {
      this.setState({
          editorIsOpen: true,
          editorSrc: view.src,
      });
    }

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

                <Container maxWidth="sm" component="main">
                  <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom  style={{marginTop: "0.35em"}}>
                    Recent activities
                  </Typography>
                  <Typography variant="h5" align="center" color="textSecondary" component="p" style={{marginBottom: "0.35em"}}>
                    Shot, Save, Edit
                  </Typography>
                </Container>

              <GaleryView
                views={this.state.last}
                Container={LastContainer}
                onClick={this.openLightbox}
                onAction={this.ImageEdit}
                isOwner={true}
              />

              <ModalGateway>
                {this.state.viewerIsOpen ? (
                  <Modal onClose={this.closeLightbox}>
                    <Carousel currentIndex={this.state.currentImage} views={this.state.last} />
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

export default LastView;