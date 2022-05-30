
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            users: '/api/users',
            uploads: '/api/uploads'
        }

        // Connect Db
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Routes of the app
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // Body parsing
        this.app.use(express.json());

        // Public directory
        this.app.use(express.static('public'))

        // File upload
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
            tempFileDir: '/tmp/',
            createParentPath: true, 
            useTempFiles: true
          }));

    }

    async connectDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server on port', this.port);
        })
    }
}

module.exports = Server;