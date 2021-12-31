const Handlebars = require("handlebars");
const fs = require("fs")
const path = require("path")

module.exports = class Block {

	template = false;
	path;

	content =  null;
	meta = {};

	constructor(filepath){

		this.path = filepath;
		this.content = fs.readFileSync(filepath).toString();

		if(fs.existsSync(filepath.replace(path.extname(filepath), '.js'))){
			try{

				const metafile = require(filepath.replace(path.extname(filepath), '.js'));
				this.template = metafile.template;

				if(typeof metafile.data === 'function'){
					this.meta = metafile.data(this);
				}else{
					this.meta = metafile.data;
				}

			}catch(ex){
				console.warn(`[ERROR] ${filepath}`);
				console.warn(ex);
				this.meta = {};
			}
		}else{
			console.warn(`[WARN] no metafile found for ${filepath}`);
		}

		// if file is markdown, convert to HTML.
		if(path.extname(filepath) === '.md'){
			var MarkdownIt = require('markdown-it');
			var md = new MarkdownIt({
				html: true,
				breaks: true
			});
			this.content = md.render(this.content);
		}

	}

	addMeta(content) {
		this.meta = {...this.meta, ...content};
	}

	render(template_content, child_meta){

		if(this.template){
			this.content = this.template.render(this.content, {...this.meta, ...child_meta})
		}

		console.log(this.path, { ...this.meta, ...child_meta, template_content: template_content})

		var template = Handlebars.compile(this.content);
		return template({ ...this.meta, ...child_meta, template_content: template_content});

	}

	toString(){
		return this.render();
	}

}