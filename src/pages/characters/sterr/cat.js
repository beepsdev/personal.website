const Base = require("./generic.js");
const Block = require("../../../../lib/block");
const path = require('path');

module.exports = {

    template: new Block(path.join(__dirname, '../../../blocks/templates/base_template.html')),
    spiecies: 'cat',
    data: {
        title: "Sterr",
        ...Base
    },

    gallery: {
        files: [
            {
                "path": "./sterr_and_yves",
                "type": "jpg",
                "author_url": "https://twitter.com/runekotesu",
                "author_name": "@runekotesu",
                "description": "Yves has run into sterr! I Wonder what they'll get up to"
            },
            {
                "path": "./angelgashapon",
                "type": "png",
                "author_url": "2",
                "author_name": "@angelgashapon",
                "description": "Yves watching a staff member work on a server from above"
            }
        ]
    }

}