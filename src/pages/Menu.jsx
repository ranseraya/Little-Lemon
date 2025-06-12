function Menu() {
  return (
    <section className="page-section">
      <h2 className="page-title">Our Full Menu</h2>
      <p className="page-description">Explore our wide selection of appetizers, main courses, and desserts.</p>

      <div className="menu-categories">
        <div className="menu-category">
          <h3>Appetizers</h3>
          <ul>
            <li>Greek Salad - $12.99</li>
            <li>Bruschetta - $5.99</li>
            <li>Hummus with Pita - $7.50</li>
          </ul>
        </div>
        <div className="menu-category">
          <h3>Main Courses</h3>
          <ul>
            <li>Moussaka - $18.00</li>
            <li>Shawarma Plate - $16.50</li>
            <li>Grilled Salmon - $22.00</li>
          </ul>
        </div>
        <div className="menu-category">
          <h3>Desserts</h3>
          <ul>
            <li>Lemon Dessert - $5.00</li>
            <li>Baklava - $6.00</li>
            <li>Tiramisu - $7.00</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Menu;