const Block = require("../../../../lib/block");
const path = require("path");

module.exports = {

    template: new Block(path.join(__dirname, '../../../blocks/templates/base_template.html')),
    data: (self)=>{

        return {
            title: "Sterr",
            gallery: {
                files: [
                    {
                        "path": "./friends",
                        "type": "png",
                        "author_url": "https://twitter.com/Hypn0Drama",
                        "author_name": "@Hypn0Drama",
                        "description": ""
                    },
                    {
                        "path": "./ball",
                        "type": "png",
                        "author_url": "https://www.furaffinity.net/user/hypnosiswolf",
                        "author_name": "~HypnosisWolf",
                        "description": "Beep stuck in da ball what will they do"
                    },
                    {
                        "path": "./IMG_1839",
                        "type": "jpg",
                        "author_url": "https://www.furaffinity.net/user/ninaaaowo/",
                        "author_name": "~ninaaaowo",
                        "description": "Sterr is cleaning their plating"
                    },
                    {
                        "path": "./IMG_3163",
                        "type": "png",
                        "author_url": "https://www.furaffinity.net/user/pastelcore/",
                        "author_name": "~pastelcore",
                        "description": ":O!"
                    },
                    {
                        "path": "./cutedog",
                        "type": "png",
                        "author_url": "https://twitter.com/NicOpossum",
                        "author_name": "🌹 Poss Pal 🌹",
                        "description": ""
                    },
                ]
            }


        };

    }

}