import React from 'react'
import { IndexLink } from 'react-router'
import PropTypes from 'prop-types'

export const PageLayout = ({ children }) => (
  <div className='container-fluid p-0 bg-secondary' style={{ minHeight: '100vh' }}>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <IndexLink to='/' className="navbar-brand font-weight-light"><b>Company Profile</b> Manager</IndexLink>
    </nav>
    {children}
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
