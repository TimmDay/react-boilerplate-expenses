import { setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount } from "../../actions/filters";
import moment from 'moment';

test('should generate set start date acton object', () => {
   const action = setStartDate(moment(0));
   expect(action).toEqual({
       type: 'SET_START_DATE',
       date: moment(0)
   });
});

test('should generate set end date acton object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        date: moment(0)
    })
});


test('should generate text filter action object, with default when no arg given', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
});

test('should generate text filter action obj, with arg given', () => {
    const action = setTextFilter('abc');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'abc'
    })
});


test('should generate sort by date action object', () => {
    const action = sortByDate();
    expect(action).toEqual({ type: 'SORT_BY_DATE' })
});

test('should generate sort by amount action object', () => {
    const action = sortByAmount();
    expect(action).toEqual({ type: 'SORT_BY_AMOUNT' })
});