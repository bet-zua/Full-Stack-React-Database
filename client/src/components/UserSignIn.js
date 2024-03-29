/* 
 * This component allows a user to sign in using existing account information.
 * A 'Cancel' button allows the user to return to the main page.
*/
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    render() {
        const {
            emailAddress,
            password,
            errors,
        } = this.state;
        return (
            <main>
                <div className="form--centered">
                    <h2>Sign In</h2>
                    <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign In"
                        elements={() => (
                        <React.Fragment>
                            <label >Email Address
                                <input 
                                id="emailAddress" 
                                name="emailAddress" 
                                type="text"
                                value={emailAddress} 
                                onChange={this.change} 
                                placeholder="Email Address" />
                            </label>
                            
                            <label >Password
                                <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={this.change}
                                placeholder="Password" />  
                            </label>       
                        </React.Fragment>
                        )} 
                    />
                    <p>Don't have a user account? <NavLink to="/signup">Click here to sign up!</NavLink> </p>
                </div>
            </main>
        )
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
      }
    
      submit = () => {
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' }};
        const { emailAddress, password } = this.state;

        context.actions.signIn(emailAddress, password)
        .then(user => {
            if(user === null){
                this.setState(() => {
                return { errors: ['Unsuccessful sign-in!']};
            });
        } else {
            this.props.history.push(from);
        }
        })
        .catch((err) => {
            console.log(err);
            this.props.history.push('/error');
        });
      }
    
      cancel = () => {
        this.props.history.push('/');
      }
}