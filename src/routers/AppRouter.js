import React from 'react'; //because we are using JSX
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from './../components/LoginPage';
import ExpenseDashboardPage from './../components/ExpenseDashboardPage.js';
import AddExpense from './../components/AddExpense';
import EditExpense from './../components/EditExpense';
import HelpPage from './../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

import PrivateRoute from './PrivateRoute';



export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                <PrivateRoute path="/create" component={AddExpense} />
                <PrivateRoute path="/edit/:id" component={EditExpense} />
                <Route path="/help" component={HelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;

// router can run authentication check before rendering the specific component
// use PrivateRoute instead of Route




// browserRouter can only have one child

// exact treu means that url matches only for exact match.
// Otherwise the / would match every URL so the content would be the same each time

// using a component inside a ROute has some special props with it

// the : the ROute path means to dynamically match whatever comes after this point (what follows the : can vary, but still match)
// exact true means do not match if there is stuff after the given path

//props passed by router inc: match.params, history


//todo readme
// https://www.npmjs.com/package/history
// yarn add