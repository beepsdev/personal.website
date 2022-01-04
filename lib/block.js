const Handlebars = require("handlebars");
const fs = require("fs")
const path = require("path")
const mime = require('mime-types')
const MarkdownIt = require("markdown-it");

module.exports = class Block {

	template = false;
	path;
	extension = '';

	content =  null;
	meta = false;

	static HAS_META_EXTS = ['.htm', '.html', '.md' ];

	constructor(filepath){

		this.path = filepath;
		this.extension = path.extname(this.path);
		this.mime = mime.lookup(this.extension);
		this.content = fs.readFileSync(filepath);

		if(Block.HAS_META_EXTS.includes(this.extension)){
			if(fs.existsSync(filepath.replace(this.extension, '.js'))){
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
					this.meta = false;
				}
			}else{
				console.warn(`[WARN] no metafile found for ${filepath}`);
			}
		}

	}

	addMeta(content) {
		this.meta = {...this.meta, ...content};
	}

	render(template_content, child_meta){

		switch(this.mime){

			case "text/markdown":

				var MarkdownIt = require('markdown-it');
				var md = new MarkdownIt({
					html: true,
					breaks: true
				});
				this.content = md.render(this.content.toString());

			case "text/html":

				if(this.template){
					this.content = this.template.render(this.content.toString(), {...this.meta, ...child_meta})
				}

				var template = Handlebars.compile(this.content.toString());
				return template({...this.meta, ...child_meta, template_content: template_content});

			default:
				return this.content;

		}
	}

	toString(){
		return this.render();
	}

}