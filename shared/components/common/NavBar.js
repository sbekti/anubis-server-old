import React from 'react'
import { Link, IndexLink } from 'react-router'

class NavBar extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className='navbar navbar-default navbar-fixed-top'>
        <div className='container'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
            <IndexLink to='/' className='navbar-brand'>Anubis</IndexLink>
          </div>
          <div id='navbar' className='navbar-collapse collapse'>
            <ul className='nav navbar-nav navbar-right'>
              <li><Link to='/devices'>Devices</Link></li>
              <li><Link to='/auth/signin'>Sign In</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar
