import { Request, Response } from "express";
import prisma from "../database/datadase";
import { utils } from "../utils/utils";


class IndexController {

    public async index(req: Request, res: Response) {
        try {
            return res.json({ message: 'API Works!' });
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