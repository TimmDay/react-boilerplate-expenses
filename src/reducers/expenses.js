// Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            //code that adds expense to the array
            // do not change the original array, so no push
            // return state.concat(action.expense);
            return [
                ...state,
                action.expense
            ];

        case 'REMOVE_EXPENSE' :
            // const newArr = [];
            // state.forEach((item) => {
            //     if (item.id !== action.id){
            //         newArr.push(item);
            //     }
            // });
            // return newArr;

            return state.filter(({ id }) => id !== action.id );

        case 'EDIT_EXPENSE':
            // go through array for match
            // when found, correctly change it

            return state.map((ex) => {
                if (ex.id === action.id) {
                    //return edited object
                    return {
                        ...ex,
                        ...action.updates
                        // action updates is whatever was called in the dispatch
                        // will override
                    }

                } else {
                    return ex;
                }
            });

        case 'SET_EXPENSES':
            // remove existing expenses from store
            // add provided expenses to store
            return action.expenses;

        default:
            return state;
    }
};

export default expensesReducer;