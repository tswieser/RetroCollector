import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };


  const demoLogin = async (e) => {
    e.preventDefault();
    const demoUser = await dispatch(login("demo@aa.io", "password"));
    if (demoUser) {
      setErrors(demoUser);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login_container'>
      <form onSubmit={onLogin}>
        <div className="login_info">
          <div className="login_title_container">
            <h1 className="login_title" >Log In</h1>
          </div>
          <div>
            {errors.map((error, ind) => (
              <div className="errors" key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <div className="form_label_container">
              <label htmlFor='email'>Email</label>
            </div>
            <input
              className="login_input_name"
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <div className="form_label_container">
              <label htmlFor='password'>Password</label>
            </div>
            <input
              className="login_input_name"
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <div>
              <button className="login_submit_btn" type='submit'>Login</button>
            </div>
            <p>
              <div className="link_container">
                <div>
                  Don't have an account yet?{" "}
                </div>
                <div className="signUp_link">
                  <Link to="/sign-up" >
                    <span>Create one here</span>
                  </Link>
                </div>
              </div>
            </p>
          </div>

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

export default LoginForm;
