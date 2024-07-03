import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validate = (
    req: Request, res: Response, next: NextFunction) => {
    //Se obtiene los errores a partir del request original de lla peticion.
    const errors = validationResult(req);

    //Si no existe errores de la pecion continua
    if (errors.isEmpty()) return next();

    //Se devuelve los errores con un estado de peticion 400
    return res.status(400).json(errors.array());
}