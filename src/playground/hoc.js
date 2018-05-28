

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>the info is: {props.info}</p>
    </div>
);


// HOC generator function that returns the ammended component (HOC)
const withAdminWarning = (WrappedComponent) => {

    //access component that we are trying to wrap
    // return new HOC comp. root div, add admin warning, then orig comp

    return (props) => (
      <div>
          { props.isAdmin && <p> you are logged in as system admin</p>}
          <p>warning: this is private info</p>
          <WrappedComponent {...props} />
      </div>
    );


};

const requireAuthentication = (WrappedComponent) => {

    return (props) => (
        <div>
            { props.isAuthenticated ? (
                <WrappedComponent {...props} />
            ) : (
                <p>You are not authorised to view this info</p>
            )}
        </div>
    )
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info)

// ReactDOM.render(
//     <AdminInfo isAdmin={true} info={"details!"}/>, document.getElementById('app')
// );

ReactDOM.render(
    <AuthInfo isAuthenticated={true} info={"details!"}/>, document.getElementById('app')
);