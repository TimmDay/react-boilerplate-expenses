import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from './../selectors/expenses';

// use map to iterate over list and render each one
// export unconnected verion (for testing only)
export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0
                ? (<p> no expenses </p>)
                : (
                props.expenses.map((ex) => (
                    <ExpenseListItem
                        key = {ex.id}
                        {...ex}
                    />
                ))
            )
        }
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);

//state.expenses is the complete array. to filter it we need our selector

// HOC - to access redux store
// connect gives us a function back... so second parenthesis to use pass in component
// in the connect call we also specify what part of the store we want to access, with a func
// return an object


// long version of code, for clarity of understanding / reference
// const ConnectedExpenseList = connect((state) => {
//
//     return {
//         expenses : state.expenses
//     };
//
// })(ExpenseList);
//
//
// export default ConnectedExpenseList;

//alternative: export default connect ((....
