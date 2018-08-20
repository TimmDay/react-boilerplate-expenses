import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense, removeExpense} from "../actions/expenses";


export class EditExpense extends React.Component {

    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/dashboard');
    };

    onRemove = () => {
        this.props.removeExpense({ id: this.props.expense.id });
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

// give the component the current expense object as props
const mapStateToProps = (state, props) =>
{
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
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    removeExpense: (data) => dispatch(removeExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);