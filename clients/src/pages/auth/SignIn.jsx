import { useState, useEffect } from "react";
import { Label, TextInput, Button, Checkbox } from "flowbite-react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/preload/ApiLoading";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../../redux/authSlice";

const SignIn = () => {
  const dispatch = useDispatch(); 

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isEmail = (input) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(input);
  };

  useEffect(() => {
    // Check if the user is already authenticated (via cookies or redux)
    const authToken = Cookies.get("authToken");
    if (authToken) {
      dispatch(setAuthenticated(true)); // Dispatch to update redux state
      navigate("/user/dashboard"); // Redirect to protected route if already logged in
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loading]);

  const storeAuthToken = (token, rememberMe) => {
    const expirationDays = rememberMe ? 7 : 1;
    Cookies.set("authToken", token, { expires: expirationDays });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailOrUsername || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/login", {
        emailOrUsername,
        password,
        rememberMe,
      });

      toast.success(data.message);
      storeAuthToken(data.token, rememberMe);
      dispatch(setAuthenticated(true)); // Set the authenticated state

      setTimeout(() => {
        navigate("/user/dashboard"); // Navigate to the dashboard after successful login
      }, 1000);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
      dispatch(setAuthenticated(false)); // Set the state to false on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-fk">
      <div className="bg-primary-600 pc:flex flex-col relative cover justify-center items-center pc:w-2/5 z-10 mobile:hidden">
        <img
          src="/image/wigglynet3.png"
          alt=""
          className="absolute object-cover inset-0 h-full w-full"
        />
        <div className="bg-paysparq/40 rounded-lg py-4 px-20 z-10">
          <img src="/image/cards-screen.png" alt="" loading="lazy" width={230} />
        </div>
      </div>
      <div className="bg-paysparq pc:py-10 pc:px-10 flex justify-center items-center pc:w-3/5 mobile:w-dvw flex-col border">
        <a href="/">
          <img
            src="/image/paysparq-logo.png"
            alt=""
            loading="lazy"
            className="h-20 pb-8"
          />
        </a>
        <div className="justify-start items-center border-primary-600 border px-5 py-3 rounded-lg">
          <h2 className="text-xl text-secondary font-interSB pb-6 text-center">
            Welcome Back!
          </h2>
          <form className="flex flex-col w-72 gap-4" onSubmit={handleSubmit}>
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
            <span className="flex items-end justify-end text-primary-600 z-10 text-sm">
              <a
                href="/auth/reset-password"
                className="hover:text-secondary"
              >
                Forgot Password?
              </a>
            </span>
            <div className="flex items-center gap-2 z-10">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Label htmlFor="remember-me">Keep me logged in.</Label>
            </div>

            <Button
              type="submit"
              className="bg-secondary"
              disabled={loading} // Disable button while loading
            >
              Login
            </Button>
          </form>
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
      {loading && <LoadingSpinner />}
      <ToastContainer />
    </div>
  );
};

export default SignIn;
