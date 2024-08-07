import { Request, Response } from "express";
import prisma from "../database/datadase";
import { utils } from "../utils/utils";

class AuthController {
    public async logIn(req: Request, res: Response) {
        try {
            // var temp = await utils.hashPassword('linux');
            // console.log(temp);

            //TODO: Obtener los datos del body
            const { username, password } = req.body;

            //TODO: Verificar si el usuario existe
            const usuario = await prisma.usuario.findFirst({ where: { username: username } });

            if (!usuario) {
                return res.status(404).json({ message: 'El usuario y/o contraseña son incorrectos' });
            }

            // Verificar la contraseña
            if (await utils.checkPassword(password, usuario.password)) {

                // Si la contraseña es correcta generar el payload con la información
                const { password, fecharegistro, ...newUser } = usuario;

                //Generar el jwt
                const token = utils.generateJWT(newUser);

                // Enviar el jwt
                res.json({ message: 'Autentificación correcta', token })

            } else {
                return res.status(404).json({ message: 'El usuario y/o contraseña son incorrectos' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error interno' });
        }
    }
}

export const authController = new AuthController();