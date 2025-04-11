// import { Loader } from './components/Loader';
import './App.scss';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { getPeople } from './api';
import { PeopleTable } from './components/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from './types';

export const App = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const loadPeople = () => {
    return getPeople().then(data => setPeople(data));
  };

  useEffect(() => {
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
              <Link className="navbar-item" to="/">
                Home
              </Link>

              <Link
                className="navbar-item has-background-grey-lighter"
                to="people"
              >
                People
              </Link>
            </div>
          </div>
        </nav>

        <main className="section">
          <div className="container">
            <Routes>
              <Route path="/" element={<h1 className="title">Home Page</h1>} />
              <Route path="/people">
                <Route index element={<PeopleTable people={people} />} />
                <Route path="/people/:personName" element={<Outlet />} />
              </Route>
            </Routes>

            {/* <h1 className="title">Page not found</h1> */}

            {/* <div className="block">
              <div className="box table-container">
                <Loader />

                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>

                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              </div>
            </div> */}
          </div>
        </main>
      </div>
    </>
  );
};
