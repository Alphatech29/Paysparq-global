import React, { useEffect, useState } from "react";
import { Table, ToggleSwitch, Button } from "flowbite-react";
import { MdOutlineEditNote } from "react-icons/md";
import { LuView } from "react-icons/lu";
import { getAllEmployees } from "../../../../components/employees/dashboard/employeesApi";
import UpdateEmployee from "./UpdateEmployee";
import ViewEmployee from "./ViewEmployee";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [switch1, setSwitch1] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [isUpdateEmployeeOpen, setIsUpdateEmployeeOpen] = useState(false);
  const [isViewEmployeeOpen, setIsViewEmployeeOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(data.employees);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsUpdateEmployeeOpen(true);
  };

  const handleViewClick = (employee) => {
    setViewEmployee(employee);
    setIsViewEmployeeOpen(true);
  };

  return (
    <div className="overflow-x-auto h-full shadow-md w-full shadow-primary-600/50 mb-6 rounded-lg bg-pay">
      <h1 className="py-2 text-lg pl-2 text-secondary">All Employees</h1>

      {loading && <p className="text-secondary text-sm px-2">Loading employees...</p>}
      {error && <p className="text-red-500 px-2">Error: {error}</p>}

      <Table hoverable className="bg-pay">
        <Table.Head className="text-secondary bg-pay">
          <Table.HeadCell className="bg-pay">S/N</Table.HeadCell>
          <Table.HeadCell className="bg-pay">Full Name</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Email</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">User Name</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Role</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {employees.length > 0 ? (
            employees.map((employee, index) => (
              <Table.Row key={employee.uid} className="text-secondary">
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center justify-start gap-3">
                    <img
                      src={employee.avatar || "default-avatar.png"}
                      alt="Employee Avatar"
                      className="w-9 h-9 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-base">{employee.fullname}</span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>{employee.email}</Table.Cell>
                <Table.Cell>{employee.username}</Table.Cell>
                <Table.Cell>{employee.role_name}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEditClick(employee)}
                      className="bg-green-500/70 text-pay rounded-md px-3 py-1 text-lg"
                    >
                      <MdOutlineEditNote />
                    </button>
                    <button
                      onClick={() => handleViewClick(employee)}
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
                No employees found.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      {/* Modals */}
      <UpdateEmployee
        open={isUpdateEmployeeOpen}
        onClose={() => setIsUpdateEmployeeOpen(false)}
        employee={selectedEmployee}
        role_name={selectedEmployee?.role_name}  // Passing role_name
        role_id={selectedEmployee?.role_id}      // Passing role_id
      />
      <ViewEmployee open={isViewEmployeeOpen} onClose={() => setIsViewEmployeeOpen(false)} employee={viewEmployee} />
    </div>
  );
};

export default EmployeeList;
