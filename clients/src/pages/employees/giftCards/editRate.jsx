import { useState } from "react";
import axios from "axios";
import { Modal, TextInput, Label } from "flowbite-react";
import Swal from "sweetalert2";

function Editrate({ openModal, setOpenModal, rateId }) {
  const [rate, setRate] = useState({ exchange_rate: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate that exchange rate is provided
    if (!rate?.exchange_rate) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Exchange rate is required.",
        confirmButtonText: "Okay",
        customClass: {
          confirmButton: 'bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-500',
        },
      });
      setLoading(false);
      return;
    }

    const payload = { 
      id: rateId,         
      exchange_rate: rate.exchange_rate 
    };

    try {
      const response = await axios.put(`/api/rate-edit/${rateId}`, payload);

      if (response.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Exchange Rate Updated",
          text: "The exchange rate was updated successfully!",
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: 'bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500',
          },
        });
        setOpenModal(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Failed to update exchange rate.",
          confirmButtonText: "Try Again",
          customClass: {
            confirmButton: 'bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-500',
          },
        });
      }
    } catch (error) {
      console.error("API error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to update exchange rate.",
        confirmButtonText: "Try Again",
        customClass: {
          confirmButton: 'bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-500',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={openModal} popup onClose={() => setOpenModal(false)} size="md">
      <Modal.Header className="bg-pay text-base">Update Exchange Rate</Modal.Header>
      <Modal.Body className="shadow-md w-full shadow-primary-600/50 rounded-lg bg-pay text-secondary">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="rate" value="Exchange Rate" />
            <TextInput
              id="rate"
              type="text"  // Keep this as "text" to ensure it's treated as a string
              value={rate.exchange_rate || ""}
              onChange={(e) => setRate({ ...rate, exchange_rate: e.target.value })}
            />
          </div>
          <div className="w-full mt-4">
            <button
              type="submit"
              className={`text-pay bg-primary-600 px-3 py-2 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Exchange Rate"}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default Editrate;
