import { body } from 'express-validator';

export const userRules = () => {
    return [
        body("nombre").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 350 }).withMessage("Rango Incorrecto"),
        body("apellidos").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 450 }).withMessage("Rango Incorrecto"),
        body("username").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 150 }).withMessage("Rango Incorrecto"),
        body("password").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 100 }).withMessage("Rango Incorrecto"),
        body("cverol").isInt({ min: 1 }).withMessage("campo requerido"),
    ]
};
