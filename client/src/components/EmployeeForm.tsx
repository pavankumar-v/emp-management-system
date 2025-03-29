import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  CircularProgress,
} from '@mui/material';
import { Employee, CreateEmployeeDto } from '../types/employee';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  field: yup.string().required('Field is required'),
  skills: yup.array().of(yup.string()).default([]),
  about: yup.string().required('About is required'),
});

interface EmployeeFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (employee: CreateEmployeeDto) => Promise<void>;
  employee?: Employee;
  isSubmitting?: boolean;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  open,
  onClose,
  onSubmit,
  employee,
  isSubmitting = false,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateEmployeeDto>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      firstName: '',
      lastName: '',
      field: '',
      skills: [],
      about: '',
    },
  });

  const [newSkill, setNewSkill] = React.useState('');
  const skills = watch('skills'); // watch for changes on remove

  useEffect(() => {
    if (employee) {
      reset({
        firstName: employee.firstName,
        lastName: employee.lastName,
        field: employee.field,
        skills: employee.skills,
        about: employee.about,
      });
    } else {
      reset({
        firstName: '',
        lastName: '',
        field: '',
        skills: [],
        about: '',
      });
    }
  }, [employee, reset]);

  const handleAddSkill = () => {
    if (newSkill) {
      const currentSkills = skills || [];
      if (!currentSkills.includes(newSkill)) {
        setValue('skills', [...currentSkills, newSkill]);
        setNewSkill('');
      }
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const currentSkills = skills || [];
    setValue(
      'skills',
      currentSkills.filter((skill: string) => skill !== skillToRemove)
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{employee ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="field"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Field"
                  error={!!errors.field}
                  helperText={errors.field?.message}
                  fullWidth
                />
              )}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                label="Add Skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                fullWidth
              />
              <Button onClick={handleAddSkill} variant="contained" color="primary">
                Add
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {skills?.map((skill: string) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => handleRemoveSkill(skill)}
                />
              ))}
            </Box>
            <Controller
              name="about"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="About"
                  error={!!errors.about}
                  helperText={errors.about?.message}
                  multiline
                  rows={4}
                  fullWidth
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : employee ? (
              'Update'
            ) : (
              'Create'
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
