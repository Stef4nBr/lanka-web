import AuthModal from './AuthModal';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useState, useMemo } from 'react';
import Logo from './Logo';

function NavBar() {
  const [authorized, setAuthorized_] = useState(false);

  const username = useMemo(() => {
    if (!authorized) return "";

    try {
      const jwt = localStorage.getItem("jwtToken");
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      return payload.username || "";
    } catch (e) {
      return "";
    }
  }, [authorized]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
   
        <Logo href="#home"/>
        <Nav className="ms-auto align-items-center">
          <Button variant="outline-light" className="me-2">How to play</Button>
          <AuthModal variant="primary" onAuthChange={setAuthorized_} />
          {authorized && (
            <span className="text-white">Welcome! {username}</span>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
