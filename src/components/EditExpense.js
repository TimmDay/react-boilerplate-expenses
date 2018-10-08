import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {startEditExpense, startRemoveExpense} from "../actions/expenses";


export class EditExpense extends React.Component {

    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/dashboard');
    };

    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/dashboard');
    };

    render() {
        return (
            <div>
                {/*<p>editing expense {this.props.match.params.id} </p>*/}

                {/* populate fields with existing values */}
                <ExpenseForm
                    existingExpense={this.props.expense}
                    onSubmit={this.onSubmit}
                />

                <button
                    onClick = {this.onRemove}
                >Remove</button>
            </div>
        )
    }
}

// 2nd arg, access props that were passed to component in connect func
// the match.params.id was passed onto props by the router.
// we specified :id in the route, so match.params.id will have whatever val in the url is in the place of id
// end result: we get the id of the selected expense by using the url to pick it out of current state
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id;
        })
    }
};
// MORE CONCISE PATTERN OF ABOVE
//     ({
//     expense: state.expenses.find((expense) => {
//         return expense.id === props.match.params.id;
//     })
// });

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);