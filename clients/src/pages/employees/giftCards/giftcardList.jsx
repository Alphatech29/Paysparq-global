import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { MdOutlineEditNote, MdOutlineRemoveCircleOutline } from "react-icons/md";
import { getGiftcardRate, deleteGiftcardRate } from "../../../../components/employees/dashboard/giftcardRateApi";
import Swal from "sweetalert2";
import Newcard from "./newCard";
import Createrate from "./createRate";  // Make sure this component is being used somewhere if needed

const GiftcardList = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false); 
  const [modalType, setModalType] = useState(null); // Track which modal to open

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const rates = await getGiftcardRate();
        if (Array.isArray(rates)) {
          setExchangeRates(rates);
        } else {
          throw new Error("Data format is incorrect");
        }
      } catch (error) {
        setError("Failed to fetch rates: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      customClass: {
        confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded',
      },
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteGiftcardRate(id);
        console.log('Delete Response:', response);
        setExchangeRates((prevRates) => prevRates.filter(rate => rate.id !== id));
        Swal.fire('Deleted!', 'The giftcard has been deleted.', 'success');
      } catch (error) {
        setError("Failed to delete giftcard: " + error.message);
        Swal.fire('Error!', 'There was an issue deleting the giftcard.', 'error');
      }
    }
  };

  if (loading) {
    return <div>Loading... <span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3 justify-start items-center">
        <button
          className="text-sm text-pay bg-primary-600 px-3 py-2 rounded-md mb-3"
          onClick={() => {
            setModalType('newGiftcard'); // Set modal type to 'newGiftcard'
            setOpenModal(true);
          }}
        >
          Create New Giftcard
        </button>
        <button
          className="text-sm text-pay bg-primary-600 px-3 py-2 rounded-md mb-3"
          onClick={() => {
            setModalType('addExchangeRate'); // Set modal type to 'addExchangeRate'
            setOpenModal(true);
          }}
        >
          Add New Exchange Rate
        </button>
      </div>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>S/N</Table.HeadCell>
          <Table.HeadCell>Card Name</Table.HeadCell>
          <Table.HeadCell>Country Name</Table.HeadCell>
          <Table.HeadCell>Currency</Table.HeadCell>
          <Table.HeadCell>Rate</Table.HeadCell>
          <Table.HeadCell>Last Update</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {exchangeRates.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan="7" className="text-center">No exchange rates available.</Table.Cell>
            </Table.Row>
          ) : (
            exchangeRates.map((rate, index) => (
              <Table.Row key={rate.id} className="bg-white">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  <div className="flex gap-3 justify-start items-center">
                    <img src={rate.avatar_url} alt="" className="w-10 h-10 rounded-full" />
                    {rate.card_name}
                  </div>
                </Table.Cell>
                <Table.Cell>{rate.country}</Table.Cell>
                <Table.Cell>1{rate.country_currency}</Table.Cell>
                <Table.Cell>₦{rate.exchange_rate}</Table.Cell>
                <Table.Cell>{rate.updated_at}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <button className="bg-green-500/70 text-white rounded-md px-3 py-1">
                      <MdOutlineEditNote size={20} />
                    </button>
                    <button
                      className="bg-red-500/70 text-white rounded-md px-3 py-1"
                      onClick={() => handleDelete(rate.id)}
                    >
                      <MdOutlineRemoveCircleOutline size={20} />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>

      {/* Modal for creating a new giftcard or adding a new exchange rate */}
      {modalType === 'newGiftcard' && (
        <Newcard openModal={openModal} setOpenModal={setOpenModal} />
      )}
      {modalType === 'addExchangeRate' && (
        <Createrate openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
};

export default GiftcardList;
