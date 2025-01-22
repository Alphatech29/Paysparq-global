import jwt_decode from 'jwt-decode';
 // Named import
import Cookies from 'js-cookie';

const isAuthenticated = () => {
  const token = Cookies.get('authToken');
  if (!token) {
    return false;
  }

  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export default isAuthenticated;
