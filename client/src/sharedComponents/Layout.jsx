import "../styles/backgrounds.css"
// For adding global styles such as a dark theme
// eslint-disable-next-line react/prop-types
function Layout({children}) {
  return (
    <div className="bg-dark text-light hello">
      {children}
    </div>
  );
}

export default Layout;
