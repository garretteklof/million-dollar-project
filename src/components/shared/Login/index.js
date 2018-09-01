import React from "react";
import { connect } from "react-redux";
import { callLogin } from "../../../api/auth";
import { loginUser } from "../../../actions/auth";

class Login extends React.Component {
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
      this.props.loginUser(response.data);
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

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginUser(user))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Login);
