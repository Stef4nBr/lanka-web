import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp?: number;
  [key: string]: any;
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp && decoded.exp < currentTime) {
      return false; // token expired
    }

    return true; // token is still valid (time-wise)
  } catch (err) {
    return false; // token is invalid format
  }
}
