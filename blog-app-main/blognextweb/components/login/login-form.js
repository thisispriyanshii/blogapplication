import { useState, useEffect, useContext } from 'react';

import classes from './contact-form.module.css';
import Notification from '../ui/notification';
import AuthContext from '../store/auth-context';

async function loginUser(contactDetails) {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
  return data;
}

function LoginForm() {
  const [enteredUserName, setEnteredUserName] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function loginHandler(event) {
    event.preventDefault();

    // optional: add client-side validation

    setRequestStatus('pending');

    try {
      const response = await loginUser({
        usernameOrEmail: enteredUserName,
        password: enteredPassword,
      });
      authCtx.login({username: enteredUserName, jwt: response?.data?.accessToken});
      setRequestStatus('success');
      setEnteredPassword('');
      setEnteredUserName('');
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  }

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Logging In...',
      message: 'Blogging in Few Minutes!',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Logged in successfully!',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>Fill in the details to Login</h1>
      <form className={classes.form} onSubmit={loginHandler}>
        <div className={classes.control}>
          <label htmlFor='message'>Your Username or Email</label>
          <textarea
            id='username'
            rows='2'
            required
            value={enteredUserName}
            onChange={(event) => setEnteredUserName(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Password</label>
          <textarea
            id='password'
            rows='2'
            required
            value={enteredPassword}
            onChange={(event) => setEnteredPassword(event.target.value)}
          ></textarea>
        </div>
 
        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default LoginForm;
