/*
 * This component allows authorized users (course owners) to update course details.
 * A cancel button allows users to return to the default page.
*/
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
            if(course.userId !== this.state.user.id){
              this.props.history.push('/forbidden');
              }              
        })     
		.catch(err => {
            this.props.history.push('/notfound');
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
        return ( <div className="wrap">
        <h2>Update Course</h2>
        <Form 
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <div className="main--flex">
                <div>
                  <label>Course Title
                    <input 
                      id="title" 
                      name="title" 
                      type="text"
                      value={title} 
                      onChange={this.change} />
                  </label>
                  <p>By {user.firstName} {user.lastName}</p>
                  <label>Course Description
                    <textarea 
                      id="description" 
                      name="description" 
                      type="text"
                      value={description || ''} 
                      onChange={this.change} />
                  </label>
                </div>
                <div>
                  <label>Estimated Time
                    <input 
                      id="estimatedTime" 
                      name="estimatedTime" 
                      type="text"
                      value={estimatedTime || ''} 
                      onChange={this.change} />
                  </label>
                  <label>Materials Needed
                    <textarea 
                      id="materialsNeeded" 
                      name="materialsNeeded"
                      type="materialsNeeded"
                      value={materialsNeeded || ''} 
                      onChange={this.change} />
                  </label>
                </div>
              </div>
            </React.Fragment>
          )} />
        </div>
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
                this.props.history.push(`courses/${id}`)
            }
        })
        .catch( err => {
            this.props.history.push('/error');
        })
    } 

    cancel = () => {
        this.props.history.push(`/courses/${this.props.match.params.id}`);
    }

}