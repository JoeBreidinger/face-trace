import "./App.css";
import { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Register from "./components/Register/Register";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import SignIn from "./components/SignIn/SignIn";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Background from "./components/ParticlesBG/ParticlesBG";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: [],
      route: "home",
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

  calculateFaceLocation = (data) => {
    const regions = data.outputs[0].data.regions;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log("Calculating face locations for", regions.length, "faces");
    return regions.map((region) => {
      const clarifaiFace = region.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
  };

  displayFaceBox = (box) => {
    console.log("Setting box state with:", box);
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    console.log(event.target.value);
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input }, () => {
      const image = document.getElementById("inputimage");
      if (image) {
        image.onload = () => {
          // Call backend
          fetch(`${process.env.REACT_APP_API_URL}/api/clarifai/detect-faces`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl: this.state.input }),
          })
            .then((response) => response.json())
            .then((result) => {
              console.log("Clarifai API response:", result);
              if (result) {
                fetch(`${process.env.REACT_APP_API_URL}/image`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    id: this.state.user.id,
                  }),
                })
                  .then((response) => response.json())
                  .then((count) => {
                    this.setState(
                      Object.assign(this.state.user, { entries: count }),
                    );
                  })
                  .catch((err) =>
                    console.error("Error updating entries:", err),
                  );
              }
              this.displayFaceBox(this.calculateFaceLocation(result));
            })
            .catch((error) => console.log("error", error));
        };
      }
    });
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

  onResetForm = () => {
    this.setState({
      input: "",
      imageUrl: "",
      box: [],
    });
  };

  render() {
    return (
      <div className="App">
        <Background />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
          onResetForm={this.onResetForm}
        />
        {this.state.route === "home" ? (
          <div>
            {/* Maintenance Message */}
            <div
              id="maintenance-message"
              style={{
                backgroundColor: "#fff3cd",
                color: "#856404",
                padding: "15px",
                margin: "20px auto",
                maxWidth: "800px",
                borderRadius: "8px",
                border: "1px solid #ffeaa7",
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Thanks for visiting my site! FaceTrace is currently under
              maintenance and will resume normal functionality soon.
            </div>
            {this.state.isSignedIn && (
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
            )}
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              input={this.state.input}
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
