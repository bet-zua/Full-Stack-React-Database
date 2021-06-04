/* Stateful component. Provides the "Courses" screen by retrieving
the list of courses from the REST API's /api/courses route and
rendering a list of courses */
import React, { Component } from 'react';

export default class Courses extends Component {
    render() {
      return (
        <div >
            <h1>Welcome to the Main Page</h1>
        </div>
      );
    }
  }
  //Links to its respective "Course Detail" screen & renders link to "Create Course" screen

//Retreive data from the REST API when those components are mounted
