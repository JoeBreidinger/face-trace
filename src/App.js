import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
// import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

function App() {
  return (
    <div className="App">
      <Navigation />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
