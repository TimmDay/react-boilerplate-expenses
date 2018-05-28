import moment from 'moment';

// GET visibile expenses
//combine info from the two stores to display only filtered data

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate }) => {

    return expenses.filter((expense) => {
        // if typeof not number, say true (so that it has no effect)
        // true items are not filtered
        // const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        // const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;

        // console.log(moment());
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true; //never filter if no endDate

        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
            //most recent first. so the -1 goes to the highest number

        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
            // larget amount first
        }
    })
};

export default getVisibleExpenses;