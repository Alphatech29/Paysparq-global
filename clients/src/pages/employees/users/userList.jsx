import React, { useEffect, useState } from "react";
import { Table, ToggleSwitch, Button } from "flowbite-react";
import { MdOutlineEditNote } from "react-icons/md";
import { LuView } from "react-icons/lu";
import { getAllUsers } from "../../../../components/employees/dashboard/usersApi";
import UpdateUser from "./modal/updateUser";
import ViewUser from "./modal/viewUserDetails";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [switch1, setSwitch1] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
  const [isViewUserOpen, setIsViewUserOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsUpdateUserOpen(true);
  };

  const handleViewClick = (user) => {
    setViewUser(user);
    setIsViewUserOpen(true);
  };

  return (
    <div className="overflow-x-auto h-full shadow-md w-full shadow-primary-600/50 mb-6 rounded-lg bg-pay">
      <h1 className="py-2 text-lg pl-2 text-secondary">All Users</h1>

      {loading && <p className="text-secondary text-sm px-2">Loading users...</p>}
      {error && <p className="text-red-500 px-2">Error: {error}</p>}

      <Table hoverable className="bg-pay">
        <Table.Head className="text-secondary bg-pay">
          <Table.HeadCell className="bg-pay">S/N</Table.HeadCell>
          <Table.HeadCell className="bg-pay">Full Name</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Email</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">User Name</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Country</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.length > 0 ? (
            users.map((user, index) => (
              <Table.Row key={user.uid} className="text-secondary">
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center justify-start gap-3">
                    <img
                      src={user.avatar || "default-avatar.png"}
                      alt="User Avatar"
                      className="w-9 h-9 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-base">{user.fullname}</span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.country}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-green-500/70 text-pay rounded-md px-3 py-1 text-lg"
                    >
                      <MdOutlineEditNote />
                    </button>
                    <button
                      onClick={() => handleViewClick(user)}
                      className="bg-blue-500/70 text-pay rounded-md px-3 py-1"
                    >
                      <LuView />
                    </button>
                    <ToggleSwitch checked={switch1} onChange={() => setSwitch1(!switch1)} />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="6" className="text-center py-4">
                No users found.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      {/* Modals */}
      <UpdateUser open={isUpdateUserOpen} onClose={() => setIsUpdateUserOpen(false)} user={selectedUser} />
      <ViewUser open={isViewUserOpen} onClose={() => setIsViewUserOpen(false)} user={viewUser} />
    </div>
  );
};

export default UserList;
