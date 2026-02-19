import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import routes from './app/routes';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log(app.get('env'));

// app.use('/api/v1/users/', UserRoutes)
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes)
app.use('/api/v1/', routes);

//Testing
// app.get('/', async(req: Request, res: Response, next: NextFunction) => {
//     // Promise.reject( new Error('Unhandled promise rejection'));
//     // console.log(X);
//     throw new Error('Testing Logger')
// })

// globalError Handler
app.use(globalErrorHandler);

//handle no found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: {
      path: req.originalUrl,
      message: 'API not found',
    },
  });
  next();
});

/* const academicSemester = {
  code: '01',
  year: '2025',
};

const testId = async () => {
  const testId = await generateStudentId(academicSemester);
  console.log(testId);
};

testId(); */

/* const testId = async () => {
  const testId = await generateFacultyId();
  console.log(testId);
};

testId(); */

export default app;
