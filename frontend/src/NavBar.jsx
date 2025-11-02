import AuthModal from './AuthModal';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useState, useMemo } from 'react';

function NavBar({ onAuthChange, onTokenChange, loginUser, onHowToPlayClick }) {
  const [authorized, setAuthorized_] = useState(false);
  const [token, setToken] = useState(null);

  const setAuthorized = (value) => {
    setAuthorized_(value);
    onAuthChange?.(value);
  };

  const handleTokenChange = (newToken) => {
    setToken(newToken);
    onTokenChange?.(newToken);
  };

  const username = useMemo(() => {
    if (!authorized) return "";

    try {
      const jwt = token || localStorage.getItem("jwtToken");
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      loginUser(payload.username);
      return payload.username || "";
    } catch (e) {
      return "";
    }
  }, [authorized, token, loginUser]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container style={{ maxWidth: '2500px' }}>
        <img src='static/images/pac.gif' width={350} alt='Pacman' style={{ paddingRight: '10px' }} />
        <Navbar.Brand
          href="#home"
          style={{
            fontFamily: '"Courier New", Consolas, Monaco, monospace',
            fontSize: '32px',
            fontWeight: 'bold',
            letterSpacing: '2px',
            color: '#00ff88',
            textShadow: '0 0 10px rgba(0, 255, 136, 0.5), 0 0 20px rgba(0, 255, 136, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#00ddff';
            e.target.style.textShadow = '0 0 15px rgba(0, 221, 255, 0.7), 0 0 30px rgba(0, 221, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#00ff88';
            e.target.style.textShadow = '0 0 10px rgba(0, 255, 136, 0.5), 0 0 20px rgba(0, 255, 136, 0.3)';
          }}
        >
          lan.ka/
        </Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          <Button
            variant="outline-light"
            className="me-2"
            onClick={onHowToPlayClick}
          >
            Sitting order
          </Button>
          <AuthModal variant="primary" onAuthChange={setAuthorized} authToken={handleTokenChange} />
          {authorized && (
            <span style={{ padding: '0 18px' }} className="text-white">Welcome! {username}</span>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
