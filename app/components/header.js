import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
<header style={{marginBottom: 2 + 'em'}}>
    <section className="column is-desktop">
      <nav className="navbar is-white is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="container is-desktop">
          <div className="navbar-brand"><a className="navbar-item"><img src="img/chainrxn_logo.png" width="112" height="28" alt="Logo"/></a></div>
          <div className="navbar-menu">
              <div className="navbar-end">
                <div className="navbar-item"><Link to='/'>Home</Link></div>
                <div className="navbar-item"><Link to='/projects'>Explore Projects</Link></div>
                <div className="navbar-item"><Link to='/organization'>Organization</Link></div>
                <div className="navbar-item"><Link to='/profile'>Profile</Link></div>
              </div>
          </div>
        </div>
      </nav>
    </section>
    <section>
      <div className="hero is-info">
        <div className="hero-body is-desktop">
          <div className="container">
            <h1 className="title">Chain Reaction</h1>
          </div>
        </div>
      </div>
    </section>
</header>
)

export default Header