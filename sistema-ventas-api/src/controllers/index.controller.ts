import { Request, Response } from "express";


class IndexController {

    public index(req: Request, res: Response) {
        try {
            return res.json({ menssagge: 'API SISTEMAS' });
        } catch (error: any) {
            return res.status(500).json({ menssage: `Error ${error.menssage}` });
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