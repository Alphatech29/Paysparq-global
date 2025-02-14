import { Button, Label, Modal, TextInput } from "flowbite-react";

const ViewUser = ({ open, onClose, user }) => {
  return (
    <Modal show={open} popup>
      <Modal.Header> 
        <span className="text-xl font-medium text-secondary px-3 pb-3">
          View {user?.username || "User"}'s Profile
        </span>
      </Modal.Header>
      <Modal.Body className="text-secondary">
        <div className="space-y-6">
          <div className="flex gap-4">
            <div>
              <img src={user?.avatar || "/default-avatar.png"} alt="User Avatar" className="w-20 h-20 rounded-lg"/>
            </div>
            <div className="bg-primary-600 px-3 py-4 rounded-md text-pay shadow-md shadow-primary-600">
              <div>
                <h1 className="text-sm">User Balance: <strong>₦{Number(user?.account_balance || 0).toLocaleString("en-US")}</strong></h1>
              </div>
              <hr className="mt-2"/>
              <div className="mt-1">
                <h1 className="text-sm">Account Number: <strong>{user?.account_number || "N/A"}</strong></h1>
              </div>
            </div>
            <div className="flex flex-col gap-3 shadow-md shadow-primary-600 px-3 py-3 rounded-md">
              <div><h1>BVN Number: {user?.bvn_number || "N/A"}</h1></div>
              <div><h1>NIN Number: {user?.nin_number || "N/A"}</h1></div>
            </div>
          </div>

          <div>
            <Label htmlFor="fullname" value="User Full Name" />
            <TextInput id="fullname" type="text" value={user?.fullname || ""} readOnly disabled />
          </div>

          <div>
            <Label htmlFor="email" value="User Email Address" />
            <TextInput id="email" type="email" value={user?.email || ""} readOnly disabled />
          </div>

          <div className="flex gap-3">
            <div>
              <Label htmlFor="phone" value="User Phone Number" />
              <TextInput id="phone" type="tel" value={user?.phone_number || ""} readOnly disabled />
            </div>

            <div>
              <Label htmlFor="country" value="User Country" />
              <TextInput id="country" value={user?.country || ""} readOnly disabled />
            </div>

            <div>
              <Label htmlFor="dob" value="User Date Of Birth" />
              <TextInput id="dob" value={user?.date_of_birth || ""} readOnly disabled />
            </div>
          </div>

          <div>
            <Label htmlFor="address" value="User Address" />
            <TextInput id="address" value={user?.address || ""} readOnly disabled />
          </div>

          <div className="w-full flex justify-end">
            <Button color="gray" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewUser;
