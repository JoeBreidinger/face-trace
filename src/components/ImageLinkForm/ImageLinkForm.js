import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = () => {
  return (
    <div className="image-link-form">
      <p className="image-link-message f3">
        {"This Magic Brain will detect faces in your pictures. Give it a try."}
      </p>

      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input className="f4 pa2 center inputBox" type="text" />
          <button className="grow f4 link ph3 pv2 dib white bg-light-purple button">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
