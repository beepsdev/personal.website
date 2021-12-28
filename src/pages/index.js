const Block = require("../../lib/block");
const path = require("path");
const Sitemap = require("../sitemap.json");

module.exports = {

	template: new Block(path.join(__dirname, '../blocks/base_template.html')),
	data: (self)=>{

		return {
			title: "Cool Page",
			bloglist: new Block(path.join(__dirname, '../blocks/test/bloglist.html')),
			stamps: new Block(path.join(__dirname, '../blocks/stuff/stampbar.html')),
			sitemap: Sitemap
		};

	}

}