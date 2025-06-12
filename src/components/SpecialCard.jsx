function SpecialCard({ image, title, price, description }) {
  return (
    <div className="special-card">
      <img src={image} alt={title} className="special-card-image" />
      <div className="special-card-content">
        <h3 className="special-card-title">{title} <span className="special-card-price">{price}</span></h3>
        <p className="special-card-description">{description}</p>
        <button className="special-card-order-button">Order a delivery <span className="delivery-icon">🚚</span></button>
      </div>
    </div>
  );
}

export default SpecialCard;