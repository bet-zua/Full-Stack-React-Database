/*Stateful Component*/
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        errors: [],
    }

    render(){
        const {
            firstName, lastName, emailAddress, password, errors
        } = this.state;
        return(
            <main>
                <div className='form--centered'>
                    <h2>Sign Up</h2>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign In"
                        elements={() => (
                        <React.Fragment>
                            {/* <form> */}
                            <label>First Name
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={this.change}
                                    placeholder="First Name" />
                            </label>
                           
                            <label>Last Name
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={this.change}
                                    placeholder="Last Name" />
                            </label>
                            
                            <label>Email Address
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    value={emailAddress}
                                    onChange={this.change}
                                    placeholder="Email Address" />
                            </label>    
                            
                            <label>Password
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={this.change}
                                    placeholder="Password" />
                            </label>
                           
                            <label>Confirm Password
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={password}
                                    onChange={this.change}
                                    placeholder="Confirm Password" />
                            </label>    
                            {/* </form> */}
                        </React.Fragment>
                    )} />
                    <p>Already have a user account? <NavLink to="/signin">Click here!</NavLink> to sign in!</p>
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
        const { firstName, lastName, emailAddress, password } = this.state;
    
        //Create new user
        const user = {
          firstName,
          lastName,
          emailAddress,
          password
        };
    
        context.data.createUser(user)
        .then(errors => {
          if(errors.length){
            this.setState({ errors });
          } else {
            context.actions.signIn(emailAddress, password)
            .then(() => {
              this.props.history.push('/');
            })
    
          }
        })
        .catch(err => {
          this.props.history.push('/error');
        })
      }
    
      cancel = () => {
        this.props.history.push('/');
      }
}