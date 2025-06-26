import { Fragment } from 'react';
import Head from 'next/head';

import LoginForm from '../components/login/login-form';

function LoginPage() {
  return (
    <Fragment>
      <Head>
        <title>Login</title>
        <meta name='description' content='Login to start posting!' />
      </Head>
      <LoginForm />
    </Fragment>
  );
}

export default LoginPage;
