import "./App.css";
import Navigation from "./components/navigation/navigation";
// import Logo from "./components/Logo/Logo";
// import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
// import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

function App() {
  return (
    <div className="App">
      <h1
        style={{ display: "flex", justifyContent: "flex-start" }}
        className="f2 link dim black pa3"
      >
        Face Trace
      </h1>
      <Navigation />
      {/* <Logo />
      <ImageLinkForm />
      <FaceRecognition /> */}
    </div>
  );
}

export default App;
