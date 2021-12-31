const Block = require("../../lib/block");
const Sitemap = require("../sitemap.json");
const path = require("path");

module.exports = {

	template: new Block(path.join(__dirname, '../blocks/templates/base_template.html')),
	data: (self)=>{

		return {
			title: "Sitemap",
			sitemap: Sitemap
		};

	}

}