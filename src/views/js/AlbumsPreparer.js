import { tilesGrid } from '../albumsTilesGrid';

export const prepareAlbums = (response) => {
	var albums = response.map(function (currentValue, index) { 
		if (currentValue.label == null){
			currentValue.src = "https://www.sane.org/components/com_easyblog/themes/wireframe/images/placeholder-image.png";
			currentValue.label = "Empty";
		}
		else{
			currentValue.src = currentValue.label.byteArray;
			currentValue.label = currentValue.label.name;
		}

			currentValue.width = tilesGrid[index % tilesGrid.length].width;
			currentValue.height = tilesGrid[index % tilesGrid.length].height;

	    return currentValue;
	})

	return albums;
}