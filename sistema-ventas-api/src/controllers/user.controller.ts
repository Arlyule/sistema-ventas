import { Request, Response } from 'express';
import prisma from '../database/datadase';
import { utils } from '../utils/utils';

class UserController {

    public async getUsers(req: Request, res: Response): Promise<Response> {
        console.log(req.headers);
        const token = <string>req.headers["auth"];
        const currentUser = utils.getPayload(token);
        const currentUserId = currentUser?.cveusuario;
        try {
            const users = await prisma.usuario.findMany({
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
        } catch (error) {
            return res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
    }

    // Obtener un usuario por ID
    public async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const user = await prisma.usuario.findUnique({
                where: { cveusuario: Number(id) },
                include: {
                    rol: {  // Incluye la relación con la tabla rol
                        select: {
                            descripcion: true,  // Solo selecciona el campo descripcion
                        },
                    },
                },
            });
            if (user) {
                return res.json(user);
            }
            return res.status(404).json({ error: 'Usuario no encontrado' });
        } catch (error) {
            return res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    }

    public async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const { nombre, apellidos, username, password, cverol } = req.body;

            // Verificar si el rol existe
            const rol = await prisma.rol.findMany({
                where: {
                    cverol: Number.parseInt(cverol),
                },
            });

            if (rol.length <= 0) {
                return res.status(404).json({ message: "El rol no existe" });
            }

            // Verificar si el nombre de usuario ya existe
            const verifyUsername = await prisma.usuario.findMany({
                where: {
                    username: username,
                },
            });

            if (verifyUsername.length > 0) {
                return res.status(400).json({ message: "El nombre de usuario ya está en uso" });
            }

            // Crear el usuario con el rol verificado
            const hashedPassword = await utils.hashPassword(password);

            const newUser = await prisma.usuario.create({
                data: {
                    nombre,
                    apellidos,
                    username,
                    password: hashedPassword,
                    cverol: Number.parseInt(cverol),
                },
            });

            return res.status(201).json(newUser);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al crear el usuario' });
        }
    }


    // Actualizar un usuario existente
    public async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const { cveusuario, nombre, apellidos, cverol } = req.body;

            // Verificar si existe el usuario
            const verifyUser = await prisma.usuario.findMany({
                where: {
                    cveusuario: Number(cveusuario)
                }
            });

            if (verifyUser.length <= 0) {
                return res.status(404).json({ message: "El usuario no existe" });
            }

            // Verificar si el rol existe
            const rol = await prisma.rol.findMany({
                where: {
                    cverol: Number(cverol)
                }
            });

            if (rol.length <= 0) {
                return res.status(404).json({ message: "El rol no existe" });
            }

            // Actualizar el usuario con el rol y datos proporcionados
            const updatedUser = await prisma.usuario.update({
                where: { cveusuario: Number(cveusuario) },
                data: {
                    nombre,
                    apellidos,
                    cverol: Number(cverol),
                },
            });

            console.log(updatedUser);

            return res.json(updatedUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
    }


    // Eliminar un usuario
    public async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            // Verificar si el usuario existe
            const user = await prisma.usuario.findUnique({
                where: {
                    cveusuario: Number(id),
                },
            });

            if (!user) {
                return res.status(404).json({ message: "El usuario no existe" });
            }

            // Eliminar el usuario
            await prisma.usuario.delete({
                where: {
                    cveusuario: Number(id),
                },
            });

            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
    }

}

export const userController = new UserController();
