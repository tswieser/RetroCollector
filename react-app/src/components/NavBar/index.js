
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
                <div>
                    <NavLink to='/collections' exact={true} activeClassName='active'>
                        Collections
                    </NavLink>
                </div>
                <div className="logout_container">
                    <LogoutButton />
                </div>
            </div>

        )
    } else {
        sessionLinks = (
            <div>
                <div>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
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
                    <NavLink to='/' exact={true} activeClassName='active'>
                        Home
                    </NavLink>
                    {sessionLinks}
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
