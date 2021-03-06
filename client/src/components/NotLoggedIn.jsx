import React from 'react';
import Login from './Login';
import Button from 'material-ui/Button';
let NotLoggedIn = (props) => {
  const styles = {
    display: 'flex'
  }
  return (
    <div style={styles}>
      <Login login={props.login} buttonTitle='Log In'/>
      <Button color="contrast" onClick={() => props.triggerView('createAccount')}>Sign Up</Button>
    </div>
  )
}

export default NotLoggedIn;