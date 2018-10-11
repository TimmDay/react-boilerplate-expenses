import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


export const PublicRoute = ({
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


// create PublicRoute
// Redirect to /dashboard if logged in
// Render component if not logged in
// use it for login page