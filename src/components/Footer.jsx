function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo-col">

          <img src="./icons_assets/logo-lemon.png" alt="Little Lemon Footer Logo" className="footer-logo-img" />
        </div>
        <div className="footer-nav">
          <h3>Doormat Navigation</h3>
          <ul>
            <li><a href="/#">Home</a></li>
            <li><a href="/#">About</a></li>
            <li><a href="/#">Menu</a></li>
            <li><a href="/#">Reservations</a></li>
            <li><a href="/#">Order Online</a></li>
            <li><a href="/#">Login</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Adress</p>
          <p>phone number</p>
          <p>email</p>
        </div>
        <div className="footer-social">
          <h3>Social Media Links</h3>
          <p>Adress</p>
          <p>phone number</p>
          <p>email</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;