import PropTypes from 'prop-types'

// For adding global styles such as a dark theme
function Layout({children}) {
  return (
    <div className="vh-100 bg-dark text-light">
      {children}
    </div>
  );
}

// added to prevent weird error when using children prop
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
