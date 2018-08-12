import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from "../actions/filters";
import { DateRangePicker } from 'react-dates';


class ExpenseListFilters extends React.Component {

    // class-based components need 'this' keyword before props
    constructor(props) {
        super(props);
    }

    state = {
        calendarFocused: null
    };

    onDatesChange = ({ startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };

    onFocusChange = (calendarFocused) => {
      this.setState(() => ({
          calendarFocused: calendarFocused
      }));
    };

    render() {
        return (
            <div>
                <input type="text"
                       value = {this.props.filters.text}
                       onChange={(e) =>{
                           //use dispatch to update redux store according to keystrokes
                           this.props.dispatch(setTextFilter(e.target.value));
                           console.log(e.target.value); //todo
                       }}
                />

                <select
                    value = {this.props.filters.sortBy}
                    onChange={(e) => {
                        e.target.value === 'date' && this.props.dispatch(sortByDate());
                        e.target.value === 'amount' && this.props.dispatch(sortByAmount());
                    }}
                >
                    <option value='date'>Date</option>
                    <option value='amount'>Amount</option>
                </select>

                <DateRangePicker
                    startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
                    // startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
                    // endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                    focusedInput={this.state.calendarFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false} //back in time
                />

            </div>
        )

    }
}



// puts the state from the store into the props for this component
const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
};


export default connect(mapStateToProps)(ExpenseListFilters);