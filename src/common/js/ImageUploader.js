import React, { Component } from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
 
export default class ImageUploader extends Component{
  constructor({onLoad}) {
    super();
    this.onDrop = (files) => {

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = function(e) {
          onLoad(e.target.result, file.name);
        }
        reader.readAsDataURL(file);
    });

  }
}

  render(){
    return (
      <div>
        <DropzoneArea style={{minHeight: 10}}
          onDrop={this.onDrop}
          acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          filesLimit={1}
          showPreviewsInDropzone={false}
          />
      </div>
    )
  }
}