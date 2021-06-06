/*Stateful Component*/
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Courses extends Component {
    //stateFUL
    state = {
        course: {},
        user: {},
        id: this.props.match.params.id,
    }

    //Retreive data from the REST API when those components are mounted
    componentDidMount(){

        const context  =  this.props.context;
        context.data.getCourse( this.state.id )
        .then( course => {
            this.setState({
              course: course,
              user: course.User
          })
          //console.log(this.state.course)
          //console.log(context.authenticatedUser);
        })
        .catch((error) => {
            console.log(error);
            this.props.history.push('/notfound');
        })

    }

    //send a delete request to the api's /api/course/:is route when delete button is clicked
    deleteCourse () {
        const context = this.props.context;
        const authUser = context.authenticatedUser;

        context.data.deleteCourse( this.state.id , authUser.emailAddress, authUser.password)
        .then(errors => {
            if (errors) {
                this.setState({ errors });
            } else {
                console.log('Course deletion successful.');
                this.props.history.push('/');
            }
        })
        .catch((error) => { 
            console.log(error);
            this.props.history.push('/error');
        });
    }

    render() {
        const { course, user } = this.state; // always destructure for easy access!
        return(
            <main>
            <div className="actions--bar">
                <div className="wrap">
                    <NavLink className="button" to={`/courses/${course.id}/update`}>Update Course</NavLink>
                    <NavLink className="button" to="/" onClick={() => this.deleteCourse()}>Delete Course</NavLink>
                    <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {user.firstName} {user.lastName}</p>
                            { course.description }
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {course.materialsNeeded}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
            </main>
        )
    }
}