import { useState, useEffect } from "react";
import { Modal, TextInput, Label, Select } from "flowbite-react";
import { createExchangeRate } from "../../../../components/employees/dashboard/giftcardRateApi";
import Swal from "sweetalert2";

function Createrate({ openModal, setOpenModal }) {
  const [currency, setCurrency] = useState("");
  const [rate, setRate] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [country, setCountry] = useState("");

  // Fetch all card details when the modal opens
  useEffect(() => {
    if (openModal) {
      fetch("/api/gift-cards")
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setCards(data.cards || []);
          } else {
            Swal.fire({
              icon: "error",
              title: "Error Fetching Cards",
              text: data.message || "Failed to load card details.",
              confirmButtonText: "Okay",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching cards:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong while fetching card details.",
            confirmButtonText: "Okay",
          });
        });
    }
  }, [openModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      card_id: selectedCard, 
      currency,
      rate,
      country, 
    };

    console.log("Sending form data to API:", formData); 

    // Check if all required fields are filled
    if (!currency || !rate || !selectedCard || !country) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "All fields are required.",
        confirmButtonText: "Okay",
        customClass: {
          confirmButton: "bg-red-600 text-white hover:bg-red-700",
        },
      });
      setLoading(false);
      return;
    }

    try {
      const response = await createExchangeRate(formData);

      if (response.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Exchange Rate Created",
          text: "The exchange rate was created successfully!",
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "bg-green-600 text-white hover:bg-green-700",
          },
        });

        // Reset form fields after successful submission
        setCurrency("");
        setRate("");
        setCountry(""); 
        setSelectedCard(""); 
        setOpenModal(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message || "Failed to create exchange rate.",
          confirmButtonText: "Try Again",
          customClass: {
            confirmButton: "bg-red-600 text-white hover:bg-red-700",
          },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to create exchange rate.",
        confirmButtonText: "Try Again",
        customClass: {
          confirmButton: "bg-red-600 text-white hover:bg-red-700",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={openModal} popup onClose={() => setOpenModal(false)} size="md">
      <Modal.Header className="bg-pay text-base">Add Exchange Rate</Modal.Header>
      <Modal.Body className="shadow-md w-full shadow-primary-600/50 rounded-lg bg-pay text-secondary">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="selectedCard" value="Select Card" />
            <Select
  id="selectedCard"
  value={selectedCard}
  onChange={(e) => setSelectedCard(e.target.value)} 
  required
>
  <option value="" disabled>Select Card</option>
  {cards.map((card) => (
    <option key={card.id} value={card.id}> 
      {card.card_name} 
    </option>
  ))}
</Select>

          </div>
          <div>
            <Label htmlFor="country" value="Country" />
            <TextInput
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)} 
            />
          </div>
          <div>
            <Label htmlFor="currency" value="Currency" />
            <TextInput
              id="currency"
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="rate" value="Exchange Rate" />
            <TextInput
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div className="w-full mt-4">
            <button
              type="submit"
              className={`text-pay bg-primary-600 px-3 py-2 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Exchange Rate"}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default Createrate;
