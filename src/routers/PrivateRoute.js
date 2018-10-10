import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

// a wrapper around Route. add conditional logic
// rest operator, just get the rest of the props, so they get down correctly
// rest is like spread, but it only gets things that are not yet destructured
// we dont want isAuthenticated goin to Route (not supported)
// ...and only want the Component passed down if isAuth=true

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (

    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header/>
                <Component {...props} />
            </div>
        ) : (
            <Redirect to="/" />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);