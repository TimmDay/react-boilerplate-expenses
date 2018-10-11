import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

//can destructure dispatches off of props as arg
export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expense Tracker</h1>
            <p>You count, and we count for you</p>
            <button className="button" onClick={startLogin}>Login with Google</button>
        </div>

    </div>
);


const mapDispatchToProps = (dispatch) => ({
   startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage)
// the undefined there is map state to props
