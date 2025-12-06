import "./App.css";
import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Background from "./components/ParticlesBG/ParticlesBG";

//Clarifai API:
const MODEL_ID = "face-detection";

const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in Clarifai's Account Security section
  const PAT = "290305ca11094226aa3a2b6eca66c5da";
  // You can keep the 'clarifai'/'main' without changing it to your own unless you want to.
  // This will use the public Clarifai model so you dont need to create an app:
  const USER_ID = "3umw0pbpnlo";
  const APP_ID = "FaceTrace";

  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    console.log(event.target.value);
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    fetch("http://localhost:5000/api/clarifai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: this.state.input }),
    })
      .then((res) => res.json())
      .then((data) => {
        // You may need to adjust this depending on Clarifai's gRPC response format
        if (
          data &&
          data.outputs &&
          data.outputs[0] &&
          data.outputs[0].data &&
          data.outputs[0].data.regions
        ) {
          this.displayFaceBox(this.calculateFaceLocation(data));
        } else {
          console.log("No face detected or unexpected response:", data);
        }
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div className="App">
        <Background />
        <Navigation />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
