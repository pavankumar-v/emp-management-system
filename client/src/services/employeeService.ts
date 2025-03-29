import axios from 'axios';
import { Employee, CreateEmployeeDto, UpdateEmployeeDto } from '../types/employee';

const API_URL = 'http://localhost:8080/api/employees';

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  errors?: Array<{ code: string; message: string; field?: string }>;
}

const api = axios.create({
  baseURL: API_URL,
});

// // Add a request interceptor to add delay
api.interceptors.request.use(async (config) => {
  // Add 3 second delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return config;
});

// Add a response interceptor that automatically unwraps the data
api.interceptors.response.use(<T>(response: { data: ApiResponse<T> }): T => {
  return response.data.data;
});

export const employeeService = {
  getAll: async (): Promise<Employee[]> => {
    return api.get('/');
  },

  getById: async (id: number): Promise<Employee> => {
    return api.get(`/${id}`);
  },

  create: async (employee: CreateEmployeeDto): Promise<Employee> => {
    return (await api.post<Employee>('/', employee)).data;
  },

  update: async (id: number, employee: UpdateEmployeeDto): Promise<Employee> => {
    return api.patch(`/${id}`, employee);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete(`/${id}`);
  },
};
