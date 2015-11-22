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
