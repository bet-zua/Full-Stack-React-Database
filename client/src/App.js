/* This will be used to render the trouter that wraps the components of the app */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//helper components
import withContext from './Context';
import PrivateRoute from './components/PrivateRoute';
//import Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';


const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailsWithContext = withContext(CourseDetails);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContextt = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);


function App() {
  return (
    <Router>
      <HeaderWithContext />
      <main>
        <Switch>
            <Route exact path="/" component={CoursesWithContext} />
            <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
            <PrivateRoute path='/courses/:id/update' component={UpdateCourseWithContext} />
            <Route path="/courses/:id" component={CourseDetailsWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContextt} />
            <Route path="/signout" component={UserSignOutWithContext} />
          </Switch>
      </main>
    </Router>
  );
}

export default App;
