import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import './Form.css';
import formImg from "../../images/login-img.png"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@user.io', 'password'));
    if (data.errors) setErrors(data.errors);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className='form-wrapper'>
      <div className='form-image__container'>
        <img alt='login image' className='form-image' src={formImg}></img>
      </div>

      <form className='form-container' onSubmit={onLogin}>
        <h2 className='form-text'>Welcome to Robinhood</h2>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>

        <div>
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <input
            className="form-input"
            name="email"
            type="text"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <div>
            <label htmlFor="password">Password</label>
          </div>
          <input
            className="form-input"
            name="password"
            type="password"
            value={password}
            onChange={updatePassword}
          />
        </div>

        <div className='redirect-text'>Don't have an account?
          <a href="/sign-up" className="redirect-link"> Sign Up </a>
          <span>or</span>
          <a href="/" className="home-link"> Go Home</a>
        </div>
        <button className='form-btn' type="submit">Sign In</button>
        <button className='form-btn' type="submit" onClick={demoUser}>Demo User</button>

      </form>

    </div>
  );
};

export default LoginForm;
