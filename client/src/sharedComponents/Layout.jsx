// For adding global styles such as a dark theme
// eslint-disable-next-line react/prop-types
function Layout({children}) {
  return (
    <div className="vh-100 bg-dark text-light">
      {children}
    </div>
  );
}

export default Layout;
