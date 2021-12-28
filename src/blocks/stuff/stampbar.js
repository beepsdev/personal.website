const path = require("path");
const glob = require('glob');
const fs = require("fs");

module.exports = {

    data: (self)=>{

        const stamps = glob.sync(path.join('../../assets/media/stamps', "**/*.*"), {});
        let result = fs.readdirSync(path.join(__dirname, '../../assets/media/stamps'));
        return {
            stamps: result
        };
    }

}