import React, { useState } from "react";
import { TextInput, Label, Button } from "flowbite-react";

const Data = () => {
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");

  const networks = [
    { name: "MTN", img: "/image/mtn.png", prefixes: ["0703", "0706", "0803", "0806", "0810", "0813", "0814", "0816", "0903", "0906", "0913", "0916"] },
    { name: "Airtel", img: "/image/airtel.jpeg", prefixes: ["0701", "0708", "0802", "0808", "0812", "0901", "0902", "0904", "0907", "0912"] },
    { name: "Glo", img: "/image/Globacom.jpg", prefixes: ["0705", "0805", "0807", "0811", "0815", "0905"] },
    { name: "9Mobile", img: "/image/9Mobile.jpg", prefixes: ["0809", "0817", "0818", "0909", "0908"] },
  ];

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    setPhoneNumber(input);

    if (input.length >= 4) {
      const prefix = input.substring(0, 4);
      const network = networks.find((net) => net.prefixes.includes(prefix));
      if (network) {
        setSelectedNetwork(network.name);
      }
    }
  };

  const handleAmountClick = (value) => {
    setAmount((prev) => (prev ? parseInt(prev) + value : value));
  };

  return (
    <div className="bg-pay shadow-md shadow-primary-600/50 px-3 py-3 min-h-dvh mb-4 rounded-md">
      <h1 className="text-lg font-semibold">Buy Data</h1>

      <div className="mt-4 border border-primary-600/50 rounded-md p-3 w-[30%]">
        <div className="text-sm">Easily purchase data bundles instantly and securely. Stay connected with reliable and fast internet.</div>
        <form>

          <div className="mt-3 mb-8">
            <Label htmlFor="phone" value="Phone Number" />
            <TextInput
              id="phone"
              type="tel"
              placeholder="09129079450"
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
          </div>

          <div className="mt-3 flex gap-4 justify-center items-center">
            {networks.map((network) => (
              <img
                key={network.name}
                src={network.img}
                alt={`${network.name} Network`}
                className={`rounded-md w-[15%] cursor-pointer border ${
                  selectedNetwork === network.name ? "shadow-md shadow-green-500" : "border-transparent"
                }`}
                onClick={() => setSelectedNetwork(network.name)}
              />
            ))}
          </div>

          <div className="mt-3">
            <Label htmlFor="amount" value="Amount" />
            <TextInput
              id="amount"
              placeholder="Enter the amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex gap-3 text-base mt-5">
            {[100, 200, 500, 1000].map((value) => (
              <div
                key={value}
                className="rounded-md shadow-md shadow-primary-600/50 text-base items-center px-3 py-2 flex cursor-pointer"
                onClick={() => handleAmountClick(value)}
              >
                <span>+{value}</span>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <Button className="mt-8 bg-primary-600 rounded-md w-full">Continue</Button>
        </form>
      </div>
    </div>
  );
};

export default Data;
