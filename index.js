
    const builder = require('./build');
    const chokidar = require("chokidar");

    switch(process.argv[2]){

        case "build":
            builder(true);
            break;

        case "serve":

            builder(true);
            const StaticServer = require('static-server');
            const server = new StaticServer({
                rootPath: './output',            // required, the root of the server file tree
                port: 4212,               // required, the port to listen
                cors: '*',                // optional, defaults to undefined
                followSymlink: true,      // optional, defaults to a 404 error
            });


            chokidar.watch('./src/blocks').on('change', (event, path) => {
                console.log('Rebuilding...');
                require.cache = [];
                builder(false);
            });

            chokidar.watch('./src/blog').on('change', (event, path) => {
                console.log('Rebuilding...');
                require.cache = [];
                builder(false);
            });

            chokidar.watch('./src/pages').on('change', (event, path) => {
                console.log('Rebuilding...');
                require.cache = [];
                builder(false);
            });

            chokidar.watch('./src/assets').on('change', (event, path) => {
                console.log('Rebuilding... (Assets includes)');
                require.cache = [];
                builder(true);
            });

            server.start(function () {
                console.log('Server listening to', server.port);
            });

            break;

        default:
            console.error(`${process.argv[2]} is not "build" or "serve"`)
            break;
    }
