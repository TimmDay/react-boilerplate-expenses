import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header>
        <h1> The Title! </h1>
        <ul>
            {/* first link not needed any more*/}
            {/*<li><NavLink to="/" activeClassName="is-active" exact={true}>log in</NavLink></li> */}
            <li><NavLink to="/dashboard" activeClassName="is-active" exact={false}>dash</NavLink></li>
            <li><NavLink to="/create" activeClassName="is-active" exact={false}>add expense</NavLink></li>
            <li><NavLink to="/help" activeClassName="is-active" exact={false}>help</NavLink></li>
            <NavLink to="/dogs" activeClassName="is-active" exact={false}>broken link</NavLink>

            <button onClick={startLogout}>Logout</button>
        </ul>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);