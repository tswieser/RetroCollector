import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import CollectionsPage from './components/collection';
import GamesPage from './components/game';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import HomePage from './components/home'
import WishListPage from './components/wishlist'
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/collections' exact={true} >
          <CollectionsPage />
        </ProtectedRoute>
        <ProtectedRoute path='/api/collections/:id' exact={true} >
          <GamesPage />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          < HomePage />
        </ProtectedRoute>
        <ProtectedRoute path='/wishlist' exact={true} >
          <WishListPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
