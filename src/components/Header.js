import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <h1> The Title! </h1>
        <ul>
            <li><NavLink to="/" activeClassName="is-active" exact={true}>home</NavLink></li>
            <li><NavLink to="/create" activeClassName="is-active" exact={false}>add expense</NavLink></li>
            <li><NavLink to="/help" activeClassName="is-active" exact={false}>help</NavLink></li>
            <NavLink to="/dogs" activeClassName="is-active" exact={false}>broken link</NavLink>
        </ul>
    </header>
);

export default Header;