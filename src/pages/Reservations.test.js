import { render, screen, fireEvent } from "@testing-library/react";
import Reservations from "./Reservations";

describe("Alur Proses Reservasi (Tanpa Router)", () => {
  test("Harus berhasil menyelesaikan alur reservasi dari langkah 1 hingga konfirmasi", () => {
    render(<Reservations />);

    const dateInput = screen.getByLabelText(/Choose date/);
    const guestsInput = screen.getByLabelText(/Number of guests/);
    const timeButton = screen.getByText("11:00 AM");
    const nextStepButton = screen.getByText("Next Step");

    fireEvent.change(dateInput, { target: { value: "2025-06-25" } });
    fireEvent.change(guestsInput, { target: { value: "2" } });
    fireEvent.click(timeButton);
    fireEvent.click(nextStepButton);

    const firstNameInput = screen.getByLabelText(/First Name/);
    const lastNameInput = screen.getByLabelText(/Last Name/);
    const emailInput = screen.getByLabelText(/Email/);
    const bookButton = screen.getByText("Book Reservation");

    fireEvent.change(firstNameInput, { target: { value: "Citra" } });
    fireEvent.change(lastNameInput, { target: { value: "Lestari" } });
    fireEvent.change(emailInput, { target: { value: "citra.l@example.com" } });
    fireEvent.click(bookButton);

    expect(screen.getByText("Table Reserved!")).toBeInTheDocument();

    expect(screen.getByText("Date:").parentElement).toHaveTextContent("Date: 2025-06-25");
    expect(screen.getByText("Time:").parentElement).toHaveTextContent("Time: 11:00 AM");
    expect(screen.getByText("Guests:").parentElement).toHaveTextContent("Guests: 2");
    expect(screen.getByText(/Thank you, Citra!/)).toBeInTheDocument();

    const newReservationButton = screen.getByText("Make Another Reservation");
    fireEvent.click(newReservationButton);
    expect(screen.getByText("Book a Table")).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose date/).value).toBe("");
  });
});