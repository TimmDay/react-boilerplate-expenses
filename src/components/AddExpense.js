import React from 'react';
import { Link } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
// we don't dispatch in expense form, because we want that to be reusable
// data is different dep on add/edit expense, so dispatch at that level
import { connect } from 'react-redux'; //connect so we can dispatch to store
import { startAddExpense } from "../actions/expenses";

// export so that we can test the unconnected version of the component
export class AddExpense extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        this.props.history.push('/dashboard');
    };

    render() {
        return (
            <div>
                <h1>add expense</h1>

                <ExpenseForm
                    onSubmit={this.onSubmit}
                />

                <Link to="/dashboard">back</Link>
            </div>
        )
    }
}

// export default AddExpense;

const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpense);
// first parenthesis for mapping state as props, 2nd the component
// with connect wired up, we can access props.dispatch

// components rendered inside react router get access to special props -> history.push
// push takes single string path arg
// switches over like link click (no full page refresh)