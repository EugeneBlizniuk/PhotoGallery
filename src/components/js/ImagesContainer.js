import React from "react";
import GalerryContainer from './GalerryContainer';
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import ColorLensIcon from '@material-ui/icons/ColorLens';

const ImagesContainer = ({ isOwner, shape, imgComponent, view, imgSrc, onClick, onAction}) => {

  const ConcreteContainer = (
              <div style={{ paddingLeft: 10}}>
                <CardContent>
                  <Typography gutterBottom variant="subtitle2" component="h2">
                    {view.name} 
                    {view.private ? <span style={{color: 'grey'}}> [private]</span> : null}
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

export default ImagesContainer;