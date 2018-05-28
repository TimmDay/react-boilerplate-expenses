import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense, removeExpense} from "../actions/expenses";

const EditExpense = (props) => {
    // console.log(props);
    return (
        <div>
            <p>editing expense {props.match.params.id} </p>

            {/* populate fields with existing values */}
            <ExpenseForm
                existingExpense={props.expense}

                onSubmit={(expense) => {
                    //dispatch the action to edit the expense
                    props.dispatch(editExpense(props.expense.id, expense));
                    props.history.push('/');
                }}
            />

            <button
                onClick = {() => {
                    props.dispatch(removeExpense({id: props.expense.id}));
                    props.history.push('/');
                }}
            >Remove</button>

        </div>
    )
};


// give the component the current expense object as props
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id;
        })
    }
};

export default connect(mapStateToProps)(EditExpense);