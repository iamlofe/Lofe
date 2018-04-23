import React, {Component} from 'react';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

export default class MyUploader extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 m-auto">
            <form
              action="http://localhost:3030/upload"
              method="POST"
              enctype="multipart/form-data"
            >
              <ImagesUploader
                url="http://localhost:3030/multiple"
                optimisticPreviews
                onLoadEnd={err => {
                  if (err) {
                    console.error(err);
                  }
                }}
                label="Upload multiple images"
              />
              {/* <div class="custom-file mb-3">
								<input type="file" name="file" id="file" class="custom-file-input" />
								<label for="file" class="custom-file-label">Choose File</label>
							</div> */}

              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

/*
var imgPreviewStyle = {
							backgroundImage: 'url(' + url + ')',
							borderColor: disabled ? disabledBorderColor : borderColor
						};

						*/
