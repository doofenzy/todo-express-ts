import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 'fail',
      errors: errors.array().map((error) => ({
        message: error.msg,
      })),
    });
    return; // exit early
  }

  next();
};

export default handleValidationErrors;
