import React from 'react';
import {connect} from 'react-redux';
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from "../actions/filters";
import {DateRangePicker} from 'react-dates';


export class ExpenseListFilters extends React.Component {

    // class-based components need 'this' keyword before props
    constructor(props) {
        super(props);
    }

    state = {
        calendarFocused: null
    };

    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({
            calendarFocused: calendarFocused
        }));
    };

    onTextChange = (e) => {
        //use dispatch to update redux store according to keystrokes
        this.props.setTextFilter(e.target.value);
        // console.log(e.target.value);
    };
    onSelectChange = (e) => {
        e.target.value === 'date' && this.props.sortByDate();
        e.target.value === 'amount' && this.props.sortByAmount();
    };

    render() {
        return (
            <div className="content-container">

                <div className="input-group">
                    <div className="input-group__item">
                        <input type="text"
                               className="text-input"
                               placeholder="search expenses"
                               value={this.props.filters.text}
                               onChange={this.onTextChange}
                        />
                    </div>

                    <div className="input-group__item">
                        <select
                            className="select"
                            value={this.props.filters.sortBy}
                            onChange={this.onSelectChange}
                        >
                            <option value='date'>Date</option>
                            <option value='amount'>Amount</option>
                        </select>
                    </div>

                    <div className="input-group__item">                        <DateRangePicker
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

                </div>

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

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (data) => dispatch(setStartDate(data)),
    setEndDate: (data) => dispatch(setEndDate(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);