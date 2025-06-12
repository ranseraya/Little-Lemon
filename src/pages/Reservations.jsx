import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const fetchAPI = (date) => {
  const times = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
    '9:00 PM', '10:00 PM'
  ];
  const bookedTimesPerDate = {
    '2025-06-15': ['2:00 PM', '7:00 PM'],
    '2025-06-20': ['12:00 PM', '6:00 PM']
  };

  const selectedDateBookedTimes = bookedTimesPerDate[date.toISOString().split('T')[0]] || [];

  return times.filter(time => !selectedDateBookedTimes.includes(time));
};

const submitAPI = (formData) => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (formData.firstName && formData.email) {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 1000);
  });
};


function Reservations() {
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
    if (formData.date) {
      const dateObj = new Date(formData.date);
      setAvailableTimes(fetchAPI(dateObj));
    } else {
      setAvailableTimes([]);
    }
  }, [formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeSelect = (time) => {
    setFormData(prev => ({ ...prev, time: time }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1 && formData.date && formData.time && formData.guests >=1) {
      setStep(2);
    }
  };

  const handleSubmitReservation = async (e) => {
    e.preventDefault();
    const isSuccess = await submitAPI(formData);
    if (isSuccess) {
      const confNum = uuidv4().substring(0, 8);
      setConfirmationDetails({ ...formData, confirmationNumber: confNum });
      setStep(3);

      const dateObj = new Date(formData.date);
      const formattedDate = dateObj.toISOString().split('T')[0];

      const updatedAvailableTimes = availableTimes.filter(
        time => time !== formData.time
      );
      setAvailableTimes(updatedAvailableTimes);
    } else {
      alert('Failed to book reservation. Please check your information.');
    }
  };

  const generateTimes = () => {
    const times = [];
    for (let i = 10; i <= 22; i++) {
      times.push(`${i}:00`);
      if (i < 22) times.push(`${i}:30`);
    }
    return times;
  };

  const allAvailableTimes = generateTimes();


  return (
    <section className="page-section reservations-page">
      <h2 className="page-title">Book a Table</h2>

      {step === 1 && (
        <form className="reservation-form step-1" onSubmit={handleNextStep}>
          <div className="form-row-top">
            <div className="form-group">
              <label htmlFor="res-date">Choose date</label>
              <input
                type="date"
                id="res-date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="guests">Number of guests</label>
              <input
                type="number"
                id="guests"
                name="guests"
                placeholder="1"
                min="1"
                max="10"
                value={formData.guests}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="available-times-section">
            <h3>Available Times</h3>
            <div className="available-times-grid">
              {availableTimes.length > 0 ? (
                availableTimes.map((time, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`time-slot-button ${formData.time === time ? 'selected' : ''}`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))
              ) : (
                <p>Please select a date to see available times.</p>
              )}
            </div>
          </div>
          <button type="submit" className="reserve-button next-step-button" disabled={!formData.date || !formData.time || formData.guests < 1}>
            Next Step
          </button>
        </form>
      )}

      {step === 2 && (
        <form className="reservation-form step-2" onSubmit={handleSubmitReservation}>
          <h3>Contact Information</h3>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone-number">Phone Number</label>
            <input
              type="tel" // Use type="tel" for phone numbers
              id="phone-number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="occasion">Occasion</label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
            >
              <option>Birthday</option>
              <option>Anniversary</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="comments">Order/Comment</label>
            <textarea
              id="comments"
              name="comments"
              rows="4"
              value={formData.comments}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="reserve-button book-reservation-button">
            Book Reservation
          </button>
        </form>
      )}

      {step === 3 && confirmationDetails && (
        <div className="confirmation-page">
          <div className="confirmation-header">
            <img src="/tick-icon.png" alt="Reserved" className="confirmation-icon" />
            <h2>Table Reserved!</h2>
          </div>
          <p className="confirmation-message">
            Thank you for your reservation at Little Lemon. Confirmation details will be sent to your email shortly.
          </p>
          <div className="reservation-details">
            <p><strong>Date:</strong> {confirmationDetails.date}</p>
            <p><strong>Time:</strong> {confirmationDetails.time}</p>
            <p><strong>Guests:</strong> {confirmationDetails.guests}</p>
            <p><strong>Name:</strong> {confirmationDetails.firstName} {confirmationDetails.lastName}</p>
            <p><strong>Email:</strong> {confirmationDetails.email}</p>
            {confirmationDetails.phone && <p><strong>Phone:</strong> {confirmationDetails.phone}</p>}
            <p><strong>Confirmation Number:</strong> {confirmationDetails.confirmationNumber}</p>
          </div>
          <div className="confirmation-actions">
            <button
              className="reserve-button back-to-home-button"
              onClick={() => { setStep(1); setFormData({ date: '', time: '', guests: 1, occasion: 'Birthday', firstName: '', lastName: '', email: '', phone: '', comments: '' }); }}
            >
              Back to Home
            </button>
            <button className="add-to-calendar-button">Add to Calendar</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Reservations;