import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

//can destructure dispatches off of props as arg
export const LoginPage = ({ startLogin }) => (
    <div>
        <button
            onClick={startLogin}>log in
        </button>
    </div>
);


const mapDispatchToProps = (dispatch) => ({
   startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage)
// the undefined there is map state to props
