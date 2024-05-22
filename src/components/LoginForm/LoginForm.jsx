import { useEffect, useState } from "react";
import * as usersService from "../../utilities/users-service";
import { useNavigate, Link, useParams } from "react-router-dom";

export default function LoginForm({ setUser }) {
  const navigate = useNavigate();

  const { loginId } = useParams();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const checkLoginId = async () => {
      try {
        const response = await fetch(`/api/users/checkLoginId/${loginId}`);
        if (!response.ok) {
          throw new Error('Invalid login ID');
        }
        const data = await response.json();
        setIsValid(data.isValid);
      } catch (error) {
        console.error('Error checking login ID:', error);
        setIsValid(false);
      }
    };

    if (loginId) {
      checkLoginId();
    }
  }, [loginId]);

  useEffect(() => {
    if (isValid === false) {
      navigate('/error'); // Redirect to an error page
    }
  }, [isValid, navigate]);

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  // cronjob function -> string -> usersService.createUrl(string); -> url -> database

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = loginId
        ? await usersService.login(credentials)
        : await usersService.loginNoAtt(credentials);
      setUser(user);
      console.log(user);
      if (user.isAdmin === true) {
        navigate("/admin");
      } else {
        navigate(`/${user.class}/dashboard`);
      }
    } catch {
      setError("Log In Failed - Try Again");
    }
  }

  return (
    <div>

      <div className="team-logo">
          <img src="/assets/Geekery-League-Logo.png" alt="Geekery League Logo" style={{ width: '750px', height: '300px' }} />
      </div>

      <div className="form-container-login">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button className="btn-submit" type="submit">LOG IN</button>
        </form>
        <br/>
        <Link to="/signup">Does not have an account? Sign Up here!</Link>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
