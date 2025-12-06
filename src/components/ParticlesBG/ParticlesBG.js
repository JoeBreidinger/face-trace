import React, { Component } from "react";

import ParticlesBg from "particles-bg";

class Background extends Component {
  render() {
    return (
      <>
        <ParticlesBg type="cobweb" bg={true} color="#ffffff" />
      </>
    );
  }
}
export default Background;
