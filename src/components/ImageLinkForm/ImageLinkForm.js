import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit, input }) => {
  return (
    <div className="image-link-form">
      <p className="image-link-message f3">
        {"FaceTrace will detect faces within any image you provide!"}
      </p>

      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 center inputBox"
            type="text"
            onChange={onInputChange}
            value={input}
          />
          <button
            className="grow f4 link ph3 pv2 dib white bg-light-purple button"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
