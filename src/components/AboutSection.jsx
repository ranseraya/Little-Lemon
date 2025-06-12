function AboutSection() {
  return (
    <section className="about-section-home">
      <div className="about-content">
        <h1 className="about-title-home">Our Story</h1>
        <h2 className="about-subtitle-home">Little Lemon</h2>
        <p className="about-description-home">
          Little Lemon began as a dream to bring authentic Mediterranean flavours to the heart of Chicago. Founded by two siblings, Maria and Adrian, our restaurant is a labour of love, steeped in generations of family recipes. We believe in fresh, locally sourced ingredients and a warm, inviting atmosphere where every guest feels like family. Come and experience our passion for food and hospitality!
        </p>
      </div>
      <div className="about-images-container-home">
        <img src="./icons_assets/Mario and Adrian A.jpg" alt="Our Team at Little Lemon" className="about-image-home about-image-home-1" />
        <img src="./icons_assets/restaurant.jpg" alt="Our Restaurant" className="about-image-home about-image-home-2" />
      </div>
    </section>
  );
}

export default AboutSection;