function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Little Lemon</h1>
        <h2 className="hero-subtitle">Chicago</h2>
        <p className="hero-description">We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
        <button className="hero-button">Reserve a Table</button>
      </div>
      <div className="hero-image-container">
        <img src="./icons_assets/restauranfood.jpg" alt="Little Lemon Restaurant" className="hero-image" />
      </div>
    </section>
  );
}

export default Hero;