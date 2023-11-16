// components/Layout.js
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

import Header from './Components/Header';
import Footer from './Components/Footer';

export function Layout() {
  const { route, user, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);
  const navigate = useNavigate();

  function logOut() {
    signOut();
    navigate('/');
  }
  return (
    <div className="App">
      <Header user={user} route={route} signoutCallback={logOut} />
      <Outlet />
      <Footer />
    </div>
  );
}