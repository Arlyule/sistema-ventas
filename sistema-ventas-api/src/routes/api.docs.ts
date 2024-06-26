const swaggerJsDocs = require('swagger-jsdoc')

const options = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Sistema Ventas API",
            description: "Documentación API",
            contact: {
                name: "Julio Samuel",
                url: "https://github.com/Arlule",
            },
            servers: [
                {
                    url: "http://localhost:3000",
                    description: "Developer Server",
                },
            ],
        },
    },
    basePath: "/",
    apis: ["./src/routes/*.ts"],
};


const swaggerDocs = swaggerJsDocs(options);
export default swaggerDocs;