export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  field: string;
  skills: string[];
  about: string;
}

export interface CreateEmployeeDto {
  firstName: string;
  lastName: string;
  field: string;
  skills: string[];
  about: string;
}

export interface UpdateEmployeeDto extends Partial<CreateEmployeeDto> {} 