import filtersReducer from '../../reducers/filters';
import moment from 'moment';


// default values sets up correctly when redux store first kicks off
test('should set up default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

// need sortBy to start as amount (not default date) so we can test that it changes to date
test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    };
    const action = { type: 'SORT_BY_DATE'};

    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});


test('should set text filter', () => {
    const text = 'filter text';
    const action = { type: 'SET_TEXT_FILTER', text: text }
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe(text);
});


test('should set startDate filter', () => {
    const action = { type: 'SET_START_DATE', date: moment(0) };
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(moment(0));
});


test('should set endDate filter', () => {
    const state = filtersReducer(undefined, { type: 'SET_END_DATE', date: moment(0) });
    expect(state.endDate).toEqual(moment(0));
});