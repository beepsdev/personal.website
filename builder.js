const path = require("path");
const fs = require('fs');
const glob = require('glob');

const Block = require("./lib/block");
const builder = require("./build");

const PROJECT_INPUT = path.join(__dirname, 'src');
const PROJECT_OUTPUT = path.join(__dirname, 'output');

const PAGES_INPUT = path.join(PROJECT_INPUT, 'pages');
const BLOCK_INPUT = path.join(PROJECT_INPUT, 'blocks');
const BLOG_INPUT = path.join(PROJECT_INPUT, 'blog');
const ASSETS_INPUT = path.join(PROJECT_INPUT, 'assets');

const PAGES_OUTPUT = path.join(PROJECT_OUTPUT, '');
const BLOCK_OUTPUT = path.join(PROJECT_OUTPUT, 'blocks');
const BLOG_OUTPUT = path.join(PROJECT_OUTPUT, 'blog');
const ASSETS_OUTPUT = path.join(PROJECT_OUTPUT, 'assets');

// Make sure output folder exists
if (!fs.existsSync(PROJECT_OUTPUT)){
    fs.mkdirSync(PROJECT_OUTPUT);
}

function log(type, content){

    if(type === 'debug' && !debug){
        return;
    }

    console.log(`[${new Date().toLocaleTimeString()}] ${type} - ${content}`)
}

async function find_pages(options){
    log('debug', 'find_pages');

    log('pages', 'Starting generator for pages');
    log('pages', PAGES_OUTPUT);

    const files = glob.sync(path.join(PROJECT_INPUT, "**/*"), {});


    for(let index in files){
        const file = path.normalize(files[index]);

        if(!fs.lstatSync(file).isDirectory()){
            let bl = new Block(file);
            await findDependence(bl);
        }

    }

    for(let index in files){
        const file = path.normalize(files[index]);
        const file_short = file.replace(`${PROJECT_INPUT}${path.sep}`, '');

        if(!fs.lstatSync(file).isDirectory()){
            let bl = new Block(file);
            await ReverseAssignMeta(bl);
        }

    }

    for(let index in files){

        const file = path.normalize(files[index]);
        const file_short = file.replace(`${PROJECT_INPUT}${path.sep}`, '');
        if(((options.changed && options.changed.includes(file_short)) || options.force) && !fs.lstatSync(file).isDirectory()){
            await AddFile(file);
        }

    }

}

let files_filtered = new Set();
const dependency_registry = {};

/**
 *
 * @param block Block
 * @returns {Promise<void>}
 */
async function findDependence(block){
    log('debug', 'findDependence');

    if(!(block instanceof Block)) {
        block = new Block(block);
    }

    //log('pages', `Handling file: ${block.path}`);

    if(!dependency_registry[block.path]){
        dependency_registry[block.path] = new Set();
    }

    if(block.template instanceof Block){

        if(!dependency_registry[block.template.path]){
            dependency_registry[block.template.path] = new Set();
        }

        dependency_registry[block.template.path].add(block.path);
        await findDependence(block.template);
    }

    if(block.meta){
        dependency_registry[block.path].add(block.path.replace(path.extname(block.path), '.js'));
    }

    return true;

}

async function ReverseAssignMeta(block){
    log('debug', 'ReverseAssignMeta', block);

    if(path.extname(block.path) === '.js'){
        for(const dep in dependency_registry){
            if(dependency_registry[dep].has(block.path)){
                dependency_registry[block.path].add(dep);
                await findDependence(dep);
            }
        }
    }
}

async function AddFile(file){
    log('debug', 'AddFile');
    if(!files_filtered.has(file)){
        files_filtered.add(file);

        for(const new_file of dependency_registry[file]){
            await AddFile(new_file);
        }
    }

}

async function remove_assets(){
    log('debug', 'remove_assets');

    let new_files = new Set();
    for(const file of files_filtered){
        if(!file.includes(ASSETS_INPUT)){
            new_files.add(file);
        }
    }

    files_filtered = new_files;

}

async function process_stuff(options){
    log('debug', 'process_stuff');

    const sitemap_list = [];

    for(const project_file of files_filtered){

        let output_file;
        if(project_file.includes(PAGES_INPUT)){
            output_file = project_file.replace(PAGES_INPUT, PAGES_OUTPUT)
        }else{
            output_file = project_file.replace(PROJECT_INPUT, PROJECT_OUTPUT)
        }

        try{
            fs.rmSync(output_file, {recursive: true});
        }catch(ex){
            if(!ex.message.includes('ENOENT: no such file or directory')){
                throw ex;
            }
        }

        let x = new Block(project_file);
        x.addMeta(require(path.join(PROJECT_INPUT, 'globals.js')));

        if(project_file.includes(BLOG_INPUT)){
            x.template = new Block(path.join(PROJECT_INPUT, 'blocks', 'templates', 'blog_template.html'));
        }

        // blocks dont need to be published.
        if(output_file.includes(BLOCK_OUTPUT)){
            continue;
        }

        // JS files outside of assets are disallowed.
        if(!project_file.includes(ASSETS_INPUT) && path.extname(project_file) === '.js'){
            continue;
        }

        console.log(`${project_file} => ${output_file}`)
        fs.mkdirSync(path.dirname(output_file), {recursive: true});
        fs.writeFileSync(output_file, x.render());

        sitemap_list.push(output_file.replace(PROJECT_OUTPUT, ''))

    }

    if(options.sitemap){

        const { SitemapStream, streamToPromise } = require( 'sitemap' )
        const { Readable } = require( 'stream' )

        // Create a stream to write to
        const stream = new SitemapStream( { hostname: require('./package.json').website } )

        // Return a promise that resolves with your XML string
        return streamToPromise(Readable.from(sitemap_list).pipe(stream)).then((data) => {
                fs.mkdirSync(path.dirname(PAGES_OUTPUT), {recursive: true});
                fs.writeFileSync(path.join(PAGES_OUTPUT, 'sitemap.xml'), data);
        })
    }

}

let debug = false;

async function run(){

    const commandLineArgs = require('command-line-args')
    const options = commandLineArgs([
        { name: 'debug', alias: 'd', type: Boolean, default: false },
        { name: 'assets', alias: 'a', type: Boolean },
        { name: 'force', alias: 'f',  type: Boolean },
        { name: 'sitemap', alias: 's',  type: Boolean },
        { name: 'changed', alias: 'c', type: String, multiple: true, defaultOption: true },
    ]);

    debug = options.debug;

    if((options.changed && options.changed.length > 0) || options.force){
        await find_pages(options);
    }

    if(!options.assets && !options.force){
        await remove_assets(options);
    }

    await process_stuff(options);

}

let time = new Date().getTime();
run().then(r => {
    console.log(`Completed in ${new Date().getTime() - time}ms`);
    process.exit(0);
}).catch(er => {
    console.error(er);
    process.exit(1);
});