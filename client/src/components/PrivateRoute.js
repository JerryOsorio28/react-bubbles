import React from 'react';
import { Route } from 'react-router-dom';

//importing Redirect from react router dom
import { Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest}
            render={props => {
                // Check if user is authenticated, if so, it will render the 'Component' prop, if not, will be redirected to user login.
                if (localStorage.getItem('token')){
                    return <Component {...props} />;
                }
                return <Redirect to ='/' />
            }}
        />
    )
};

export default PrivateRoute