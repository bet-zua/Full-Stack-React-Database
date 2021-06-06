/*Stateful Component*/
import React, { Component } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        user: {},
        errors: [],
    }

    componentDidMount(){
        this.props.context.data.getCourse(this.props.match.params.id)
        .then(course => {
            this.setState({
                title: course.title,
                description: course.description,
                estimatedTime: course.description,
                materialsNeeded: course.materialsNeeded,
                user: course.User,
            });
        })     
		.catch(err => {
            this.props.history.push('/error');
		});
    }

    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            user,
            errors,
        } = this.state;
        return (
            <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <div className="main--flex">
                    <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Update Course"
                        elements={() => ( 
                            <React.Fragment>
                                <label htmlFor="title">Course Title</label>
                                <input 
                                id="title" 
                                name="title" 
                                type="text"
                                value={title} 
                                onChange={this.change} />
                                <p>By {user.firstName} {user.lastName} </p>
                                <label htmlFor="description">Course Description</label>
                                <textarea
                                id="description"
                                name="description"
                                type="text"
                                value={description}
                                onChange={this.change}
                                placeholder="Description" />
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
        const { context } = this.props; 
        const id = this.props.match.params.id; 
        const { emailAddress } = context.authenticatedUser;
        const { password } = context.authenticatedUser;

        const {
            title, 
            description, 
            estimatedTime,
            materialsNeeded,
        } = this.state; 

        const course = {title, description, estimatedTime, materialsNeeded }

        context.data.updateCourse(id, course, emailAddress, password)
        .then( errors => {
            if (errors.length) {
                this.setState({ errors })
            } else {
                console.log(`${title} is successfully updated!`);
                this.props.history.push(`courses/${id}`)
            }
        })
        .catch( err => {
            this.props.history.push('/error');
        })
    } 

    cancel = () => {
        this.props.history.push('/');
    }

}