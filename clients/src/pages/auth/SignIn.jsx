// SignIn.jsx
import { Label, TextInput, Button, Checkbox } from "flowbite-react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../components/preload/ApiLoading";
import useSignInLogic from "../../../components/signInService/SignInService";

const SignIn = () => {
  const {
    emailOrUsername,
    setEmailOrUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    loading,
    handleSubmit,
  } = useSignInLogic();

  return (
    <div className="login-fk">
      {/* Left Section */}
      <div className="bg-primary-600 pc:flex flex-col relative cover justify-center items-center pc:w-2/5 z-10 mobile:hidden">
        <img
          src="/image/wigglynet3.png"
          alt="Background"
          className="absolute object-cover inset-0 h-full w-full"
        />
        <div className="bg-paysparq/40 rounded-lg py-4 px-20 z-10">
          <img
            src="/image/cards-screen.png"
            alt="Cards"
            loading="lazy"
            width={230}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-paysparq pc:py-10 pc:px-10 flex justify-center items-center pc:w-3/5 mobile:w-dvw flex-col border">
        <a href="/">
          <img
            src="/image/paysparq-logo.png"
            alt="Paysparq Logo"
            loading="lazy"
            className="h-20 pb-8"
          />
        </a>

        <div className="justify-start items-center border-primary-600 border px-5 py-3 rounded-lg">
          <h2 className="text-xl text-secondary font-interSB pb-6 text-center">
            Welcome Back!
          </h2>

          {/* Sign-In Form */}
          <form className="flex flex-col w-72 gap-4" onSubmit={handleSubmit}>
            {/* Email/Username Field */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="emailOrUsername" value="Email/Username" />
              </div>
              <TextInput
                id="emailOrUsername"
                type="text"
                placeholder="Email or Username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute bottom-2 right-0 pr-2 text-primary-600 text-sm flex cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </div>
            </div>

            {/* Forgot Password */}
            <span className="flex items-end justify-end text-primary-600 z-10 text-sm">
              <a href="/auth/reset-password" className="hover:text-secondary">
                Forgot Password?
              </a>
            </span>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2 z-10">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Label htmlFor="remember-me">Keep me logged in.</Label>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="bg-secondary" disabled={loading}>
              Login
            </Button>
          </form>

          {/* Sign-Up Link */}
          <div className="pt-8 flex items-center justify-center gap-4 relative">
            <span className="text-secondary text-sm">
              Don't have an account yet?
            </span>
            <a
              href="/auth/sign-up"
              className="text-primary-600 text-sm relative z-10 font-interSB"
            >
              Sign Up Now
            </a>
          </div>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && <LoadingSpinner />}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default SignIn;
