function Reservations() {
  return (
    <section className="page-section">
      <h2 className="page-title">Book a Table</h2>
      <p className="page-description">Fill out the form below to reserve your spot at Little Lemon.</p>

      <form className="reservation-form">
        <div className="form-group">
          <label htmlFor="res-date">Choose date</label>
          <input type="date" id="res-date" />
        </div>
        <div className="form-group">
          <label htmlFor="res-time">Choose time</label>
          <select id="res-time">
            <option>17:00</option>
            <option>18:00</option>
            <option>19:00</option>
            <option>20:00</option>
            <option>21:00</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="guests">Number of guests</label>
          <input type="number" placeholder="1" min="1" max="10" id="guests" />
        </div>
        <div className="form-group">
          <label htmlFor="occasion">Occasion</label>
          <select id="occasion">
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Other</option>
          </select>
        </div>
        <button type="submit" className="submit-reservation-button">Make Your Reservation</button>
      </form>
    </section>
  );
}

export default Reservations;