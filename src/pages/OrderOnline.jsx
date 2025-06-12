function OrderOnline() {
  return (
    <section className="page-section">
      <h2 className="page-title">Order Food Online</h2>
      <p className="page-description">Browse our menu and place your order for pickup or delivery.</p>

      <div className="order-options">
        <button className="order-option-button">View Full Menu</button>
        <button className="order-option-button">Special Offers</button>
      </div>
      <div className="order-items-grid">

        <div className="order-item-card">
          <img src="https://placehold.co/150x100/f0f0f0/333?text=Dish" alt="Order Dish" className="order-item-image" />
          <h4 className="order-item-title">Spaghetti Bolognese</h4>
          <p className="order-item-price">$15.00</p>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>

      </div>
    </section>
  );
}

export default OrderOnline;