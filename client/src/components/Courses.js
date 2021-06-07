/* 
 * This component retreives and renders the list of courses in the database.
 * The component also renders a link to the "Create Course" page.
*/
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Courses extends Component {
  state = {
    courses: []
  }

  /* Retreive course list from the REST API */
  componentDidMount(){
    const context  =  this.props.context;

    context.data.getCourses()
    .then( courses => {
      this.setState({
        courses
    })})
    .catch((error) => {
        this.props.history.push('/error');
    })
  }
  

  /* Render course list and Create Course button */
  render() {
    const courses = this.state.courses;
    return (
      <div className="wrap main--grid">
            {courses.map(course => 
                <NavLink className="course--module course--link" to={`courses/${course.id}`} key={course.id}>
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </NavLink>
            )}
            <NavLink className="course--module course--add--module" to="/courses/create">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </NavLink>
      </div>
    )
  }
}