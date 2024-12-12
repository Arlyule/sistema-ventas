"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const datadase_1 = __importDefault(require("../database/datadase"));
const utils_1 = require("../utils/utils");
class UserController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.headers);
            const token = req.headers["auth"];
            const currentUser = utils_1.utils.getPayload(token);
            const currentUserId = currentUser === null || currentUser === void 0 ? void 0 : currentUser.cveusuario;
            try {
                const users = yield datadase_1.default.usuario.findMany({
                    where: {
                        NOT: {
                            cveusuario: currentUserId,
                        },
                    },
                    include: {
                        rol: {
                            select: {
                                cverol: true,
                                descripcion: true,
                                clave: true,
                                activo: true,
                            },
                        },
                    },
                });
                return res.json(users);
            }
            catch (error) {
                return res.status(500).json({ error: 'Error al obtener los usuarios' });
            }
        });
    }
    // Obtener un usuario por ID
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield datadase_1.default.usuario.findUnique({
                    where: { cveusuario: Number(id) },
                    include: {
                        rol: {
                            select: {
                                descripcion: true, // Solo selecciona el campo descripcion
                            },
                        },
                    },
                });
                if (user) {
                    return res.json(user);
                }
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            catch (error) {
                return res.status(500).json({ error: 'Error al obtener el usuario' });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, apellidos, username, password, cverol } = req.body;
                // Verificar si el rol existe
                const rol = yield datadase_1.default.rol.findMany({
                    where: {
                        cverol: Number.parseInt(cverol),
                    },
                });
                if (rol.length <= 0) {
                    return res.status(404).json({ message: "El rol no existe" });
                }
                // Verificar si el nombre de usuario ya existe
                const verifyUsername = yield datadase_1.default.usuario.findMany({
                    where: {
                        username: username,
                    },
                });
                if (verifyUsername.length > 0) {
                    return res.status(400).json({ message: "El nombre de usuario ya está en uso" });
                }
                // Crear el usuario con el rol verificado
                const hashedPassword = yield utils_1.utils.hashPassword(password);
                const newUser = yield datadase_1.default.usuario.create({
                    data: {
                        nombre,
                        apellidos,
                        username,
                        password: hashedPassword,
                        cverol: Number.parseInt(cverol),
                    },
                });
                return res.status(201).json(newUser);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Error al crear el usuario' });
            }
        });
    }
    // Actualizar un usuario existente
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cveusuario, nombre, apellidos, cverol } = req.body;
                // Verificar si existe el usuario
                const verifyUser = yield datadase_1.default.usuario.findMany({
                    where: {
                        cveusuario: Number(cveusuario)
                    }
                });
                if (verifyUser.length <= 0) {
                    return res.status(404).json({ message: "El usuario no existe" });
                }
                // Verificar si el rol existe
                const rol = yield datadase_1.default.rol.findMany({
                    where: {
                        cverol: Number(cverol)
                    }
                });
                if (rol.length <= 0) {
                    return res.status(404).json({ message: "El rol no existe" });
                }
                // Actualizar el usuario con el rol y datos proporcionados
                const updatedUser = yield datadase_1.default.usuario.update({
                    where: { cveusuario: Number(cveusuario) },
                    data: {
                        nombre,
                        apellidos,
                        cverol: Number(cverol),
                    },
                });
                console.log(updatedUser);
                return res.json(updatedUser);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error al actualizar el usuario' });
            }
        });
    }
    // Eliminar un usuario
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Verificar si el usuario existe
                const user = yield datadase_1.default.usuario.findUnique({
                    where: {
                        cveusuario: Number(id),
                    },
                });
                if (!user) {
                    return res.status(404).json({ message: "El usuario no existe" });
                }
                // Eliminar el usuario
                yield datadase_1.default.usuario.delete({
                    where: {
                        cveusuario: Number(id),
                    },
                });
                return res.status(204).send();
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error al eliminar el usuario' });
            }
        });
    }
}
exports.userController = new UserController();
