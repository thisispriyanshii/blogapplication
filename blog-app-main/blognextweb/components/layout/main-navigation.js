import Link from 'next/link';

import Logo from './logo';
import classes from './main-navigation.module.css';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';

function MainNavigation() {
  const authCtx = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          {
            authCtx.isLoggedIn && (
              <li>
                <Link href='/posts'>My Posts</Link>
              </li>
            )
          }
          {
            authCtx.isLoggedIn? (
              <li>
                <Link href='#'>
                  <a onClick={authCtx.logout}>
                    {`Logged in as ${authCtx.userName}. Log Out?`}
                  </a>
                </Link>
              </li>
            ): (
              <li>
                <Link href='/login'>Login</Link>
              </li>
            )
          }
          <li>
            <Link href='/signup'>Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
