/* 
 * This component retreives course information from the API and renders a 'Course Detail' page. 
 * If the user is authenticated, 'Delete' and 'Update' buttons are also displayed.
*/
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';

export default class CourseDetail extends Component {
    state = {
        course: {},
        user: {},
        id: this.props.match.params.id,
        errors:[]
    }

    /* Retreive course details from the REST API */
    componentDidMount(){
        const context  =  this.props.context;

        context.data.getCourse( this.state.id )
        .then( course => {
            this.setState({
              course: course,
              user: course.User
          })
        })
        .catch(err => {
            this.props.history.push('/error');
        })

    }

     /* Send delete request to /api/course/:id */
     deleteCourse () {
        const { context } = this.props;
		const authUser = context.authenticatedUser;

		context.data.deleteCourse(this.state.id, authUser.emailAddress, authUser.password)
		.then(errors => {
			if(errors.length){
				this.setState({ errors })
			} else {
				console.log(`Course deletion successful.`);
				this.props.history.push('/');
			}
		})
        .catch(err => {
            this.props.history.push('/error');
        });
    }

     /* Render Course Details page */
    render() {
        const { course, user } = this.state; 
        const authUser = this.props.context.authenticatedUser; 
        return(
            <main>
            <div className="actions--bar">
                {
                (authUser !== null && authUser.emailAddress===user.emailAddress)?
                <div className="wrap">
                    <NavLink className="button" to={`/courses/${course.id}/update`}>Update Course</NavLink>
                    <NavLink className="button" to="/" onClick={() => this.deleteCourse()}>Delete Course</NavLink>
                    <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                </div>
                :
                <div className="wrap">
                <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                </div>
                }
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {user.firstName} {user.lastName}</p>
                            <ReactMarkdown children={ course.description } />
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ReactMarkdown  className="course--detail--list" children={ course.materialsNeeded } />
                        </div>
                    </div>
                </form>
            </div>
            </main>
        )
    }
}