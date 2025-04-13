import { Loader } from './components/Loader';
import './App.scss';
import {
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { getPeople } from './api';
import { PeopleTable } from './components/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from './types';
import classNames from 'classnames';

const STATUS = {
  resolved: 'resolved',
  rejected: 'rejected',
  idle: 'idle',
  pending: 'pending',
} as const;

type Status = (typeof STATUS)[keyof typeof STATUS];

export const App = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const { pathname } = useLocation();
  const loadPeople = () => {
    return getPeople()
      .then(data => {
        setPeople(data);
        setStatus('resolved');
      })
      .catch(() => setStatus('rejected'));
  };

  useEffect(() => {
    setStatus('pending');
    loadPeople();
  }, []);

  return (
    <>
      <div data-cy="app">
        <nav
          data-cy="nav"
          className="navbar is-fixed-top has-shadow"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="container">
            <div className="navbar-brand">
              <NavLink
                className={({ isActive }) =>
                  classNames('navbar-item', {
                    'has-background-grey-lighter': isActive,
                  })
                }
                to="/"
              >
                Home
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  classNames('navbar-item', {
                    'has-background-grey-lighter': isActive,
                  })
                }
                to="people"
              >
                People
              </NavLink>
            </div>
          </div>
        </nav>

        <main className="section">
          <div className="container">
            {pathname === '/home' && <Navigate to="/" replace={true} />}
            <Routes>
              <Route path="/" element={<h1 className="title">Home Page</h1>} />
              {people?.length !== 0 && status === 'resolved' && (
                <Route path="/people" element={<PeopleTable people={people} />}>
                  <Route path=":personSlug" element={<Outlet />} />
                </Route>
              )}
              <Route
                path="*"
                element={<h1 className="title">Page not found</h1>}
              />
            </Routes>

            {/* <h1 className="title">Page not found</h1> */}

            <div className="block">
              <div className="box table-container">
                {pathname === '/people' && status === 'pending' && <Loader />}

                {status === 'rejected' && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {people?.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
