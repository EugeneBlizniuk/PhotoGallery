import React from "react";
import GalerryContainer from './GalerryContainer';
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from '@material-ui/icons/Delete';

const AlbumContainer = ({ isOwner, shape, imgComponent, view, imgSrc, onClick, onAction}) => {

  const ConcreteContainer = (
              <div style={{ paddingLeft: 10, paddingBottom: 5 }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {view.albumName} 
                  {view.private ? <span style={{color: 'grey'}}> [private]</span> : null}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {view.description}
                </Typography>
              </CardContent>
            </div>
    );

  return <GalerryContainer 
            ConcreteIcon={DeleteIcon}
            ConcreteContainer={ConcreteContainer} 
            isOwner={isOwner} 
            shape={shape} 
            imgComponent={imgComponent} 
            view={view} 
            imgSrc={imgSrc} 
            onClick={onClick} 
            onAction={onAction}/>;
};

export default AlbumContainer;
