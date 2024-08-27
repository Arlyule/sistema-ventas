"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validator_check_1 = require("../middlewares/validator.check");
const user_rules_1 = require("../rules/user.rules");
const jwt_check_1 = require("../middlewares/jwt.check");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    /**
     * @swagger
     * definitions:
     *  Usuario:
     *      type: object
     *      required:
     *        - nombre
     *        - apellidos
     *        - username
     *        - password
     *      properties:
     *          nombre:
     *              type: string
     *          apellidos:
     *              type: string
     *          username:
     *              type: string
     *          password:
     *              type: string
     *          cverol:
     *              type: integer
     */
    config() {
        /**
         * @swagger
         * /api/users:
         *  get:
         *      tags: ["Usuarios"]
         *      summary: Obtener todos los usuarios
         *      responses:
         *          200:
         *              description: Éxito
         */
        this.router.get('/', [jwt_check_1.jwtCheck], user_controller_1.userController.getUsers);
        /**
         * @swagger
         * /api/users/{id}:
         *  get:
         *      tags: ["Usuarios"]
         *      summary: Obtener un usuario por ID
         *      parameters:
         *          - in: path
         *            name: id
         *            required: true
         *            schema:
         *              type: integer
         *      responses:
         *          200:
         *              description: Éxito
         *          404:
         *              description: Usuario no encontrado
         */
        this.router.get('/:id', user_controller_1.userController.getUserById);
        /**
         * @swagger
         * /api/users:
         *  post:
         *      tags: ["Usuarios"]
         *      summary: Crear un nuevo usuario
         *      description: Agregar un nuevo usuario
         *      parameters:
         *          - in: body
         *            name: Usuario
         *            description: Datos del usuario a crear
         *            schema:
         *              $ref: '#/definitions/Usuario'
         *      responses:
         *          201:
         *              description: Usuario creado
         */
        this.router.post('/', (0, user_rules_1.userRules)(), [validator_check_1.validate], user_controller_1.userController.createUser);
        /**
         * @swagger
         * /api/users/{id}:
         *  put:
         *      tags: ["Usuarios"]
         *      summary: Actualizar un usuario
         *      description: Actualizar un usuario existente
         *      parameters:
         *          - in: path
         *            name: id
         *            required: true
         *            schema:
         *              type: integer
         *          - in: body
         *            name: Usuario
         *            description: Datos del usuario a actualizar
         *            schema:
         *              $ref: '#/definitions/Usuario'
         *      responses:
         *          200:
         *              description: Usuario actualizado
         *          404:
         *              description: Usuario no encontrado
         */
        this.router.put('/', [validator_check_1.validate], user_controller_1.userController.updateUser);
        /**
         * @swagger
         * /api/users/{id}:
         *  delete:
         *      tags: ["Usuarios"]
         *      summary: Eliminar un usuario
         *      description: Eliminar un usuario existente por ID
         *      parameters:
         *          - in: path
         *            name: id
         *            required: true
         *            schema:
         *              type: integer
         *      responses:
         *          204:
         *              description: Usuario eliminado
         *          404:
         *              description: Usuario no encontrado
         */
        this.router.delete('/:id', user_controller_1.userController.deleteUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
