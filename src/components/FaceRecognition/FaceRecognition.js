import react from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="face-recognition center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          alt=""
          src={imageUrl || null}
          width="500px"
          height="auto"
        />
      </div>
    </div>
  );
};

export default FaceRecognition;
