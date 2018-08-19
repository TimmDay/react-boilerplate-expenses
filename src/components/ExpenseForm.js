import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates'; // requires moment


// this one is reusable.
// for use in AddExpense and EditExpense

// form fields, validation and logic

export default class ExpenseForm extends React.Component {


    // when form submitted, we will send it off to redux
    // to either edit existing expense or create new one
    //note optional, number can be zero if they want. just REQUIRE desc
    // define onCHange otherwise read only inputs

    // for amount input, enforce format
    // - only numbers, one decimal, two num after
    // - use string and convert to num last
    // conditional logic in oncChnage handler


    constructor(props) {
        super(props);
        // local component state
        this.state = {
            description: props.existingExpense ? props.existingExpense.description : '',
            note: props.existingExpense ? props.existingExpense.note : '',
            amount: props.existingExpense ? (props.existingExpense.amount / 100).toString() : '',
            createdAt: props.existingExpense ? moment(props.existingExpense.createdAt) : moment(), // current time
            calendarFocused: false,
            error: ''
        };
    }


    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description: description }));
    };
    onNoteChange = (e) => {
        // e.persist();
        this.setState(() => ({ note: e.target.value}));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;

        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount: amount }));
        }
    };


    onDateChange = (createdAt) => {
        if (createdAt) { //prevents user clearing the value
            // because if date is cleared, this func gets called with nothing
            // (we don't want to update this part of state to nothing)
            this.setState(() => ({ createdAt: createdAt }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(()=> ({ calendarFocused: focused }));
    };

    onSubmit = (e) => {
        e.preventDefault(); //otherwise browser does full page refresh

        if (!this.state.description || !this.state.amount) {
            // set error state equal 'please provide description and amount'
            this.setState(() => ({error: 'please provide description and amount'}))
        } else {
            this.setState(() => ({error: ''}));
            // the dispatch to store func, added as prop in AddExpense when form instantiated
            // * 100 to cents
            // javascript works in ms
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };


    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form
                    onSubmit={this.onSubmit}
                >
                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />

                    <input
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />

                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false} //every day available, past and future
                    />

                    <textarea
                        placeholder="add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>

                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}
