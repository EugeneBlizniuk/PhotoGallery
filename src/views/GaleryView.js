import React from "react";
import Gallery from "../gallery/Gallery";

const GaleryView = ({ isOwner, Container, views, onClick, onAction }) => {
		return <Gallery isOwner={isOwner} Container={Container} photos={views} onClick={onClick} onAction={onAction}/>;
};

export default GaleryView;
