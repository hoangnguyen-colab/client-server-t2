import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookie from 'js-cookie';
import Auth, { Group } from 'components/Auth';
import Socials from 'components/Auth/Socials';
import Layout from 'Layouts';
import { useAuth } from '@contexts/AuthContext';
import withoutAuth from '@hocs/withoutAuth';

function Login() {
  const { setAuthenticated } = useAuth();
  const onCheckbox = () => {};

  const [user, setUser] = useState<object>({
    username: '',
    password: '',
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (user.username === 'admin' && user.password === 'admin') {
        setAuthenticated(true);
        Cookie.set('accessToken', 'admin', { expires: 7 });
        localStorage.setItem('username', 'admin');
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <Layout title="Login">
      <Auth title="Login" subTitle="Hello! Login with your email">
        <form onSubmit={onSubmit}>
          <InputGroup fullWidth>
            <input
              type="text"
              placeholder="Email Address"
              onChange={(e) =>
                setUser({
                  ...user,
                  username: e.target.value,
                })
              }
            />
          </InputGroup>
          <InputGroup fullWidth>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
            />
          </InputGroup>
          <Group>
            <Checkbox checked onChange={onCheckbox}>
              Remember me
            </Checkbox>
            <Link href="/auth/request-password">
              <a>Forgot Password?</a>
            </Link>
          </Group>
          <Button status="Success" type="submit" shape="SemiRound" fullWidth>
            Login
          </Button>
        </form>
        <Socials />
        <p>
          Don&apos;t have account?{' '}
          <Link href="/auth/register">
            <a>Register</a>
          </Link>
        </p>
      </Auth>
    </Layout>
  );
}

export default withoutAuth(Login);
