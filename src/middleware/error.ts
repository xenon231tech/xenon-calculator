// error middleware

export const errorMiddleware = (req: any, res: any, next: any) => {
  // Middleware implementation
  next();
};

export default errorMiddleware;
