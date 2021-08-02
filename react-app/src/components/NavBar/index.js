
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css"

const NavBar = () => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className="user_btns">
                <div className="logout_container">
                    <LogoutButton />
                </div>
            </div>

        )
    } else {
        sessionLinks = (
            <div>
                <div className="signup_btn_container">
                    <NavLink style={{ textDecoration: 'none' }} className="signup_button" to='/sign-up' exact={true} activeClassName='active'>
                        SIGN UP
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/login' exact={true} activeClassName='active'>
                        LOG IN
                    </NavLink>
                </div>

            </div>
        );
    }
    return (
        <nav >
            <ul id="nav_container" >
                <li className="nav_bar">
                    <div className="site_title">
                        {/* <i class="fas fa-gamepad fa-4x"></i> */}
                        <div className="controller"></div>
                        <h1>Retro Collector</h1>
                    </div>
                    {/* <NavLink to='/' exact={true} activeClassName='active'>
                        Home
                    </NavLink> */}
                    {sessionLinks}
                </li>
            </ul>
            <ul id="side_bar_container">
                <li className="side_bar">
                    <div className="Home_side_container">
                        <NavLink style={{ textDecoration: 'none', color: "#b3b3b3" }} to='/' exact={true} activeClassName='active'
                            activeStyle={{
                                fontWeight: 'bold',
                                color: 'white',
                                background_Color: "#b3b3b3"
                            }}
                        >
                            <i class="fas fa-home fa-1x"></i> Home
                        </NavLink>
                    </div>
                    <div>
                        <NavLink style={{ textDecoration: 'none', color: "#b3b3b3" }} to='/collections' exact={true} activeClassName='active'
                            activeStyle={{
                                fontWeight: 'bold',
                                color: 'white',
                                background_Color: "#b3b3b3"
                            }}
                        >
                            <i class="fas fa-stream"></i> Collections
                        </NavLink>
                    </div>
                </li>
            </ul>
        </nav >
    );
}

export default NavBar;
