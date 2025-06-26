import { useState, useEffect } from 'react';

import classes from './register-form.module.css';
import Notification from '../ui/notification';

async function registerUser(contactDetails) {
    const response = await fetch('/api/signup', {
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

function RegisterForm() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredUserName, setEnteredUserName] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();

    // optional: add client-side validation

    setRequestStatus('pending');

    try {
      await registerUser({
        email: enteredEmail,
        name: enteredName,
        username: enteredUserName,
        password: enteredPassword,
      });
      setRequestStatus('success');
      setEnteredPassword('');
      setEnteredEmail('');
      setEnteredName('');
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
      title: 'Signing Up...',
      message: 'Your registration is on its way!',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Registered successfully!',
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
      <h1>Fill in the details to Register</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              id='email'
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              id='name'
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Username</label>
          <textarea
            id='username'
            rows='5'
            required
            value={enteredUserName}
            onChange={(event) => setEnteredUserName(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Password</label>
          <textarea
            id='password'
            rows='5'
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

export default RegisterForm;
