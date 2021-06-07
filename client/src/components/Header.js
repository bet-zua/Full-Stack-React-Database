/*
 * Displays the top menu bar.
 * If the user has been authenticated, a welcome message & 'Sign Out' button are displayed.
 * Otherwise, 'Sign in" and 'Sign up' buttons are displayed.
*/
import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends React.PureComponent {

  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser; 
    return (
      <header>
        <div className="wrap header--flex">
                <h1 className="header--logo"><NavLink to="/">Courses</NavLink></h1>
                <nav>
                  {
                    authUser?
                    <ul className="header--signedin">
                        <li>Hi, {authUser.firstName}! Welcome to the Database!</li>
                        <li><NavLink to="/signout">Sign Out</NavLink></li>
                    </ul>
                    :
                    <ul className="header--signedout">
                        <li><NavLink to="/signup">Sign Up</NavLink></li>
                        <li><NavLink to="/signin">Sign In</NavLink></li>
                    </ul>
                  }
                    
                </nav>
            </div>
      </header>
    );
  }

};