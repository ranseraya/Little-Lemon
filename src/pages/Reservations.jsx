import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const fetchAPI = (date) => {
  const times = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
    '09:00 PM', '10:00 PM'
  ];

  const bookedTimes = JSON.parse(localStorage.getItem('bookedTimes')) || {};
  const selectedDateStr = date.toISOString().split('T')[0];

  const timesForSelectedDate = bookedTimes[selectedDateStr] || [];

  return times.filter(time => !timesForSelectedDate.includes(time));
};
const submitAPI = (formData) => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (formData.date && formData.time && formData.guests >= 1 && formData.firstName && formData.email) {
        const selectedDateStr = new Date(formData.date).toISOString().split('T')[0];
        const currentBookedTimes = JSON.parse(localStorage.getItem('bookedTimes')) || {};

        if (!currentBookedTimes[selectedDateStr]) {
          currentBookedTimes[selectedDateStr] = [];
        }
        currentBookedTimes[selectedDateStr].push(formData.time);
        localStorage.setItem('bookedTimes', JSON.stringify(currentBookedTimes));

        resolve(true);
      } else {
        resolve(false);
      }
    }, 1000);
  });
};


const BookingForm = ({ reservationData, setReservationData, availableTimes, goToNextStep }) => {
  const [isTouched, setIsTouched] = useState({
    date: false,
    time: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData(prev => ({ ...prev, [name]: value }));
    if (name === 'date') {
      setReservationData(prev => ({ ...prev, time: '' }));
    }
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
    <form className="reservation-form step-1" onSubmit={handleSubmit}>
      <h2 className="page-title">Book a Table</h2>
      <div className="form-row-top">
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
            min={new Date().toISOString().split('T')[0]}
          />
          {isTouched.date && !reservationData.date && <p className="error-text">Date is required.</p>}
        </div>

        <div className="form-group">
          <label htmlFor="guests">Number of guests*</label>
          <input
            type="number"
            id="guests"
            name="guests"
            placeholder="1"
            min="1"
            max="10"
            value={reservationData.guests}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="available-times-section">
        <h3>Available Times*</h3>
        <div className="available-times-grid">
          {availableTimes.length > 0 ? (
            availableTimes.map((time, index) => (
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
            ))
          ) : (
            <p>No available times for this date. Please choose another date.</p>
          )}
        </div>
        {isTouched.time && !reservationData.time && <p className="error-text">Time is required.</p>}
      </div>

      <button type="submit" className="reserve-button next-step-button" disabled={!isFormValid}>
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
  };

  return (
    <form className="reservation-form step-2" onSubmit={handleSubmit}>
      <h2 className="page-title">Contact Information</h2>
      <div className="form-group">
        <label htmlFor="first-name">First Name*</label>
        <input type="text" id="first-name" name="firstName" value={reservationData.firstName} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="last-name">Last Name*</label>
        <input type="text" id="last-name" name="lastName" value={reservationData.lastName} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email*</label>
        <input type="email" id="email" name="email" value={reservationData.email} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="phone-number">Phone Number</label>
        <input type="tel" id="phone-number" name="phone" value={reservationData.phone} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label htmlFor="occasion">Occasion</label>
        <select id="occasion" name="occasion" value={reservationData.occasion} onChange={handleInputChange}>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="comments">Order/Comment</label>
        <textarea id="comments" name="comments" rows="4" value={reservationData.comments} onChange={handleInputChange}></textarea>
      </div>
      <div className="form-actions">
        <button type="button" className="reserve-button secondary" onClick={goToPrevStep}>Back</button>
        <button type="submit" className="reserve-button book-reservation-button" disabled={!isFormValid}>Book Reservation</button>
      </div>
    </form>
  );
};

const Confirmation = ({ reservationData, resetReservation, navigateToHome }) => {
  if (!reservationData) {
    return <p>Loading confirmation...</p>;
  }

  const dateObj = new Date(reservationData.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="confirmation-page">
      <div className="confirmation-header">
        <img src="/icons_assets/tick-icon.png" alt="Reserved" className="confirmation-icon" />
        <h2 className="page-title success">Table Reserved!</h2>
      </div>
      <p className="confirmation-message">
        Thank you, {reservationData.firstName}! Your reservation at Little Lemon is confirmed.
        Confirmation details will be sent to your email shortly.
      </p>
      <div className="reservation-details">
        <h3>Reservation Details</h3>
        <p><strong>Date:</strong> {formattedDate}</p>
        <p><strong>Time:</strong> {reservationData.time}</p>
        <p><strong>Guests:</strong> {reservationData.guests}</p>
        <p><strong>Occasion:</strong> {reservationData.occasion}</p>
        <p><strong>Name:</strong> {reservationData.firstName} {reservationData.lastName}</p>
        <p><strong>Email:</strong> {reservationData.email}</p>
        {reservationData.phone && <p><strong>Phone:</strong> {reservationData.phone}</p>}
        <p><strong>Confirmation Number:</strong> {reservationData.confirmationNumber}</p>
        {reservationData.comments && <p><strong>Comments:</strong> {reservationData.comments}</p>}
      </div>
      <div className="confirmation-actions">
        <button className="reserve-button back-to-home-button" onClick={navigateToHome}>
          Back to Home
        </button>
        <button className="reserve-button add-to-calendar-button">Add to Calendar</button>
      </div>
    </div>
  );
};



const Reservations = ({ navigateTo }) => {
  const [step, setStep] = useState(1);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: 'Birthday',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    comments: ''
  });
  const [confirmationDetails, setConfirmationDetails] = useState(null);

  useEffect(() => {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, date: formattedToday }));
    setAvailableTimes(fetchAPI(today));
  }, []);

  useEffect(() => {
    if (formData.date) {
      const dateObj = new Date(formData.date);
      setAvailableTimes(fetchAPI(dateObj));
    }
  }, [formData.date]);

  const handleSubmitFinal = async (finalData) => {
    const isSuccess = await submitAPI(finalData);
    if (isSuccess) {
      const confNum = uuidv4().substring(0, 8).toUpperCase();
      setConfirmationDetails({ ...finalData, confirmationNumber: confNum });
      setStep(3);
    } else {
      alert('Failed to book reservation. Please ensure all required fields are filled.');
    }
  };

  const resetAllReservationData = () => {
    setStep(1);
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    setFormData({
        date: formattedToday,
        time: '',
        guests: 1,
        occasion: 'Birthday',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        comments: ''
    });
    setConfirmationDetails(null);
    setAvailableTimes(fetchAPI(today));
  };


  switch (step) {
    case 1:
      return (
        <BookingForm
          reservationData={formData}
          setReservationData={setFormData}
          availableTimes={availableTimes}
          goToNextStep={() => setStep(2)}
        />
      );
    case 2:
      return (
        <ContactForm
          reservationData={formData}
          setReservationData={setFormData}
          goToPrevStep={() => setStep(1)}
          submitData={handleSubmitFinal}
        />
      );
    case 3:
      return (
        <Confirmation
            reservationData={confirmationDetails}
            resetReservation={resetAllReservationData}
            navigateToHome={() => navigateTo('home')}
        />
    );
    default:
      return <p>Something went wrong. Please refresh.</p>;
  }
};

export default Reservations;