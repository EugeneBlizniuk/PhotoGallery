import React, { Component } from "react";
import LoadingIndicator  from '../../common/js/LoadingIndicator';
import NothingHere from '../../common/js/NothingHere';
import ServerError from '../../common/js/ServerError';

import GaleryView from "../GaleryView";
import AlbumContainer from "../../components/js/AlbumContainer";
import { getUserAlbums } from "../../util/APIUtils";
import { prepareAlbums} from "./AlbumsPreparer";

class AlbumsView extends Component {
    constructor({username, isOwner, onClick, onAction}) {
    	super();
        this.state = {
            isOwner: isOwner,
            username: username,
            onClick: onClick,
            onAction: onAction,
            NothingHere: true,
            isLoading: false,
            albums: []
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

		getUserAlbums(username)
        .then(response => {
        	const albums = prepareAlbums(response);
            this.setState({
				albums: albums,
				NothingHere: !(albums.length),
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
        this.loadUserProfile(this.state.username);
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
        
        return <GaleryView
            views={this.state.albums}
            Container={AlbumContainer}
            onClick={this.state.onClick}
            onAction={this.state.onAction}
            isOwner={this.state.isOwner}
        />; 
    }
}

export default AlbumsView;