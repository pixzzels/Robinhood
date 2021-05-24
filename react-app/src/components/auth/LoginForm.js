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
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data.errors) setErrors(data.errors);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className='form-wrapper'>
      <div className='form-image__container'>
        <img alt='login image' className='form-image' src={formImg}></img>
      </div>

      <form className='form-container' onSubmit={onLogin}>
        <h2 className='form-text__container'>Welcome back</h2>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>

        <div className='form-fill__container'>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={updatePassword}
            />
          </div>
        </div>

        <div className="form-btn__container">
          <button type="submit">Sign In</button>
          <button type="submit" onClick={demoUser}>Demo User</button>
          <div>Don't have an account?
          <a href="/sign-up" className="redirect-link"> Sign up</a>
          </div>
        </div>

      </form>

    </div>
  );
};

export default LoginForm;
