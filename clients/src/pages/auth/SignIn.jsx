import React, { useState } from 'react';
import { Label, TextInput, Button, Checkbox } from 'flowbite-react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
      rememberMe,
    };
    console.log(formData);
    // Add your form submission logic here
  };

  return (
    <div className="bg-primary-600 w-full h-full flex justify-center items-center cover">
      <ToastContainer />
      <img src="/image/wigglynet3.png" alt="" className="absolute top-0 left-0 w-full h-full object-cover" />
      <div className="flex flex-col h-full justify-center items-center w-2/5 z-10">
        <div className="bg-paysparq/40 rounded-lg p-10 px-20">
          <img src="/image/cards-screen.png" alt="" loading="lazy" width={250} />
        </div>
      </div>
      <div className="bg-paysparq p-20 flex justify-center h-full items-center w-3/5 flex-col border">
        <a href="/">
          <img src="/image/paysparq-logo.png" alt="" loading="lazy" className="h-20 pb-8" />
        </a>
        <div className="justify-start items-center border-primary-600 border p-10 rounded-lg">
          <h2 className="text-xl text-secondary font-interSB pb-6 text-center">Welcome Back!</h2>
          <form className="flex flex-col w-72 gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="example@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                required
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

            <Button type="submit" className="bg-secondary" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          <div className="pt-8 flex items-center justify-center gap-4 relative">
            <span className="text-secondary text-sm">Don't have an account yet?</span>
            <a href="/auth/sign-up" className="text-primary-600 text-sm relative z-10 font-interSB">Sign Up Now</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;