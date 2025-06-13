import { NextFunction } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const fecha = new Date().toLocaleString();
  console.log(
    fecha,
    `Estas ejecutando un metodo ${req.method} en la ruta ${req.url}`,
  );
  next(); // Continua con la ejecución
}
