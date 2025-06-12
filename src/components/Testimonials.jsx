import TestimonialCard from './TestimonialCard';

function Testimonials() {
  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">Testimonials</h2>
      <div className="testimonials-cards-container">
        <TestimonialCard
          rating="⭐⭐⭐⭐⭐"
          name="Khan"
          text="The flavors here are absolutely divine! A true taste of the Mediterranean. Highly recommend their Moussaka."
          avatar="./icons_assets/customer-testi-1.png"
        />
        <TestimonialCard
          rating="⭐⭐⭐⭐"
          name="Javier"
          text="Fantastic atmosphere and even better food. The bruschetta was a delightful starter. Will surely visit again!"
          avatar="./icons_assets/customer-testi-2.png"
        />
        <TestimonialCard
          rating="⭐⭐⭐⭐⭐"
          name="Petrova"
          text="A charming family-run establishment. The lemon dessert was a perfect end to a wonderful meal. So authentic!"
          avatar="./icons_assets/customer-testi-3.png"
        />
        <TestimonialCard
          rating="⭐⭐⭐⭐"
          name="Tanaka"
          text="Came here on a friend's recommendation and was not disappointed. The Greek salad was incredibly fresh and crisp."
          avatar="./icons_assets/customer-testi-4.png"
        />
      </div>
    </section>
  );
}

export default Testimonials;