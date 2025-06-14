import React, { useState } from 'react';

const BookingForm = ({ reservationData, setReservationData, availableTimes, goToNextStep }) => {

  const [isTouched, setIsTouched] = useState({
    date: false,
    time: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setIsTouched(prev => ({ ...prev, [name]: true }));
  };

  const isFormValid = reservationData.date && reservationData.time && reservationData.guests >= 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      goToNextStep();
    }
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <h2 className="page-title">Book a Table</h2>
      <div className="form-group">
        <label htmlFor="res-date">Choose date*</label>
        <input
          type="date"
          id="res-date"
          name="date"
          value={reservationData.date}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
        />
        {isTouched.date && !reservationData.date && <p className="error-text">Date is required.</p>}
      </div>

      <div className="form-group">
        <label htmlFor="guests">Number of guests*</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          max="10"
          value={reservationData.guests}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="available-times-section">
        <h3>Available Times*</h3>
        <div className="available-times-grid">
          {availableTimes.map((time, index) => (
            <button
              key={index}
              type="button"
              className={`time-slot-button ${reservationData.time === time ? 'selected' : ''}`}
              onClick={() => {
                setReservationData(prev => ({ ...prev, time }));
                setIsTouched(prev => ({...prev, time: true}));
              }}
            >
              {time}
            </button>
          ))}
        </div>
        {isTouched.time && !reservationData.time && <p className="error-text">Time is required.</p>}
      </div>

      <button type="submit" className="reserve-button" disabled={!isFormValid}>
        Next Step
      </button>
    </form>
  );
};


const ContactForm = ({ reservationData, setReservationData, goToPrevStep, submitData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = reservationData.firstName && reservationData.lastName && reservationData.email;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      submitData(reservationData);
    }
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <h2 className="page-title">Contact Information</h2>
      <div className="form-group">
        <label htmlFor="firstName">First Name*</label>
        <input type="text" id="firstName" name="firstName" value={reservationData.firstName} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name*</label>
        <input type="text" id="lastName" name="lastName" value={reservationData.lastName} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email*</label>
        <input type="email" id="email" name="email" value={reservationData.email} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="occasion">Occasion</label>
        <select id="occasion" name="occasion" value={reservationData.occasion} onChange={handleInputChange}>
          <option>Birthday</option>
          <option>Anniversary</option>
          <option>Other</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="button" className="reserve-button secondary" onClick={goToPrevStep}>Back</button>
        <button type="submit" className="reserve-button" disabled={!isFormValid}>Book Reservation</button>
      </div>
    </form>
  );
};


const Confirmation = ({ reservationData, resetReservation }) => {
  if (!reservationData) {
    return <p>Loading confirmation...</p>;
  }

  return (
    <div className="confirmation-page">
      <h2 className="page-title success">Table Reserved!</h2>
      <p className="confirmation-message">
        Thank you, {reservationData.firstName}! Your reservation is confirmed.
      </p>
      <div className="reservation-details">
        <h3>Reservation Details</h3>
        <p><strong>Date:</strong> {reservationData.date}</p>
        <p><strong>Time:</strong> {reservationData.time}</p>
        <p><strong>Guests:</strong> {reservationData.guests}</p>
        <p><strong>Occasion:</strong> {reservationData.occasion}</p>
      </div>
      <button className="reserve-button" onClick={resetReservation}>
        Make Another Reservation
      </button>
    </div>
  );
};

const Reservations = () => {
  const [step, setStep] = useState(1);
  const [reservationData, setReservationData] = useState({
    date: '', time: '', guests: 1, occasion: 'Birthday',
    firstName: '', lastName: '', email: '',
  });

  const [availableTimes] = useState([
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  ]);

  const submitData = (finalData) => {
    console.log('Final reservation data submitted:', finalData);
    setStep(3);
  };

  const resetReservation = () => {
    setStep(1);
    setReservationData({
        date: '', time: '', guests: 1, occasion: 'Birthday',
        firstName: '', lastName: '', email: '',
    });
  }

  switch (step) {
    case 1:
      return (
        <BookingForm
          reservationData={reservationData}
          setReservationData={setReservationData}
          availableTimes={availableTimes}
          goToNextStep={() => setStep(2)}
        />
      );
    case 2:
      return (
        <ContactForm
          reservationData={reservationData}
          setReservationData={setReservationData}
          goToPrevStep={() => setStep(1)}
          submitData={submitData}
        />
      );
    case 3:
      return (
        <Confirmation
            reservationData={reservationData}
            resetReservation={resetReservation}
        />
    );
    default:
      return <p>Something went wrong. Please refresh.</p>;
  }
};

export default Reservations;