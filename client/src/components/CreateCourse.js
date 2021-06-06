/*Stateful Component*/
import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        authUserId: this.props.context.authenticatedUser.id,
        errors: [],
    }

    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            authUserId,
            errors,
        } = this.state;
        return(
            <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <div className="main--flex">
                    <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Create Course"
                        elements={() => ( 
                            <React.Fragment>
                                <label htmlFor="title">Course Title</label>
                                <input 
                                id="title" 
                                name="title" 
                                type="text"
                                value={title} 
                                onChange={this.change} />
                                <p>By {authUserId.firstName} {authUserId.lastName} </p>
                                <label htmlFor="description">Course Description</label>
                                <textarea 
                                id="description" 
                                name="description" 
                                type="text"
                                value={description} 
                                onChange={this.change} />
                            </React.Fragment>
                    )} />
                    <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                        <input 
                        id="estimatedTime" 
                        name="estimatedTime" 
                        type="text"
                        value={estimatedTime} 
                        onChange={this.change} />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea 
                        id="materialsNeeded" 
                        name="materialsNeeded" 
                        type="text"
                        value={materialsNeeded} 
                        onChange={this.change} />
                    </div>
                </div>
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
        const context = this.props.context;
        const emailAddress = context.authenticatedUser.emailAddress; 
        const password   = context.authenticatedUser.password;
    
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            authUserId,
        } = this.state;
    
        const course = { title, description, estimatedTime, materialsNeeded, authUserId };
        
        context.data.createCourse(course, emailAddress, password)
            .then((errors) => {
                if (errors.length) {
                    this.setState({ errors })
                } else {
                    this.props.history.push("/");
                }
            })
    
            .catch((error) => {
                console.error(error);
                this.props.history.push('/error');
            });
    }
    
    cancel = () => {
        this.props.history.push('/');
    }
}