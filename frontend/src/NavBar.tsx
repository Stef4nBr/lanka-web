import React, { useState, useMemo } from 'react';
import AuthModal from './AuthModal';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

interface NavBarProps {
  onAuthChange?: (isAuth: boolean) => void;
  onTokenChange?: (token: string | null) => void;
  loginUser: (username: string) => void;
}

function NavBar({ onAuthChange, onTokenChange, loginUser }: NavBarProps): React.ReactElement {
  const [authorized, setAuthorized_] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const setAuthorized = (value: boolean): void => {
    setAuthorized_(value);
    onAuthChange?.(value);
  };

  const handleTokenChange = (newToken: string | null): void => {
    setToken(newToken);
    onTokenChange?.(newToken);
  };

  const username = useMemo(() => {
    if (!authorized) return '';

    try {
      const jwt = token || localStorage.getItem('jwtToken');
      if (!jwt) return '';
      
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      loginUser(payload.username);
      return payload.username || '';
    } catch (e) {
      return '';
    }
  }, [authorized, token, loginUser]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">www.lan.ka/</Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          <Button variant="outline-light" className="me-2">
            How to play
          </Button>
          <AuthModal onAuthChange={setAuthorized} authToken={handleTokenChange} />
          {authorized && (
            <span style={{ padding: '0 15px' }} className="text-white">
              {' '}
              Welcome! {username}
            </span>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
