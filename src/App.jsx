import React, { useState } from 'react';
import AddEmployeeModal from './components/AddEmployeeModal';
import EmployeeList from './components/EmployeeList';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [
      ...prevEmployees, 
      { ...newEmployee, dateAdded: new Date().toLocaleDateString() }
    ]);
  };

  const editEmployee = (id, updatedEmployee) => {
    const updatedEmployees = employees.map((emp) =>
      emp.id === id ? { ...emp, ...updatedEmployee } : emp
    );
    setEmployees(updatedEmployees);
  };

  const deleteEmployee = (id) => {
    setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id));
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Employee Management System</h1>
        <button 
          className="add-button" 
          onClick={() => setIsModalOpen(true)}
        >
          + Add Employee
        </button>
      </header>

      {/* Employee modal */}
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addEmployee={addEmployee}
      />

      {/* Employee list */}
      {employees.length > 0 ? (
        <EmployeeList 
          employees={employees} 
          editEmployee={editEmployee} 
          deleteEmployee={deleteEmployee} 
        />
      ) : (
        <p className="no-employees-message">No employees found. Add a new employee to get started!</p>
      )}
    </div>
  );
}

export default App;
