const fs = require("fs");
const path = require("path");


module.exports = function(includeAssets = false){

	const path = require('path');
	const fs = require('fs');
	const glob = require('glob');

	const Block = require("./lib/block");

	const PROJECT_DIR = path.join(__dirname, 'src');
	const OUTPUT_DIR = path.join(__dirname, 'output');

	const BLOCKS_DIR = path.join(PROJECT_DIR, 'blocks');
	const PAGES_DIR = path.join(PROJECT_DIR, 'pages');
	const BLOG_DIR = path.join(PROJECT_DIR, 'blog');
	const ASSETS_DIR = path.join(PROJECT_DIR, 'assets');
	const GLOBAL_META = require(path.join(PROJECT_DIR, 'globals.js'));

	let SITEMAP = {
		assets: [],
		pages: [],
		blogs: []
	};

	// delete current output directory
	try{
		fs.rmdirSync(OUTPUT_DIR, { recursive: true });
	}catch(ex){

	}

	console.log('Building blocks');
	const pages = glob.sync(path.join(PAGES_DIR, "**/*.html"), {});

	for(let index in pages){

		const file = path.normalize(pages[index]);
		const output_file = file.replace(PAGES_DIR, OUTPUT_DIR);
		SITEMAP.pages.push(output_file.replace(OUTPUT_DIR, ''));

		let x = new Block(file);
		x.addMeta(GLOBAL_META);

		fs.mkdir(path.dirname(output_file), { recursive: true }, (err) => {
			if (err) throw err;

			console.log(`${file} => ${output_file} ${PAGES_DIR}`)
			fs.writeFile(output_file, x.render(), function(err){
				if (err) throw err;
				console.log(`${output_file} written`);
			})

		});

	}

	console.log('Building blog');
	const posts = glob.sync(path.join(BLOG_DIR, "**/*.md"), {});

	for(let index in posts){

		const file = path.normalize(posts[index]);
		const output_file = file.replace(BLOG_DIR, path.join(OUTPUT_DIR, 'blog')).replace('.md', '.html');
		SITEMAP.blogs.push(output_file.replace(OUTPUT_DIR, ''));

		let x = new Block(file);
		x.template = new Block(path.join(BLOCKS_DIR, 'blog_template.html'));
		x.addMeta(GLOBAL_META);

		fs.mkdir(path.dirname(output_file), { recursive: true }, (err) => {
			if (err) throw err;

			console.log(`${file} => ${output_file}`)
			fs.writeFile(output_file, x.render(), function(err){
				if (err) throw err;
				console.log(`${output_file} written`);
			})

		});

	}

	console.log('Building assets');
	const assets = glob.sync(path.join(ASSETS_DIR, "**/*.*"), {});

	for(let index in assets){

		const file = path.normalize(assets[index]);
		const output_file = file.replace(ASSETS_DIR, path.join(OUTPUT_DIR, 'assets'));
		SITEMAP.assets.push(output_file.replace(OUTPUT_DIR, ''));

		fs.mkdir(path.dirname(output_file), { recursive: true }, (err) => {
			if (err) throw err;

			fs.writeFileSync(output_file, fs.readFileSync(file), function(){
				console.log(`${output_file} written`);
			})

		});

	}

	const sitemap_file = path.join(PROJECT_DIR, 'sitemap.json');
	fs.writeFileSync(sitemap_file, JSON.stringify(SITEMAP, null, 2), function(){
		console.log(`${sitemap_file} saved as sitemap`, SITEMAP);
	})

}
