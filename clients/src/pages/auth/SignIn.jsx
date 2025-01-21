import { useState, useEffect } from 'react';
import { Label, TextInput, Button, Checkbox } from 'flowbite-react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from "../../../components/preload/ApiLoading"; 

const SignIn = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Moved it to the top level of the component

  // Regular expression for email validation
  const isEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(input);
  };

  // Disable scrollbar when loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  // Store token in localStorage if login is successful
  const storeAuthToken = (token) => {
    localStorage.setItem('authToken', token); 
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    const formData = {
      emailOrUsername,
      password,
      rememberMe,
    };

    const isEmailInput = isEmail(emailOrUsername);
    if (isEmailInput) {
      console.log("It is an email.");
    } else {
      console.log("It is a username.");
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      if (response.status === 200) {
        toast.success('Login successful!');
        storeAuthToken(response.data.token);
    
        navigate('/user/dashboard');  
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    
    <div className="login-fk">
      <div className="bg-primary-600 flex flex-col relative cover justify-center items-center w-2/5 z-10">
      <img 
    src="/image/wigglynet3.png" 
    alt="" 
    className="absolute object-cover inset-0 h-full w-full"
  />
        <div className="bg-paysparq/40 rounded-lg py-4 px-20 z-10">
          <img src="/image/cards-screen.png" alt="" loading="lazy" width={230} />
        </div>
      </div>
      <div className="bg-paysparq py-10 px-10 flex justify-center  items-center w-3/5 flex-col border">
        <a href="/">
          <img src="/image/paysparq-logo.png" alt="" loading="lazy" className="h-20 pb-8" />
        </a>
        <div className="justify-start items-center border-primary-600 border px-5 py-3 rounded-lg">
          <h2 className="text-xl text-secondary font-interSB pb-6 text-center">Welcome Back!</h2>
          <form className="flex flex-col w-72 gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="emailOrUsername" value="Email/Username" />
              </div>
              <TextInput
                id="emailOrUsername"
                type="text"
                placeholder="Email or Username"
                required={false}
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                required={false}
                value={password}
                maxLength={6}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute bottom-2 right-0 pr-2 text-primary-600 text-sm flex cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </div>
            </div>
            <span className="flex items-end justify-end text-primary-600 z-10 text-sm">
              <a href="/auth/reset-password" className="hover:text-secondary">Forgot Password?</a>
            </span>
            <div className="flex items-center gap-2 z-10">
              <Checkbox
                id="remember&keep-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Label htmlFor="remember&keep-m">Keep me logged in.</Label>
            </div>

            <Button type="submit" className="bg-secondary">
              Login
            </Button>
          </form>
          <div className="pt-8 flex items-center justify-center gap-4 relative">
            <span className="text-secondary text-sm">Don't have an account yet?</span>
            <a href="/auth/sign-up" className="text-primary-600 text-sm relative z-10 font-interSB">Sign Up Now</a>
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
      <ToastContainer />
    </div>
  );
};

export default SignIn;
