import React from 'react';
import { Link } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
// we don't dispatch in expense form, because we want that to be reusable
// data is different dep on add/edit expense, so dispatch at that level
import { connect } from 'react-redux'; //connect so we can dispatch to store
import { addExpense } from "../actions/expenses";


const AddExpense = (props) => (
    <div>
        <h1>add expense</h1>

        <ExpenseForm
            onSubmit={(expense)=>{
                props.dispatch(addExpense(expense)); //add to redux store
                props.history.push('/');
            }}
        />

        <Link to="/">back</Link>
    </div>
);

// export default AddExpense;


export default connect()(AddExpense);
// first parenthesis for mapping state as props, 2nd the component
// with connect wired up, we can access props.dispatch

// components rendered inside react router get access to special props -> history.push
// push takes single string path arg
// switches over like link click (no full page refresh)