import "./App.css";
import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Register from "./components/Register/Register";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import SignIn from "./components/SignIn/SignIn";
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
      "Content-Type": "application/json",
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
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  componentDidMount() {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error fetching from server:", error));
  }

  // calculateFaceLocation = (data) => {
  //   const clarifaiFace =
  //     data.outputs[0].data.regions[0].region_info.bounding_box;
  //   const image = document.getElementById("inputimage");
  //   const width = Number(image.width);
  //   const height = Number(image.height);
  //   return {
  //     leftCol: clarifaiFace.left_col * width,
  //     topRow: clarifaiFace.top_row * height,
  //     rightCol: width - clarifaiFace.right_col * width,
  //     bottomRow: height - clarifaiFace.bottom_row * height,
  //   };
  // };

  // displayFaceBox = (box) => {
  //   this.setState({ box: box });
  // };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    console.log(event.target.value);
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    // fetch(
    //   "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
    //   returnClarifaiRequestOptions(this.state.input)
    // )
    const options = returnClarifaiRequestOptions(this.state.input);
    console.log(options);
    fetch("http://localhost:3000/imageurl", options)
      .then((response) => response.json())
      .then((result) => {
        console.log("Clarifai API response:", result);
        if (result) {
          fetch("http://localhost:3000/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch((err) => console.error("Error updating entries:", err));
        }
        const regions = result.outputs[0].data.regions;

        regions.forEach((region) => {
          // Accessing and rounding the bounding box values
          const boundingBox = region.region_info.bounding_box;
          const topRow = boundingBox.top_row.toFixed(3);
          const leftCol = boundingBox.left_col.toFixed(3);
          const bottomRow = boundingBox.bottom_row.toFixed(3);
          const rightCol = boundingBox.right_col.toFixed(3);

          region.data.concepts.forEach((concept) => {
            // Accessing and rounding the concept value
            const name = concept.name;
            const value = concept.value.toFixed(4);

            console.log(
              `${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`
            );
          });
        });
      })
      .catch((error) => console.log("error", error));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false, route: "signin" });
    } else if (route === "home") {
      this.setState({ isSignedIn: true, route: route });
    } else {
      this.setState({ route: route });
    }
  };

  render() {
    return (
      <div className="App">
        <Background />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
        />
        {this.state.route === "home" ? (
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
