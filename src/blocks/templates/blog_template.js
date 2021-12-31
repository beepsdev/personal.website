const Block = require("../../../lib/block");
const path = require("path");

module.exports = {

	template: new Block(path.join(__dirname, 'base_template.html')),
	data: {
		style: "style"
	}

}