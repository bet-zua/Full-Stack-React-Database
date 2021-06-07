/* This will be used to render the trouter that wraps the components of the app */

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// import context
import withContext from './Context';
//import Components
import Header from './components/Header';
import Courses from './components/Courses';
import PrivateRoute from './components/PrivateRoute';
import CourseDetails from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';

/* Adding Context to the components*/
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
            <Route path="/notfound" component={NotFound} />
            <Route path="/forbidden" component={Forbidden} />
            <Route path="/error" component={UnhandledError} />
            <Route> <Redirect to="/notfound"/> </Route>
          </Switch>
      </main>
    </Router>
  );
}

export default App;
