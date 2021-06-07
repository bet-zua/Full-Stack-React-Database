/* eslint-disable import/no-anonymous-default-export */
/* 
 * HOC configures protected routes (those requiring authentication).
*/
import React from 'react';
import { Consumer } from '../Context';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, ...rest }) => {
    return (
        <Consumer>
            {context => (
                <Route
                    {...rest}
                    render={props => context.authenticatedUser ? (
                        <Component {...props} />
                    ) : (
                            <Redirect to={{
                                pathname: '/signin',
                                state: { from: props.location }
                            }} />
                        )
                    }
                />
            )}
        </Consumer>
    );
};