import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

const ExpenseDashboardPage = () => (
    <div>
        <p> the dashboard component </p>
        < ExpensesSummary />
        < ExpenseListFilters />
        < ExpenseList />
    </div>
);

export default ExpenseDashboardPage;