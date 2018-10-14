import React from 'react';
import {Link} from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import {connect} from 'react-redux'; //connect so we can dispatch to store

import {startAddExpense} from "../actions/expenses";

// export so that we can test the unconnected version of the component
export class AddExpense extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        this.props.history.push('/dashboard');
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">add expense</h1>
                    </div>
                </div>


                <div className="content-container">
                    <ExpenseForm
                        onSubmit={this.onSubmit}
                    />
                </div>

                <Link to="/dashboard">back</Link>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpense);

// first parenthesis for mapping state as props, 2nd the component
// with connect wired up, we can access props.dispatch

// components rendered inside react router get access to special props -> history.push
// push takes single string path arg
// switches over like link click (no full page refresh)