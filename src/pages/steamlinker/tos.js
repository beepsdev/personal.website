const Block = require("../../../lib/block");
const path = require("path");

module.exports = {

	template: new Block(path.join(__dirname, '../../blocks/templates/dark.html')),
	data: (self)=>{

		return {
			title: "Terms Of Service",
		};

	}

}