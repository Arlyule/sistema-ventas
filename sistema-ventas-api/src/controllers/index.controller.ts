import { Request, Response } from "express";
import prisma from "../database/datadase";
import { utils } from "../utils/utils";


class IndexController {

    public async index(req: Request, res: Response) {
        try {
            // return res.json({ message: "API Works" });
            // const user = {
            //     nombre: "Samuel",
            //     apellidos: "Torres",
            //     username: "samuel01",
            //     password: "linux",

            // };
            // const token = utils.generateJWT(user);
            // console.log(token);
            // var jwt = 'eyJhbGciOiJIUzI1NiIsInR5 cCI6IkpXVCJ9.eyJub21icmUiOiJTYW11ZWwiLCJhcGVsbGlkb3MiOiJUb3JyZXMiLCJ1c2VybmFtZSI6InNhbXVlbDAxIiwicGFzc3dvcmQiOiJsaW51eCIsImlhdCI6MTcyMDIyODIwOCwiZXhwIjoxNzIwMjMxODA4fQ.ZHvIiGU0ye_obLNrwaV8VDmytL_URDRmouoByDX0AcQ'
            // var data = utils.getPayload(jwt);
            // console.log(data);
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