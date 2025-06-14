import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Reservations from "./Reservations";

beforeEach(() => {
  const localStorageMock = (function() {
    let store = {};
    return {
      getItem: jest.fn(key => store[key] || null),
      setItem: jest.fn((key, value) => {
        store[key] = value.toString();
      }),
      clear: jest.fn(() => {
        store = {};
      }),
      removeItem: jest.fn(key => {
        delete store[key];
      }),
      length: 0,
      key: jest.fn(() => '')
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });

  localStorage.clear();
});

jest.mock('uuid', () => ({
  v4: () => 'TEST-UUID-123',
}));

describe("Alur Proses Reservasi", () => {
  test("Harus berhasil menyelesaikan alur reservasi hingga konfirmasi dan kembali ke Home", async () => {
    const mockNavigateTo = jest.fn();
    render(<Reservations navigateTo={mockNavigateTo} />);

    const dateInput = screen.getByLabelText(/Choose date/);
    const guestsInput = screen.getByLabelText(/Number of guests/);
    let timeButton;

    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    fireEvent.change(dateInput, { target: { value: formattedToday } });
    fireEvent.change(guestsInput, { target: { value: "2" } });

    await waitFor(() => {
      expect(screen.queryByText("No available times for this date. Please choose another date.")).not.toBeInTheDocument();
      timeButton = screen.getByText("05:00 PM");
      expect(timeButton).toBeInTheDocument();
    });

    fireEvent.click(timeButton);
    const nextStepButton = screen.getByText("Next Step");
    fireEvent.click(nextStepButton);

    await waitFor(() => {
      expect(screen.getByText("Contact Information")).toBeInTheDocument();
    });

    const firstNameInput = screen.getByLabelText(/First Name/);
    const lastNameInput = screen.getByLabelText(/Last Name/);
    const emailInput = screen.getByLabelText(/Email/);
    const bookButton = screen.getByText("Book Reservation");

    fireEvent.change(firstNameInput, { target: { value: "Citra" } });
    fireEvent.change(lastNameInput, { target: { value: "Lestari" } });
    fireEvent.change(emailInput, { target: { value: "citra.l@example.com" } });
    fireEvent.click(bookButton);

    await waitFor(() => {
      expect(screen.getByText("Table Reserved!")).toBeInTheDocument();
    }, { timeout: 2000 });

    expect(screen.getByText("Date:").parentElement).toHaveTextContent(`Date: ${new Date(formattedToday).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`);
    expect(screen.getByText("Time:").parentElement).toHaveTextContent("Time: 05:00 PM");
    expect(screen.getByText("Guests:").parentElement).toHaveTextContent("Guests: 2");
    expect(screen.getByText(/Thank you, Citra!/)).toBeInTheDocument();
    expect(screen.getByText("Confirmation Number:").parentElement).toHaveTextContent("Confirmation Number: TEST-UUI");

    await waitFor(() => {
      const bookedTimes = JSON.parse(localStorage.getItem('bookedTimes'));
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'bookedTimes',
        JSON.stringify({
          [formattedToday]: ["05:00 PM"]
        })
      );
      expect(bookedTimes).toEqual({ [formattedToday]: ["05:00 PM"] });
    });

    const backToHomeButton = screen.getByText("Back to Home");
    fireEvent.click(backToHomeButton);

    await waitFor(() => {
      expect(mockNavigateTo).toHaveBeenCalledTimes(1);
      expect(mockNavigateTo).toHaveBeenCalledWith('home');
    });
  });
});