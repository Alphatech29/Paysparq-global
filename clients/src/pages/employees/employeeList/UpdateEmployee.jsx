import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import { updateEmployee } from "../../../../components/employees/dashboard/employeesApi";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const UpdateEmployee = ({ open, onClose, employee }) => {
  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState(employee?.role_id || "");
  const [phone, setPhone] = useState(employee?.phone_number || "");
  const [password, setPassword] = useState(""); // New password field

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("/api/employees/role");
        const data = await response.json();
        setRoles(data.roles || []);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  // Sync state when employee prop updates
  useEffect(() => {
    if (employee) {
      setRoleId(employee.role_id || "");
      setPhone(employee.phone_number || "");
      setPassword(""); // Reset password when employee updates
    }
  }, [employee]);

  const handleUpdate = async () => {
    // Initialize an empty object to hold the updated data
    const updatedData = {};
  
    // Only add to updatedData if values are different from the initial state
    if (roleId !== employee?.role_id) {
      updatedData.role_id = roleId;
    }
    if (phone !== employee?.phone_number) {
      updatedData.phone_number = phone;
    }
    if (password) {
      updatedData.password = password;
    }
  
    // Check if there are any changes to update
    if (Object.keys(updatedData).length === 0) {
      Swal.fire({
        title: "No Changes Made!",
        text: "There were no changes to update.",
        icon: "info",
        confirmButtonText: "OK",
        customClass: {
          title: 'text-blue-600',
          content: 'text-gray-700',
          confirmButton: 'bg-blue-500 text-white hover:bg-blue-600'
        }
      });
      return;
    }
  
    try {
      // Send the update request to the API
      const response = await updateEmployee(employee?.uid, updatedData);
      console.log("Response from backend:", response); // Log the response for debugging
  
      // Ensure success is checked properly
      if (response?.message === 'Employee updated successfully') {
        Swal.fire({
          title: "Updated!",
          text: `${employee?.username}'s profile has been updated.`,
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            title: 'text-green-600',
            content: 'text-gray-700',
            confirmButton: 'bg-green-500 text-white hover:bg-green-600'
          }
        });
        onClose();
      } else {
        throw new Error(response?.message || "Update failed: Unknown error");
      }
    } catch (error) {
      console.error("Error updating employee:", error); // Log the error for debugging
      Swal.fire({
        title: "Error!",
        text: `There was an issue updating the profile: ${error.message || "Please try again."}`,
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          title: 'text-red-600',
          content: 'text-gray-700',
          confirmButton: 'bg-red-500 text-white hover:bg-red-600'
        }
      });
    }
  };
  

  return (
    <Modal show={open} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <span className="text-xl font-medium text-gray-900 dark:text-white">
            Update Employee Profile
          </span>

          <div className="flex flex-col gap-3">
            <div>
              <Label htmlFor="role_id" value="Role" />
              <Select
                id="role_id"
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
              >
                {roles?.map((role) => (
                  <option key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="phone" value="Phone Number" />
              <TextInput
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button className="bg-primary-600 text-pay" onClick={handleUpdate}>
              Update
            </Button>
            <Button className="text-secondary border-primary-600" onClick={onClose}>
              Decline
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateEmployee;
