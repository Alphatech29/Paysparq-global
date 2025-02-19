import React, { useState } from "react";
import { TextInput, Label, Button } from "flowbite-react";

const AirtimeToCash = () => {
  const [selectedMethod, setSelectedMethod] = useState();
  const [selectedNetwork, setSelectedNetwork] = useState();

  return (
    <div className="bg-pay shadow-md shadow-primary-600/50 px-3 py-3 min-h-dvh mb-4 rounded-md">
      <div>
        <h1 className="text-lg font-semibold">Airtime To Cash</h1>
      </div>

      <div className="mt-4 border border-primary-600/50 rounded-md p-3 w-[50%]">
        <form action="" method="post">
          {/* Conversion Method Selection */}
          <div className="flex gap-5 justify-start items-center">
            <div
              className={`flex flex-col gap-2 border ${
                selectedMethod === "instant" ? "shadow-sm shadow-green-500" : "border-primary-600/50"
              } rounded-md p-3 cursor-pointer`}
              onClick={() => setSelectedMethod("instant")}
            >
              <span className="text-base text-green-500 font-medium">
                Instant (Recommended)
              </span>
              <p className="text-sm">Convert airtime to cash in seconds.</p>
            </div>

            <div
              className={`flex flex-col gap-2 border ${
                selectedMethod === "manual" ? "shadow-sm shadow-green-500" : "border-primary-600/50"
              } rounded-md p-3 cursor-pointer`}
              onClick={() => setSelectedMethod("manual")}
            >
              <span className="text-base font-medium">Manual</span>
              <p className="text-sm">Convert airtime to cash in 10 mins.</p>
            </div>
          </div>

          {/* Network Selection */}
          <div>
            <h1 className="text-base mt-3">Network:</h1>
            <div className="mt-3 flex gap-4 justify-center items-center">
              {[
                { name: "MTN", img: "/image/mtn.png" },
                { name: "Airtel", img: "/image/airtel.jpeg" },
                { name: "Glo", img: "/image/Globacom.jpg" },
                { name: "9Mobile", img: "/image/9Mobile.jpg" },
              ].map((network) => (
                <img
                  key={network.name}
                  src={network.img}
                  alt={`${network.name} Network`}
                  className={`rounded-md w-[9%] cursor-pointer border ${
                    selectedNetwork === network.name ? " shadow-md shadow-green-500" : "border-transparent"
                  }`}
                  onClick={() => setSelectedNetwork(network.name)}
                />
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div className="mt-3">
            <Label htmlFor="amount" value="Amount" />
            <TextInput id="amount" placeholder="Enter the amount" />
          </div>

          {/* Phone Number Input */}
          <div className="mt-3">
            <Label htmlFor="phone" value="Phone Number" />
            <TextInput id="phone" type="tel" placeholder="09129079450" />
            <span className="text-sm">Phone number to transfer airtime from.</span>
          </div>

          {/* Submit Button */}
          <Button className="mt-4 bg-primary-600 rounded-md w-full">Continue</Button>
        </form>
      </div>
    </div>
  );
};

export default AirtimeToCash;
