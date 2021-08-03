import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import "./auth.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(["Passwords Do not match"])
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const demoUser = await dispatch(login("demo@aa.io", "password"));
    if (demoUser) {
      setErrors(demoUser);
    }
  };


  const updateUsername = (e) => {
    setUsername(e.target.value);
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
    return <Redirect to='/' />;
  }

  return (
    <div className='signUp_container'>
      <form onSubmit={onSignUp}>
        <div className="signup_info">
          <div className="signup_title_container">
            <h1 className="Signup_title" >Sign Up</h1>
          </div>
          <div>
            {errors.map((error, ind) => (
              <div className="errors" key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <div className="form_label_container">
              <label>User Name</label>
            </div>
            <input
              className="signup_input_name"
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <div className="form_label_container">
              <label>Email</label>
            </div>
            <input
              className="signup_input_name"
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <div className="form_label_container">
              <label>Password</label>
            </div>
            <input
              className="signup_input_name"
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <div className="form_label_container">
              <label>Repeat Password</label>
            </div>
            <input
              className="signup_input_name"
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button className="login_submit_btn" type='submit'>Sign Up</button>
          <p>
            <div>
              <div>
                Already have an account?{" "}
              </div>
              <div className="signUp_link">
                <Link to="/login" >
                  <span>Log In here here</span>
                </Link>
              </div>
            </div>
          </p>
        </div>
        <button
          className="demo_user_button"
          onClick={demoLogin}>
          Log in as a <span>Demo user</span>
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
