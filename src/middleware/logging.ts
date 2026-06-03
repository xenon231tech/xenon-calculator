// logging middleware

export const loggingMiddleware = (req: any, res: any, next: any) => {
  // Middleware implementation
  next();
};

export default loggingMiddleware;
