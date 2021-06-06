/* StateLESS Component
 * Sign out the authenticated user 
 * Redirect the user to the defailt route.
*/
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const UserSignOut = ({context}) => {
    // component calls signOut and updates state after render
    useEffect(() =>  context.actions.signOut());
  
    return (
      <Redirect to="/" />
    );
  }
  export default UserSignOut;