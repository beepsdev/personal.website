const Block = require("../../../../lib/block");
const path = require("path");

module.exports = {

    template: new Block(path.join(__dirname, '../../../blocks/templates/base_template.html')),
    data: (self)=>{

        return {
            title: "Bei",

            gallery: {

                files: [
                    {
                        "path": "./angelgashapon",
                        "type": "jpg",
                        "author_url": "https://www.instagram.com/angelgashapon",
                        "author_name": "@angelgashapon",
                        "description": "Bei greets you!!"
                    },
                    {
                        "path": "./engulfingdream",
                        "type": "png",
                        "author_url": "https://twitter.com/engulfingdream",
                        "author_name": "@engulfingdream",
                        "description": "Cursed into the form of a plush toy, unable to do anything but sit and watch."
                    },
                    {
                        "path": "./CookieShark",
                        "type": "png",
                        "author_url": "https://www.furaffinity.net/user/cookieshark/",
                        "author_name": "~CookieShark",
                        "description": "Bei re-adjusting to being able to move after years and learning to accept her new self"
                    },
                    {
                        "path": "./hypnosiswolf_monthly",
                        "type": "png",
                        "author_url": "https://www.furaffinity.net/user/hypnosiswolf/",
                        "author_name": "~HypnosisWolf",
                        "description": "Don't roll the obviously cursed die unless you /want/ another curse!"
                    },
                    {
                        "path": "./oxiartzipantsixo",
                        "type": "png",
                        "author_url": "https://www.deviantart.com/oxiartzipantsixo",
                        "author_name": "oxIArtzipantsIxo",
                        "description": "Bei's close to falling asleep... Again."
                    },
                    {
                        "path": "./fanakfurry",
                        "type": "jpg",
                        "author_url": "https://www.furaffinity.net/user/fanakfurry/",
                        "author_name": "~fanakfurry",
                        "description": "Somehow she ended up in a claw machine, Hopefully they won't keep restocking the machine without giving her a chance to be won..."
                    },
                    {
                        "path": "./keychain",
                        "type": "png",
                        "author_url": "https://www.furaffinity.net/user/punchtig3r/",
                        "author_name": "~punchtig3r",
                        "description": "Bei as a cute little keychain!"
                    }
                ]
            }


        };

    }

}