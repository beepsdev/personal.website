(async function() {

    const util = require('util');
    const path = require('path');
    const exec = require('child_process').exec;
    const chokidar = require("chokidar");

    switch(process.argv[2]){

        case "build":

            var child = exec('node builder -fas')
            child.stdout.pipe(process.stdout)


            break;

        case "serve":

            function build(){

                if(build_instance === null){

                    let command = `node builder -`

                    if(build_id){
                        command += 'a';
                    }

                    if(changed_files.size > 5 || build_id === 0){
                        console.log('Commencing full build...');
                        command += 'f'
                    }else{
                        command += ` --changed ${Array.from(changed_files).join(' ')}`
                    }

                    console.log(command);

                    build_id++;

                    build_instance = exec(command);
                    build_instance.stdout.pipe(process.stdout)

                    build_instance.on('exit', function() {
                        build_instance = null;
                        changed_files.clear();
                        has_assets = false;
                    })

                }else{

                    clearTimeout(build_queue);
                    build_queue = setTimeout(()=>{
                        build();
                    },500)

                }

            }

            let changed_files = new Set();
            let has_assets = true;
            let build_instance = null;
            let build_queue = null;
            let build_id = 0;

            let getPort = await import('get-port');
            const port = await getPort.default({port: getPort.portNumbers(8080, 8090)});

            const liveServer = require('live-server');
            const server = liveServer.start({
                port: port,
                root: './output',
                open: true,
            });


            chokidar.watch('src/').on('change', (pathname, event) => {
                pathname = path.normalize(pathname).replace('src\\', '');
                console.log('Change Detected:', pathname);
                changed_files.add(pathname);
                build();
            });
            chokidar.watch('src/assets').on('change', (pathname, event) => {
                if(!has_assets){
                    console.log('Assets have changed, including in build.');
                }
                has_assets = true;
            });

            build();

            break;

        default:
            console.error(`${process.argv[2]} is not "build" or "serve"`)
            break;
    }

})();