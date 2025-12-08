import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="face-recognition ma">
      <div className="absolute mt2">
        <img
          className="br2"
          id="inputimage"
          alt=""
          src={imageUrl || null}
          width="500px"
          height="auto"
          style={{ padding: "0.5rem" }}
        />
        {Array.isArray(box) ? (
          box.map((face, index) => (
            <div
              key={index}
              className="regions"
              style={{
                top: face.topRow,
                right: face.rightCol,
                bottom: face.bottomRow,
                left: face.leftCol,
              }}
            ></div>
          ))
        ) : (
          <div
            className="regions"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
