import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => {
  return (
    <header>
      <div className="container">
        <div className="header__content">
          <Link className="header__title" to="/dashboard">
            <h1>Expensify</h1>
          </Link>
          <button className="btn btn-link" onClick={startLogout}>
            Logout
          </button>
        </div>
      </div>
      {/* <NavLink to="/create" activeClassName="is-active">
        Create Expense
      </NavLink> */}

      {/* <NavLink to="/help" activeClassName="is-active">
        Help
      </NavLink> */}
    </header>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLogout: () => dispatch(startLogout()),
  };
};

export default connect(undefined, mapDispatchToProps)(Header);
