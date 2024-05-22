/* eslint-disable react/display-name */
import { Component } from "react";
import { signUp } from "../../utilities/users-service";
import debug from "debug";
import { useNavigate, Link } from "react-router-dom";

const log = debug("mern:components:SignUpForm");

const withRouter = WrappedComponent => props => {
    const navigate = useNavigate();
    // Other hooks can be added here if needed
    return <WrappedComponent {...props} navigate={navigate} />;
};

class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        message: '',
        class: '',
        contact: '',
        emergencyContactPerson: '',
        emergencyContactNumber: ''
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
            console.log(formData);
            delete formData.error;
            delete formData.confirm;
            const user = await signUp(formData);
            log("user: %o", user);
            const { navigate } = this.props;
            navigate('/')
        } catch(err) {
            debug(err);
            this.setState({message: "Sign Up Failed - Try Again"})
        }
    };

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
            <div>
                <div className="team-logo">
                    <img src="https://github.com/ThiaCH/Project-3-Geekery/blob/01b8d55ead38e30778aaae3f4c2a827d7abe3757/assets/Geekery-League-Logo.png" alt="Geekery League Logo" style={{ width: '400px', height: '150px' }} />
                </div>
                
                <div className="form-container-sign-up">
                <h4 style={{textAlign:"center"}}>Please fill up the form below if you are a new user.</h4>
                <br/>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                    <label htmlFor="class">Class</label>
                    <input id="class" type="text" name="class" required value={this.state.class} onChange={this.handleChange}/>
                    <label htmlFor="contact">Contact Number</label>
                    <input id="contact" type="tel" name="contact" pattern="[0-9]{8}" required value={this.state.contact} onChange={this.handleChange}/>
                    <label htmlFor="ecp">Emergency Contact Person</label>
                    <input id="ecp" type="text" name="emergencyContactPerson" required value={this.state.emergencyContactPerson} onChange={this.handleChange}/>
                    <label htmlFor="ecn">Emergency Contact Number</label>
                    <input id="ecn" type="tel" name="emergencyContactNumber" pattern="[0-9]{8}" required value={this.state.emergencyContactNumber} onChange={this.handleChange}/>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" minLength="3" value={this.state.password} onChange={this.handleChange} required />
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input id="confirm-password" type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                    <button type="submit" disabled={disable}>SIGN UP</button>
                </form>
            <br/>
            <Link to="/">Return to Login Page</Link>
            </div>
            <p className="message">&nbsp;{this.state.message}</p>
            </div>
        )
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withRouter(SignUpForm)