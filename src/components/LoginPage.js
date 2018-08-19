import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = () => (
    <div>
        <button
        onClick={startLogin}>log in</button>
    </div>
);


const mapDispatchToProps = (dispatch) => ({
   startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage)



// the undefined there is map state to props


// export default class LoginPage extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         return (
//
//         )
//
//     }
// }