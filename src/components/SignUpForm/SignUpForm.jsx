import { Component } from "react";
import { signUp } from "../../utilities/users-service";
import debug from "debug";

const log = debug("mern:components:SignUpForm");

export default class SignUpForm extends Component {
  state = {
    studentName: "",
    class: "",
    contact: "",
    email: "",
    nokName: "",
    nokContact: "",
    password: "",
    confirm: "",
    error: "",
  };

  // you can only use arrow function for class component, without the "const"
  handleChange = (evt) => {
    this.setState({
      ...this.state,
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // alert(JSON.stringify(this.state));
    try {
      const formData = { ...this.state };
      delete formData.error;
      delete formData.confirm;
      const user = await signUp(formData);
      log("user: %o", user);
      this.props.setUser(user);
    } catch (err) {
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label htmlFor="studentName">Student Name</label>
            <input
              id="studentName"
              type="text"
              name="studentName"
              value={this.state.studentName}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="class">Class</label>
            <input
              id="class"
              type="text"
              name="class"
              value={this.state.class}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="contact">Contact</label>
            <input
              id="contact"
              type="tel"
              name="contact"
              value={this.state.contact}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="nokName">NOK Name</label>
            <input
              id="nokName"
              type="text"
              name="nokName"
              value={this.state.nokName}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="nokContact">NOK Contact</label>
            <input
              id="nokContact"
              type="text"
              name="nokContact"
              value={this.state.nokContact}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />

            <button type="submit" disabled={disable}>
              SIGN UP
            </button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
