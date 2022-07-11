const express = require("express");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        //Directorio publico
        this.app.use( express.static('public'))  //Explica lo que se ha de servir en el path del home
    }

    routes() {

        //según cada petición que se haga el servidor devuelve una respuesta diferente
        //GET
        this.app.get("/api", (req, res) => {
            res.json({
                msg: "get API"
            });
        });
        //PUT
        this.app.put("/api", (req, res) => {
            res.json({
                msg: "put API"
            });
        });
        //POST
        this.app.post("/api", (req, res) => {
            res.status(201).json({  //envio de cogido de respuesta para exponer el status de la petición
                msg: "post API"
            });
        });
        // DELETE
        this.app.delete("/api", (req, res) => {
            res.json({
                msg: "delete API"
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}

module.exports = Server;
