const Block = require("../../lib/block");
const path = require("path");

module.exports = {

	template: new Block(path.join(__dirname, '../blocks/templates/base/template.html')),
	data: (self)=>{
		return {
			title: "Home page",
			description: "Homepage of BeepSterr",
		};
	}

}