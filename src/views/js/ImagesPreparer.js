import { tilesGrid } from '../imagesTilesGrid';

export const prepareImages = (response) => {
	var images = response.map(function (currentValue, index) { 
		currentValue.src = currentValue.byteArray;
		currentValue.byteArray = null;
		currentValue.width = tilesGrid[index % tilesGrid.length].width;
		currentValue.height = tilesGrid[index % tilesGrid.length].height;
	    return currentValue;
	})

	return images;
}