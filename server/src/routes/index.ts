import express from 'express';

import employeeRoutes from './employee.routes';

const router = express.Router();

router.use('/employees', employeeRoutes);

export default router;
