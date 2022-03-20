const Block = require("../../../lib/block");
const path = require("path");

module.exports = {

    template: false,
    data: {
        style: "dark",
        nav: new Block(path.join(__dirname, '../main/nav.html'))
    }

}