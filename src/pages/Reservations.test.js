import { render, screen } from "@testing-library/react";
import Reservations from './Reservations';

test('Menampilkan judul halaman Reservasi', () => {
    render(<Reservations />);

    const headingElement = screen.getByText("Book a Table");

    expect(headingElement).toBeInTheDocument();
})