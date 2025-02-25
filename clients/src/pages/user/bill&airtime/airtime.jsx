import React, { useState, useContext } from "react";
import { TextInput, Label, Button } from "flowbite-react";
import Swal from "sweetalert2";
import { purchaseAirtime } from "../../../../components/vtuService/vtpass";
import { AuthContext } from "../../../../components/control/AuthContext";

const Airtime = () => {
  const { userUid } = useContext(AuthContext);
  const [type, setType] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const networks = [
    { type: "mtn", img: "/image/mtn.png", prefixes: ["0703", "0706", "0803", "0806", "0810", "0813", "0814", "0816", "0903", "0906", "0913", "0916"] },
    { type: "airtel", img: "/image/airtel.jpeg", prefixes: ["0701", "0708", "0802", "0808", "0812", "0901", "0902", "0904", "0907", "0912"] },
    { type: "glo", img: "/image/Globacom.jpg", prefixes: ["0705", "0805", "0807", "0811", "0815", "0905"] },
    { type: "9mobile", img: "/image/9Mobile.jpg", prefixes: ["0809", "0817", "0818", "0909", "0908"] },
  ];

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    setPhone(input);

    if (input.length >= 4) {
      const prefix = input.substring(0, 4);
      const network = networks.find((net) => net.prefixes.includes(prefix));
      if (network) {
        setType(network.type);
      } else {
        setType("");
      }
    } else {
      setType("");
    }
  };

  const handleAmountClick = (value) => {
    setAmount((prev) => (prev ? parseInt(prev) + value : value));
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (!phone || !amount || !type || !userUid) {
      Swal.fire({
        title: "Missing Fields",
        text: "Please fill in all fields before proceeding.",
        icon: "warning",
        confirmButtonColor: "#F66B04",
      });
      return;
    }
  
    const requestData = { amount, type, phone, userUid };
    setLoading(true);
    
    try {
      const response = await purchaseAirtime(amount, type, phone, userUid);
      Swal.fire({
        title: "Success!",
        text: "Airtime purchase was successful!",
        icon: "success",
        confirmButtonColor: "#F66B04",
      }).then(() => {
        // Reset form fields
        setPhone("");
        setAmount("");
        setType("");
      });
    } catch (error) {
      console.error("Error purchasing airtime:", error);
      Swal.fire({
        title: "Transaction Failed",
        text: error.message || "Airtime purchase failed. Please try again.",
        icon: "error",
        confirmButtonColor: "#F66B04",
      });
    }
    setLoading(false);
  };

  return (
    <div className="bg-pay shadow-md shadow-primary-600/50 px-3 py-3 min-h-dvh mb-4 rounded-md">
      <h1 className="text-lg font-semibold">Buy Airtime</h1>

      <div className="mt-4 border border-primary-600/50 rounded-md p-3 w-[30%]">
        <div className="text-sm">Easily buy airtime instantly and securely for any mobile network. Stay connected without hassle.</div>
        <form onSubmit={handlePurchase}>
          <div className="mt-3 mb-8">
            <Label htmlFor="phone" value="Phone Number" />
            <TextInput id="phone" type="tel" placeholder="09129079450" value={phone} onChange={handlePhoneChange} />
          </div>

          <div className="mt-3 flex gap-4 justify-center items-center">
            {networks.map((network) => (
              <img
                key={network.type}
                src={network.img}
                alt={`${network.type} Network`}
                className={`rounded-md w-[15%] cursor-pointer border ${type === network.type ? "shadow-md shadow-green-500" : "border-transparent"}`}
                onClick={() => setType(network.type)}
              />
            ))}
          </div>

          <div className="mt-3">
            <Label htmlFor="amount" value="Amount" />
            <TextInput id="amount" placeholder="Enter the amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>

          <div className="flex gap-3 text-base mt-5">
            {[100, 200, 500, 1000].map((value) => (
              <div key={value} className="rounded-md shadow-md shadow-primary-600/50 text-base items-center px-3 py-2 flex cursor-pointer" onClick={() => handleAmountClick(value)}>
                <span>+{value}</span>
              </div>
            ))}
          </div>

          <Button className="mt-8 bg-primary-600 rounded-md w-full" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Airtime;
