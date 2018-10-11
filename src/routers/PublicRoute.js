import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (

    <Route {...rest} component={(props) => (
        !isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to="/dashboard" />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);


// create PublicRoute
// Redirect to /dashboard if logged in
// Render component if not logged in
// use it for login page