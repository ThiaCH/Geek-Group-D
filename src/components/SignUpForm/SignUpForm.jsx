import { Component } from "react";
import { signUp } from "../../utilities/users-service";
import debug from "debug";

const log = debug("mern:components:SignUpForm");

export default class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
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
            const formData = {...this.state};
            delete formData.error;
            delete formData.confirm;
            const user = await signUp(formData);
            log("user: %o", user);
            this.props.setUser(user);
        } catch(err) {
            this.setState({error: "Sign Up Failed - Try Again"})
        }
    };

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
            <div>
                <div className="form-container">
                        <form autoComplete="off" onSubmit={this.handleSubmit}>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input id="confirm-password" type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                            <button type="submit" disabled={disable}>SIGN UP</button>
                        </form>
                </div>
                <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
        )
    }
}