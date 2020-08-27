import { tilesGrid } from '../imagesTilesGrid';

export const prepareLast = (response) => {
	var last = response.map(function (currentValue, index) { 
		currentValue.src = currentValue.imageResponse.byteArray;
		currentValue.name = currentValue.imageResponse.name;
		currentValue.albumId = currentValue.imageResponse.albumId;
		currentValue.imageResponse = null;

		currentValue.width = tilesGrid[index % tilesGrid.length].width;
		currentValue.height = tilesGrid[index % tilesGrid.length].height;
	    return currentValue;
	})

	return last;
}