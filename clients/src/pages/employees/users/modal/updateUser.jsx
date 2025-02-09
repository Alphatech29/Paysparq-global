import { Button, Label, Modal, TextInput, Datepicker } from "flowbite-react";
import { updateUser } from "../../../../../components/employees/dashboard/usersApi";
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';

const UpdateUser = ({ open, onClose, user }) => {
  const [fullname, setFullname] = useState(user?.fullname || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone_number || '');
  const [bvn, setBvn] = useState(user?.bvn_number || '');
  const [nin, setNin] = useState(user?.nin_number || '');
  const [address, setAddress] = useState(user?.address || '');
  const [dob, setDob] = useState(user?.date_of_birth || '');

  useEffect(() => {
    if (user) {
      setFullname(user.fullname || '');
      setEmail(user.email || '');
      setPhone(user.phone_number || '');
      setBvn(user.bvn_number || '');
      setNin(user.nin_number || '');
      setAddress(user.address || '');
      setDob(user.date_of_birth || '');
    }
  }, [user]);

  const handleUpdate = async () => {
    const userData = {};

    if (fullname !== user?.fullname) userData.fullname = fullname || null;
    if (email !== user?.email) userData.email = email || null;
    if (phone !== user?.phone_number) userData.phone_number = phone || null;
    if (bvn !== user?.bvn_number) userData.bvn_number = bvn || null;
    if (nin !== user?.nin_number) userData.nin_number = nin || null;
    if (address !== user?.address) userData.address = address || null;

    if (dob !== user?.date_of_birth) {
      const formattedDob = dob ? new Date(dob).toISOString().split('T')[0] : null;
      userData.date_of_birth = formattedDob;
    }

    if (Object.keys(userData).length === 0) {
      Swal.fire({
        title: 'No changes detected!',
        text: 'You did not make any changes to the profile.',
        icon: 'info',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'bg-primary-600 text-pay px-6 py-2 rounded-lg hover:bg-primary-600 transition duration-300',
        },
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to update ${user?.username}'s profile.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
      customClass: {
        cancelButton: 'bg-red-500 text-pay px-6 py-2 rounded-lg hover:bg-red-500/50 transition duration-300',
        confirmButton: 'bg-primary-600 text-pay px-6 py-2 rounded-lg hover:bg-primary-600 transition duration-300',
      },
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateUser(user?.uid, userData);
          Swal.fire({
            title: 'Updated!',
            text: `${user?.username}'s profile has been updated.`,
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'bg-primary-600 text-pay px-6 py-2 rounded-lg hover:bg-primary-600 transition duration-300',
            },
          });
          onClose();
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: `There was an issue updating the profile: ${error.message || 'Please try again.'}`,
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'bg-primary-600 text-pay px-6 py-2 rounded-lg hover:bg-primary-600 transition duration-300',
            },
          });
        }
      }
    });
  };

  return (
    <Modal show={open}  popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Update {user?.username}'s profile
          </h3>
          <div>
            <Label htmlFor="fullname" value="User Full Name" />
            <TextInput id="fullname" type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email" value="User Email Address" />
            <TextInput id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex gap-3">
          <div>
            <Label htmlFor="phone" value="User Phone Number" />
            <TextInput id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="bvn" value="User BVN Number" />
            <TextInput id="bvn" type="text" value={bvn} onChange={(e) => setBvn(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="nin" value="User NIN Number" />
            <TextInput id="nin" type="text" value={nin} onChange={(e) => setNin(e.target.value)} />
          </div>
          </div>
          <div>
            <Label htmlFor="address" value="User Address" />
            <TextInput id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="dob" value="User Date Of Birth" />
            <Datepicker id="dob" selected={dob ? new Date(dob) : null} onChange={(date) => setDob(date)} />
          </div>
          <div className="flex gap-4 justify-end">
            <Button className="bg-primary-600 text-pay" onClick={handleUpdate}>Update</Button>
            <Button className="text-secondary border-primary-600" onClick={onClose}>Decline</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateUser;
