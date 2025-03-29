import { NextFunction, Request, Response } from "express";
import { Employee } from "../entity/Employee";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { httpResponse } from "../helpers/http-response.helper";

// GET /api/employees/
export const getEmployees = async (req: Request, res: Response) => {
  httpResponse(res, StatusCodes.OK, await Employee.find({ order: { updatedAt: 'DESC' } }));
};

// GET /api/employees/:id
export const getEmployeeById = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
  try {
    const employee = await Employee.findOne({ where: { id: req.params.id } });

    if (!employee) {
      httpResponse(res, StatusCodes.NOT_FOUND,
        {
          message: 'Employee not found',
          errors: [{ code: 'EMPLOYEE_NOT_FOUND', message: 'Employee not found' }]
        }
      );
    }

    httpResponse(res, StatusCodes.OK, employee);
  } catch (error) {
    next(error)
  }
};

// POST /api/employees/
export const createEmployee = async (req: Request<{ body: Employee }>, res: Response, next: NextFunction) => {
  console.log(req.body)
  try {
    const employee = Employee.create(req.body)
    httpResponse(res, StatusCodes.CREATED,
      {
        data: await employee.save(),
        message: 'Employee created successfully'
      }
    );
  } catch (err) {
    next(err)
  }
};

// PATCH /api/employees/:id
export const updateEmployee = async (req: Request<{ id: number, body: Partial<Employee> }>, res: Response, next: NextFunction) => {
  try {
    await Employee.update(req.params.id, req.body)
    const employee = await Employee.findOne({ where: { id: req.params.id } });

    if (!employee) {
      return httpResponse(res, StatusCodes.NOT_FOUND,
        {
          message: 'Employee not found',
          errors: [{ code: 'EMPLOYEE_NOT_FOUND', message: 'Employee not found' }]
        }
      );
    }

    httpResponse(res, StatusCodes.OK, employee);
  } catch (error) {
    next(error)
  }
};

// DELETE /api/employees/:id
export const deleteEmployee = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
  try {
    const employee = await Employee.findOne({ where: { id: req.params.id } });

    if (!employee) {
      return httpResponse(res, StatusCodes.NOT_FOUND,
        {
          message: 'Employee not found',
          errors: [{ code: 'EMPLOYEE_NOT_FOUND', message: 'Employee not found' }]
        }
      );
    }

    await employee.remove();

    httpResponse(res, StatusCodes.OK, employee);
  } catch (error) {
    next(error)
  }
};
