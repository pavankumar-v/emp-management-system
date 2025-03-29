import React, { useCallback, useState } from "react";
import { Add as AddIcon } from '@mui/icons-material';
import { CreateEmployeeDto, Employee } from "../../types/employee";
import { Container } from "@mui/joy";
import { Box, Button } from "@mui/material";
import { EmployeeList } from "../EmployeeList";
import { EmployeeForm } from "../EmployeeForm";
import { employeeService } from "../../services/employeeService";
import useQuery from "../../hooks/useQuery";

const EmployeesPage: React.FC = () => {
  const loadEmployees = useCallback(async () => {
    try {
      return await employeeService.getAll();
    } catch (error) {
      console.error('Error loading employees:', error);
      return [];
    }
  }, [])

  const [employees, setEmployees, { loading }, loadEmployeesData] = useQuery<Employee[]>(loadEmployees)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenForm = (employee?: Employee) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedEmployee(undefined);
    setIsFormOpen(false);
  };

  const handleSubmit = async (employeeData: CreateEmployeeDto) => {
    try {
      setIsSubmitting(true);
      if (selectedEmployee) {
        await employeeService.update(selectedEmployee.id, employeeData);
        await loadEmployeesData();
      } else {
        await employeeService.create(employeeData);
        await loadEmployeesData();
      }
      handleCloseForm();
    } catch (error) {
      console.error('Error saving employee:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeService.delete(id);
        setEmployees(employees.filter(emp => emp.id !== id));
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <h1>Employee Management System</h1>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenForm()}
          >
            Add Employee
          </Button>
        </Box>

        <EmployeeList
          employees={employees}
          loading={loading}
          onEdit={handleOpenForm}
          onDelete={handleDelete}
        />
        <EmployeeForm
          open={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          employee={selectedEmployee}
          isSubmitting={isSubmitting}
        />
      </Box>
    </Container>
  );
};

export default EmployeesPage;
