function TestimonialCard({ rating, name, text, avatar }) {
  return (
    <div className="testimonial-card">
      <span className="testimonial-rating">Rating: {rating}</span>
      <img src={avatar} alt={`${name}'s avatar`} className="testimonial-avatar" />
      <p className="testimonial-name">{name}</p>
      <p className="testimonial-text">{text}</p>
    </div>
  );
}

export default TestimonialCard;