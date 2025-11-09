import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { isTokenValid } from './utils/utils';

interface AuthModalProps {
  onAuthChange: (isAuth: boolean) => void;
  authToken: (token: string | null) => void;
}

function AuthModal({ onAuthChange, authToken }: AuthModalProps): React.ReactElement {
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [authorizedState, setAuthorizedState] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (isTokenValid(token)) {
      setAuthorizedState(!!token);
      onAuthChange(!!token);
      authToken(token);
    } else {
      setAuthorizedState(false);
      localStorage.removeItem('jwtToken');
      if (onAuthChange) onAuthChange(false);
    }
  }, [onAuthChange, authToken]);

  const authorized = useMemo(() => authorizedState, [authorizedState]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await axios.post<{ token: string }>(
        `${process.env.REACT_APP_API_URL}/api/auth/sign-in`,
        { username: email, password: password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200 && isTokenValid(response.data.token)) {
        if (onAuthChange) onAuthChange(true);
        setAuthorizedState(true);
        if (response.data && response.data.token) {
          localStorage.setItem('jwtToken', response.data.token);
        }
        handleClose();
        return;
      }
      if (onAuthChange) onAuthChange(false);
      localStorage.removeItem('jwtToken');
      console.log('Login response:', response.data);
    } catch (error: any) {
      if (onAuthChange) onAuthChange(false);
      localStorage.removeItem('jwtToken');
      console.error('Login error:', error);
      if (error.response?.status === 401) {
        setErrorMessage('False credentials');
      } else {
        setErrorMessage('Error to Login');
      }
    }
  };

  const handleLogout = (): void => {
    setAuthorizedState(false);
    localStorage.removeItem('jwtToken');
    if (onAuthChange) onAuthChange(false);
  };

  return (
    <>
      {authorized ? (
        <Button className="btn btn-warning" variant="primary" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button style={{ margin: '0 15px' }} variant="primary" onClick={handleShow}>
          Login
        </Button>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-person-circle"></i>
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-lock"></i>
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="has-error fade-in" style={{ margin: 'auto', color: 'red', fontSize: 18 }}>
            {errorMessage}
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              setErrorMessage('');
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogin} disabled={!email || !password}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AuthModal;
