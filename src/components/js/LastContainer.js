import React from "react";
import GalerryContainer from './GalerryContainer';
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import ColorLensIcon from '@material-ui/icons/ColorLens';
import { NavLink } from 'react-router-dom'

const LastContainer = ({ isOwner, shape, imgComponent, view, imgSrc, onClick, onAction}) => {
  const ConcreteContainer = (
              <div style={{ paddingLeft: 10}}>
                <CardContent>
                  <Typography gutterBottom variant="subtitle2">
                    {view.name} 
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                  	<NavLink to={"/users/" + view.username + "/" + view.albumId} activeClassName="active">@{view.username}</NavLink>
                </Typography>
                </CardContent>
              </div>
    );

  return <GalerryContainer 
            ConcreteIcon={ColorLensIcon}
            ConcreteContainer={ConcreteContainer} 
            isOwner={isOwner} 
            shape={shape} 
            imgComponent={imgComponent} 
            view={view} 
            imgSrc={imgSrc} 
            onClick={onClick} 
            onAction={onAction}/>;
};

export default LastContainer;