import React from "react";
import "./SignIn.css";
import { devLog } from "../../utils/logger";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      loading: false,
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    devLog("Attempting sign in with:", this.state.signInEmail);
    this.setState({ loading: true });
    fetch(`${process.env.REACT_APP_API_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => {
        devLog("Response status:", response.status);
        return response.json();
      })
      .then((user) => {
        this.setState({ loading: false });
        if (user === "success" || user.id) {
          devLog("Sign in successful, routing to home");
          if (user.id) {
            this.props.loadUser(user);
          }
          this.props.onRouteChange("home");
        } else {
          console.error("Sign in failed - no user id in response:", user);
        }
      })
      .catch((err) => {
        console.error("Sign in request error:", err);
        this.setState({ loading: false });
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-40-l w-60-m w-50-s w-25-l mw9 shadow-4 center">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="button"
                value={this.state.loading ? "Loading..." : "Sign in"}
                onClick={this.onSubmitSignIn}
                disabled={this.state.loading}
              />
            </div>
            <div className="lh-copy mt3 pointer">
              <p
                onClick={() => onRouteChange("register")}
                className="f6 link dim black db"
              >
                Register
              </p>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default SignIn;
