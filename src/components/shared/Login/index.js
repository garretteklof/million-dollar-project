import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { callLogin } from "../../../api/auth";
import { loginUser } from "../../../actions/auth";

const AutoLogin = styled.a`
  position: absolute;
  top: 0;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background: palevioletred;
  color: white;
  font-size: 2rem;
  width: 100%;
  padding: 2rem;
  cursor: pointer;
`;

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  onAutoLogin = () => {
    this.setState({ email: "test@test.com", password: "abc123" }, () =>
      this.logBtn.click()
    );
  };
  reusableInputHandler = type => e => this.setState({ [type]: e.target.value });

  onFormSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await callLogin(email, password);
      const token = response.headers["x-auth"];
      sessionStorage.setItem("x-auth-token", token);
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
        <button
          ref={ref => {
            this.logBtn = ref;
          }}
        >
          Submit
        </button>
        <AutoLogin onClick={this.onAutoLogin}>Click For Auto Login</AutoLogin>
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
