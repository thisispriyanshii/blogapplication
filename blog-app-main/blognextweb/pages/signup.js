import { Fragment } from 'react';
import Head from 'next/head';

import RegisterForm from '../components/register/register-form';

function SignUpPage() {
  return (
    <Fragment>
      <Head>
        <title>Sign Up/Register</title>
        <meta name='description' content='Send up to write/comment on Posts' />
      </Head>
      <RegisterForm />
    </Fragment>
  );
}

export default SignUpPage;