import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from './routes/api.docs';
import indexRoutes from './routes/index.routes';

class Server {

    //Todo: Crear la instancia global de nuestra app
    public app: Application;

    //TODO: Crear un constructor
    constructor() {
        this.app = express();
        this.config();
        this.route();
    }

    //TODO: Generar un metodo para la configuracion
    private config(): void {
        //TODO: Configuracion del puerto para eeel server
        this.app.set("port", process.env.PORT || 3000);

        //TODO: Mostrar las peticiones en consola
        this.app.use(morgan("dev"));

        //TODO: Uso de CORS (Cross Origin)
        this.app.use(cors());

        //TODO: Generar resttriccion de api
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    //TODO: Generar un metodo para la configuracion de rutas
    private route(): void {
        this.app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
        this.app.use('/api', indexRoutes);
    }

    //TODO: Generar un metodo para la inizializacion del proyecto
    start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port " + this.app.get("port"))
        })
    }
}

const server = new Server();
server.start();
