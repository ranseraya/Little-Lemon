import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import OrderOnline from './pages/OrderOnline';
import Login from './pages/Login';
import Footer from './components/Footer';

function App() {
  const [activePage, setActivePage] = useState('home');
  const navigateTo = (page) => {
    setActivePage(page);
  };

  return (
    <div className="app-container">
      <Navbar navigateTo={navigateTo} />
      <main className="main-content">
        {activePage === 'home' && <Home />}
        {activePage === 'about' && <About />}
        {activePage === 'menu' && <Menu />}
        {activePage === 'reservations' && <Reservations />}
        {activePage === 'order-online' && <OrderOnline />}
        {activePage === 'login' && <Login />}
      </main>

      <Footer />
    </div>
  );
}

export default App;