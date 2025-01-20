import React, { useState, useEffect } from 'react';
import { Label, TextInput, Button } from 'flowbite-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState(null);
  const [phone, setPhone] = useState('');
  const [referral, setReferral] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
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
        console.error('Error fetching countries:', error);
        toast.error('Failed to load country options.');
      }
    };

    fetchCountries();
  }, []);

  const collectFormValues = () => {
    return {
      fullname,
      email,
      username,
      password,
      country,
      phone,
      referral,
      termsAccepted,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValues = collectFormValues();
    console.log(formValues);
    // Add your form submission logic here
  };

  return (
    <div className="bg-primary-600 w-full h-full flex justify-center items-center cover relative">
      <ToastContainer />
      <img
        src="/image/wigglynet3.png"
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="flex flex-col h-full justify-center items-center w-2/5 z-10">
        <a href="/">
          <img
            src="/image/footer-logo.png"
            alt=""
            loading="lazy"
            className="h-16 absolute top-5 left-0 pl-8"
          />
        </a>
        <div className="bg-paysparq/40 rounded-lg p-10 px-24">
          <img
            src="/image/main-screen-left.png"
            alt=""
            loading="lazy"
            width={300}
          />
        </div>
      </div>
      <div className="bg-paysparq p-20 flex justify-center items-center w-3/5 flex-col border">
        <div className="justify-start items-center border-primary-600 border p-10 rounded-lg">
          <h2 className="text-xl text-secondary font-interSB pb-6 text-center">
            Create Account
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="fullname" value="Full Name" />
              </div>
              <TextInput
                id="fullname"
                type="text"
                placeholder="Paysparq Limited"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
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
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput
                id="username"
                type="text"
                placeholder="paysparq"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="country" value="Country" />
              </div>
              <Select
                id="country"
                options={countries}
                value={country}
                onChange={(selectedOption) => setCountry(selectedOption)}
                placeholder="Select a country"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="Phone" />
              </div>
              <PhoneInput
                country="ng"
                onlyCountries={['ng', 'us', 'cm', 'uk', 'za', 'ke']}
                value={phone}
                onChange={setPhone}
                inputClass="w-full"
                containerClass="w-full"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="referral" value="Referral Code" />
              </div>
              <TextInput
                id="referral"
                type="text"
                placeholder="Referral Code"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
              />
            </div>
            <div>
              <input
                id="termsAccepted"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="z-10 relative"
              />
              <Label
                htmlFor="termsAccepted"
                value="I have read and agree to Cleva’s Terms of Service and Privacy Policy."
              />
            </div>
            <Button type="submit" className="bg-secondary">
              Sign Up
            </Button>
          </form>
          <div className="pt-8 flex items-center justify-center gap-4 relative">
            <span className="text-secondary text-base">Do have an account?</span>
            <a
              href="/auth/login"
              className="text-primary-600 text-base relative z-10 font-interSB"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;