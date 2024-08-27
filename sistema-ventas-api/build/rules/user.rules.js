"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRules = void 0;
const express_validator_1 = require("express-validator");
const userRules = () => {
    return [
        (0, express_validator_1.body)("nombre").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 350 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("apellidos").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 450 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("username").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 150 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("password").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 100 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("cverol").isInt({ min: 1 }).withMessage("campo requerido"),
    ];
};
exports.userRules = userRules;
