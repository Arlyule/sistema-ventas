import { Router } from "express";
import { IndexCotroller } from "../controllers/index.controller";

/** 
*
*/
class IndexRoutes {

    public router: Router;
    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        /**
         * @swagger
         * /api:
         *  get: 
         *      tags: ["index"]
         *      summary : Default Index
         *      description: Ruta por defecto de la api
         *      produces:
         *          - application/json
         *      responses:
         *          200:
        *              description: Exitoso
         */
        this.router.get('/', IndexCotroller.index);
        /**
         * @swagger
         * /api:
         *  post: 
         *      tags: ["index"]
         *      summary : Default Index
         *      description: Ruta por defecto de la api
         *      produces:
         *          - application/json
         *      responses:
         *          200:
        *              description: Exitoso
        */
        this.router.post('/', IndexCotroller.insert);
        /**
         * @swagger
         * /api:
         *  put: 
         *      tags: ["index"]
         *      summary : Default Index
         *      description: Ruta por defecto de la api
         *      produces:
         *          - application/json
         *      responses:
         *          200:
        *              description: Exitoso
        */
        this.router.put('/', IndexCotroller.update);
        /**
         * @swagger
         * /api:
         *  delete: 
         *      tags: ["index"]
         *      summary : Default Index
         *      description: Ruta por defecto de la api
         *      produces:
         *          - application/json
         *      responses:
         *          200:
        *              description: Exitoso
        */
        this.router.delete('/', IndexCotroller.delete);
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
