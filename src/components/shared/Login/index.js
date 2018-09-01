import React from "react";
import { callLogin } from "../../../api/auth";

export default class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  reusableInputHandler = type => e => this.setState({ [type]: e.target.value });

  onFormSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await callLogin(email, password);
      const token = response.headers["x-auth"];
      localStorage.setItem("x-auth-token", token);
      this.props.history.push("/discover");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={this.reusableInputHandler("email")}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={this.reusableInputHandler("password")}
        />
        <button>Submit</button>
      </form>
    );
  }
}
