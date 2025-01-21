import React, { useState, useEffect } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../components/preload/ApiLoading"; 

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState(null);
  const [phone, setPhone] = useState("");
  const [referral, setReferral] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryOptions = response.data
          .map((country) => ({
            value: country.name.common,
            label: (
              <div className="flex items-center gap-2">
                <img
                  src={country.flags.svg}
                  alt={country.name.common}
                  className="w-5 h-4 rounded"
                />
                {country.name.common}
              </div>
            ),
          }))
          .sort((a, b) => a.value.localeCompare(b.value));
        setCountries(countryOptions);
      } catch (error) {
        console.error("Error fetching countries:", error);
        toast.error("Failed to load country options.");
      }
    };

    fetchCountries();
  }, []);

  // Disable scrollbar when loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation checks
    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions.");
      return;
    }
  
    if (!country || !country.value) {
      toast.error("Please select a country.");
      return;
    }

    setLoading(true);
     

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register", 
        {
          fullname,
          email,
          username,
          password,
          country: country.value, 
          phone,
          referral,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 201) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          window.location.href = "/auth/login"; 
        }, 2000);
      }
    } catch (error) {
      // Error handling
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred. Please try again.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="login-fk">
    <div className="bg-primary-600 flex flex-col relative cover justify-center items-center w-2/5 z-10">
    <img 
  src="/image/wigglynet3.png" 
  alt="" 
  className="absolute object-cover inset-0 h-full w-full"
/>
<a href="/">
        <img src="/image/footer-logo.png" alt="" loading="lazy" className="h-20 pb-8" />
      </a>
      <div className="bg-paysparq/40 rounded-lg py-4 px-20 z-10">
        <img  src="/image/main-screen-left.png" alt="" loading="lazy" width={300} />
      </div>
    </div>
    <div className="bg-paysparq overflow-y-auto py-11 px-10 flex justify-center  items-center w-3/5 flex-col border">
     
      <div className="justify-start mt-40 py-3 items-center border-primary-600 border px-5  rounded-lg">
        <h2 className="text-xl text-secondary font-interSB pb-6 text-center">Create Account</h2>
        <form className="flex w-80 flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="fullname" value="Full Name" />
              <TextInput
                id="fullname"
                type="text"
                placeholder="Paysparq Limited"
                required={false}
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                placeholder="example@example.com"
                required={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="username" value="Username" />
              <TextInput
                id="username"
                type="text"
                placeholder="paysparq"
                required={false}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                placeholder="********"
                required={false}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="z-20">
              <Label htmlFor="country" value="Country" />
              <Select
                id="country"
                options={
                  countries
                }
                value={country}
                onChange={setCountry}
                placeholder="Select a country"
              />
            </div>
            <div>
              <Label htmlFor="phone" value="Phone" />
              <PhoneInput
                country="ng"
                onlyCountries={["ng", "us", "cm", "uk", "za", "ke"]}
                value={phone}
                onChange={setPhone}
                inputClass="w-full"
                containerClass="w-full"
              />
            </div>
            <div>
              <Label htmlFor="referral" value="Referral Code" />
              <TextInput
                id="referral"
                type="text"
                placeholder="Referral Code"
                value={referral}
                required={false}
                onChange={(e) => setReferral(e.target.value)}
              />
            </div>
            <div className="z-10">
              <input
                id="termsAccepted"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <Label
                htmlFor="termsAccepted"
                value="I have read and agree to Paysparq’s Terms of Service and Privacy Policy."
              />
            </div>
            <Button type="submit" className="bg-secondary">
              Sign Up
            </Button>
          </form>
          <div className="pt-8 flex items-center justify-center gap-4">
            <span className="text-secondary text-base">Do you have an account?</span>
            <a
              href="/auth/login"
              className="text-primary-600 text-base z-10 font-interSB"
            >
              Sign In
            </a>
          </div>
      </div>
    </div>
    {loading && <LoadingSpinner />}
    <ToastContainer />
  </div>
  );
};

export default SignUp;
