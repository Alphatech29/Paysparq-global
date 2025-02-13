import { useState } from "react";
import { Modal, TextInput, Label, FileInput } from "flowbite-react";
import { createGiftcard } from "../../../../components/employees/dashboard/giftcardRateApi";
import Swal from 'sweetalert2';

function Newcard({ openModal, setOpenModal }) {
  const [cardName, setCardName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!cardName || !avatar) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Card Name and Avatar are required.',
        confirmButtonText: 'Okay',
        customClass: {
          confirmButton: 'bg-red-600 text-white hover:bg-red-700', 
        }
      });
      setLoading(false);
      return;
    }

    // Check file size (max 5MB)
    if (avatar.size > 5000000) {
      Swal.fire({
        icon: 'error',
        title: 'File Too Large',
        text: 'The avatar image is too large. Please upload a smaller file.',
        confirmButtonText: 'Okay',
        customClass: {
          confirmButton: 'bg-red-600 text-white hover:bg-red-700',
        }
      });
      setLoading(false);
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Avatar = reader.result.split(',')[1];

      const formData = {
        card_name: cardName,
        avatar: base64Avatar, 
      };

      try {
        const response = await createGiftcard(formData);

        if (response.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Giftcard Created',
            text: 'The giftcard was created successfully!',
            confirmButtonText: 'Ok',
            customClass: {
              confirmButton: 'bg-green-600 text-white hover:bg-green-700', 
            }
          });

          setCardName('');
          setAvatar(null);
          setOpenModal(false);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.message || 'Failed to create giftcard.',
            confirmButtonText: 'Try Again',
            customClass: {
              confirmButton: 'bg-red-600 text-white hover:bg-red-700', 
            }
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to create giftcard.',
          confirmButtonText: 'Try Again',
          customClass: {
            confirmButton: 'bg-red-600 text-white hover:bg-red-700', 
          }
        });
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(avatar);
  };

  return (
    <Modal show={openModal} popup onClose={() => setOpenModal(false)} size="md" className="flex justify-center items-center">
      <Modal.Header className="bg-pay text-base">Create New Giftcard</Modal.Header>
      <Modal.Body className="shadow-md w-full shadow-primary-600/50 rounded-lg bg-pay text-secondary">
        <div className="space-y-6">
          <form onSubmit={handleSubmit} method="post">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="cardname" value="Card Name" />
              </div>
              <TextInput
                id="cardname"
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            <div className="mt-4 block">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="file-upload" value="Upload Avatar" />
                </div>
                <FileInput
                  id="file-upload"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  accept="image/*"
                />
              </div>
            </div>
            <div className="w-full mt-4">
              <button
                type="submit"
                className={`text-pay bg-primary-600 px-3 py-2 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Giftcard"}
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Newcard;
