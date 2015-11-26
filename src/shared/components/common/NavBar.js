import React from 'react'
import { Link, IndexLink } from 'react-router'

class NavBar extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $('.navbar-brand').click(() => {
      if ($('.collapse.in')) {
        $('.collapse.in').animate({height: '1px'}, 300, () => {
          $('.collapse.in').removeClass('in')
        })
      }
    })

    $(document).on('click', '.navbar-collapse.in', (e) => {
      if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
        $('.navbar-collapse.in').collapse('hide')
      }
    })
  }

  render() {
    const { auth, user } = this.props
    let protectedLinks = null

    if (auth.isSignedIn) {
      protectedLinks = (
        <ul className='nav navbar-nav navbar-right'>
          <li><Link to='/devices'>Devices</Link></li>
          <li className='dropdown'>
            <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>{user.details.name}&nbsp;<span className='caret' /></a>
            <ul className='dropdown-menu'>
              <li><Link to='/settings'>Settings</Link></li>
              <li role='separator' className='divider' />
              <li><Link to='/auth/signout'>Sign Out</Link></li>
            </ul>
          </li>
        </ul>
      )
    } else {
      protectedLinks = (
        <ul className='nav navbar-nav navbar-right'>
          <li><Link to='/auth/signin'>Sign In</Link></li>
        </ul>
      )
    }

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
            {protectedLinks}
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar
