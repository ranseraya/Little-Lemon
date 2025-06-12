import SpecialCard from './SpecialCard';
function Specials() {
  return (
    <section className="specials-section">
      <div className="specials-header">
        <h2 className="specials-title">This weeks specials!</h2>
        <button className="specials-online-menu-button">Online Menu</button>
      </div>
      <div className="specials-cards-container">
        <SpecialCard
          image="/icons_assets/greek salad.jpg"
          title="Greek salad"
          price="$12.99"
          description="The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons."
        />
        <SpecialCard
          image="/icons_assets/bruchetta.jpg"
          title="Brocherta"
          price="$5.99"
          description="Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil."
        />
        <SpecialCard
          image="/icons_assets/lemon dessert.jpg"
          title="Lemon Dessert"
          price="$5.00"
          description="This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."
        />
      </div>
    </section>
  );
}

export default Specials;