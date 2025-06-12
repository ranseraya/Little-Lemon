function Navbar({ navigateTo }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src='./icons_assets/logo-navbar.png' alt="Little Lemon Logo" className="navbar-logo" />
      </div>
      <ul className="navbar-links">
        <li><a href="/#" onClick={() => navigateTo('home')}>Home</a></li>
        <li><a href="/#" onClick={() => navigateTo('about')}>About</a></li>
        <li><a href="/#" onClick={() => navigateTo('menu')}>Menu</a></li>
        <li><a href="/#" onClick={() => navigateTo('reservations')}>Reservations</a></li>
        <li><a href="/#" onClick={() => navigateTo('order-online')}>Order Online</a></li>
        <li><a href="/#" onClick={() => navigateTo('login')}>Login</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;