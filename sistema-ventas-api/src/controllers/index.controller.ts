import { Request, Response } from "express";
import prisma from "../database/datadase";


class IndexController {

    public async index(req: Request, res: Response) {
        try {
            const usuarios = await prisma.usuario.findMany();
            // return res.json({ message: "API Works" });
            const newUser = await prisma.usuario.create({
                data: {
                    nombre: "Marisol",
                    apellidos: "nuñez",
                    username: "marisol02",
                    password: "linux",
                },
            });
            return res.json(usuarios);
        } catch (error: any) {
            return res.status(500).json({ message: `Error ${error.message}` });
        }
    }



    public insert(req: Request, res: Response) {
        try {
            return res.json({ menssagge: 'INSERT SISTEMAS' });
        } catch (error: any) {
            return res.status(500).json({ menssage: `Error ${error.menssage}` });
        }
    }

    public update(req: Request, res: Response) {
        try {
            return res.json({ menssagge: 'UPDATE SISTEMAS' });
        } catch (error: any) {
            return res.status(500).json({ menssage: `Error ${error.menssage}` });
        }
    }

    public delete(req: Request, res: Response) {
        try {
            return res.json({ menssagge: 'DELETE SISTEMAS' });
        } catch (error: any) {
            return res.status(500).json({ menssage: `Error ${error.menssage}` });
        }
    }


}

export const IndexCotroller = new IndexController();