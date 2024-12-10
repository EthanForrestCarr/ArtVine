import { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

// Extended JwtPayload interface to include application-specific fields
interface ExtendedJwt extends JwtPayload {
  data: {
    email: string;
    id: string; // User's unique ID
  };
}

class AuthService {
  // Decode the JWT token to get the user's profile information
  getProfile(): ExtendedJwt | null {
    try {
      const token = this.getToken();
      return token ? jwtDecode<ExtendedJwt>(token) : null;
    } catch (err) {
      console.error("Error decoding token:", err);
      return null;
    }
  }

  // Check if the user is logged in by verifying the token's presence and validity
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return !!(decoded?.exp && decoded.exp < Date.now() / 1000);
    } catch (err) {
      console.error("Error checking token expiration:", err);
      return false;
    }
  }

  // Retrieve the token from localStorage
  getToken(): string {
    return localStorage.getItem("id_token") || "";
  }

  // Store the token in localStorage and redirect to the home page
  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // Remove the token from localStorage and redirect to the home page
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

const authService = new AuthService();

// Custom React hook for accessing authentication-related functionality
export const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(authService.loggedIn());
  const [profile, setProfile] = useState<ExtendedJwt | null>(null);

  useEffect(() => {
    if (loggedIn) {
      const userProfile = authService.getProfile();
      setProfile(userProfile);
    } else {
      setProfile(null);
    }
  }, [loggedIn]);

  const login = (idToken: string) => {
    authService.login(idToken);
    setLoggedIn(true);
  };

  const logout = () => {
    authService.logout();
    setLoggedIn(false);
  };

  return {
    loggedIn,
    profile,
    login,
    logout,
  };
};

export default authService;
