import { jwtDecode } from 'jwt-decode';

export function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp && decoded.exp < currentTime) {
      return false; // token expired
    }

    return true; // token is still valid (time-wise)
  } catch (err) {
    return false; // token is invalid format
  }
}