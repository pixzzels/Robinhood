import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { login } from "../../store/session";
import './Form.css';
import formImg from "../../images/login-img.png"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(firstName, lastName, email, password));
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@user.io', 'password'));
    if (data.errors) setErrors(data.errors);
  }

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className='form-wrapper'>
      <div className='form-image__container'>
        <img alt='login image' className='form-image' src={formImg}></img>
      </div>

      <form className='form-container' onSubmit={onSignUp}>
        <h2 className='form-text'>Welcome to Robinhood</h2>
        <div>
          <label></label>
          <input
            type="text"
            name="first_name"
            onChange={updateFirstName}
            value={firstName}
            placeholder="First name"
          ></input>
        </div>
        <div>
          <label></label>
          <input
            type="text"
            name="last_name"
            onChange={updateLastName}
            value={lastName}
            placeholder="Last name"
          ></input>
        </div>
        <div>
          <label></label>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            placeholder="Email"
          ></input>
        </div>
        <div>
          <label></label>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
            placeholder="Password"
          ></input>
        </div>
        <div>
          <label></label>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder="Confirm password"
          ></input>
        </div>
        <div className='redirect-text'>Have an account?
          <a href="/login" className="redirect-link"> Log in </a>
          <span>or</span>
          <a href="/" className="home-link"> Home</a>
        </div>
        <button className='form-btn' type="submit">Sign Up</button>
        <button className='form-btn' type="submit" onClick={demoUser}>Demo User</button>

      </form>

    </div>
  );
};

export default SignUpForm;
